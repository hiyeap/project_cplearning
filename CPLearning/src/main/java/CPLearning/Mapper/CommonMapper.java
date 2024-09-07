package CPLearning.Mapper;

import java.util.List;

import CPLearning.Entity.ApiKeyInfo;
import CPLearning.Entity.ProblemInfo;
import CPLearning.Entity.StudentInfo;
import CPLearning.Entity.SubmitHistory;

public interface CommonMapper {

	public List<ApiKeyInfo> getApiKey();
	
	public StudentInfo studentLogin(StudentInfo studentInfo);
	
	public List<StudentInfo> selectLoginHistory(StudentInfo studentInfo);
	
	public void insertLoginHistory(StudentInfo studentInfo);


}
