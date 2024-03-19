import styles from '../asset/css/TimeTable.module.css';
import { useEffect, useState } from 'react';
import { useGetClasses, useGetTeachers } from '../stores/\bstore';
import { getDayInfo, getEndTime } from '../utils/date';

function TimeTable() {
  const getTeachers = useGetTeachers(); // 바로 적용됨
  const getClasses = useGetClasses(); // 바로 적용됨
  const teachers = getTeachers.data;
  const classes = getClasses.data;
  useEffect(() => {
    getTeachers.execute();
    getClasses.execute();
  }, []);

  const [timeTableData, setTimeTableData] = useState(null);
  const dayInfo = getDayInfo();
  const [selectedDay, setSelectedDay] = useState(dayInfo.engDay);
  const classTime = {
    start: [
      '9:00',
      '11:00',
      '11:40',
      '12:20',
      '13:00',
      '13:40',
      '14:20',
      '15:00',
      '15:40',
      '16:20',
      '17:00',
      '17:40',
      '18:25',
      '19:10',
      '19:55',
      '20:40',
      '21:20',
    ],
    end: [
      '11:00',
      '11:40',
      '12:20',
      '13:00',
      '13:40',
      '14:20',
      '15:00',
      '15:40',
      '16:20',
      '17:00',
      '17:40',
      '18:20',
      '19:05',
      '19:50',
      '20:35',
      '21:20',
      '22:00',
    ],
  };

  useEffect(() => {
    if (teachers && classes) {
      const initialTimetableData = {};
      dayInfo.days.eng.forEach((day) => {
        initialTimetableData[day] = {};
        classTime.start.forEach((time) => {
          initialTimetableData[day][time] = {};
          Object.values(classes).forEach((level) => {
            level.forEach((course) => {
              initialTimetableData[day][time][course.name] = '';
            });
          });
        });
      });

      teachers.forEach((teacher) => {
        const subject = teacher.subject;
        Object.entries(teacher.weektimetable).forEach((data) => {
          const days = data[0];
          data[1].forEach((data2) => {
            if (data2.class === '고2과') {
              initialTimetableData[days][data2.time]['고2A'] = subject;
              initialTimetableData[days][data2.time]['고2B'] = subject;
              initialTimetableData[days][data2.time]['고2C'] = subject;
            } else {
              initialTimetableData[days][data2.time][data2.class] = subject;
            }
          });
        });
      });

      setTimeTableData(initialTimetableData);
    }
  }, [teachers, classes]);
  return (
    <>
      {timeTableData && classes && teachers ? (
        <div>
          <div className={styles.dayTab}>
            {dayInfo.days.eng.map((day, idx) => {
              return (
                <button
                  className={`${styles.dayTab__btn} ${selectedDay === day ? styles.active : ''}`}
                  onClick={() => setSelectedDay(day)}
                  key={idx}
                >
                  {getDayInfo(day).shortEngDay}
                </button>
              );
            })}
          </div>
          <table className={styles.timeTable}>
            <thead>
              <tr>
                <th rowSpan={3}>{getDayInfo(selectedDay).shortEngDay}</th>
                <th>반</th>
                {Object.keys(classes).map((data) => {
                  return classes[data].map((data, idx) => {
                    return <th key={idx}>{data.name}</th>;
                  });
                })}
              </tr>
              <tr>
                <th>학급</th>
                {Object.keys(classes).map((data) => {
                  return classes[data].map((data, idx) => {
                    return <th key={idx}>{data.school.map((item) => item[0]).join('/')}</th>;
                  });
                })}
              </tr>
              <tr>
                <th>담당</th>
                {Object.keys(classes).map((data) => {
                  return classes[data].map((data, idx) => {
                    return <th key={idx}>{data.teacher.join('/')}</th>;
                  });
                })}
              </tr>
            </thead>
            <tbody>
              {timeTableData[selectedDay] !== undefined && Object.keys(timeTableData[selectedDay]['9:00']).length !== 0
                ? Object.keys(timeTableData[selectedDay]).map((data, idx) => {
                    return (
                      <tr key={idx}>
                        <th colSpan={2}>{`${data} ~ ${getEndTime(data)}`}</th>
                        {Object.values(timeTableData[selectedDay][data]).map((data, idx) => {
                          return <td key={idx}>{data}</td>;
                        })}
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </table>
        </div>
      ) : null}
    </>
  );
}

export default TimeTable;
