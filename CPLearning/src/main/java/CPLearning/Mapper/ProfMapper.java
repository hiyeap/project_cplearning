package CPLearning.Mapper;

import java.util.List;

import CPLearning.Entity.ApiKeyInfo;
import CPLearning.Entity.ProblemInfo;
import CPLearning.Entity.StudentInfo;
import CPLearning.Entity.SubmitHistory;
import CPLearning.Entity.WeekInfo;

public interface ProfMapper {

	public List<StudentInfo> getStudentInfo();

	public int insertProblemInfo(ProblemInfo problemInfo);

	public List<ProblemInfo> getProfProblemInfo(ProblemInfo problemInfo);

	public List<SubmitHistory> getSubmitHistory(SubmitHistory submitHistory);
	
	public List<WeekInfo> getWeekInfo(WeekInfo weekInfo);

}
