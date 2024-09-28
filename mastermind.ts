const readline = require("node:readline");

const { stdin: input, stdout: output } = require("node:process");

const rl = readline.createInterface({ input, output });

// TODO: add a function to generate this.code randomly
// const code = ["C", "C", "B", "A"];

class Mastermind {
  numOfRounds: number;
  possibleColors: string[];
  code: string[];
  colorCode: { [k: string]: string };

  constructor(possibleColors: string[], colorCode: { [k: string]: string }) {
    this.numOfRounds = 10;
    this.possibleColors = possibleColors;
    this.code = this.generateRandomCode();
  }

  generateRandomCode() {
    const randomCode: string[] = [];
    for (let i = 0; i < 5; i++) {
      const randomNumber = Math.floor(
        Math.random() * this.possibleColors.length
      );
      randomCode.push(colorCode[this.possibleColors[randomNumber]]);
    }
    return randomCode;
  }

  play() {
    console.log(
      "\nWelcome to fall themed mastermind 🍂!\nYour goal is to guess 4 colors in a specific order.\nPossible colors are: persimmon (P), brick (B), camel (C), saffron (S), azalea (A), and rust (R).\n"
    );
    console.log("NOTE: you can have repeated colors.\n");
    console.log(
      "Please type 4 color codes.\nOnce you're finished typing your guess, you'll receive a hint.\n🌿 represents the color in the original code in the wrong position.\n🍁 represents the color in the original code in the correct position.\n"
    );
    console.log(
      "Your goal is to get the correct value (which is all four correct colors in the correct position - as 🍁).\n"
    );
    this.playTurn();
  }

  playTurn() {
    if (this.numOfRounds === 0) {
      console.log(
        `Unfortunately you've hit your max number of chances to play the game! Here's the anwer: ${this.code}. Better luck next time!`
      );
    }
    rl.question(
      `ROUND ${this.numOfRounds}:\n\nPlease take your guess.\nRemember to add a space (" ") in between your color codes.\nOptions are: P (persimmon), B (brick), C (camel), S (saffron), A (azalea), and R (rust)\n\n`,
      (answer) => {
        const guess = answer.trim().split(" ");
        const checkedGuess = this.checkGuess(guess);
        if (this.hasWon(checkedGuess)) {
          console.log("\n\nYOU WON 🌳🌳🌳\n\n");
          rl.close();
        } else {
          console.log(`\n${this.formatHint(checkedGuess)}\n`);
          this.numOfRounds--;
          this.playTurn();
        }
      }
    );
  }

  hasWon(hint: string[]) {
    let wins = 0;
    for (const value of hint) {
      if (value === "B") {
        wins += 1;
      }
    }
    return wins === 4;
  }

  checkGuess(guess: string[]) {
    let hint: Array<string> = [];
    const count = {};

    for (const color of this.code) {
      if (count.hasOwnProperty(color)) {
        count[color] = count[color] + 1;
      } else {
        count[color] = 1;
      }
    }

    for (let i = 0; i < guess.length; i++) {
      const currentColor = guess[i];
      if (currentColor === this.code[i] && count[currentColor] > 0) {
        hint[i] = "B";
        count[currentColor]--;
      }
    }

    for (let i = 0; i < guess.length; i++) {
      const currentColor = guess[i];
      if (
        this.code.includes(currentColor) &&
        count[currentColor] > 0 &&
        hint[i] !== "B"
      ) {
        hint[i] = "W";
        count[currentColor]--;
      }
    }

    for (let i = 0; i < guess.length; i++) {
      if (hint[i] !== "B" && hint[i] !== "W") {
        hint[i] = "-";
      }
    }

    return hint;
  }
  formatHint(hint: string[]) {
    let formattedHint: string[] = [];
    for (let i = 0; i < hint.length; i++) {
      let character = hint[i];
      if (character === "B") {
        formattedHint.push("🍁");
      } else if (character === "W") {
        formattedHint.push("🌿");
      } else {
        formattedHint.push("-");
      }
    }
    return formattedHint.join(" ");
  }
}

const colorCode: { [k: string]: string } = {
  persimmon: "P",
  camel: "C",
  brick: "B",
  azalea: "A",
  saffron: "S",
  rust: "R",
};

const possibleColors = [
  "persimmon",
  "camel",
  "brick",
  "azalea",
  "saffron",
  "rust",
];
const game = new Mastermind(possibleColors, colorCode);

game.play();

/* things I wanted to work on below */
/* 1. Decouple coming up with raw hints to printing the hints in the preferred format */
/* 2. How to do the prompting process synchronously */
