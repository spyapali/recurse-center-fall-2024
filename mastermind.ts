const readline = require("node:readline/promises");

const { stdin: input, stdout: output } = require("node:process");

const rl = readline.createInterface({ input, output });

// TODO: add a function to generate code randomly
const code = ["C", "C", "B", "A"];

class Mastermind {
  numOfRounds: number;
  possibleColors: string[];

  constructor(possibleColors: string[]) {
    this.numOfRounds = 10;
    this.possibleColors = possibleColors;
  }
  async play() {
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
    while (this.numOfRounds > 0) {
      const guessString = await rl.question(
        `ROUND ${this.numOfRounds}:\n\nPlease take your guess.\nRemember to add a space (" ") in between your color codes.\nOptions are: P (persimmon), B (brick), C (camel), S (saffron), A (azalea), and R (rust)\n\n`
      );

      const guess = guessString.trim().split(" ");
      const checkedGuess = this.checkGuess(guess);
      if (this.hasWon(checkedGuess)) {
        console.log("\n\nYOU WON 🌳🌳🌳\n\n");
        rl.close();
        return;
      } else {
        console.log(`\n${checkedGuess.join(" ")}\n`);
      }
      this.numOfRounds--;
    }
    if (this.numOfRounds === 0) {
      console.log(
        `Unfortunately you've hit your max number of chances to play the game! Here's the anwer: ${code}. Better luck next time!`
      );
    }
  }

  hasWon(hint: string[]) {
    let autumnLeaves = 0;
    for (const value of hint) {
      if (value === "🍁") {
        autumnLeaves += 1;
      }
    }
    return autumnLeaves === 4;
  }

  checkGuess(guess: string[]) {
    let hint: Array<string> = [];
    const count = {};

    for (const color of code) {
      if (count.hasOwnProperty(color)) {
        count[color] = count[color] + 1;
      } else {
        count[color] = 1;
      }
    }

    // red leaves
    for (let i = 0; i < guess.length; i++) {
      const currentColor = guess[i];
      if (currentColor === code[i] && count[currentColor] > 0) {
        hint[i] = "🍁";
        count[currentColor]--;
      }
    }

    // green leaves
    for (let i = 0; i < guess.length; i++) {
      const currentColor = guess[i];
      if (
        code.includes(currentColor) &&
        count[currentColor] > 0 &&
        hint[i] !== "🍁"
      ) {
        hint[i] = "🌿";
        count[currentColor]--;
      }
    }

    for (let i = 0; i < guess.length; i++) {
      if (hint[i] !== "🌿" && hint[i] !== "🍁") {
        hint[i] = "-";
      }
    }

    return hint;
  }
}

const colorCode = {
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
const game = new Mastermind(possibleColors);

console.log(game.play());
