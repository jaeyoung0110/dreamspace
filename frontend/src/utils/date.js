export function getDateInfo(param) {
  let date = new Date();
  if (param) {
    date = new Date(param);
  }
  const korDays = ['일', '월', '화', '수', '목', '금', '토', '일'];
  const engDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const shortEngDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let formmattedYear = String(date.getFullYear());
  let formmattedMonth = String(date.getMonth() + 1);
  let formmattedDate = String(date.getDate());
  let formmattedKorDay = korDays[date.getDay()];
  let formmattedEngDay = engDays[date.getDay()];
  let formmattedShortEngDay = shortEngDays[date.getDay()];

  if (formmattedMonth < 10) {
    formmattedMonth = '0' + formmattedMonth;
  }
  if (formmattedDate < 10) {
    formmattedDate = '0' + formmattedDate;
  }
  return {
    fullDate: `${formmattedYear}-${formmattedMonth}-${formmattedDate}`,
    fullKorDate: `${formmattedYear}년 ${formmattedMonth}월 ${formmattedDate}일 ${formmattedKorDay}요일`,
    year: formmattedYear,
    month: formmattedMonth,
    date: formmattedDate,
    korDay: formmattedKorDay,
    engDay: formmattedEngDay,
    shortEngDay: formmattedShortEngDay,
  };
}

export function getDayInfo(param) {
  let day = new Date().getDay();
  const korDays = ['일', '월', '화', '수', '목', '금', '토', '일'];
  const engDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const shortEngDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  if (param) {
    if (day.length === 1) {
      day = korDays.indexOf(param);
    } else if (day.length === 3) {
      day = shortEngDays.indexOf(param);
    } else {
      day = engDays.indexOf(param);
    }
  }

  return {
    days: {
      kor: ['일', '월', '화', '수', '목', '금', '토', '일'],
      eng: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
      shortEng: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    },
    korDay: korDays[day],
    engDay: engDays[day],
    shortEngDay: shortEngDays[day],
  };
}

export function getEndTime(startTime) {
  if (!startTime) {
    return null;
  } else if (startTime === '9:00') {
    return '11:00';
  }
  let [hour, minute] = startTime.split(':');
  hour = Number(hour);
  minute = Number(minute) + 40;
  if (minute >= 60) {
    minute -= 60;
    hour += 1;
  }
  if (hour < 10) {
    hour = '0' + hour;
  }
  if (minute < 10) {
    minute = '0' + minute;
  }
  return `${hour}:${minute}`;
}
