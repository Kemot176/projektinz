function getCode(){
  const urlParams = new URLSearchParams(window.location.search);
  const urlParam = urlParams.get('code');
  let evPar = parseInt(urlParam);
  return evPar;
}

function showAnswers(){
  const url = "http://mysql26.mydevil.net:7777/userAnswer/getAllUserAnswerForQuestionnaire";
  const code = getCode();
  const other_param = {
    headers : { "content-type" : "application/json"},
    body : code,
    method : "POST",
    mode : "cors"
  };
  if(code)
  {
    fetch(url,other_param)
      .then(resp => resp.json())
      .then(resp => {
        var lenght = Object.keys(resp).length;
        for(let i = 0; i< resp.length; i++) {
          var Name = resp[i].questio;
          var Answer = resp[i].userAnswerLong;

          var newRow= document.getElementById('myTableAnswer').insertRow();
          var cell1   = newRow.insertCell(0);
          var cell1Text  = document.createTextNode(Name)
          cell1.appendChild(cell1Text);

          var cell2   = newRow.insertCell(1);
          var cell2Text  = document.createTextNode(Answer)
          cell2.appendChild(cell2Text);
        }
      })
      .catch(function(err) {
      console.info(err + " url: " + url);
      });
  }
}
showAnswers();
