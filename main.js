class Encryption {
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

  encrypter(sentence, level = 1) {
    const keyList = this.keyGenerator();
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
    return [starter, keyList];
  }

  decrypter(sentence, level = 1, keyList) {
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

const cipher = new Encryption();
let [final, keylist] = cipher.encrypter("does this work?", 2);
let dec = cipher.decrypter(final, 2, keylist);
console.log(final);
console.log(dec);
console.log(keylist);
console.log(final.length);
