var readline = require("node:readline");
var _a = require("node:process"), input = _a.stdin, output = _a.stdout;
var rl = readline.createInterface({ input: input, output: output });
// TODO: add a function to generate this.code randomly
// const code = ["C", "C", "B", "A"];
var Mastermind = /** @class */ (function () {
    function Mastermind(possibleColors, colorCode) {
        this.numOfRounds = 10;
        this.possibleColors = possibleColors;
        // this.code = this.generateRandomCode();
        // this.colorCode = colorCode;
        this.code = ["A", "R", "B", "C"];
    }
    Mastermind.prototype.generateRandomCode = function () {
        // choose a random number between 0 and the length of possibleColors minus 1
        // index a number from the code
        var randomCode = [];
        for (var i = 0; i < 5; i++) {
            var randomNumber = Math.floor(Math.random() * this.possibleColors.length);
            randomCode.push(colorCode[this.possibleColors[randomNumber]]);
        }
        return randomCode;
    };
    Mastermind.prototype.play = function () {
        console.log("\nWelcome to fall themed mastermind 🍂!\nYour goal is to guess 4 colors in a specific order.\nPossible colors are: persimmon (P), brick (B), camel (C), saffron (S), azalea (A), and rust (R).\n");
        console.log("NOTE: you can have repeated colors.\n");
        console.log("Please type 4 color codes.\nOnce you're finished typing your guess, you'll receive a hint.\n🌿 represents the color in the original code in the wrong position.\n🍁 represents the color in the original code in the correct position.\n");
        console.log("Your goal is to get the correct value (which is all four correct colors in the correct position - as 🍁).\n");
        this.playTurn();
    };
    Mastermind.prototype.playTurn = function () {
        var _this = this;
        if (this.numOfRounds === 0) {
            console.log("Unfortunately you've hit your max number of chances to play the game! Here's the anwer: ".concat(this.code, ". Better luck next time!"));
        }
        rl.question("ROUND ".concat(this.numOfRounds, ":\n\nPlease take your guess.\nRemember to add a space (\" \") in between your color codes.\nOptions are: P (persimmon), B (brick), C (camel), S (saffron), A (azalea), and R (rust)\n\n"), function (answer) {
            var guess = answer.trim().split(" ");
            var checkedGuess = _this.checkGuess(guess);
            if (_this.hasWon(checkedGuess)) {
                console.log("\n\nYOU WON 🌳🌳🌳\n\n");
                rl.close();
            }
            else {
                console.log("\n".concat(_this.formatHint(checkedGuess), "\n"));
                _this.numOfRounds--;
                _this.playTurn();
            }
        });
    };
    Mastermind.prototype.hasWon = function (hint) {
        var wins = 0;
        for (var _i = 0, hint_1 = hint; _i < hint_1.length; _i++) {
            var value = hint_1[_i];
            if (value === "B") {
                wins += 1;
            }
        }
        return wins === 4;
    };
    Mastermind.prototype.checkGuess = function (guess) {
        var hint = [];
        var count = {};
        for (var _i = 0, _a = this.code; _i < _a.length; _i++) {
            var color = _a[_i];
            if (count.hasOwnProperty(color)) {
                count[color] = count[color] + 1;
            }
            else {
                count[color] = 1;
            }
        }
        for (var i = 0; i < guess.length; i++) {
            var currentColor = guess[i];
            if (currentColor === this.code[i] && count[currentColor] > 0) {
                hint[i] = "B";
                count[currentColor]--;
            }
        }
        for (var i = 0; i < guess.length; i++) {
            var currentColor = guess[i];
            if (this.code.includes(currentColor) &&
                count[currentColor] > 0 &&
                hint[i] !== "B") {
                hint[i] = "W";
                count[currentColor]--;
            }
        }
        for (var i = 0; i < guess.length; i++) {
            if (hint[i] !== "B" && hint[i] !== "W") {
                hint[i] = "-";
            }
        }
        return hint;
    };
    Mastermind.prototype.formatHint = function (hint) {
        var formattedHint = [];
        for (var i = 0; i < hint.length; i++) {
            var character = hint[i];
            if (character === "B") {
                formattedHint.push("🍁");
            }
            else if (character === "W") {
                formattedHint.push("🌿");
            }
            else {
                formattedHint.push("-");
            }
        }
        return formattedHint.join(" ");
    };
    return Mastermind;
}());
var colorCode = {
    persimmon: "P",
    camel: "C",
    brick: "B",
    azalea: "A",
    saffron: "S",
    rust: "R",
};
var possibleColors = [
    "persimmon",
    "camel",
    "brick",
    "azalea",
    "saffron",
    "rust",
];
var game = new Mastermind(possibleColors, colorCode);
game.play();
/* things I wanted to work on below */
/* 1. Decouple coming up with raw hints to printing the hints in the preferred format */
/* 2. How to do the prompting process synchronously */
