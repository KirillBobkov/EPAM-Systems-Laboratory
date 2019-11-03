//subtask 2
(function() {
  secondTaskButton.addEventListener('click', validate);
})()

function validate() {
      var output = document.getElementById("secondTaskOutput"),
          string  = document.getElementById("secondTaskInput").value,
          expression = string.match(/[^\s\.\?\,\;\:\!]+/ig);

      if ( (string == null) || (expression == null) ) {
        output.innerHTML = string;
        return;
      }
      output.innerHTML = remover(expression, string);
}

function remover(expression, string) {
      var comparator = expression[0],
          state = false;

      for (var i = 0; i < comparator.length; i++) {   
        for (var j = 1; j < expression.length; j++) {   
          if ( expression[j].indexOf( comparator.charAt(i) ) == -1 ) {   
            state = false;                       
            break;                            
          }
          state = true;
        };
        
        if (!state) continue;
        
        var regularSymbol = new RegExp(comparator.charAt(i), 'gi');
        string = string.replace(regularSymbol, '');
      }
      return string;
}

