package CPLearning.Mapper;

import java.util.List;

import CPLearning.Entity.ApiKeyInfo;
import CPLearning.Entity.ProblemInfo;
import CPLearning.Entity.StudentInfo;
import CPLearning.Entity.SubmitHistory;

public interface StudentMapper {

	public List<ProblemInfo> getProblemType();

	public List<ProblemInfo> getProblemList(ProblemInfo problemInfo);

	public ProblemInfo getProblemInfo(ProblemInfo problemInfo);
	
	public int insertSubmitHistory(SubmitHistory submitHistory);
	
	public int getSubmitCount(SubmitHistory submitHistory);

	public List<SubmitHistory> getMySubmitHistory(SubmitHistory submitHistory);
}
