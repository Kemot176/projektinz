function doTheInsert() {
  fetch("http://mysql26.mydevil.net:7777/questionnaire/getAllQuestionnaire")
    .then(resp => resp.json())
    .then(resp => {
      for(let i = 0; i< resp.length; i++) {
        var LP = resp[i].questionnaireId;
        var Name = resp[i].questionnaireName;

        var newRow=document.getElementById('myTable').insertRow();
          // Insert a cell in the row at cell index 0
        var cell1   = newRow.insertCell(0);
        // Append a text node to the cell
        var cell1Text  = document.createTextNode(LP)
        cell1.appendChild(cell1Text);
        // Insert a cell in the row at cell index 1
        var cell2   = newRow.insertCell(1);
        // Append a text node to the cell
        var cell2Text  = document.createTextNode(Name)
        cell2.appendChild(cell2Text);
        var cell_btn  = newRow.insertCell(2);
        var input = document.createElement("input");
        input.type = "button";
        input.className = "mx-auto btn btn-secondary m-0 px-5";
        input.value = "Więcej";
        cell_btn.appendChild(input);
      }
    })
    .catch(error=>{console.log(error.message)})
}
doTheInsert();

function createNewQ(){
  const url = "http://mysql26.mydevil.net:7777/questionnaire/AddQuestionnaire";
  const form = document.getElementById('QForm');
  var name = form.QName.value;
    if (name) {
    const other_params = {
      headers : { "content-type" : "application/json"},
      body : name,
      method : "POST",
      mode : "cors"
    };

    fetch(url, other_params)
        .then(resp => resp.json())
        .then(data=>{
            window.location.href = "admin.html";
        })
        .catch(error=>{
        console.log(error.message);
        })
        return false
    }
    else {
      
    }
}
