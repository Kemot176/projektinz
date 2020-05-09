let data = sessionStorage.getItem('logged');
console.log(data);
if(data != "true")
{
  sessionStorage.removeItem('logged');
  sessionStorage.clear();
  window.location.href = "index.html";
}
