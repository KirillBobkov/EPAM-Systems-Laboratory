export function formatDate(date, formatter, monthNames) {
  var month = date.getMonth() + 1;
  var monthWithZero = month;
  if (month < 10) monthWithZero = "0" + month;

  var day = date.getDate();
  var dayWithZero = day;
  if (day < 10) dayWithZero = "0" + day;

  var minutes = date.getMinutes();
  var minutesWithZero = minutes;
  if (minutes < 10) minutesWithZero = "0" + minutes;

  var seconds = date.getSeconds();
  var secondsWithZero = seconds;
  if (seconds < 10) secondsWithZero = "0" + seconds;

  var hoursAllDay = date.getHours();
  var hoursAllDayWithZero = hoursAllDay;
  if (hoursAllDay < 10) hoursAllDayWithZero = "0" + hoursAllDay;

  var hoursTwelve = date.getHours();
  var hoursTwelveWithZero = hoursTwelve;

  if (hoursTwelve > 12) {
    hoursTwelve -= 12;
    if (hoursTwelve < 10) hoursTwelveWithZero = "0" + hoursTwelve + "PM";
    else hoursTwelveWithZero = hoursTwelve + "PM";
    hoursTwelve += "PM";
  } else if (hoursTwelve < 12) {
    hoursTwelve = date.getHours();
    if (hoursTwelve < 10) hoursTwelveWithZero = "0" + hoursTwelve + "AM";
    else hoursTwelveWithZero = hoursTwelve + "AM";
    hoursTwelve += "AM";
  }

  var matchMapper = {
    yy: date.getFullYear() % 100,
    yyyy: date.getFullYear(),
    M: month,
    MM: monthWithZero,
    MMM: null,
    MMMM: null,
    d: day,
    dd: dayWithZero,
    h: hoursTwelve,
    hh: hoursTwelveWithZero,
    H: hoursAllDay,
    HH: hoursAllDayWithZero,
    m: minutes,
    mm: minutesWithZero,
    s: seconds,
    ss: secondsWithZero
  };

  matchMapper["MMMM"] = monthNames[month - 1];
  matchMapper["MMM"] = monthNames[month - 1].slice(0, 3);

  var expression = formatter.replace(
    /[dhHms]{1,2}|[y]{2,4}|[M]{1,4}/gm,
    function(match) {
      return matchMapper[match] || match;
    }
  );

  return expression;
}

