import styles from '../asset/css/EduJournal.module.css';
import { useEffect, useState } from 'react';
import { useGetTeachers } from '../stores/\bstore';
import { getDateInfo, getEndTime } from '../utils/date';

function EduJournal() {
  const getTeachers = useGetTeachers();
  const teachers = getTeachers.data;
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [showModal, setShowModal] = useState(false);
  function setTeacher(name) {
    const teacher = teachers.find((teacher) => teacher.name === name);
    setSelectedTeacher(teacher);
  }
  useEffect(() => {
    getTeachers.execute();
  }, []);

  const todayInfo = getDateInfo();

  function handleSubmit(e) {
    e.preventDefault();
    setShowModal(true);
  }
  function handleConfirmSubmit() {
    document.forms['journal'].submit();
    setShowModal(false);
  }
  function handleCancelSubmit() {
    setShowModal(false);
  }

  return (
    <div>
      {teachers ? (
        <form
          className={styles.journal}
          method="post"
          name="journal"
          action="http://localhost:8080/journal"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className={styles.journal__header}>
            <div className={styles.journal__date}>
              <div>날짜</div>
              <input type="text" name="date" readOnly defaultValue={todayInfo.fullKorDate} />
            </div>
            <div className={styles.journal__name}>
              <div>과목명 / 이름</div>
              <select
                name="name_subject"
                defaultValue={'DEFAULT'}
                onChange={(e) => setTeacher(e.target.value.split('_')[0])}
              >
                <option value="DEFAULT" hidden>
                  선택해주세요
                </option>
                {teachers.map((teacher, idx) => {
                  return (
                    <option
                      value={`${teacher.name}_${teacher.subject}`}
                      key={idx}
                    >{`${teacher.name} / ${teacher.subject}`}</option>
                  );
                })}
              </select>
            </div>
            <div className={styles.journal__workHour}>
              <div>출 / 퇴근 시간</div>
              {selectedTeacher === null || selectedTeacher.weektimetable[todayInfo.engDay] === undefined ? (
                <div>
                  <input name="punchIn" required defaultValue="" type="time" />
                  <input name="punchOut" required defaultValue="" type="time" />
                </div>
              ) : (
                <div>
                  <input
                    name="punchIn"
                    readOnly
                    defaultValue={selectedTeacher.weektimetable[todayInfo.engDay][0].time}
                    type="time"
                  />
                  <input
                    name="punchOut"
                    readOnly
                    defaultValue={getEndTime(selectedTeacher.weektimetable[todayInfo.engDay].at(-1).time)}
                    type="time"
                  />
                </div>
              )}
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
                {selectedTeacher === null ? (
                  <tr>
                    <th colSpan={4}>선생님을 선택해주세요</th>
                  </tr>
                ) : selectedTeacher.weektimetable[todayInfo.engDay] === undefined ? (
                  <tr>
                    <th colSpan={4}>해당 선생님의 금일 수업은 없습니다.</th>
                  </tr>
                ) : (
                  selectedTeacher.weektimetable[todayInfo.engDay].map((data, idx) => {
                    return (
                      <tr key={idx}>
                        <td>
                          <input name="main_period" type="text" readOnly defaultValue={`${idx + 1}교시`} />
                        </td>
                        <td>
                          <input name="main_class" type="text" readOnly defaultValue={data.class} />
                        </td>
                        <td>
                          <input
                            name="main_time"
                            type="text"
                            readOnly
                            defaultValue={`${data.time} ~ ${getEndTime(data.time)}`}
                          />
                        </td>
                        <td>
                          <textarea name="main_content" rows={3}></textarea>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          <div className={styles.journal__footer}>
            <div className={styles.journal__details}>
              <div>추가사항</div>
              <textarea name="details" cols="30" rows="10"></textarea>
            </div>
            {selectedTeacher === null || selectedTeacher.weektimetable[todayInfo.engDay] === undefined ? (
              <input className={styles.journal__btnSubmit} disabled type="submit" defaultValue={'일지제출하기'} />
            ) : (
              <input className={styles.journal__btnSubmit} type="submit" defaultValue={'일지제출하기'} />
            )}
          </div>
        </form>
      ) : null}
      {showModal ? (
        <div className={styles.modal}>
          <div className={styles.modal__content}>
            <p>일지를 제출하시겠습니까?</p>
            <div className={styles.modal__btnContainer}>
              <button className={styles.modal__btn} onClick={handleConfirmSubmit}>
                제출
              </button>
              <button className={styles.modal__btn} onClick={handleCancelSubmit}>
                취소
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default EduJournal;
