var cpath = config.cpath;

/* -------------------- 학생 전역변수 -------------------- */
var thisProblemInfo = {}; // 현재 선택한 문제 정보를 저장
var thisSubmitInfo = {}; // 현재 제출 정보를 저장

/* -------------------- 학생 기능 -------------------- */
function fncStdOtherMenu(){
	$("#problemList").css("display", "none");
	$("#problemInfo").css("display", "none");
	$("#problemSubmitHistory").css("display", "none");
}

function fncGetProblemType(){
	fncStdOtherMenu();
	$("#problemType").css("display", "block");
	
	$.ajax({
		url : cpath + "/getProblemType",
		type : "post",
		data : {
			
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
	fncStdOtherMenu();
	
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
					problemList += "<li><a href='javascript:fncGetProblemInfo(" + res[i].problemNo + ")'>" + res[i].problemNo + "번 문제</a></li>";
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
				document.getElementById("gptFeedback").value = '코드를 제출하면 이 부분에 피드백이 제공됩니다.';
			}
			
		
		},
		error : function() {
			alert("fncGetProblemInfo error");
		}
	})
}

function fncGetAllProblem(){
	$("#problemType").css("display", "none");
	fncGetProblemList();
}

function fncSubmitProblemChatGPT() {
	var problemCont = document.getElementById('problemCont').value;
	var studentCode = document.getElementById('studentCode').value;
/*	var testCase = thisProblemInfo.testCase;
	var submitCont = '문제는 ' + problemCont + '이고, 학생이 입력한 코드는 ' + studentCode + '입니다.' + testCase + '위와 같이 테스트케이스는 각각 입력 => 출력의 형태로 담겨 있습니다. 학생이 입력한 코드를 실행하여 테스트케이스를 기반으로 점수와 피드백을 알려주세요.';
	submitCont +='점수는 0에서 100 사이 정수로 말해주세요. 예를 들면 테스트케이스 10개 중 10개를 맞혔을 경우 100, 2개를 맞혔을 경우 20 입니다.';
	submitCont +='피드백은 테스트케이스를 알려주거나, 올바른 코드를 알려주거나, 수정해줘서는 안됩니다. 학생의 코드의 문제점에 대한 힌트를 말해주면 됩니다.';
	submitCont +='답변의 내용은 점수와 피드백 항목을 순서대로 ---을 구분값으로 하여 점수---피드백 형식을 지켜주세요.';
*/

	var submitCont = '문제는 ' + problemCont + '이고, 학생이 입력한 코드는 ' + studentCode + '입니다.';
	submitCont +='학생의 코드에 대한 피드백을 100글자 이내로 해주세요.';

	$('#studentLoading').show();

	var messages = [
		{ role: 'system', content: submitCont },
		{ role: 'user', content: ''},
	]

	var data = {
		model: 'gpt-4o-mini',
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
		
		document.getElementById('gptFeedback').value = response.choices[0].message.content;
		//thisSubmitInfo.studentCode = studentCode;
		//thisSubmitInfo.score = tempSubmitInfo[0];
		//thisSubmitInfo.feedback = tempSubmitInfo[1];
		
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
			"submitCont" : $("#studentCode").val(),
			"score" : thisSubmitInfo.score || 0,
			"feedback" : $('#gptFeedback').val(),
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

function fncGetMySubmitHistory(){
	$("#problemSubmitHistory").css("display", "block");
	
	$.ajax({
		url : cpath + "/getMySubmitHistory",
		type : "post",
		data : {
			"studentNo" :  thisStudentInfo.studentNo
		},
		success : function(res) {
			if (res) {
				var problemSubmitHistory ="<button onclick='fncCloseSubmitHistory()' id='closeBtn'>X</button>"
				problemSubmitHistory+="<table>";
				problemSubmitHistory+="<tr>";
				problemSubmitHistory+="<th>문제타입</th>";
				problemSubmitHistory+="<th>문제번호</th>";
				problemSubmitHistory+="<th>제출횟수</th>";
				problemSubmitHistory+="<th>제출일시</th>";
				problemSubmitHistory+="<th style='max-width: 150px;'>제출내용</th>";
				problemSubmitHistory+="<th>점수</th>";
				problemSubmitHistory+="<th>피드백</th>";
				problemSubmitHistory+="</tr>";
				
				for(var i = 0; i < res.length; i++){
					var problemTypeCont = res[i].problemType == 1 ? "실습" : "과제";
					
					problemSubmitHistory+="<tr>";
					problemSubmitHistory+="<td>" + problemTypeCont + "</td>";
					problemSubmitHistory+="<td>" + res[i].problemNo + "</td>";
					problemSubmitHistory+="<td>" + res[i].submitCount + "</td>";
					problemSubmitHistory+="<td>" + res[i].submitTime + "</td>";
					problemSubmitHistory+="<td>" + res[i].submitCont + "</td>";
					problemSubmitHistory+="<td>" + res[i].score + "</td>";
					problemSubmitHistory+="<td><textarea name='feedback' cols='50' rows='3'>" + res[i].feedback + "</textarea></td>";
					
					problemSubmitHistory+="</tr>";
				}
		
				problemSubmitHistory += "</table>";
				$("#problemSubmitHistory").html(problemSubmitHistory).css("display", "block");
			}
			
		
		},
		error : function() {
			alert("fncGetMySubmitHistory error");
		}
	})
}

function test(){
	$.ajax({
		url : cpath + "/test",
		type : "post",
		data : {
			
		},
		success : function(res) {
			if (res) {
				console.log("## test ##");
				console.log(res);
			}
			
		
		},
		error : function() {
			alert("test");
		}
	})
}