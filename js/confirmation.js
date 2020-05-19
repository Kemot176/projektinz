const urlParams = new URLSearchParams(window.location.search);
const urlParam = urlParams.get('auth');
if(urlParam)
{
  document.getElementById('authCode').innerHTML=urlParam;
  let Curl = "https://api.qrserver.com/v1/create-qr-code/?data="+urlParam+"&amp;size=100x100";
  document.getElementById("QRim2g").src= Curl;
  document.getElementById("QRimg").alt= urlParam;

}
else {
       window.location.href = "index.html";
}
