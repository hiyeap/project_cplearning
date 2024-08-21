package CPLearning.Controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import CPLearning.Entity.ProblemInfo;
import CPLearning.Entity.StudentInfo;
import CPLearning.Entity.SubmitHistory;
import CPLearning.Mapper.CPLearningMapper;

@RestController
public class CPLearningController {
	@Autowired
	private CPLearningMapper CPLearning;

	@PostMapping("/login")
	public StudentInfo studentLogin(StudentInfo StudentInfo, HttpServletRequest request) {
		StudentInfo studentInfo = CPLearning.studentLogin(StudentInfo); // 아이디,패스워드에 해당하는 조건에 맞는 select 결과를 저장
		
		System.out.println("#####" + studentInfo + "#####");

		if (studentInfo != null) { // 해당 학생 정보가 있으면 
			List<StudentInfo> loginHistorList = CPLearning.selectLoginHistory(studentInfo); // 위 학생의 로그인 이력을 select 결과를 저장
			
			if(loginHistorList.size() > 0) { // 로그인 이력이 1건이상 있으면 로그인 시간을 가져온다
				studentInfo.setLastLoginTime(loginHistorList.get(0).getLoginTime());
			}
			
			studentInfo.setLoginIP(request.getRemoteAddr());
			
			System.out.println("##### insertLoginHistory ##### " + studentInfo);
			CPLearning.insertLoginHistory(studentInfo); // 학번,로그인IP와 함께 로그인 시간 저장
			
		}
		
		return studentInfo;
	}
	
	@PostMapping("/getProblemType")
	public List<ProblemInfo> getProblemType(HttpServletRequest request) {
		List<ProblemInfo> problemInfo = CPLearning.getProblemType(); // USEYN = 'Y'인 문제유형 가져오기
		
		System.out.println("##### getProblemType ##### " + problemInfo);

		return problemInfo;
	}
	
	@PostMapping("/getProblemList")
	public List<ProblemInfo> getProblemList(ProblemInfo ProblemInfo, HttpServletRequest request) {
		List<ProblemInfo> problemInfo = CPLearning.getProblemList(ProblemInfo); // week = 1, problemType = 1 : 1주차 실습 문제 불러오기 
		return problemInfo;
	}
	
	@PostMapping("/getProblemInfo")
	public ProblemInfo getProblemInfo(ProblemInfo ProblemInfo, HttpServletRequest request) {
		ProblemInfo problemInfo = CPLearning.getProblemInfo(ProblemInfo); // problemNo = 1 : 1번 문제 불러오기
		
		System.out.println("##### getProblemCont ##### " + problemInfo);

		return problemInfo;
	}
	
	@PostMapping("/insertProblemInfo")
	public int insertProblemInfo(ProblemInfo ProblemInfo, HttpServletRequest request) {
		
		System.out.println("##### insertProblemInfo ##### " + ProblemInfo);
		int cnt = CPLearning.insertProblemInfo(ProblemInfo);
		
		return cnt;
	}
	
	@PostMapping("/getProfProblemInfo")
	public List<ProblemInfo> getProfProblemInfo(ProblemInfo ProblemInfo, HttpServletRequest request) {
		System.out.println("##### getProfProblemInfo START ##### ");
		List<ProblemInfo> profProblemInfo = CPLearning.getProfProblemInfo(ProblemInfo); // 모든 문제정보 불러오기
		System.out.println("##### getProfProblemInfo END ##### " + profProblemInfo);

		return profProblemInfo;
	}
	
	@PostMapping("/insertSubmitHistory")
	public int insertSubmitHistory(SubmitHistory SubmitHistory, HttpServletRequest request) {
		
		System.out.println("##### insertSubmitHistory ##### " + SubmitHistory);
		
		String submitCount = String.valueOf(CPLearning.getSubmitCount(SubmitHistory));
		SubmitHistory.setSubmitCount(submitCount);
		
		int cnt = CPLearning.insertSubmitHistory(SubmitHistory);
		
		return cnt;
	}
	
	@PostMapping("/getSubmitHistory")
	public List<SubmitHistory> getSubmitHistory(SubmitHistory SubmitHistory, HttpServletRequest request) {
		System.out.println("##### getSubmitHistory START ##### ");
		List<SubmitHistory> submitHistory = CPLearning.getSubmitHistory(SubmitHistory); // 학번에 따른 or 문제에 따른 제출정보 불러오기
		System.out.println("##### getSubmitHistory END ##### " + submitHistory);

		return submitHistory;
	}
	

}
