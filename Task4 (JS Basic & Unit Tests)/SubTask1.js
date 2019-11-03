//subtask 1
(function() {
  firstTaskButton.addEventListener('click', validator);
})();

function validator() {
  var output = document.getElementById("firstTaskOutput"),
      input = document.getElementById("firstTaskInput"),
      expression = input.value.match(/\-?\d+(\.\d+)?|[\+\-\*\/\=]{1}/ig),
      validNums =  input.value.match(/(\d+(\.\d+)?[^\+\-\*\/\d\.]+(\d|\.))|(\d+\.\d+\.)|(\d+\.[^\+\-\*\/\d\.]+)/g),
      validEqual = input.value.match(/\=/g),
      result;

      if ( (input.value == '') ) {
        output.innerHTML = "String is empty.";
        return;
      } else 
      if (!validEqual) {
        output.innerHTML = "String is invalid. Add '='";
        return;
      } else 
      if (expression[expression.length-1] !== "=") {
        output.innerHTML = "String is invalid. Add '=' to the end of string";
        return;
      } else 
      if (validEqual.length > 1) {
        output.innerHTML = "String is invalid. Delete extra '='";
        return;
      } else 
      if (validNums !== null) {
        output.innerHTML = "String is invalid. Delete extra numbers or points";
        return;
      } else 
        result = counting(expression);
      if ( isNaN(result) ) {
        output.innerHTML = "String is invalid. Not a number";
        return;
      } else { 
        output.innerHTML = result; 
      }
}

function counting(expression) {
  var sum = +expression[0];

  for (var i = 1; i < expression.length; i++) {
      switch (expression[i]) {
        case "-": {
          sum -= +expression[i+1];
          break;
        }
            
        case "+": {
          sum += +expression[i+1];
          break;
        }
              
        case "/": {
          if (+expression[i+1] !== 0) {
            sum /= +expression[i+1];
          } else {
            sum = Infinity;
            }
          break;
        }
              
        case "*": {
          sum *= +expression[i+1];
          break;
        }
      }
  }
  return sum.toFixed(2);
}
