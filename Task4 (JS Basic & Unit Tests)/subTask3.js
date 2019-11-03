
(function() {
  thirdTaskButton.addEventListener('click', performFormatting);
})();

function performFormatting() {
  var formatter = document.getElementById('formatter').value;   //this function get data and push result
  thirdTaskOutput.innerHTML = chooseData(formatter);
}

function chooseData(formatter) {
  var date = new Date();
  
    if (rus.checked) { 
      var monthNames = [
        "Январь", 
        "Февраль", 
        "Март", 
        "Апрель", 
        "Май", 
        "Июнь", 
        "Июль", 
        "Август", 
        "Сентябрь", 
        "Октябрь", 
        "Ноябрь", 
        "Декабрь"
        ];
    }
  return formatDate(date, formatter, monthNames);
}

Date.prototype.format = formatDate;

function formatDate(date, formatter, monthNames) {

  monthNames = typeof(monthNames) !== 'undefined' ? monthNames : [
    "January", 
    "February", 
    "March", 
    "April", 
    "May", 
    "June",
    "July", 
    "August", 
    "September", 
    "October", 
    "November", 
    "December"
    ]; ;

  var month = monthWithZero = date.getMonth() + 1;
  if (month < 10) monthWithZero = '0' + month;

  var day = dayWithZero = date.getDate();
  if (day < 10) dayWithZero = '0' + day;

  var minutes = minutesWithZero = date.getMinutes();
  if (minutes < 10) minutesWithZero = '0' + minutes;
 
  var seconds = secondsWithZero = date.getSeconds();
  if (seconds < 10) secondsWithZero = '0' + seconds;

  var hoursAllDay = hoursAllDayWithZero = date.getHours();
  if (hoursAllDay < 10) hoursAllDayWithZero = '0' + hoursAllDay;

  var hoursTwelve = hoursTwelveWithZero = date.getHours();
  if (hoursTwelve > 12) {
    hoursTwelve -= 12;
    if (hoursTwelve < 10) hoursTwelveWithZero = '0' + hoursTwelve + 'PM'
    else hoursTwelveWithZero = hoursTwelve + 'PM';
    hoursTwelve += 'PM';
  } else if (hoursTwelve < 12) {
    hoursTwelve = date.getHours();
      if (hoursTwelve < 10) hoursTwelveWithZero = '0' + hoursTwelve + 'AM'
      else hoursTwelveWithZero = hoursTwelve + 'AM'
      hoursTwelve += 'AM';
  }

  var matchMapper = {
    "yy": date.getFullYear() % 100,
    "yyyy": date.getFullYear(),
    "M" : month,
    "MM" : monthWithZero,
    "MMM": null,
    "MMMM": null,
    "d": day,
    "dd": dayWithZero,
    "h": hoursTwelve,
    "hh": hoursTwelveWithZero,
    "H": hoursAllDay,
    "HH": hoursAllDayWithZero,
    "m": minutes,
    "mm": minutesWithZero,
    "s": seconds,
    "ss": secondsWithZero
  };

  matchMapper["MMMM"] = monthNames[month-1];
  matchMapper["MMM"] = monthNames[month-1].slice(0,3);

  var expression = formatter.replace(/[dhHms]{1,2}|[y]{2,4}|[M]{1,4}/gm, function(match) {
    return matchMapper[match] || match
  });

  return expression;
}

