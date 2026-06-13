const connectToMongo=require('./db');
connectToMongo();
const express = require('express')

const app = express()
const port = 3000
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello patlu!')
})
app.use('/api/auth', require('./routes/auth'));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})