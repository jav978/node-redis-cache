import express from "express";
import axios from "axios";
import responseTime from "response-time";
import {createClient} from "redis";


const app = express();

const client = createClient({
    host: 'localhost',
    port: 6379
})

app.use(responseTime());

app.get("/characters", async (req, res) => {


   const replay = await client.get('characters') 

   if(replay) return res.json(JSON.parse(replay))
    

   const {data} = await axios.get('https://rickandmortyapi.com/api/character')

   const saveResult = await client.set('characters', JSON.stringify(data))
   console.log(saveResult)

   return res.json(data)
    
})


app.get("/characters/:id", async (req, res) => {
      const {id} = req.params;
      const replay = await client.get(`character:${id}`)
      if(replay) return res.json(JSON.parse(replay))
      const {data} = await axios.get(`https://rickandmortyapi.com/api/character/${id}`)
      const saveResult = await client.set(`character:${id}`, JSON.stringify(data))
      console.log(saveResult)
      return res.json(data)
})



const main = async () => {
    await client.connect();
    app.listen(3000);
    console.log('Server is running on port 3000')
}
main();
