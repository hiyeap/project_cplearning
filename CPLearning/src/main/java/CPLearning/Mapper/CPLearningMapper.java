package CPLearning.Mapper;

import java.util.List;

import CPLearning.Entity.ApiKeyInfo;
import CPLearning.Entity.ProblemInfo;
import CPLearning.Entity.StudentInfo;
import CPLearning.Entity.SubmitHistory;

public interface CPLearningMapper {

	public StudentInfo studentLogin(StudentInfo studentInfo);

	public List<StudentInfo> selectLoginHistory(StudentInfo studentInfo);
	
	public void insertLoginHistory(StudentInfo studentInfo);

	public List<ProblemInfo> getProblemType();

	public List<ProblemInfo> getProblemList(ProblemInfo problemInfo);

	public ProblemInfo getProblemInfo(ProblemInfo problemInfo);
	
	public int insertProblemInfo(ProblemInfo problemInfo);

	public List<ProblemInfo> getProfProblemInfo(ProblemInfo problemInfo);

	public int insertSubmitHistory(SubmitHistory submitHistory);
	
	public List<SubmitHistory> getSubmitHistory(SubmitHistory submitHistory);
	
	public int getSubmitCount(SubmitHistory submitHistory);

	public List<ApiKeyInfo> getApiKey();

}
