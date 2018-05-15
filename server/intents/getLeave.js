const config = require('../config.js');
const encode = require('nodejs-base64-encode');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function getLeave(){
  const baseAuth = encode.encode(`${config.SF_USERID}@${config.SF_COMP_ID}:${config.SF_PASSWD}`, 'base64');
  var xhr = new XMLHttpRequest();
  xhr.withCredentials = false;

  //setting request method
  //API endpoint for API sandbox
  xhr.open("GET", "https://sandbox.api.sap.com/successfactors/odata/v2/EmpTimeAccountBalance?$filter=userId eq 'sfadmin' and timeAccountType eq 'TAT_VAC_REC'", false);

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
  //console.log(data)
  console.log(data.d.results[0].balance);
  console.log('Receiving DATA')


  return [
    {
      type: 'text',
      content: `현재 ${data.d.results[0].balance}일의 휴가가 남앗습니다.`,
    },
  ];
}
module.exports = getLeave;
