class Encryption {
  constructor(passcode, level = 1) {
    this.passcode = passcode;
    this.level = level;
    this.passcodeAttempts = 0;
    this.key = this.keyGenerator();
  }
  alphabet = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    ",",
    ".",
    " ",
    "/",
    "<",
    ">",
    "?",
    ";",
    ":",
    "[",
    "]",
    "{",
    "}",
    "|",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    "-",
    "=",
    "~",
    "!",
    "@",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*",
    "(",
    ")",
    "_",
    "+",
  ];

  getKey = (passcode) => {
    if (this.passcode === passcode) {
      this.passcodeAttempts = 0;
      return this.key;
    } else if (this.passcodeAttempts < 5) {
      this.passcodeAttempts++;
      return `Incorrect passcode ${5 - this.passcodeAttempts} attempts left.`;
    }
    return "You have been locked out of the system.";
  };

  doubleChecker(key) {
    for (let j = 0; j < key.length; j++) {
      for (let k = j; k < key.length; k++) {
        let miniMatches = 0;
        for (let i = 0; i < key[k].length; i++) {
          if (k !== j) {
            if (key[k][i] === key[j][i]) {
              miniMatches++;
            }
          }
          if (miniMatches > 2) {
            return false;
          }
        }
      }
    }
    return true;
  }

  keyGenerator() {
    let key = [];
    for (let i = 0; i < this.alphabet.length; i++) {
      let littleKey = "";
      for (let j = 0; j < 3; j++) {
        littleKey +=
          this.alphabet[Math.floor(Math.random() * this.alphabet.length)];
      }
      key.push(littleKey);
    }
    if (!this.doubleChecker(key)) {
      return this.keyGenerator();
    }
    return key;
  }

  encrypter(sentence) {
    let starter = sentence;
    let final = "";
    for (let i = this.level; i > 0; i--) {
      for (let letter of starter) {
        for (let key of this.alphabet) {
          if (letter === key) {
            final += this.key[this.alphabet.indexOf(key)];
          }
        }
      }
      starter = final;
      final = "";
    }
    return starter;
  }

  decrypter(sentence) {
    let starter = sentence;
    let final = "";
    for (let i = this.level; i > 0; i--) {
      for (let i = 0; i < starter.length; i += 3) {
        for (let key of this.alphabet) {
          if (
            this.key[this.alphabet.indexOf(key)] === starter.slice(i, i + 3)
          ) {
            final += key;
          }
        }
      }
      starter = final;
      final = "";
    }
    return starter;
  }
}

const myCipher = new Encryption("easy", 2);
let myFinal = myCipher.encrypter("does this work?");
let myDec = myCipher.decrypter(myFinal);
console.log(myFinal);
console.log(myDec);
