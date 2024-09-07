package CPLearning.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProblemInfo {
	private String week;
	private String problemNo;
	private String problemType;
	private String problemLevel;
	private String problemCont;
	private String problemCode;
	private String answerCode;
	private String testCase;
	private String hint;
	private String dueDate;
	private String feedbackYn;
	private String feedbackDate;
	private String useYn;

}