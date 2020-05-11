function logInfo(){
  event.preventDefault();
  const url = "http://mysql26.mydevil.net:7777/user/userExist";
  const form = document.getElementById('myForm');
  var login = form.name.value;
  var password = form.psswd.value;
  const data = {
    "login": login,
    "password": password
  };
  if (login&&password) {
    const other_params = {
      headers : { "content-type" : "application/json"},
      body : JSON.stringify(data),
      method : "POST",
      mode : "cors"
    };

    fetch(url, other_params)
        .then(resp => resp.json())
        .then(data=>{

          if(data == true)
          {
             window.location.href = "admin.html";
             //ustawiamy sesje na true
             sessionStorage.setItem('logged', 'true');
          }
          else {
            document.getElementById('warningInfoL').innerHTML = "Niepoprawny login lub hasło!";
          }
        })
        .catch(error=>{
          console.log(error.message);
        })
        return false
  }
  else {
     document.getElementById('warningInfo').innerHTML = "Musisz uzupełnić oba pola!";
  }
  }
