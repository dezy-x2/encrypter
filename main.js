class Encryption {
  constructor(level = 1) {
    this.level = level;
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
    const keyList = this.key;
    const level = this.level;
    let starter = sentence;
    let final = "";
    for (let i = level; i > 0; i--) {
      for (let letter of starter) {
        for (let key of this.alphabet) {
          if (letter === key) {
            final += keyList[this.alphabet.indexOf(key)];
          }
        }
      }
      starter = final;
      final = "";
    }
    return starter;
  }

  decrypter(sentence) {
    const level = this.level;
    const keyList = this.key;
    let starter = sentence;
    let final = "";
    for (let i = level; i > 0; i--) {
      for (let i = 0; i < starter.length; i += 3) {
        for (let key of this.alphabet) {
          if (keyList[this.alphabet.indexOf(key)] === starter.slice(i, i + 3)) {
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

const cipher = new Encryption(2);
let final = cipher.encrypter("does this work?");
let dec = cipher.decrypter(final);
console.log(final);
console.log(dec);
console.log(final.length);
