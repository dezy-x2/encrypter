class Encryption {
  constructor(passcode, level = 1) {
    // set a passcode in order to access the encryption key
    this.passcode = passcode;
    // the encryption & decryption funcs will use this
    this.level = level;
    // keeps track of how many times the passcode has been attempted to ensure that it isn't hacked
    this.passcodeAttempts = 0;
    // this is the key that the whole instance uses to encrypt and decrypt
    this.key = this.keyGenerator();
  }
  // these are all of the characters that can be used
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
      // if the passcode is correct, return the key & reset the passcode attempts
      this.passcodeAttempts = 0;
      return this.key;
    } else if (this.passcodeAttempts < 5) {
      // if the passcode is incorrect, increment the passcode attempts
      this.passcodeAttempts++;
      return `Incorrect passcode ${5 - this.passcodeAttempts} attempts left.`;
    }
    // if the passcode attempts are over 5, return an error
    return "You have been locked out of the system.";
  };

  miniChecker = (miniKey1, minikey2) =>
    miniKey1.every((_, idx) => {
      miniKey1[idx] === minikey2[idx];
    });

  // this function checks the encryption key to make sure there aren't repeats
  doubleChecker(key) {
    // go through the bigger list twice so we can compare it to itself
    for (let j = 0; j < key.length; j++) {
      for (let k = j; k < key.length; k++) {
        if (k !== j) {
          if (this.miniChecker(key[j].split(""), key[k].split(""))) {
            return false;
          }
        }
      }
    }
    // if it passes all the scutiny return true and the key is good
    return true;
  }

  keyGenerator() {
    let key = [];
    // for every letter in the alphabet make a mini key that for that letter
    for (let i = 0; i < this.alphabet.length; i++) {
      let littleKey = "";
      for (let j = 0; j < 3; j++) {
        // pick a random letter from the alphabet 3x
        littleKey +=
          this.alphabet[Math.floor(Math.random() * this.alphabet.length)];
      }
      key.push(littleKey);
    }
    // check the key to make sure there aren't repeats
    if (!this.doubleChecker(key)) {
      return this.keyGenerator();
    }
    return key;
  }

  encrypter(sentence) {
    let starter = sentence;
    let final = "";
    // repeat these steps for every level of encryption specified in the constructor
    for (let i = this.level; i > 0; i--) {
      for (let letter of starter) {
        for (let key of this.alphabet) {
          // if the letter is equal to the key, add the key to the final string
          if (letter === key) {
            final += this.key[this.alphabet.indexOf(key)];
          }
        }
      }
      // set current to a holder value and reset a place to manipulate the string
      starter = final;
      final = "";
    }
    return starter;
  }

  decrypter(sentence) {
    let starter = sentence;
    let final = "";
    // repeat these steps for every level of encryption specified in the constructor
    for (let i = this.level; i > 0; i--) {
      for (let i = 0; i < starter.length; i += 3) {
        for (let key of this.alphabet) {
          // check to see if the key is in the sentence; this is also the step that fixes the amount of chars a key can have
          if (
            this.key[this.alphabet.indexOf(key)] === starter.slice(i, i + 3)
          ) {
            final += key;
          }
        }
      }
      // set current to a holder value and reset a place to manipulate the string
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
