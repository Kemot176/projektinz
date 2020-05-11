function addUrl(url){
  window.location.href = url;
}
function doTheInsert() {
  fetch("http://mysql26.mydevil.net:7777/questionnaire/getAllQuestionnaire")
    .then(resp => resp.json())
    .then(resp => {
      var LP = 1;
      var Qid = 0;
      for(let i = 0; i< resp.length; i++) {
        var Name = resp[i].questionnaireName;
        Qid = resp[i].questionnaireId;
        var newRow=document.getElementById('myTable').insertRow();
        var cell1   = newRow.insertCell(0);
        var cell1Text  = document.createTextNode(LP)
        LP=LP+1;
        cell1.appendChild(cell1Text);

        var cell2   = newRow.insertCell(1);
        var cell2Text  = document.createTextNode(Name)
        cell2.appendChild(cell2Text);

        var cell_btn  = newRow.insertCell(2);
        var input = document.createElement("input");
        input.setAttribute('type', 'button');
        input.setAttribute('class', 'mx-auto btn btn-secondary fill m-0 px-5');
        input.setAttribute('value', 'Więcej');
        input.setAttribute('type', 'submit');
        input.setAttribute('id', Qid);
        cell_btn.appendChild(input);

        $('.btn').click(function(e){
            e.preventDefault();
            var idq =this.id;
            addUrl("details.html"+"?question="+idq)
        });
      }
    })
    .catch(error=>{console.log(error.message)})
}
doTheInsert();

function createNewQ(){
  const url = "http://mysql26.mydevil.net:7777/questionnaire/AddQuestionnaire";
  const form = document.getElementById('QFormAdd');
  var name = form.QName.value;
    if (name)
    {
      const other_params = {
        headers : { "content-type" : "application/json"},
        body : name,
        method : "POST",
        mode : "cors"
      };
      fetch(url, other_params)
          .then(resp => resp.json())
          .then(data=>{
          })
          .catch(error=>{
          console.log(error.message);
          window.location.href = "admin.html";
          })
          return false
    }

}
