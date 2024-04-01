import styles from '../asset/css/AttendanceManagement.module.css';

function AttendanceManagement() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.classTab}>
          <button className={styles.active}>초3</button>
          <button className={styles.inactive}>초4</button>
          <button className={styles.inactive}>초6</button>
          <button className={styles.inactive}>초5</button>
          <button className={styles.inactive}>중1A</button>
          <button className={styles.inactive}>중1A</button>
          <button className={styles.inactive}>중1A</button>
          <button className={styles.inactive}>중1A</button>
          <button className={styles.inactive}>중1A</button>
          <button className={styles.inactive}>중1A</button>
          <button className={styles.inactive}>고1A</button>
          <button className={styles.inactive}>고1A</button>
          <button className={styles.inactive}>고1A</button>
          <button className={styles.inactive}>고1A</button>
          <button className={styles.inactive}>고1A</button>
          <button className={styles.inactive}>고1A</button>
          <button className={styles.inactive}>고1A</button>
        </div>
      </div>
      <table className={styles.attendance}>
        <thead className="">
          <tr>
            <th>이름</th>
            <th>HP</th>
            {/* 그 주 요일  */}
            <th>3/18 월</th>
            <th>3/18 화</th>
            <th>3/18 수</th>
            <th>3/18 목</th>
            <th>3/18 금</th>
            <th>3/18 토</th>
            <th>3/18 일</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>name1</th>
            <th>010-1234-5678</th>
            <td>정상출석</td>
            <td>지각-늦잠</td>
            <td>결석-아픔</td>
            <td>조퇴</td>
            <td>지각-방과후</td>
            <td>정상출석</td>
            <td>정상출석</td>
          </tr>
          <tr>
            <th>name2</th>
            <th>010-1234-5678</th>
            <td>정상출석</td>
            <td>지각-늦잠</td>
            <td>결석-아픔</td>
            <td>조퇴</td>
            <td>지각-방과후</td>
            <td>정상출석</td>
            <td>정상출석</td>
          </tr>
          <tr>
            <th>name3</th>
            <th>010-1234-5678</th>
            <td>정상출석</td>
            <td>지각-늦잠</td>
            <td>결석-아픔</td>
            <td>조퇴</td>
            <td>지각-방과후</td>
            <td>정상출석</td>
            <td>정상출석</td>
          </tr>
          <tr>
            <th>name4</th>
            <th>010-1234-5678</th>
            <td>정상출석</td>
            <td>지각-늦잠</td>
            <td>결석-아픔</td>
            <td>조퇴</td>
            <td>지각-방과후</td>
            <td>정상출석</td>
            <td>정상출석</td>
          </tr>
          <tr>
            <th>name1</th>
            <th>010-1234-5678</th>
            <td>정상출석</td>
            <td>지각-늦잠</td>
            <td>결석-아픔</td>
            <td>조퇴</td>
            <td>지각-방과후</td>
            <td>정상출석</td>
            <td>정상출석</td>
          </tr>
          <tr>
            <th>name1</th>
            <th>010-1234-5678</th>
            <td>정상출석</td>
            <td>지각-늦잠</td>
            <td>결석-아픔</td>
            <td>조퇴</td>
            <td>지각-방과후</td>
            <td>정상출석</td>
            <td>정상출석</td>
          </tr>
          <tr>
            <th>name1</th>
            <th>010-1234-5678</th>
            <td>정상출석</td>
            <td>지각-늦잠</td>
            <td>결석-아픔</td>
            <td>조퇴</td>
            <td>지각-방과후</td>
            <td>정상출석</td>
            <td>정상출석</td>
          </tr>
          <tr>
            <th>name1</th>
            <th>010-1234-5678</th>
            <td>정상출석</td>
            <td>지각-늦잠</td>
            <td>결석-아픔</td>
            <td>조퇴</td>
            <td>지각-방과후</td>
            <td>정상출석</td>
            <td>정상출석</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AttendanceManagement;
