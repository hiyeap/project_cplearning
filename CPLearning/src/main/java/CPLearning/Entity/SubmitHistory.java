package CPLearning.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SubmitHistory {
	private String studentNo;
	private String problemType;
	private String problemNo;
	private String submitTime;
	private String submitCount;
	private String submitCont;
	private String dueMetYn;
	private String score;
	private String feedback;
}
