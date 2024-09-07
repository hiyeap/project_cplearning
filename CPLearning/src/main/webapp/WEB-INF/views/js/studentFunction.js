var cpath = config.cpath;

/* -------------------- 학생 전역변수 -------------------- */
var thisProblemInfo = {}; // 현재 선택한 문제 정보를 저장
var thisSubmitInfo = {}; // 현재 제출 정보를 저장

/* -------------------- 학생 기능 -------------------- */
function fncGetProblemType(){
	// 1. 현재 공개되어 있는 유형(실습/과제)를 가져온다
	
	$.ajax({
		url : cpath + "/getProblemType",
		type : "post",
		data : {
			// 보내줄 데이터 없음 (임시)
		},
		success : function(res) {
			if (res) {
				
				var problemType = "<ul>";
				
				for(var i = 0; i < res.length; i++){
					var problemTypeName = res[i].problemType == 1 ? "실습" : "과제";
					
					problemType += "<li><a href='javascript:fncGetProblemList(" + res[i].week + "," + res[i].problemType + ")'>" + res[i].week + "주차" + problemTypeName + "문제</a></li>";
				}
				
				problemType += "</ul>";
				
				
				$("#problemType").html(problemType);
			}
			
		
		},
		error : function() {
			alert("fncGetProblemType error");
		}
	})
}

function fncGetProblemList(week, type) {
	// 1. 하위 객체 안보이게
	$("#problemInfo").css("display", "none");
	
	// 2. n 주차 실습, 과제를 선택했을 때 문제를 가져온다
	
	$.ajax({
		url : cpath + "/getProblemList",
		type : "post",
		data : {
			"week" : week,
			"problemType" : type
		},
		success : function(res) {
			if (res) {
				$("#problemList").css("display", "flex");
				
				var problemList = "<ul>";
				
				for(var i = 0; i < res.length; i++){
					problemList += "<li><a href='javascript:fncGetProblemInfo(" + res[i].problemNo + ")'>" + (i + 1) + "번째 문제</a></li>";
				}
				
				problemList += "</ul>";
				
				$("#problemList").html(problemList);
			}
			
		
		},
		error : function() {
			alert("fncGetProblemList error");
		}
	})
}

function fncGetProblemInfo(problemNo) {
	// 문제번호를 눌렀을 때 나오는 상세 문제
	
	$.ajax({
		url : cpath + "/getProblemInfo",
		type : "post",
		data : {
			"problemNo" : problemNo
		},
		success : function(res) {
			if (res) {
				thisProblemInfo = res;
				
				$("#problemInfo").css("display", "block");
				document.getElementById("problemCont").value = res.problemCont;
				document.getElementById("studentCode").value = res.problemCode;
				
				
			}
			
		
		},
		error : function() {
			alert("fncGetProblemInfo error");
		}
	})
}

function fncSubmitProblemChatGPT() {
	var problemCont = document.getElementById('problemCont').value;
	var studentCode = document.getElementById('studentCode').value;
	var testCase = thisProblemInfo.testCase;
	var submitCont = '문제는 ' + problemCont + '이고, 학생이 입력한 코드는 ' + studentCode + '입니다.' + testCase + '위와 같이 테스트케이스는 각각 입력 => 출력의 형태로 담겨 있습니다. 학생이 입력한 코드를 실행하여 테스트케이스를 기반으로 점수와 피드백을 알려주세요.';
	submitCont +='점수는 0에서 100 사이 정수로 말해주세요. 예를 들면 테스트케이스 10개 중 10개를 맞혔을 경우 100, 2개를 맞혔을 경우 20 입니다.';
	submitCont +='피드백은 테스트케이스를 알려주거나, 올바른 코드를 알려주거나, 수정해줘서는 안됩니다. 학생의 코드의 문제점에 대한 힌트를 말해주면 됩니다.';
	submitCont +='답변의 내용은 점수와 피드백 항목을 순서대로 ---을 구분값으로 하여 점수---피드백 형식을 지켜주세요.';

	$('#studentLoading').show();

	var messages = [
		{ role: 'system', content: submitCont },
		{ role: 'user', content: ''},
	]

	var data = {
		model: 'gpt-3.5-turbo',
		temperature: 0.5,
		n: 1,
		messages: messages,
	}

	$.ajax({
		url: "https://api.openai.com/v1/chat/completions",
		method: 'POST',
		headers: {
			'Authorization': "Bearer " + gpt_api_key,
			'Content-Type': 'application/json',
		},
		data: JSON.stringify(data),
	}).then(function (response) {
		$('#studentLoading').hide();
		
		var tempSubmitInfo = gptAnswer.split('---');
		
		thisSubmitInfo.studentCode = studentCode;
		
		document.getElementById('gptFeedback').value = tempSubmitInfo;
		thisSubmitInfo.score = tempSubmitInfo[0];
		thisSubmitInfo.feedback = tempSubmitInfo[1];
		
		fncInsertSubmitHistory();
	});
}

function fncInsertSubmitHistory(){
	$.ajax({
		url : cpath + "/insertSubmitHistory",
		type : "post",
		data : {
			"studentNo" : thisStudentInfo.studentNo,
			"problemNo" :  thisProblemInfo.problemNo,
			"problemType" : thisProblemInfo.problemType,
			"submitCont" : thisSubmitInfo.studentCode,
			"score" : thisSubmitInfo.score,
			"feedback" : thisSubmitInfo.feedback,
		},
		success : function(res) {
			if (res) {
				
			}
			
		
		},
		error : function() {
			alert("fncInsertSubmitHistory error");
		}
	})
}
	