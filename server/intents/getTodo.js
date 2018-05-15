const config = require('../config.js');
const encode = require('nodejs-base64-encode');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function getTodo(){
  const baseAuth = encode.encode(`${config.SF_USERID}@${config.SF_COMP_ID}:${config.SF_PASSWD}`, 'base64');
  var xhr = new XMLHttpRequest();
  xhr.withCredentials = false;

  //setting request method
  //API endpoint for API sandbox
  xhr.open("GET", "https://sandbox.api.sap.com/successfactors/odata/v2/Todo", false);

  //adding request headers
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("Accept", "application/json");
  //API Key for API Sandbox
  xhr.setRequestHeader("APIKey", `${config.API_HUB_KEY}`);

  //Basic Auth : provide username:password in Base64 encoded in Authorization header
  console.log(`BASIC ${baseAuth}`)
   xhr.setRequestHeader("Authorization", `Basic ${baseAuth}`);

  //sending request
  console.log('Sending DATA')
  xhr.send();
  //console.log(xhr.responseText)
  var data = JSON.parse(xhr.responseText);
  //console.log(data.d.results[2].todos.results.length);

  var cat_num = data.d.results.length;
  var todo_num = 0;
  var todo_detail = '';
  for (var i = 0, l = cat_num; i < l; i++) {
    todo_num += data.d.results[i].todos.results.length;
    todo_detail += `${data.d.results[i].categoryLabel}은 ${data.d.results[i].todos.results.length}개, \n`;
  }
  var todo_result = `현재 ${todo_num}가지 할일이 있으며 내용은 다음과 같습니다: \n${todo_detail}, \n 이상입니다.`
  console.log('Sending RESULT')
  console.log(todo_result)
  return [
    {
      type: 'text',
      content: todo_result,
    },
  ];
}
module.exports = getTodo;
