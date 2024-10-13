package CPLearning.Controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import CPLearning.Entity.ApiKeyInfo;
import CPLearning.Entity.StudentInfo;
import CPLearning.Mapper.CommonMapper;

@RestController
public class CommonController {
	@Autowired
	private CommonMapper commonMapper;
	
	@PostMapping("/getApiKey")
	public List<ApiKeyInfo> getApiKey(HttpServletRequest request) {
		
		List<ApiKeyInfo> ApiKeyInfo = commonMapper.getApiKey();
		//System.out.println("#####" + ApiKeyInfo + "#####");
		return ApiKeyInfo;
	}

	@PostMapping("/login")
	public StudentInfo studentLogin(StudentInfo StudentInfo, HttpServletRequest request) {
		StudentInfo studentInfo = commonMapper.studentLogin(StudentInfo); // 학번,패스워드에 해당하는 조건에 맞는 select 결과를 저장
		
		//System.out.println("#####" + studentInfo + "#####");

		if (studentInfo != null) { // 해당 학생 정보가 있으면 
			List<StudentInfo> loginHistorList = commonMapper.selectLoginHistory(studentInfo); // 위 학생의 로그인 이력을 select 결과를 저장
			
			if(loginHistorList.size() > 0) { // 로그인 이력이 1건이상 있으면 로그인 시간을 가져온다
				studentInfo.setLastLoginTime(loginHistorList.get(0).getLoginTime());
			}
			
			studentInfo.setLoginIP(request.getRemoteAddr());
			
			//System.out.println("##### insertLoginHistory ##### " + studentInfo);
			commonMapper.insertLoginHistory(studentInfo); // 학번,로그인IP와 함께 로그인 시간 저장
			
		}
		
		return studentInfo;
	}
}
