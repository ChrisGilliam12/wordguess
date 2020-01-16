const Letter = require("./Letter")

    function Word(word) {
        this.Letters = word.split("").map(function(char) {
            return new Letter(char)

        })
    }

    Word.prototype.showAnswer = function() {
        return this.Letters.map(function(Letter) {
            return Letter.showAnswer();
            }).join(" ");
        
    }

    Word.prototype.toString = function() {
        return this.Letters.join(" ")
        console.log(this.Letters.join(" "))
    }

    Word.prototype.guessLetter = function(char) {
        let foundLetter = false;
        this.Letters.forEach(function(Letter) {
            if (Letter.guess(char)) {
                foundLetter = true
            }
        })
        console.log('\n' + this + '\n')
        return foundLetter;
    }

    Word.prototype.wonGame = function() {
        return this.Letters.every(function(Letter) {
            return Letter.visible
        })
    }

    module.exports = Word