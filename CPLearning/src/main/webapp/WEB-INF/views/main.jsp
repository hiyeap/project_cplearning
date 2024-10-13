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
	
	<script type="text/javascript">
		var config = {
			cpath:"${cpath}"
		}
		
	</script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
	<script src="./js/common.js"></script>
	<script src="./js/profFunction.js"></script>
	<script src="./js/studentFunction.js"></script>
</head>
<body>
	<!-- 고정 헤더 -->
	<div class="header-container">
		<header>
			<h1>C++ 프로그래밍 학습</h1>
		</header>
		
		<div class="top-bar">
			<div class="login-info">
				<span id="studentName"></span>
				<span id="lastLoginTime"></span>
			</div>
			<nav id="prof-nav">
				<a href="javascript:fncGetStudentInfo()">학생 정보</a>
				<a href="javascript:fncSetProgress()">진도 설정</a>
				<a href="javascript:fncGetProfProblemInfo()">문제 목록</a>
				<a href="javascript:fncInsertProblemForm()">문제 생성</a>
			</nav>
			<nav id="student-nav">
				<a href="javascript:fncGetProblemType()">메인</a>
				<a href="javascript:fncGetAllProblem()">전체문제</a>
				<a href="javascript:fncGetMySubmitHistory()">제출이력</a>
			</nav>
		</div>
	</div>
	
	<!-- 메인페이지 -->
	<div id="problemSubmitHistory" style="display : none; position : fixed;"></div>
	
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
			<div id="studentInfo"></div>
			<div id="setProgress"></div>
			<div id="profProblemInfo"></div>
			<div id="insertProblemForm">
				<select name='setWeek' id='setWeek'>
					<option value='1' selected>1</option>
					<option value='2'>2</option>
					<option value='3'>3</option>
					<option value='4'>4</option>
					<option value='5'>5</option>
					<option value='6'>6</option>
					<option value='7'>7</option>
					<option value='8'>8</option>
					<option value='9'>9</option>
					<option value='10'>10</option>
				</select>주차
				<select name='setProblemLevel' id='setProblemLevel'>
					<option value='하'>하</option>
					<option value='중'>중</option>
					<option value='상'>상</option>
				</select>
				<select name='setProblemType' id='setProblemType'>
					<option value='1'>실습</option>
					<option value='2'>과제</option>
				</select>
				피드백기한<input type="text" id="feedbackDate" placeholder="2024-09-05 18:00">
				제출기한<input type="text" id="dueDate" placeholder="2024-09-08 18:00">
				<button type="button" onclick="fncMakeProblemChatGPT()">문제 생성</button>
				<div class="loading" id="profLoading">
					<img src="https://studentrights.sen.go.kr/images/common/loading.gif">
				</div>
			</div>

		</div>

		<!-- 학생 컨테이너 -->
		<div class="student-container">
			<div class="left">
				<div id="problemType"></div>
				<div id="problemList"></div>
			</div>
			<div class="right">
				<div id="problemInfo">
					<div>
						<textarea id="problemCont" name="problemCont" rows="5" style="width:100%" readonly></textarea>
					</div>
					<div>
						<textarea id="studentCode" name="studentCode" rows="30" style="width:100%"></textarea>
					</div>
					<button type="button" onclick="fncSubmitProblemChatGPT()">제출</button>
					<div class="loading" id="studentLoading">
						<img
							src="https://studentrights.sen.go.kr/images/common/loading.gif">
					</div>
					<div>
						<textarea id="gptFeedback" name="gptFeedback" rows="3" style="width:100%" readonly></textarea>
					</div>
				</div>
			</div>
		</div>
		
	</div>
	<!-- <button type="button" onclick="test()">테스트버튼</button> -->

</body>
</html>

