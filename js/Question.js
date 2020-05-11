let q = 0;
let lenght = 0;
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
          console.log("WYPELNILES ");
            window.location.href = "questionare_answer.html"+"?code="+code;
        }
        else if(data == false)
        {
          console.log("NIE WYPEŁNIŁES");
          window.location.href = "questionare.html"+"?code="+code;
        }
        else {
          console.log("Brak kodu nygusie!");
        }
      })
      .catch(function(err) {
      console.info(err + " url: " + url);
      });
  }
  else {
    console.log("Info o bledzie");
  }
}
function showQuestion(){
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
          console.log("end");
          showEnd();
        }
        else {
          updateQ(resp[q].titleQuestion, resp[q].answerA, resp[q].answerB, resp[q].answerC,resp[q].answerD);
          sessionStorage.setItem('question'+q,  resp[q].questionId);
          q++;
        }
      })
      .catch(function(err) {
      console.info(err + " url: " + url);
      });
  }
  else {
    console.log("Info o bledzie");
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
      sessionStorage.setItem('answer'+l, text);
      break;
    }
    else{
      	console.log("fałsz");
    }
  }

showQuestion();
}
function showEnd(){
  document.getElementById("question").innerHTML = "";
  document.getElementById("answer1").innerHTML = "";
  document.getElementById("answer2").innerHTML = "";
  document.getElementById("answer3").innerHTML = "";
  document.getElementById("answer4").innerHTML = "";
  var x = document.getElementsByClassName("custom-control-label");
  var i;
  for (i = 0; i < x.length; i++) {
      x[i].style.display = 'none';
  };
  var x = document.getElementById("next");
  x.innerHTML="Wyślij";
  x.setAttribute( "onClick", "endQ();" );

}
function endQ(){
  for(let i=0;i<=lenght;i++){
    console.log(sessionStorage.getItem("question"+i));
  }
  for(let i=1;i<=lenght;i++){
    console.log(sessionStorage.getItem("answer"+i));
  }
  sessionStorage.clear();

}
showQuestion();
