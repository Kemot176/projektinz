function doTheInsert() {
  var newRow=document.getElementById('myTable').insertRow();
    // Insert a cell in the row at cell index 0
  var cell1   = newRow.insertCell(0);

  // Append a text node to the cell
  var cell1Text  = document.createTextNode('1')
  cell1.appendChild(cell1Text);

  // Insert a cell in the row at cell index 1
  var cell2   = newRow.insertCell(1);

  // Append a text node to the cell
  var cell2Text  = document.createTextNode('Instytut Informatyki')
  cell2.appendChild(cell2Text);

  var cell_btn  = newRow.insertCell(2);
	var input = document.createElement("input");
	input.type = "button";
	input.className = "mx-auto btn btn-secondary m-0 px-5";
	input.value = "EDYTUJ";
	cell_btn.appendChild(input);
}

for (let i=0; i<5; i++) {
    doTheInsert();
}
