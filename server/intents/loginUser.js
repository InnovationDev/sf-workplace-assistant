const config = require('../config.js');
var user_id = config.SF_USERID;

function loginUser(userid){
  return new Promise(
    function(resolve, reject){
      // userid 결과가 있으면 Login Successful이라는 메세지를 보낸다
      if(userid == user_id){
        console.log("Login is Successful!!");
        resolve([
          {
            type: 'text',
            content: `반갑습니다 ${userid} 파트너님! \n 이제부터 서비스를 시작합니다.`,
          },
        ]);
      }
      // userid 결과가 없으면 Login Unsuccessful이라는 메세지를 보낸다
      else{
        console.log("Login is Unuccessful!!");
        resolve( [
          {
            type: 'text',
            content: `아쉽게도 입력하신 ID를 찾을 수 없네요. \n 아이디를 다시 한 번 입력해 주세요.`,
          },
        ]);
      }
    }
  );

  // userid를 데이터베이스에 검색



}
module.exports = loginUser;
