function addUrl(url){
  window.location.href = url;
}
function getName(){
  const urlParams = new URLSearchParams(window.location.search);
  const urlParam = urlParams.get('question');
  let evPar = parseInt(urlParam);
  fetch("http://mysql26.mydevil.net:7777/questionnaire/getAllQuestionnaire")
    .then(resp => resp.json())
    .then(resp => {
    for(let i = 0; i< resp.length; i++) {
        if(resp[i].questionnaireId == evPar){
          var Name = resp[i].questionnaireName;
          document.getElementById('QrName').innerHTML = Name;
        }
      }
    })
}
function createURL(){
  const urlParams = new URLSearchParams(window.location.search);
  const urlParam = urlParams.get('question');
  const url = ("detailsmore.html"+"?question="+urlParam)
  window.location.href = url;
}
function createURLB(){
  const urlParams = new URLSearchParams(window.location.search);
  const urlParam = urlParams.get('question');
  const url = ("details.html"+"?question="+urlParam)
  window.location.href = url;
}
function createToken() {
  event.preventDefault();
  const url = "http://mysql26.mydevil.net:7777/token/createTokenForQuestionnaire";
  const urlParams = new URLSearchParams(window.location.search);
  const urlParam = urlParams.get('question');
  let evPar = parseInt(urlParam);
  const quantity =  document.getElementById('Token_Q').value;

  let formData = new FormData();
  formData.append('questionnaireId', evPar);
  formData.append('quantity', quantity-1);
  if(quantity&&evPar>0)
  {
    fetch(url, { method: 'POST',   body : formData})
        .then(response => {
            document.getElementById('successInfo').innerHTML = "Poprawnie wygenerowano "+quantity+" tokenów.";
            document.getElementById('warningInfo').innerHTML = "";
            setTimeout(function(){
                window.location.href = "admin.html";
             }, 1000);
        })
          .catch(function(err) {
          console.info(err + " url: " + url);
      });
  }
  else {
      document.getElementById('successInfo').innerHTML = "";
      document.getElementById('warningInfo').innerHTML = "Pole nie może być puste!";
  }
}
function createCode() {
  event.preventDefault();
  const url = "http://mysql26.mydevil.net:7777/authorizationCode/createQuantityOfAuthorizationCodeForQuestionnaire";
  const urlParams = new URLSearchParams(window.location.search);
  const urlParam = urlParams.get('question');
  let evPar = parseInt(urlParam);
  const quantity =  document.getElementById('Code_Q').value;

  let formData = new FormData();
  formData.append('questionnaireId', evPar);
  formData.append('quantity', quantity-1);
  if(quantity&&evPar>0)
  {
    fetch(url, { method: 'POST',   body : formData})
        .then(response => {
            document.getElementById('successInfoC').innerHTML = "Poprawnie wygenerowano "+quantity+" kodów.";
            document.getElementById('warningInfoC').innerHTML = "";
            setTimeout(function(){
                window.location.href = "admin.html";
             }, 1000);
        })
        .catch(function(err) {
            console.info(err + " url: " + url);

      });
  }
  else {
      document.getElementById('successInfoC').innerHTML = "";
      document.getElementById('warningInfoC').innerHTML = "Pole nie może być puste!";
  }
}
//Dodawanie pytań
function AddQ() {
    const url = "http://mysql26.mydevil.net:7777/question/createQuestionForQuestionnaire";
    const urlParams = new URLSearchParams(window.location.search);
    const urlParam = urlParams.get('question');
    let evPar = parseInt(urlParam);
    const form = document.getElementById('addForm');
    const data = {
    'titleQuestion': form.form_q1.value,
    'answerA': form.form_q2.value,
    'answerB': form.form_q3.value,
    'answerC': form.form_q4.value,
    'answerD': form.form_q5.value,
    'answerLong': '',
    'questionnaire':{ 'questionnaireId' :  evPar}
    };
    const other_params = {
      headers : { "content-type" : "application/json"},
      body : JSON.stringify(data),
      method : "POST"
    };
    fetch(url,other_params)
      .then(resp => resp.json())
      .then(data=>{
      })
      .catch(error=>{
        console.log(error.message);
      })
      return false
}
//Wyswietlanie pytań
function ShowQ() {
    const url = "http://mysql26.mydevil.net:7777/questionnaire/getAllQuestionnaire";
    fetch(url)
      .then(resp => resp.json())
      .then(data=>{
        console.log(data);
      })
      .catch(error=>{
        console.log(error.message);
      })
      return false
}
//WYŚWIETLANIE TOKENOW
function doTheInsert() {
  const url = "http://mysql26.mydevil.net:7777/token/getAllTokensForQuestionnaire";
  const urlParams1 = new URLSearchParams(window.location.search);
  const urlParam1 = urlParams1.get('question');
  let params = parseInt(urlParam1);
  const other_param = {
    headers : { "content-type" : "application/json"},
    body : params,
    method : "POST",
    mode : "cors"
  };
  if(params)
  {
    fetch(url,other_param)
        .then(resp => resp.json())
        .then(data => {
            var id = 1;
            for(let i = 0; i< data.length; i++) {
                var Name = data[i].tokenCode;
                var Used = data[i].used;
                var newRow=document.getElementById('QTable').insertRow();

                var cell1   = newRow.insertCell(0);
                var cell1Text  = document.createTextNode(id)
                id++;
                cell1.appendChild(cell1Text);

                var cell2   = newRow.insertCell(1);
                var cell2Text  = document.createTextNode(Name)
                cell2.appendChild(cell2Text);

                var cell3   = newRow.insertCell(2);
                if(Used==false){
                  var input = document.createElement("a");
                  input.setAttribute('class', 'fas fa-times fa-2x');
                  input.setAttribute('href', '');
                }
                else {
                  var input = document.createElement("a");
                  input.setAttribute('class', 'click fas fa-check fa-2x');
                  input.setAttribute('href', '');

                }
                cell3.appendChild(input);

            }
        })
        .catch(function(err) {
            console.info(err + " url: " + url);
      });

  }
}
//WYŚWIETLANIE KODOW
function doTheInsertCode() {
  const url = "http://mysql26.mydevil.net:7777/authorizationCode/getAllAuthorizationCodesForQuestionnaire";
  const urlParams = new URLSearchParams(window.location.search);
  const urlParam = urlParams.get('question');
  let evPar = parseInt(urlParam);
  const other_params = {
    headers : { "content-type" : "application/json"},
    body : evPar,
    method : "POST",
    mode : "cors"
  };
  if(evPar>0)
  {
    fetch(url,other_params)
        .then(resp => resp.json())
        .then(data => {
            var id = 1;
            for(let i = 0; i< data.length; i++) {
                var Name = data[i].authorizationCode;
                var Used = data[i].used;
                var newRow=document.getElementById('QTableCode').insertRow();

                var cell1   = newRow.insertCell(0);
                var cell1Text  = document.createTextNode(id)
                id++;
                cell1.appendChild(cell1Text);

                var cell2   = newRow.insertCell(1);
                var cell2Text  = document.createTextNode(Name)
                cell2.appendChild(cell2Text);

                var cell3   = newRow.insertCell(2);
                if(Used==false){
                  var input = document.createElement("a");
                  input.setAttribute('class', 'fas fa-times fa-2x');
                  input.setAttribute('href', '');
                }
                else {
                  var input = document.createElement("a");
                  input.setAttribute('class', 'click fas fa-check fa-2x');
                  input.setAttribute('href', "questionare_answer.html"+"?code="+Name);

                }
                cell3.appendChild(input);

            }
        })
        .catch(function(err) {
        console.info(err + " url: " + url);
      });
  }
}
doTheInsert();
doTheInsertCode();
getName();
