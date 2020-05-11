let data = sessionStorage.getItem('logged');
if(data != "true")
{
  sessionStorage.removeItem('logged');
  sessionStorage.clear();
  window.location.href = "login.html";
}
