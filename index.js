const express = require("express");
let ejs = require("ejs");
const app = express();
const swaggerDocs = require("./swagger");

const port = 8000;

let jokes = [
  {
    setup: "Why don't skeletons fight each other?",
    punchline: "They don't have the guts!",
  },
  {
    setup: "What do you call fake spaghetti?",
    punchline: "An impasta!",
  },
  {
    setup: "Why did the scarecrow win an award?",
    punchline: "Because he was outstanding in his field!",
  },
  {
    setup: "Why can't your nose be 12 inches long?",
    punchline: "Because then it would be a foot!",
  },
  {
    setup: "What do you call a fish with no eyes?",
    punchline: "Fsh.",
  },
  {
    setup: "Why don’t eggs tell jokes?",
    punchline: "They’d crack each other up.",
  },
  {
    setup: "What did the ocean say to the shore?",
    punchline: "Nothing, it just waved.",
  },
  {
    setup: "Why did the golfer bring two pairs of pants?",
    punchline: "In case he got a hole in one.",
  },
  {
    setup: "What do you call a factory that makes okay products?",
    punchline: "A satisfactory.",
  },
  {
    setup: "Why did the bicycle fall over?",
    punchline: "Because it was two-tired!",
  },
];

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("views"));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("home");
});

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

app.get("/jokes", (req, res) => {
  res.render("jokes", { jokes });
});

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

app.get("/joke", (req, res) => {
  let randomIndex = Math.floor(Math.random() * jokes.length);
  let randomJoke = jokes[randomIndex];
  res.render("joke", { randomJoke });
});

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
app.post("/addjokes", (req, res) => {
  let { setup, punchline } = req.body;
  jokes.push({
    setup: setup,
    punchline: punchline,
  });
  res.render("addjoke", { jokes });
  console.log(setup, punchline);
});

app.listen(port, () => {
  swaggerDocs(app, port);
  console.log("Server is running in port:", port);
});
