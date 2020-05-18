const url = "http://mysql26.mydevil.net:7777/question/getAllQuestionForQuestionnaire";
const other_param = {
    headers : { "content-type" : "application/json"},
    body : ""
    method : "GET",
    mode : "cors"
  };
fetch(url,other_param)
    .then(resp => resp.json())
    .then(resp => {
      console.log(resp);
    })
    .catch(function(err) {
    console.info(err + " url: " + url);
    });
