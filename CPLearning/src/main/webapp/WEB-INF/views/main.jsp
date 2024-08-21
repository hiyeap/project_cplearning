<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:set var="cpath" value="${pageContext.request.contextPath}" />

<!DOCTYPE html>
<html lang="en">
<head>
<title>C++ 프로그래밍 학습</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">


<!-- Favicon-->
<link rel="icon" type="image/x-icon" href="css/favicon_cp.ico" />

<link href="css/styles_c.css" rel="stylesheet" />

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<script type="text/javascript"></script>
<script>
	var gpt_api_key = "";
	
    // load 이벤트 리스너
    window.addEventListener('load', function() {
		// 2. ajax
		$.ajax({
			url : "${cpath}/getApiKey",
			type : "post",
			data : {
				// 보내줄 데이터 없음 
			},
			success : function(res) {
				if (res) {
					gpt_api_key = res;
				}
				
			
			},
			error : function() {
				alert("getApiKey error");
			}
		})
    });


	var makeProblemCondition = `
	
	C++ 프로그래밍 문제를 생성해주세요.
	난이도, 자연어 문제 설명, 문제 코드, 정답 코드, 테스트케이스, 문제에 대한 힌트를 ---을 구분자로 하여 구분해주세요.
	각 항목을 나누는 것 이외에는 ---을 추가해서는 안됩니다.
	`
	
	var makeProblemExample = `
		테스트 케이스는 10개 생성해주세요. 각 테스트 케이스는 입력값 => 예상 출력값 형식으로 제공해야합니다.
		아래는 예시 코드입니다. 해당 형식을 지키면서 새로운 C++ 프로그래밍 문제를 생성하세요.

		상
		---
		자연수로 구성된 배열에서 최대 K개의 원소를 삭제하여 배열의 최소값과 최대값의 차이를 최소화하는 프로그램을 작성하세요. K개의 원소를 삭제한 후의 최소값과 최대값의 차이가 최소가 되도록 하세요.
		---
		cpp
		#include <iostream>
		#include <vector>
		#include <algorithm>

		using namespace std;

		int minimizeDifference(vector<int>& arr, int k) {
		    // 여기에 코드를 작성하세요.
		}

		int main() {
		    int n, k;
		    cin >> n >> k;
		    vector<int> arr(n);
		    for (int i = 0; i < n; ++i) {
		        cin >> arr[i];
		    }

		    cout << minimizeDifference(arr, k) << endl;
		    return 0;
		}
		---
		cpp
		#include <iostream>
		#include <vector>
		#include <algorithm>

		using namespace std;

		int minimizeDifference(vector<int>& arr, int k) {
		    sort(arr.begin(), arr.end());
		    int n = arr.size();
		    int minDiff = arr[n-1] - arr[0];
		    
		    for (int i = 0; i <= k; ++i) {
		        int low = arr[i];
		        int high = arr[n - 1 - (k - i)];
		        minDiff = min(minDiff, high - low);
		    }

		    return minDiff;
		}

		int main() {
		    int n, k;
		    cin >> n >> k;
		    vector<int> arr(n);
		    for (int i = 0; i < n; ++i) {
		        cin >> arr[i];
		    }

		    cout << minimizeDifference(arr, k) << endl;
		    return 0;
		}
		---
		5 2 1 3 6 4 8 => 2 
		7 3 9 12 3 7 15 10 11 => 6
		4 1 8 1 4 5 => 3
		6 2 5 8 10 3 6 2 => 3
		10 5 15 13 12 10 5 8 14 16 6 11 => 6
		3 1 10 20 30 => 10
		8 4 2 7 9 4 8 5 3 6 => 3
		5 3 5 5 5 5 5 => 0
		6 2 1 5 3 6 2 9 => 4
		7 2 100 200 300 400 500 600 700 => 200
		10 5 1 2 3 4 5 6 7 8 9 10 => 2
		---
		주어진 배열에서 최소값과 최대값을 줄이기 위해, 배열을 정렬한 후에 최대 K개의 원소를 제거하면서 최소값과 최대값을 선택하세요.
		`

	
	var allProblemCnt = 0; // 전체문제의 개수를 구함
	var thisStudentInfo = {}; // 현재 로그인 학생 정보 저장
	var thisProblemInfo = {}; // 현재 선택한 문제 정보를 저장
	var thisSubmitInfo = {}; // 현재 제출 정보를 저장
	
	function fncLogin() {
		// 1. 학번, 비밀번호 가져오기
		var studentNo = $('#studentNo').val();
		var password = $('#password').val();
		
		// 2. ajax
		$.ajax({
			url : "${cpath}/login",
			type : "post",
			data : {
				'studentNo' : studentNo,
				'password' : password
			},
			success : function(res) {
				if (res) {
					thisStudentInfo = res;
					
					$(".login-container").css("display", "none");
					$("#problemList").css("display", "none");
					$("#problemInfo").css("display", "none");
					$("#studentName").text(res.name);
					
					
					if(studentNo == '1111'){
						$(".prof-container").css("display", "block");
						$(".student-container").css("display", "none");
						fncGetProfProblemInfo();
					} else {
						$(".student-container").css("display", "block");
						$(".prof-container").css("display", "none");
						fncGetProblemType();
					}
					
					if(res.lastLoginTime){
						$("#lastLoginTime").text("최종 로그인 일시 : " + res.lastLoginTime);
					}
					
				} else {
					alert("학번 또는 비밀번호를 다시 확인해주세요");
				}
				
				

			
			},
			error : function() {
				alert("fncLogin error");
			}
		})
	}
	
	function fncGetProblemType(){
		// 1. 현재 공개되어 있는 유형(실습/과제)를 가져온다
		
		// 2. ajax
		$.ajax({
			url : "${cpath}/getProblemType",
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
			url : "${cpath}/getProblemList",
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
		// 2. n 주차 실습, 과제를 선택했을 때 문제를 가져온다
		
		$.ajax({
			url : "${cpath}/getProblemInfo",
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
	
 function fncMakeProblemChatGPT() {
      $('#profLoading').show();

      var messages = [
        { role: 'system', content:  makeProblemCondition + '난이도가 ' + $('#setProblemLevel option:selected').val() + '으로 해주세요.' + makeProblemExample },
        { role: 'user', content : '' },
      ]

      var data = {
        model: 'gpt-3.5-turbo',
        temperature: 0.7,
        n: 1,
        messages: messages,
      }

      $.ajax({
        url: "https://api.openai.com/v1/chat/completions",
        method: 'POST',
        headers: {
          Authorization: "Bearer " + gpt_api_key,
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
	 
	 var tempProblemInfo = insertProblemInfo.split('---');
	 
	 var tempProblemLevel = tempProblemInfo[0];
	 var tempProblemCont = tempProblemInfo[1];
	 var tempProblemCode = tempProblemInfo[2];
	 var tempAnswerCode = tempProblemInfo[3];
	 var tempTestCase = tempProblemInfo[4];
	 var tempHint = tempProblemInfo[5];
	 
	$.ajax({
		url : "${cpath}/insertProblemInfo",
		type : "post",
		data : {
			"week" :  $('#setWeek option:selected').text(),
			"problemNo" :  allProblemCnt+1,
			"problemLevel" : tempProblemLevel,
			"problemType" : $('#setProblemType option:selected').val(),
			"problemCont" : tempProblemCont,
			"problemCode" : tempProblemCode,
			"answerCode" : tempAnswerCode,
			"testCase" : tempTestCase,
			"hint" : tempHint
		},
		success : function(res) {
			if (res) {
				// 문제를 등록했으니 전체 문제 리스트를 재조회 
				fncGetProfProblemInfo();
			}
			
		
		},
		error : function() {
			alert("fncInsertProblem error");
		}
	})
 }
 
 function fncGetProfProblemInfo(){
	$.ajax({
		url : "${cpath}/getProfProblemInfo",
		type : "post",
		data : {
			// 추후 난이도별, 주차별 조회 등 추가 필요
		},
		success : function(res) {
			if (res) {
				var profProblemInfo = "<table>";
				
				profProblemInfo+="<tr>";
				profProblemInfo+="<th>문제번호</th>";
				profProblemInfo+="<th>주차</th>";
				profProblemInfo+="<th>문제타입</th>";
				profProblemInfo+="<th>문제난이도</th>";
				profProblemInfo+="<th>문제설명</th>";
				profProblemInfo+="<th>문제코드</th>";
				profProblemInfo+="<th>정답코드</th>";
				profProblemInfo+="<th>테스트케이스</th>";
				profProblemInfo+="<th>문제힌트</th>";
				profProblemInfo+="<th>제출기한</th>";
				profProblemInfo+="<th>사용여부</th>";
				profProblemInfo+="</tr>";
				
				for(var i = 0; i < res.length; i++){
					profProblemInfo+="<tr>";
					profProblemInfo+="<td>" + res[i].problemNo + "</td>";
					profProblemInfo+="<td>" + res[i].week + "</td>";
					profProblemInfo+="<td>" + res[i].problemType + "</td>";
					profProblemInfo+="<td>" + res[i].problemLevel + "</td>";
					profProblemInfo+="<td>" + res[i].problemCont + "</td>";
					profProblemInfo+="<td>" + res[i].problemCode + "</td>";
					profProblemInfo+="<td>" + res[i].answerCode + "</td>";
					profProblemInfo+="<td>" + res[i].testCase + "</td>";
					profProblemInfo+="<td>" + res[i].hint + "</td>";
					profProblemInfo+="<td>" + res[i].dueDate + "</td>";
					profProblemInfo+="<td>" + res[i].useYn + "</td>";
					profProblemInfo+="</tr>";
				}
		        
				profProblemInfo += "<//table>";
				
				
				$("#profProblemInfo").html(profProblemInfo);
				
				allProblemCnt = res.length;
				
			}
			
		
		},
		error : function() {
			alert("fncInsertProblem error");
		}
	})
 }
 
 function fncSubmitProblemChatGPT() {
     var problemCont = document.getElementById('problemCont').value;
     var studentCode = document.getElementById('studentCode').value;
     var testCase = thisProblemInfo.testCase;
     var submitCont = '문제는 ' + problemCont + '이고, 테스트케이스는 ' + testCase +'이고, 입력한 답은 ' + studentCode + '입니다';
     submitCont += '학생의 코드를 돌려 테스트케이스와 비교하여 점수를 알려주고, 학생의 코드에 대한 피드백을 해주세요.';
     submitCont += '점수와 피드백을 --- 라는 기호로 구분하여 알려주세요';
     
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
         Authorization: "Bearer " + gpt_api_key,
         'Content-Type': 'application/json',
       },
       data: JSON.stringify(data),
     }).then(function (response) {
       $('#studentLoading').hide();
       
       var gptAnswer = esponse.choices[0].message.content;
       document.getElementById('feedback').value = gptAnswer;
       
       thisSubmitInfo.studentCode = studentCode;
    	   
       var tempSubmitInfo = gptAnswer.split('---');
       
       thisSubmitInfo.score = tempSubmitInfo[0];
       thisSubmitInfo.feedback = tempSubmitInfo[1];
       
		fncInsertSubmitHistory();
     });
   }
 
 function fncInsertSubmitHistory(){
		$.ajax({
			url : "${cpath}/insertSubmitHistory",
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
 
</script>
</head>
<body>
	<!-- 고정 헤더 -->
    <header>
		<h2>C++ 프로그래밍 학습</h2>
		<div class="additional-info">
			<span id="studentName"></span>
			<span id="lastLoginTime"></span>
		</div>
    </header>


	<!-- 메인페이지 -->

	<div class="container">
	
		<!-- 로그인 -->
		<div class="login-container">
			<div>
				<h2>Login</h2>
				<input type="text" id="studentNo" name="studentNo" placeholder="학번을 입력해주세요">
				<input type="password" id="password" name="password" placeholder="비밀번호를 입력해주세요">
				<button type="button" onclick="fncLogin()">로그인</button>
			</div>

		</div>
		
		<div class="main-container">
		
		    <!-- 교수 컨테이너 -->
		    <div class="prof-container">
		    	<div id="profProblemInfo"></div>
		        <select name='setWeek' id='setWeek'>
	        		<option value='1'>1</option>
	        		<option value='2'>2</option>
	        		<option value='3'>3</option>
	        		<option value='4'>4</option>
	        		<option value='5'>5</option>
	        	</select>주차
	        	<select name='setProblemType' id='setProblemType'>
	        		<option value='1'>실습</option>
	        		<option value='2'>과제</option>
	        	</select>
	        	<select name='setProblemLevel' id='setProblemLevel'>
	        		<option value='하'>하</option>
	        		<option value='중'>중</option>
	        		<option value='상'>상</option>
	        	</select>
	        	<button type="button" onclick="fncMakeProblemChatGPT()">문제 생성</button>
   				<div class="loading" id="profLoading">
				  <img src="https://studentrights.sen.go.kr/images/common/loading.gif">
				</div>
	
		    </div>
			
		    <!-- 학생 컨테이너 -->
		    <div class="student-container">
		        <div id="problemType"></div>
		        <div id="problemList"></div>
		        <div id="problemInfo">
					<div><textarea id="problemCont" name="problemCont" cols="50" rows="3"></textarea></div>	        
					<div><textarea id="studentCode" name="studentCode" cols="50" rows="30"></textarea></div>
					<button type="button" onclick="fncSubmitProblemChatGPT()">제출</button>
					<div class="loading" id="studentLoading">
					  <img src="https://studentrights.sen.go.kr/images/common/loading.gif">
					</div>
					<div id="feedback"></div>    
		        </div>
	    	</div>
	
		    
		</div>
	</div>


</body>
</html>

