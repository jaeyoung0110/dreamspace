import { useEffect, useState } from 'react';
import { useGetEduJournals } from '../stores/\bstore';
import styles from '../asset/css/Admin.module.css';
import { getDateInfo } from '../utils/date';

function Admin() {
  const getEduJournals = useGetEduJournals();
  const eduJournals = getEduJournals.data;
  useEffect(() => {
    getEduJournals.execute();
  }, []);
  const [selectedDate, setSelectedDate] = useState(getDateInfo());
  const [selectedEduJournals, setSelectedEduJournals] = useState(null);
  useEffect(() => {
    if (eduJournals) {
      setSelectedEduJournals(
        eduJournals.filter(
          (edujournal) =>
            edujournal.date.year == Number(selectedDate.year) &&
            edujournal.date.month == Number(selectedDate.month) &&
            edujournal.date.date == Number(selectedDate.date) &&
            edujournal.date.day == selectedDate.korDay,
        ),
      );
    }
  }, [eduJournals, selectedDate]);

  const [selectedTeacher, setSelectedTeacher] = useState(null);
  useEffect(() => {
    if (selectedEduJournals && selectedEduJournals.length > 0) {
      setSelectedTeacher(selectedEduJournals[0]);
    } else {
      setSelectedTeacher(null);
    }
  }, [selectedEduJournals]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.teachersTab}>
            {selectedTeacher
              ? selectedEduJournals.map((edujournal) => {
                  return (
                    <button
                      className={selectedTeacher.name === edujournal.name ? styles.active : styles.inactive}
                      onClick={() => setSelectedTeacher(edujournal)}
                    >
                      {edujournal.name}
                    </button>
                  );
                })
              : null}
          </div>
          <input
            className={styles.selectDate}
            type="date"
            value={selectedDate.fullDate}
            onChange={(e) => setSelectedDate(getDateInfo(e.target.value))}
          />
        </div>
        <div className={styles.journal}>
          {selectedTeacher ? (
            <>
              <div className={styles.journal__header}>
                <div className={styles.journal__date}>
                  <div>날짜</div>
                  <div>{selectedDate.fullKorDate}</div>
                </div>
                <div className={styles.journal__name}>
                  <div>과목명 / 이름</div>
                  <div>{`${selectedTeacher.name} / ${selectedTeacher.subject}`}</div>
                </div>
                <div className={styles.journal__workHour}>
                  <div>출 / 퇴근 시간</div>
                  <div>{`${selectedTeacher.punchIn} / ${selectedTeacher.punchOut}`}</div>
                </div>
              </div>
              <div className={styles.journal__main}>
                <table>
                  <thead>
                    <tr>
                      <th>교시</th>
                      <th>반</th>
                      <th>시간</th>
                      <th>수업내용</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedTeacher.main.map((data) => {
                      return (
                        <tr>
                          <td>{data.period}</td>
                          <td>{data.class}</td>
                          <td>{data.time}</td>
                          <td>{data.content}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className={styles.journal__footer}>
                <div className={styles.journal__details}>
                  <div>추가사항</div>
                  <div>{selectedTeacher.details}</div>
                </div>
              </div>
            </>
          ) : (
            <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
              해당 일에 작성된 일지가 없습니다.
            </span>
          )}
        </div>
      </div>
    </>
  );
}

export default Admin;
