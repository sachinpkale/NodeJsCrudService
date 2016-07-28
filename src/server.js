require("babel-polyfill");

var bodyParser = require('body-parser');

var dao = require('./dao')

var express = require('express')
var app = express()
app.use(bodyParser.json());

app.get('/:name', async function(req, res) {
	let name = req.params.name
	let user = await dao.get(name)
	if(user)
		res.send(user)
	else
		res.send("User is not found")
})

app.post('/', async function(req, res) {
	let user = Object.assign({}, req.body)
	let status = await dao.create(user)
	res.send(status)
})

app.put('/', async function(req, res) {
	let user = Object.assign({}, req.body)
	let status = await dao.update(user)
	res.send(status)
})

app.delete('/:id', async function(req, res) {
	let id = req.params.id 
	let status = await dao.delete(id)
	res.send(status + " Row/s are deleted")
})

app.listen(3000)
