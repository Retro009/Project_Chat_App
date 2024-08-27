const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const { Cat } = require('./src/models/model')
const { User } = require('./src/models/user')

const connectDb = async()=>{
  await mongoose.connect(`mongodb+srv://jeeshanshaikh:ZANmSsfGEOUSVZlc@retro009.9awof.mongodb.net/MessagingApp_TestDB`)
  console.log(`The Db is Connect with ${mongoose.connection.host}`)
}

connectDb()

app.get('/', async(req, res) => {
  /*const newUser = new User({
    name: 'johndoe',
    email: 'john@example.com',
    password: 'mySecurePassword123'
  });  */
  const newUser = new User({
    name: 'janedoe',
    email: 'jane@example.com',
    password: 'mySecurePassword456'
  });
  const data = await newUser.save();
  res.send(data)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})