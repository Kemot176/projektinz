function logout(){
  sessionStorage.removeItem('logged');
  sessionStorage.clear();
  window.location.href = "index.html";
}
