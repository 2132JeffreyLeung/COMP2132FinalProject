const output = document.getElementById("output");
const btnRoll = document.getElementById("btn-roll");
const btnNew = document.getElementById("btn-new");
const btnHistory = document.getElementById("btn-history");
const history = document.getElementById("history");

/* No history to view in the beginning */
btnHistory.style.display = "none";

class Dice{
    constructor(){
        this.value = Math.floor(Math.random()*6+1);
    }
    describeSelf(){
        let returnString = `<p>Dice Value: ${this.value}</p>`;
        return returnString;
    }
}

class Player{
    constructor(name){
        this.name = name;
        this.hand = [];
        this.score = 0;
    }
    addDiceToHand(dice){
        this.hand.push(dice);
    }
    deleteHand(){
        this.hand = [];
    }
    describeSelf(){
        let returnString = `<p>${this.name}'s hand:</p>`;
        returnString += "<ul>";
        this.hand.forEach(function(dice){
            returnString += `<li>${dice.describeSelf()}</li>`;
        });
        returnString += "</ul>";
        return returnString;
    }
}

const user = new Player("User");
const computer = new Player("Computer");
let players = [user, computer];

let roundScore = 0;
let round = 0;

btnRoll.addEventListener("click", function(){

    /* Resets output.innerHTML */
    output.innerHTML = `<h2>Round: ${round+1}</h2>`;

    players.forEach(function(player){
        output.innerHTML += `<h2>${player.name}</h2>`
        player.addDiceToHand(new Dice);
        player.addDiceToHand(new Dice);
        output.innerHTML += player.describeSelf();

        /* Scoring the round */
        if(player.hand[0].value == 1 || player.hand[1].value == 1){
            roundScore = 0;
        }else if(player.hand[0].value == player.hand[1].value){
            roundScore = 2 * (player.hand[0].value + player.hand[1].value);
        }else{
            roundScore = player.hand[0].value + player.hand[1].value;
        }

        /* Continuing the output */
        output.innerHTML += `<p>The round's score for ${player.name} is: ${roundScore}</p>`;
        player.score += roundScore;
        output.innerHTML += `<p>The ${player.name}'s total score is: ${player.score}</p>`;
        player.deleteHand();
    });
    round++

    /* Adds output.innerHTML to history */
    history.innerHTML += output.innerHTML;

    if(round == 1){
        /* There is now history to view */
        btnHistory.style.display = "block";
    }
    if(round == 3){
        end();
        /* Cannot roll again */
        btnRoll.style.display = "none";
        /* Restyle "Start A New Game" button */
        btnNew.style.margin = "auto";
        btnNew.style.width = "591.4px";
    }
});

function end(){
    output.innerHTML += "<h2>Final Scores</h2>"
    players.forEach(function(player){
        output.innerHTML += `<p>The ${player.name}'s final score is: ${player.score}</p>`;
    })
    output.innerHTML += "<br>"
    if(players[0].score > players[1].score){
        output.innerHTML += `<h2 style="text-align: center;">Congratulations ${players[0].name}</h2>`;
    }else if(players[0].score < players[1].score){
        output.innerHTML += `<h2 style="text-align: center;">Congratulations ${players[1].name}</h2>`;
    }else if(players[0].score == players[1].score){
        output.innerHTML += "<h2 style='text-align: center;'>It is a draw</h2>";
    }
}

btnNew.addEventListener("click", reset);

function reset(){
    start()
    btnRoll.style.display = "block";
    btnHistory.style.display = "none";
    players.forEach(function(player){
        player.score = 0;
    })
    round = 0;
    btnNew.style.margin = "";
    btnNew.style.width = "";
}

$(btnHistory).click(function(){
    $("#history").slideToggle();
});

function start(){
    output.innerHTML = "<h2>Round: </h2>";
    players.forEach(function(player){
        output.innerHTML += `<h2>${player.name}</h2>`
        let returnString = `<p>${player.name}'s hand:</p>`;
        returnString += "<ul>";
        returnString += "<li><p>Dice Value: </p></li>";
        returnString += "<li><p>Dice Value: </p></li>";
        returnString += "</ul>";
        output.innerHTML += returnString;
        output.innerHTML += `<p>The round's score for ${player.name} is: </p>`;
        output.innerHTML += `<p>The ${player.name}'s total score is: </p>`;
    });
    history.innerHTML = "";
}

start()