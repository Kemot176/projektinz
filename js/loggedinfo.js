let data = sessionStorage.getItem('logged');
console.log(data);
if(data == "true")
{
  window.location.href = "admin.html";
}
