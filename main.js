console.log("ran")


const express = require('express')
const app = express()
const port = process.env.PORT || 6969
const parser = require('body-parser')
const path = require('path')


const { users } = require('./state')
let counter = users.length

app.use(express.static(__dirname));
app.use(express.static('/public'));
app.use(express.static(path.join(__dirname, '/public')));

app.use((req, res, next) => {
  next()
})

// the GET Method
// app.get()
app.get("/", (req, res) => {
  console.log("GOTTEN", __dirname)
  return res.sendFile(path.join(__dirname, '/views/index.html'));
})

app.get("/users", (req, res) => {
  return res.json(users)
})


app.get("/users/:id", (req, res) => {
  // ...store the id of the user request using the params of the req object coming from the client...
  const userId = req.params.id
  // ...get the user data from the database using the `userId` variable...
  const userData = res.json(users[userId-1])
  // send the back to client a message saying 'success'
  res.send(`We'll be sending you user ${userId} shortly.`)
  return userData
})



// // the POST Method
app.post("/users", (req, res) => {  
  users.push(req.query)
  console.log(users[users.length-1]["_id"])
  if (users[users.length-1]["_id"] == undefined) {
    users[users.length-1] = {"_id":users.length-1, ...users[users.length-1]}
  }
  return res.json(users[users.length-1])
})

// // the PUT Method
app.put("/users/:id", (req, res) => {  
  const userId = req.params.id

  for (var key in req.query) {
    console.log(key + ': ' + req.query[key]);
    users[userId-1][key] = req.query[key]
  }

  return res.json(users[userId-1])
})

// // the DELETE Method
app.delete("/users/:id", (req, res) => {  
  const userId = req.params.id

  users[userId-1]['isActive'] = false

  res.send("Deleted.")
  return res.json(users[userId-1])
})


/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))