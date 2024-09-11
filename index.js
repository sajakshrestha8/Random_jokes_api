const express = require('express');
const app = express();
const swaggerDocs = require("./swagger");

const port = 8000;



let jokes = [
  {
    "joke": "Why don't skeletons fight each other? They don't have the guts."
  },
  {
    "joke": "I told my wife she was drawing her eyebrows too high. She looked surprised."
  },
  {
    "joke": "Why don't scientists trust atoms? Because they make up everything!"
  },
  {
    "joke": "What do you call fake spaghetti? An impasta!"
  },
  {
    "joke": "What did the grape do when it got stepped on? Nothing but let out a little wine."
  },
  {
    "joke": "Why did the scarecrow win an award? Because he was outstanding in his field!"
  },
  {
    "joke": "I'm reading a book on anti-gravity. It's impossible to put down!"
  },
  {
    "joke": "Did you hear about the mathematician who’s afraid of negative numbers? He’ll stop at nothing to avoid them."
  },
  {
    "joke": "Parallel lines have so much in common. It’s a shame they’ll never meet."
  },
  {
    "joke": "What’s orange and sounds like a parrot? A carrot."
  }
]


app.use(express.json());

/**
 * @swagger
 * /jokes:
 *   get:
 *     summary: La herama yesma multiple jokes ko kamal. Hasam sabai sangai basera
 *     description: Yesma vane hajur le multiple joke haru herna saknu hunxa
 *     responses:
 *       200:
 *         description: jokes ko list xa hai tala
 */

app.get("/jokes", (req,res)=>{
    res.send(jokes);
})

/**
 * @swagger
 * /joke:
 *  get:
 *      summary: Din ma yeuta joke herna man xa? La aaunu ma dekhauxu tapailai din ma yeuta joke tyo ni regularly
 *      description: Yesma yeuta joke matrai herna milxa hai 
 *      responses:
 *          200:
 *              description: Yesma Yeuta Joke matrai herna milxa hai
 */


app.get("/joke", (req,res)=>{
    let randomIndex = Math.floor(Math.random()*jokes.length);
    let randomJoke = jokes[randomIndex];
    res.send(randomJoke);
})


/**
 * @swagger
 * /addjokes:
 *  post:
 *      summary: This is to test the get method of my api
 *      description: Yesma yeuta joke matrai herna milxa hai 
 *      responses:
 *          200:
 *              description: Yesma Yeuta Joke matrai herna milxa hai
 */
app.post("/addjokes", (req,res)=>{
    let payload = req.body;
    jokes.push({
        joke: payload.joke
    });
    res.send(jokes);
})



app.listen(port, ()=>{
    swaggerDocs(app, port);
    console.log("Server is running in port:", port);
})