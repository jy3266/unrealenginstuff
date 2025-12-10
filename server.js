var fs = require('fs');
var data = fs.readFileSync('words.json');
var words = JSON.parse(data);

console.log(words);

var express = require('express');
var cors = require('cors');
var app = express();

var port = process.env.PORT || 8000;
app.listen(port, () => {console.log(`Starting server at ${port}`);
});

function listening(){
    console.log("instening. . .");
}
app.use(express.static('website'));

app.use(cors());
app.get('/add/:word/:score?', addWord);

function addWord(request, response){
    var data = request.params;
    var word = data.word;
    var score = data.score;
    var reply;

    if(!score){
    var reply = 
    {
        msg: "Score is required."
    }
    response.send(reply);
    } else {
        // words = {word,score};
        words[score] = {word,score};
        // 위를 아래와 같이 바꾸었을때, 나열과 함께 저장이 되기 시작함, 정확한 이유에 대해서 좀더 알아봐야 할것 같음!
        
        // var data = JSON.stringify({ThankYouForYourLove:words}, null, 2);
        var data = JSON.stringify({ThankYouForYourLove:[words]}, null, 2);
        
        fs.writeFile('words.json',data,finished);

        function finished(err){
        console.log('all set.');
        var reply = {
            word: word,
            score: score,
            status:"sucess"
            }
            response.send(reply);
        }
    }
}

app.get('/all', sendAll);

function sendAll(request, response){
   response.send({ThankYouForYourLove:[words]});
}

app.get('/search/:word/', searchWord);

function searchWord(request, response){
    var word = request.params.word;
    var reply;
    if(words[word]){
        reply = {
            status: "found",
            word: word,
            score: words[word]
        }
    } else{
        reply = {
            status: "not found",
            word: word
    }
}
response.send(reply);
}
