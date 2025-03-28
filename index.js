import express from "express";
import axios from "axios";
import responseTime from "response-time";


const app = express();

app.use(responseTime());

app.get("/characters", async (req, res) => {

   const {data} = await axios.get('https://rickandmortyapi.com/api/character')

   return res.json(data)
    
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})