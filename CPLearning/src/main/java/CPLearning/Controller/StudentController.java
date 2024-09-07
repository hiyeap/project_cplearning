package CPLearning.Controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import CPLearning.Entity.ProblemInfo;
import CPLearning.Entity.SubmitHistory;
import CPLearning.Mapper.StudentMapper;

@RestController
public class StudentController {
	@Autowired
	private StudentMapper studentMapper;
	
	@PostMapping("/getProblemType")
	public List<ProblemInfo> getProblemType(HttpServletRequest request) {
		List<ProblemInfo> problemInfo = studentMapper.getProblemType(); // USEYN = 'Y'인 문제유형 가져오기
		
		System.out.println("##### getProblemType ##### " + problemInfo);

		return problemInfo;
	}
	
	@PostMapping("/getProblemList")
	public List<ProblemInfo> getProblemList(ProblemInfo ProblemInfo, HttpServletRequest request) {
		List<ProblemInfo> problemInfo = studentMapper.getProblemList(ProblemInfo); // week = 1, problemType = 1 : 1주차 실습 문제 불러오기 
		return problemInfo;
	}
	
	@PostMapping("/getProblemInfo")
	public ProblemInfo getProblemInfo(ProblemInfo ProblemInfo, HttpServletRequest request) {
		ProblemInfo problemInfo = studentMapper.getProblemInfo(ProblemInfo); // problemNo = 1 : 1번 문제 불러오기
		
		System.out.println("##### getProblemCont ##### " + problemInfo);

		return problemInfo;
	}
	
	@PostMapping("/insertSubmitHistory")
	public int insertSubmitHistory(SubmitHistory SubmitHistory, HttpServletRequest request) {
		
		System.out.println("##### insertSubmitHistory ##### " + SubmitHistory);
		
		String submitCount = String.valueOf(studentMapper.getSubmitCount(SubmitHistory)+1);
		SubmitHistory.setSubmitCount(submitCount);
		
		int cnt = studentMapper.insertSubmitHistory(SubmitHistory);
		
		return cnt;
	}
	
}
