const inquirer = require ('inquirer')
const Word = require('./Word')
const words = require('./words')

    function Game() {
        const round = this
        let guessesLeft;

        this.play = function() {
            
            this.guessesLeft = 10;
            this.newWord()
        }

        this.newWord = function() {

            const randomWord = words[Math.floor(Math.random()*words.length)];
            this.currentWord = new Word(randomWord);
            
            this.makeGuess()

        }

        this.makeGuess = function() {
            this.guessLetter().then(function() {
                if(round.guessesLeft < 1) { 
                    console.log("Out of Guesses! Correct word was " + round.currentWord.showAnswer())
                
                round.playAgain()
                }else if( round.currentWord.wonGame()) {
                    console.log("Congratulations, you guessed it!")
                    round.playAgain()
                }else {
                    round.makeGuess()
                }
            })
        }
        this.playAgain = function() {
            inquirer.prompt([
                {
                    type: "confirm",
                    name: "choice",
                    message: "Play Again?"
                }
            ]).then(function(val) {
                if(val.choice) {
                    round.play()
                }else {
                    round.endgame();
                }

            })
            
        }
        this.guessLetter = function() {
            return inquirer.prompt([
                {
                    type: "input",
                    name: "choice",
                    message: "Guess a letter",
                    validate: function(val) {
                        return /[a-z1-9]/gi.test(val);
                    }
                }
            ]).then(function(val) {
                let didGuessCorrectly = round.currentWord.guessLetter(val.choice)
                if(didGuessCorrectly) {
                    console.log(("Correct"))
                }else {
                    round.guessesLeft--;
                    console.log("incorrect!")
                }
                console.log("guesses remaining: " + round.guessesLeft)
            })
            
                
        }
        this.endgame = function() {
            console.log("Closing Game")
            process.exit(0);
        }

    }
    
    module.exports = Game;