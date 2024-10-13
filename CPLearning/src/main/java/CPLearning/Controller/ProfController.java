package CPLearning.Controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import CPLearning.Entity.ProblemInfo;
import CPLearning.Entity.StudentInfo;	
import CPLearning.Entity.SubmitHistory;
import CPLearning.Entity.WeekInfo;
import CPLearning.Mapper.ProfMapper;

@RestController
public class ProfController {
	@Autowired
	private ProfMapper profMapper;
	
	@PostMapping("/getStudentInfo")
	public List<StudentInfo> getStudentInfo(HttpServletRequest request) {
		List<StudentInfo> studentInfo = profMapper.getStudentInfo(); // 모든 학생 정보 불러오기
		return studentInfo;
	}
	
	@PostMapping("/insertProblemInfo")
	public int insertProblemInfo(ProblemInfo ProblemInfo, HttpServletRequest request) {
		
		System.out.println("##### insertProblemInfo ##### " + ProblemInfo);
		int cnt = profMapper.insertProblemInfo(ProblemInfo);
		
		return cnt;
	}
	
	@PostMapping("/getProfProblemInfo")
	public List<ProblemInfo> getProfProblemInfo(ProblemInfo ProblemInfo, HttpServletRequest request) {
		//System.out.println("##### getProfProblemInfo START ##### ");
		List<ProblemInfo> profProblemInfo = profMapper.getProfProblemInfo(ProblemInfo); // 모든 문제정보 불러오기
		//System.out.println("##### getProfProblemInfo END ##### " + profProblemInfo);

		return profProblemInfo;
	}
	
	@PostMapping("/getSubmitHistory")
	public List<SubmitHistory> getSubmitHistory(SubmitHistory SubmitHistory, HttpServletRequest request) {
		//System.out.println("##### getSubmitHistory START ##### ");
		List<SubmitHistory> submitHistory = profMapper.getSubmitHistory(SubmitHistory); // 학번에 따른 or 문제에 따른 제출정보 불러오기
		//System.out.println("##### getSubmitHistory END ##### " + submitHistory);

		return submitHistory;
	}
	
	@PostMapping("/getWeekInfo")
	public List<WeekInfo> getWeekInfo(WeekInfo WeekInfo, HttpServletRequest request) {
		//System.out.println("##### getWeekInfo START ##### ");
		List<WeekInfo> weekInfo = profMapper.getWeekInfo(WeekInfo); // 학번에 따른 or 문제에 따른 제출정보 불러오기
		//System.out.println("##### getWeekInfo END ##### " + weekInfo);

		return weekInfo;
	}
	

}
