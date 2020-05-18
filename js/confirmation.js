const urlParams = new URLSearchParams(window.location.search);
const urlParam = urlParams.get('auth');
if(urlParam)
{
  document.getElementById('authCode').innerHTML=urlParam;

}
else {
       window.location.href = "index.html";
}
