var cpath = config.cpath;

var gpt_api_key = "";
var replit_api_key = "";
var thisStudentInfo = {}; // 현재 로그인 정보 저장

// load 이벤트 리스너
window.addEventListener('load', function() {
	// 2. ajax
	$.ajax({
		url : cpath + "/getApiKey",
		type : "post",
		data : {
			// 보내줄 데이터 없음 
		},
		success : function(res) {
			if (res) {
				for(var i = 0; i < res.length; i++){
					if(res[i].apiName == 'chatGPT'){
						gpt_api_key = res[i].apiKey;
					}
				}
			}
			
		
		},
		error : function() {
			alert("getApiKey error");
		}
	})
});

/* -------------------- 공통 함수 -------------------- */
function fncLogin() {
	// 1. 학번, 비밀번호 가져오기
	var studentNo = $('#studentNo').val();
	var password = $('#password').val();
	
	// 2. ajax
	$.ajax({
		url : cpath + "/login",
		type : "post",
		data : {
			'studentNo' : studentNo,
			'password' : password
		},
		success : function(res) {
			if (res) {
				thisStudentInfo = res;
				
				$(".login-container").css("display", "none");
				$(".main-container").css("display", "block");
				$(".top-bar").css("display", "flex");
				$("#studentName").text(res.name);
				
				
				if(studentNo == '1111'){
					$(".prof-container").css("display", "block");
					$("#student-nav").css("display", "none");
					$(".student-container").css("display", "none");
					fncInsertProblemForm();
				} else {
					$(".student-container").css("display", "flex");
					$("#prof-nav").css("display", "none");
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