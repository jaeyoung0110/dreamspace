import styles from '../asset/css/Header.module.css';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  return (
    <div className={styles.header}>
      <h1
        className={styles.header__title}
        onClick={() => {
          navigate('/');
        }}
      >
        꿈을 이루는 공간
      </h1>
      <div className={styles.navbar}>
        <button
          className={styles.navbar__btn}
          onClick={() => {
            navigate('/TimeTable');
          }}
        >
          시간표
        </button>
        <button
          className={styles.navbar__btn}
          onClick={() => {
            navigate('/EduJournal');
          }}
        >
          교사 일지
        </button>
        <button
          className={styles.navbar__btn}
          onClick={() => {
            navigate('/AttendanceManagement');
          }}
        >
          출결 관리
        </button>
        <button
          className={styles.navbar__btn}
          onClick={() => {
            navigate('/Admin');
          }}
        >
          관리자 페이지
        </button>
      </div>
      <div className={styles.header__utility}>
        <button className={styles.header__btnLogin}>login</button>
      </div>
    </div>
  );
}

export default Header;
