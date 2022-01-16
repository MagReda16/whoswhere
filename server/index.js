const express = require('express');
const app = express();
const router = require('./router')
const cors = require('cors');

const PORT = 3001;

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(router);


app.listen(PORT, ()=>{
  console.log(`Listening at http://localhost:${PORT} !! `)
});
