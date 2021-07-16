class Encryption {
  encryptionKey = {
    a: 0,
    b: 1,
    c: 2,
    d: 3,
    e: 4,
    f: 5,
    g: 6,
    h: 7,
    i: 8,
    j: 9,
    k: 10,
    l: 11,
    m: 12,
    n: 13,
    o: 14,
    p: 15,
    q: 16,
    r: 17,
    s: 18,
    t: 19,
    u: 20,
    v: 21,
    w: 22,
    x: 23,
    y: 24,
    z: 25,
    A: 26,
    B: 27,
    C: 28,
    D: 29,
    E: 30,
    F: 31,
    G: 32,
    H: 33,
    I: 34,
    J: 35,
    K: 36,
    L: 37,
    M: 38,
    N: 39,
    O: 40,
    P: 41,
    Q: 42,
    R: 43,
    S: 44,
    T: 45,
    U: 46,
    V: 47,
    W: 48,
    X: 49,
    Y: 50,
    Z: 51,
    ",": 52,
    ".": 53,
    " ": 54,
    "/": 55,
    "<": 56,
    ">": 57,
    "?": 58,
    ";": 59,
    ":": 60,
    "[": 61,
    "]": 62,
    "{": 63,
    "}": 64,
    "|": 65,
    1: 66,
    2: 67,
    3: 68,
    4: 69,
    5: 70,
    6: 71,
    7: 72,
    8: 73,
    9: 74,
    0: 75,
    "-": 76,
    "=": 77,
    "~": 78,
    "!": 79,
    "@": 80,
    "#": 81,
    $: 82,
    "%": 83,
    "^": 84,
    "&": 85,
    "*": 86,
    "(": 87,
    ")": 88,
    _: 89,
    "+": 90,
  };

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
    let totalMatches = 0;
    for (let j = 0; j < key.length; j++) {
      for (let k = 0; k < key.length; k++) {
        let miniMatches = 0;
        for (let i = 0; i < key[k].length; i++) {
          if (k !== j) {
            if (key[k][i] === key[j][i]) {
              miniMatches++;
            }
          }
          if (miniMatches > 2) {
            totalMatches += 1;
          }
        }
      }
    }
    if (totalMatches > 0) {
      return false;
    }
    return true;
  }

  keyGenerator() {
    let key = [];
    for (let i = 0; i < this.alphabet.length; i++) {
      let littleKey = "";
      for (let j = 0; j < 3; j++) {
        littleKey += this.alphabet[
          Math.floor(Math.random() * this.alphabet.length)
        ];
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
        for (let key of Object.keys(this.encryptionKey)) {
          if (letter === key) {
            final += keyList[this.encryptionKey[key]];
          }
        }
      }
      starter = final;
      final = "";
    }
    return [starter, keyList];
  }

  decrypter(sentence, level = 1, keyList) {
    // console.log(sentence);
    let starter = sentence;
    let final = "";
    for (let i = level; i > 0; i--) {
      for (let i = 0; i < starter.length; i += 3) {
        for (let key of Object.keys(this.encryptionKey)) {
        //   console.log(
        //     keyList[this.encryptionKey[key]],
        //     starter.slice(i, i + 3)
        //   );
          if (keyList[this.encryptionKey[key]] === starter.slice(i, i + 3)) {
            // console.log("here now")
            final += key;
            // console.log(final+ "      " + starter);
          }
        }
      }
    //   console.log(`----------STARTER ${starter}`);
    //   console.log(`----------FINAL ${final}`);
      starter = final;
      final = "";
    }
    // console.log(sentence);
    // console.log(starter);
    return starter;
  }
}

const cipher = new Encryption();
let enc = cipher.encrypter("wooooork", 2);
let dec = cipher.decrypter(enc[0], 2, enc[1]);
console.log(enc[0]);
console.log(dec);
console.log(enc[1]);
console.log(enc[0].length);
console.log(cipher.alphabet.length);
