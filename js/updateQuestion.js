function updateQ() {



var j = parseInt(sessionStorage.getItem("idquestion"));
console.log(j);
sessionStorage.clear();
if(j==null)
{
  var j = parseInt(sessionStorage.getItem("idquestion"));
  document.getElementById("question").innerHTML = j;
  document.getElementById("answer1").innerHTML = "New a1!";
  document.getElementById("answer2").innerHTML = "New a2!";
  document.getElementById("answer3").innerHTML = "New a3!";
  document.getElementById("answer4").innerHTML = "New a4!";
}
}
