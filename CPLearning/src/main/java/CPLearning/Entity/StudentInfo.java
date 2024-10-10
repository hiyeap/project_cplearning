package CPLearning.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentInfo {
	private String studentNo; // 학번
	private String password; // 패스워드
	private String name; // 학생명
	private String studentLevel; // 학생수준
	private String loginIP; // 로그인 IP
	private String loginTime; // 로그인 시간
	private String lastLoginTime; // 마지막 로그인 일시 
}
