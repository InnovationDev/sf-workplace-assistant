const config = require('../config.js');
const encode = require('nodejs-base64-encode');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function getRequests(){

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
  var request_num = 0;
  var request_detail = '';
  //console.log(data.d.results);
  for (var i = 0, l = cat_num; i < l; i++) {
    if(data.d.results[i].categoryId == '14' ||  data.d.results[i].categoryId == '18')
      //console.log(data.d.results[i].todos.results[0].entries.results)
      for (var j = 0, k = data.d.results[i].todos.results[0].entries.results.length; j<k; j++){
        console.log('HI')
        request_num += 1;
        //console.log(data.d.results[i].todos.results[0].entries.results[j])
        request_detail += `${request_num}번, ${data.d.results[i].todos.results[0].entries.results[j].subjectFullName}, \n`;
      }
  }

  var request_result = `현재 ${request_num}가지 승인 요청 사항이 있으며 내용은 다음과 같습니다: \n${request_detail}, \n 이상입니다.`

  return [
    {
      type: 'text',
      content: request_result,
    },
  ];
}
module.exports = getRequests;
