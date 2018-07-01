//questions are in separate file as questions[]

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function nextQuestion() {
    var i = getRandomInt(0,questions.length-1);
    
    var q = document.getElementById("question");
    q.innerHTML = questions[i];
}

nextQuestion();








