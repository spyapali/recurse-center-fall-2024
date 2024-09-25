var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var readline = require("node:readline/promises");
var _a = require("node:process"), input = _a.stdin, output = _a.stdout;
var rl = readline.createInterface({ input: input, output: output });
// TODO: add a function to generate code randomly
var code = ["C", "C", "B", "A"];
var Mastermind = /** @class */ (function () {
    function Mastermind(possibleColors) {
        this.numOfRounds = 10;
        this.possibleColors = possibleColors;
    }
    Mastermind.prototype.play = function () {
        return __awaiter(this, void 0, void 0, function () {
            var guessString, guess, checkedGuess;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("\nWelcome to fall themed mastermind 🍂!\nYour goal is to guess 4 colors in a specific order.\nPossible colors are: persimmon (P), brick (B), camel (C), saffron (S), azalea (A), and rust (R).\n");
                        console.log("NOTE: you can have repeated colors.\n");
                        console.log("Please type 4 color codes.\nOnce you're finished typing your guess, you'll receive a hint.\n🌿 represents the color in the original code in the wrong position.\n🍁 represents the color in the original code in the correct position.\n");
                        console.log("Your goal is to get the correct value (which is all four correct colors in the correct position - as 🍁).\n");
                        _a.label = 1;
                    case 1:
                        if (!(this.numOfRounds > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, rl.question("ROUND ".concat(this.numOfRounds, ":\n\nPlease take your guess.\nRemember to add a space (\" \") in between your color codes.\nOptions are: P (persimmon), B (brick), C (camel), S (saffron), A (azalea), and R (rust)\n\n"))];
                    case 2:
                        guessString = _a.sent();
                        guess = guessString.trim().split(" ");
                        checkedGuess = this.checkGuess(guess);
                        if (this.hasWon(checkedGuess)) {
                            console.log("\n\nYOU WON 🌳🌳🌳\n\n");
                            rl.close();
                            return [2 /*return*/];
                        }
                        else {
                            console.log("\n".concat(checkedGuess.join(" "), "\n"));
                        }
                        this.numOfRounds--;
                        return [3 /*break*/, 1];
                    case 3:
                        if (this.numOfRounds === 0) {
                            console.log("Unfortunately you've hit your max number of chances to play the game! Here's the anwer: ".concat(code, ". Better luck next time!"));
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Mastermind.prototype.hasWon = function (hint) {
        var autumnLeaves = 0;
        for (var _i = 0, hint_1 = hint; _i < hint_1.length; _i++) {
            var value = hint_1[_i];
            if (value === "🍁") {
                autumnLeaves += 1;
            }
        }
        return autumnLeaves === 4;
    };
    Mastermind.prototype.checkGuess = function (guess) {
        var hint = [];
        var count = {};
        for (var _i = 0, code_1 = code; _i < code_1.length; _i++) {
            var color = code_1[_i];
            if (count.hasOwnProperty(color)) {
                count[color] = count[color] + 1;
            }
            else {
                count[color] = 1;
            }
        }
        // red leaves
        for (var i = 0; i < guess.length; i++) {
            var currentColor = guess[i];
            if (currentColor === code[i] && count[currentColor] > 0) {
                hint[i] = "🍁";
                count[currentColor]--;
            }
        }
        // green leaves
        for (var i = 0; i < guess.length; i++) {
            var currentColor = guess[i];
            if (code.includes(currentColor) &&
                count[currentColor] > 0 &&
                hint[i] !== "🍁") {
                hint[i] = "🌿";
                count[currentColor]--;
            }
        }
        for (var i = 0; i < guess.length; i++) {
            if (hint[i] !== "🌿" && hint[i] !== "🍁") {
                hint[i] = "-";
            }
        }
        return hint;
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
var game = new Mastermind(possibleColors);
console.log(game.play());
