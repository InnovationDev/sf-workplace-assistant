const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config.js');
const loginUser = require('./intents/loginUser.js');
const getLeave = require('./intents/getLeave.js');
const getTodo = require('./intents/getTodo.js');
const getRequests = require('./intents/getRequests.js');
var path = require('path');

const app = express();

app.use(bodyParser.json());

//app.use(express.static(path.join(__dirname, 'public')));


app.post('/errors', (req,res) => {
	console.error(req.body);
	res.sendStatus(200);
});
//

app.post('/login-user', (req, res) => {
	console.log('[POST] /login-user');
	console.log(req.body.conversation.memory)

	const memory = req.body.conversation.memory;
	const userid = memory.userid.value;
	console.log(`USER ID = ${userid}`)

	return loginUser(userid).then((reply) => res.json({
			replies: reply,
		})
  ).catch((err) => console.error('sfApi::loginUser error: ', err));
});

app.post('/get-leave', (req, res) => {
	console.log('[POST] /get-leave');
	console.log(req.body.conversation.memory)

	const memory = req.body.conversation.memory;
	const userid = memory.userid.value;
	console.log(`USER ID = ${userid}`)

	return res.json({
			replies: getLeave(userid),
		})
});

app.post('/get-todo', (req, res) => {
	console.log('[POST] /get-todo');
	console.log(req.body.conversation.memory)

	const memory = req.body.conversation.memory;
	const userid = memory.userid.value;
	console.log(`USER ID = ${userid}`)

	return res.json({
			replies: getTodo(userid),
		})
});

app.post('/get-requests', (req, res) => {
	console.log('[POST] /get-requests');
	console.log(req.body.conversation.memory)

	const memory = req.body.conversation.memory;
	const userid = memory.userid.value;
	console.log(`USER ID = ${userid}`)

	return res.json({
			replies: getRequests(userid),
		})
});

app.listen(config.SERVER_PORT, () => console.log(`App started on port ${config.SERVER_PORT}`));
