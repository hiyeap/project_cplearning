var cpath = config.cpath;

var problemContEx = "주어진 수가 소수인지 판별하는 프로그램을 작성하세요. 주어진 수가 소수일 경우 'Prime'을, 소수가 아닐 경우 'Not Prime'을 출력합니다.";

var problemCodeEx = `cpp
#include <iostream>
#include <cmath>
using namespace std;

bool isPrime(int num) {
	// 여기에 코드를 작성하세요.
}

int main() {
	int num;
	cin >> num;
	if(isPrime(num))
		cout << \"Prime\";
	else
		cout << \"Not Prime\";
	return 0;
}`

var answerCodeEx = `cpp
#include <iostream>
#include <cmath>
using namespace std;
bool isPrime(int num) {
	if(num <= 1) return false;
		for(int i=2; i<=sqrt(num); i++) {
			if(num % i == 0) return false;
		}
		
	return true;
}

int main() {
	int num;
	cin >> num;
	if(isPrime(num))
		cout << \"Prime\";
	else
		cout << \"Not Prime\";
	return 0;
}`

var testCaseEx = `[
	{
		"input": "7",
		"output": "Prime"
	},
	{
		"input": "20",
		"output": "Not Prime"
	},
	{
		"input": "29",
		"output": "Prime"
	},
	{
		"input": "1",
		"output": "Not Prime"
	},
	{
		"input": "17",
		"output": "Prime"
	},
	{
		"input": "10",
		"output": "Not Prime"
	},
	{
		"input": "23",
		"output": "Prime"
	},
	{
		"input": "6",
		"output": "Not Prime"
	},
	{
		"input": "13",
		"output": "Prime"
	},
	{
		"input": "4",
		"output": "Not Prime"
	}
]`
	
var hintEx = "소수는 1과 자기 자신 이외에는 약수가 없는 수입니다. 따라서, 2부터 해당 수의 제곱근까지 나누어 떨어지는 수가 있는지 확인하면 됩니다.";

var makeProblemExample = `테스트 케이스는 10개 생성해주세요. 각 테스트 케이스는 입력값 => 예상 출력값 형식으로 제공해야합니다.
	난이도(problemLevel), 자연어 문제 설명(problemCont), 문제 코드(problemCode), 정답 코드(answerCode), 테스트케이스(testCase), 문제에 대한 힌트(hint)를
	아래의 형식을 지키면서 새로운 C++ 프로그래밍 문제를 생성하세요.`
	
	
var problemObject = {
	problemLevel : "상",
	problemCont : problemContEx,
	problemCode : problemCodeEx,
	answerCode : answerCodeEx,
	testCase : testCaseEx,
	hint : hintEx
}
	


/* -------------------- 교수자 기능 -------------------- */
function fncGetStudentInfo(){
	$("#studentInfo").css("display", "block");
	$("#profProblemInfo").css("display", "none");
	$("#insertProblemForm").css("display", "none");
	
	$.ajax({
		url : cpath + "/getStudentInfo",
		type : "post",
		data : {
			// 추후 난이도별, 주차별 조회 등 추가 필요
		},
		success : function(res) {
			if (res) {
				var studentInfo = "<table>";
				
				studentInfo+="<tr>";
				studentInfo+="<th>학번</th>";
				studentInfo+="<th>학생명</th>";
				studentInfo+="<th>학생레벨</th>";
				studentInfo+="</tr>";
				
				for(var i = 0; i < res.length; i++){
					studentInfo+="<tr>";
					studentInfo+="<td>" + res[i].studentNo + "</td>";
					studentInfo+="<td>" + res[i].name + "</td>";
					studentInfo+="<td>" + res[i].studentLevel + "</td>";
					studentInfo+="</tr>";
				}
		
				studentInfo += "<//table>";
				
				$("#studentInfo").html(studentInfo);
			}
			
		
		},
		error : function() {
			alert("fncGetStudentInfo error");
		}
	})
}

function fncGetProfProblemInfo(){
	$("#studentInfo").css("display", "none");
	$("#profProblemInfo").css("display", "block");
	$("#insertProblemForm").css("display", "none");
	
	$.ajax({
		url : cpath + "/getProfProblemInfo",
		type : "post",
		data : {
			// 추후 난이도별, 주차별 조회 등 추가 필요
		},
		success : function(res) {
			if (res) {
				var profProblemInfo = "<table border='1'>";
				
				profProblemInfo+="<tr>";
				profProblemInfo+="<th>문제번호</th>";
				profProblemInfo+="<th>주차</th>";
				profProblemInfo+="<th>문제타입</th>";
				profProblemInfo+="<th>문제난이도</th>";
				profProblemInfo+="<th>문제설명</th>";
				/* profProblemInfo+="<th>문제코드</th>";
				profProblemInfo+="<th>정답코드</th>";
				profProblemInfo+="<th>테스트케이스</th>";
				profProblemInfo+="<th>문제힌트</th>"; */
				profProblemInfo+="<th>피드백기한</th>";
				profProblemInfo+="<th>마감기한</th>";
				profProblemInfo+="<th>수정</th>";
				profProblemInfo+="<th>삭제</th>";
				profProblemInfo+="</tr>";
				
				for(var i = 0; i < res.length; i++){
					var problemTypeCont = res[i].problemType == 1 ? "실습" : "과제";
					
					profProblemInfo+="<tr>";
					profProblemInfo+="<td>" + res[i].problemNo + "</td>";
					profProblemInfo+="<td>" + res[i].week + "</td>";
					profProblemInfo+="<td>" + problemTypeCont + "</td>";
					profProblemInfo+="<td>" + res[i].problemLevel + "</td>";
					profProblemInfo+="<td><a href='javascript:fncGetSubmitHistory("+ res[i].problemNo + ")'>" + res[i].problemCont + "</a></td>";
					/* profProblemInfo+="<td>" + res[i].problemCode + "</td>";
					profProblemInfo+="<td>" + res[i].answerCode + "</td>";
					profProblemInfo+="<td>" + res[i].testCase + "</td>";
					profProblemInfo+="<td>" + res[i].hint + "</td>"; */
					profProblemInfo+="<td><input type='text' name='feedbackDate' value='" + res[i].feedbackDate + "'></td>";
					profProblemInfo+="<td><input type='text' name='dueDate' value='" + res[i].dueDate + "'></td>";
					profProblemInfo+="<td><button>수정" + "</button></td>";
					profProblemInfo+="<td><button>삭제" + "</button></td>";
					profProblemInfo+="</tr>";
				}
		
				profProblemInfo += "<//table>";
				
				$("#profProblemInfo").html(profProblemInfo);
				
			}
			
		
		},
		error : function() {
			alert("fncInsertProblem error");
		}
	})
}

function fncGetSubmitHistory(problemNo){
	$.ajax({
		url : cpath + "/getSubmitHistory",
		type : "post",
		data : {
			"problemNo" :  problemNo
		},
		success : function(res) {
			if (res) {
				var problemSubmitHistory = "<table>";
				
				problemSubmitHistory+="<tr>";
				problemSubmitHistory+="<th>학번</th>";
				problemSubmitHistory+="<th>학생명</th>";
				problemSubmitHistory+="<th>제출횟수</th>";
				problemSubmitHistory+="<th>제출일시</th>";
				problemSubmitHistory+="<th>제출내용</th>";
				problemSubmitHistory+="<th>점수</th>";
				problemSubmitHistory+="<th>피드백</th>";
				problemSubmitHistory+="</tr>";
				
				for(var i = 0; i < res.length; i++){
					problemSubmitHistory+="<tr>";
					problemSubmitHistory+="<td>" + res[i].studentNo + "</td>";
					problemSubmitHistory+="<td>" + res[i].name + "</td>";
					problemSubmitHistory+="<td>" + res[i].submitCount + "</td>";
					problemSubmitHistory+="<td>" + res[i].submitDate + "</td>";
					problemSubmitHistory+="<td>" + res[i].submitCont + "</td>";
					problemSubmitHistory+="<td>" + res[i].score + "</td>";
					problemSubmitHistory+="<td>" + res[i].feedback + "</td>";
					problemSubmitHistory+="</tr>";
				}
		
				problemSubmitHistory += "<//table>";
				
				$("#problemSubmitHistory").html(problemSubmitHistory);
			}
			
		
		},
		error : function() {
			alert("fncInsertSubmitHistory error");
		}
	})
}

function fncInsertProblemForm(){
	$("#studentInfo").css("display", "none");
	$("#profProblemInfo").css("display", "none");
	$("#insertProblemForm").css("display", "block");
}

function fncMakeProblemChatGPT() {
	$('#profLoading').show();

	var messages = [
		{ role: 'system', content:  'C++ 프로그래밍 문제를 생성해주세요. 난이도는 ' + $('#setProblemLevel option:selected').val() + '으로 해주세요.' + makeProblemExample + JSON.stringify(problemObject)},
		{ role: 'user', content : '' },
	]
	
	var data = {
		model: 'gpt-4o-mini',
		temperature: 0.7,
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
		$('#profLoading').hide();
		
		var insertProblemInfo = response.choices[0].message.content;
		if(confirm(insertProblemInfo)){
			fncInsertProblem(insertProblemInfo);
		}
	
	});
}


function fncInsertProblem(insertProblemInfo){

	var tempProblemInfo = new Object();
	
	tempProblemInfo = JSON.parse(insertProblemInfo);
	
	console.log(tempProblemInfo);
	
	var tempProblemLevel = tempProblemInfo.problemLevel;
	var tempProblemCont = tempProblemInfo.problemCont;
	var tempProblemCode = tempProblemInfo.problemCode;
	var tempAnswerCode = tempProblemInfo.answerCode;
	var tempTestCase = tempProblemInfo.testCase;
	var tempHint = tempProblemInfo.hint;
	
	$.ajax({
		url : cpath + "/insertProblemInfo",
		type : "post",
		data : {
			"week" :  $('#setWeek option:selected').text(),
			"problemLevel" : tempProblemLevel,
			"problemType" : $('#setProblemType option:selected').val(),
			"problemCont" : tempProblemCont,
			"problemCode" : tempProblemCode,
			"answerCode" : tempAnswerCode,
			"testCase" : tempTestCase,
			"hint" : tempHint,
			"feedbackDate" : $('#feedbackDate').val(),
			"dueDate" :  $('#dueDate').val()
		},
		success : function(res) {
			if (res) {
				alert("등록 완료");
			}
			
		
		},
		error : function() {
			alert("fncInsertProblem error");
		}
	})
}