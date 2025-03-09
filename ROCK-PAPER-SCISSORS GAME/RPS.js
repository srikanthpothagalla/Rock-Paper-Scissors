let score = JSON.parse(localStorage.getItem("score")) || { wins: 0, losses: 0, ties: 0 };
updateScore();

function playGame(playerMove) {
    const computerMove = pickComputerMove();
    let result = "";

    if (playerMove === "Scissors") {
        result = computerMove === "Rock" ? "You Lose" : computerMove === "Paper" ? "You Win" : "Tie";
    } else if (playerMove === "Paper") {
        result = computerMove === "Rock" ? "You Win" : computerMove === "Paper" ? "Tie" : "You Lose";
    } else if (playerMove === "Rock") {
        result = computerMove === "Rock" ? "Tie" : computerMove === "Paper" ? "You Lose" : "You Win";
    }

    if (result === "You Win") {
        score.wins++;
        document.querySelector(".js-result").style.color = "lightgreen";
        confetti();
    } else if (result === "You Lose") {
        score.losses++;
        document.querySelector(".js-result").classList.add("glitch");
    } else {
        score.ties++;
        document.querySelector(".js-result").style.color = "white";
        alert("It's a tie! Try again!");
    }

    localStorage.setItem("score", JSON.stringify(score));
    updateScore();

    document.querySelector(".js-result").innerHTML = result;
    document.querySelector(".js-moves").innerHTML = `You
    <img src= "imagesRPS/${playerMove}-emoji.png" class = "moves">
    <img src= "imagesRPS/${computerMove}-emoji.png" class = "moves">
    Computer`;
}

function updateScore() {
    document.querySelector(".js-score").innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
    const moves = ["Rock", "Paper", "Scissors"];
    return moves[Math.floor(Math.random() * 3)];
}

function resetGame() {
    score = { wins: 0, losses: 0, ties: 0 };
    localStorage.removeItem("score");
    updateScore();
    document.querySelector(".js-result").innerHTML = "Game Reset";
    document.querySelector(".js-result").style.color = "yellow";
    document.querySelector(".js-result").classList.remove("glitch");
}
