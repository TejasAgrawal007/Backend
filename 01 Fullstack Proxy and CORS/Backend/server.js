import express from 'express';

const app = express();

app.use(express.static('dist')) // Bad Practice

// app.get('/', (req, res) => {
//     res.send("Server is Ready!");
// })

// get a list of 5 jokes    

app.get('/api/jokes', (req, res) => {
    const jokes = [
        {
            id : 1,
            title : 'A Joke',
            content : "I used to be a baker because I kneaded dough."
        },
        {
            id : 2,
            title : 'Another Joke',
            content : "Why don't scientists trust atoms? Because they make up everything!"
        },
        {
            id : 3,
            title : 'Third Joke',
            content : "I told my wife she was drawing her eyebrows too high. She looked surprised."
        },
        {
            id : 4,
            title : 'Fourth Joke',
            content : "Parallel lines have so much in common. It's a shame they'll never meet."
        },
        {
            id : 5,
            title : 'Fifth Joke',
            content : "Why did the math book look sad? Because it had too many problems"
        },
    ]
    res.send(jokes);
})

const port = process.env.PORT || 3000;


app.listen(port, () => {
    console.log(`Server at http://localhost:${port}`);
})