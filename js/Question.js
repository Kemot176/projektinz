let q = 0;
let lenght = 0;

function noBack()
{
    window.history.forward();
}

function getCode(){
  const urlParams = new URLSearchParams(window.location.search);
  const urlParam = urlParams.get('code');
  let evPar = parseInt(urlParam);
  return evPar;
}
function CheckCode(){
  const url = "http://mysql26.mydevil.net:7777/authorizationCode/getAuthorizationCode";
  const code = document.getElementById('QCode').value;
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
      .then(data => {
        if(data==true)
        {
          window.location.href = "questionare_answer.html"+"?code="+code;
        }
        else if(data == false)
        {
          window.location.replace ("questionare.html"+"?code="+code);
        }
        else {
          document.getElementById('warningInfoCode').innerHTML = "Podany kod dostępu nie istnieje";
        }
      })
      .catch(function(err) {
      console.info(err + " url: " + url);
      });
  }
  else{
    document.getElementById('warningInfoCode').innerHTML = "Pole nie może być puste";
  }
}

function showQuestion(){
  if(q==1)
  {
    const url = "http://mysql26.mydevil.net:7777/authorizationCode/getAuthorizationCode";
    let code = getCode();
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
        .then(data => {
          if(data==true)
          {
            endQ();
          }
        })
        .catch(function(err) {
        console.info(err + " url: " + url);
        });
    }
  }
  const url = "http://mysql26.mydevil.net:7777/question/getAllQuestionForQuestionnaire";
  let code = getCode();
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
        lenght = Object.keys(resp).length;
        if(q==lenght)
        {
          showEnd();

        }
        else {
          updateQ(resp[q].titleQuestion, resp[q].answerA, resp[q].answerB, resp[q].answerC,resp[q].answerD);
          sessionStorage.setItem('question',  resp[q].questionId);
          q++;

          let count = q;
          document.getElementById("CountQ").innerHTML="Pytanie: "+ count+" / "+ lenght;
        }
      })
      .catch(function(err) {
      console.info(err + " url: " + url);
      });
  }
  else {
    //window.location.href = "index.html";
  }
}

function updateQ(Question,answer1,answer2,answer3,answer4) {
  document.getElementById("question").innerHTML = Question;
  document.getElementById("answer1").innerHTML = answer1;
  document.getElementById("answer2").innerHTML = answer2;
  document.getElementById("answer3").innerHTML = answer3;
  document.getElementById("answer4").innerHTML = answer4;
  answer4 = document.getElementById("answer4").innerHTML;
  var p = document.createElement("jumbotron");
  document.body.appendChild(p);
}

function nextQ(){
  for(let l=1;l<5;l++){
    var x = document.getElementById("defaultGroupExample"+l).checked;
    var y = ('#answer'+l);
    if(x == true){
      var label = $(y);
      var text = label.text();
      sessionStorage.setItem('answer', text);
      break;
    }
  }
  //wysłanie odpowiedzi
  const url = "http://mysql26.mydevil.net:7777/userAnswer/addUserAnswer";
  let code = getCode();
  let Qid = sessionStorage.getItem('question');
  let Qanswer = sessionStorage.getItem('answer');
  const Qid_ = parseInt(Qid);
  var formData = new FormData();
  formData.append("answer", Qanswer);
  formData.append("questionId", Qid_);
  formData.append("authorizationCode", code)
  if(code)
  {
  fetch(url, { method: 'POST',   body : formData})
    .then(response => {
    })
    .catch(function(err) {
      console.info(err + " url: " + url);
    });
    showQuestion();
  }
}
function showEnd(){
  document.getElementById("question").innerHTML = "";
  document.getElementById("answer1").innerHTML = "";
  document.getElementById("answer2").innerHTML = "";
  document.getElementById("answer3").innerHTML = "";
  document.getElementById("answer4").innerHTML = "";
  document.getElementById("CountQ").innerHTML= " ";

  var x = document.getElementsByClassName("custom-control-label");
  var i;
  for (i = 0; i < x.length; i++) {
      x[i].style.display = 'none';
  };
  var x = document.getElementById("next");
  x.innerHTML="Wyślij";
  x.setAttribute( "onClick", "endQ();" );
  var z = document.getElementById("infoSuccess");
  document.getElementById("answers").style.display="table";
  showAnswers();
  z.innerHTML="Pomyślnie wypełniłeś ankiete, aby potwierdzić odpowiedzi naciśnij wyślij";
}

function endQ(){
  sessionStorage.clear();
  const url = "http://mysql26.mydevil.net:7777/authorizationCode/getEncryptedUserResponse";
  let code = getCode();
  const other_param = {
    headers : { "content-type" : "application/json"},
    body : code,
    method : "POST"
  };
  console.log(other_param);
  console.log(code);
  fetch(url,other_param)
    .then(resp => resp.text())
    .then(resp => {
        window.location.href = "confirmation.html"+"?auth="+resp;
    })
    .catch(function(err) {
      console.info(err);
  });
}
function createCode(){
    const url = "http://mysql26.mydevil.net:7777/token/createAndGetAuthorizationCode";
    const code = document.getElementById('TCode').value;
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
        .then(data => {
          if(!data.error)
          {
            document.getElementById("infoCode").innerHTML = data;
            var y = document.getElementById("showInfo");
            y.style.display ="block";
            scroll(0,0);
          }
          else {
            document.getElementById('warningInfoToken').innerHTML = "Niepoprawny bądź użyty token";
          }
        })
    }
    else {
        document.getElementById('warningInfoToken').innerHTML = "Pole nie może być puste";
    }
}
function showAnswers(){
  const url = "http://mysql26.mydevil.net:7777/userAnswer/getAllUserAnswerForQuestionnaire";
  const code = getCode();
  const other_param = {
    headers : { "content-type" : "application/json"},
    body : code,
    method : "POST"
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

          var newRow= document.getElementById('answers').insertRow();
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
showQuestion();
