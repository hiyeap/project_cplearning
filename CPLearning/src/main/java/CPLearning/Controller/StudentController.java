package CPLearning.Controller;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
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
		
		//System.out.println("##### getProblemType ##### " + problemInfo);

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
		
		//System.out.println("##### getProblemCont ##### " + problemInfo);

		return problemInfo;
	}
	
	@PostMapping("/insertSubmitHistory")
	public int insertSubmitHistory(SubmitHistory SubmitHistory, HttpServletRequest request) {
		
		String submitCount = String.valueOf(studentMapper.getSubmitCount(SubmitHistory)+1);
		SubmitHistory.setSubmitCount(submitCount);
		//System.out.println("##### insertSubmitHistory ##### " + SubmitHistory);
		int cnt = studentMapper.insertSubmitHistory(SubmitHistory);
		
		return cnt;
	}
	
	@PostMapping("/getMySubmitHistory")
	public List<SubmitHistory> getMySubmitHistory(SubmitHistory SubmitHistory, HttpServletRequest request) {
		List<SubmitHistory> submitHistory = studentMapper.getMySubmitHistory(SubmitHistory); // studentNo = '' 
		return submitHistory;
	}
	
	@PostMapping("/test")
	public String test() {
		String result = "";
		try {
			// CMake 프로젝트 디렉토리
			File projectDir = new File("C:/Users/user/source/repos/CMakeProject1");
		
			// 빌드 디렉토리 생성
			File buildDir = new File(projectDir, "build/Debug");
			if (!buildDir.exists()) {
				buildDir.mkdir();
			}
			
			// CMake를 호출하여 프로젝트 빌드
			ProcessBuilder cmakeBuilder = new ProcessBuilder("cmake", "..");
			cmakeBuilder.directory(buildDir);
			Process cmakeProcess = cmakeBuilder.start();
			cmakeProcess.waitFor(); // 빌드가 완료될 때까지 대기
			
			// 빌드 후 실행 파일 호출
			ProcessBuilder processBuilder = new ProcessBuilder("C:/Users/user/source/repos/CMakeProject1/build/Debug/CMakeProject1.exe");
			processBuilder.directory(buildDir); // 작업 디렉토리 설정
			
			Process process = processBuilder.start();
			BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
			StringBuilder output = new StringBuilder();
			String line;
			
			while ((line = reader.readLine()) != null) {
				output.append(line).append("\n");
			}
			
			reader.close();
			
			// 실행 결과를 웹 응답으로 사용
			result = output.toString();
		} catch (IOException | InterruptedException e) {
			e.printStackTrace();
		}
		return result;
	}

	
}
