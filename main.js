const encryptionKey = {
    "a": 0,
    "b": 1,
    "c": 2,
    "d": 3,
    "e": 4,
    "f": 5,
    "g": 6,
    "h": 7,
    "i": 8,
    "j": 9,
    "k": 10,
    "l": 11,
    "m": 12,
    "n": 13,
    "o": 14,
    "p": 15,
    "q": 16,
    "r": 17,
    "s": 18,
    "t": 19,
    "u": 20,
    "v": 21,
    "w": 22, 
    "x": 23,
    "y": 24,
    "z": 25,
    " ": 26
};

const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

function doubleChecker(key) {
    let totalMatches = 0;
    for (let j=0; j<key.length; j++) {
        for (let k=0; k<key.length; k++) {
            let miniMatches = 0;
            for (let i=0; i<key[k].length; i++) {
                if (k !== j) {
                    if (key[k][i] === key[j][i]){
                        miniMatches++;
                    }
                }
                if (miniMatches > 2) {
                    totalMatches += 1;
                }
            };
        };
    }
    if (totalMatches > 0) {
        return false;
    }
    return true;
}

function keyGenerator() {
    let key = [];
    for (let i=0; i<27; i++) {
        let littleKey = "";
        for(let j=0; j<3; j++) {
            littleKey += alphabet[Math.floor(Math.random() * alphabet.length)];
        }
        key.push(littleKey);
    }
    if (!doubleChecker(key)) {
        return keyGenerator();
    }
    return key;
}

function encrypter(sentence, level=1) {
    const keyList = keyGenerator();
    let starter = sentence;
    let final = "";
    for(let i=level; i > 0; i--) {
        for (let letter of starter) {
            for (let key of Object.keys(encryptionKey)) {
                if (letter === key) {
                    final += keyList[encryptionKey[key]];
                };
            };
        };
        starter = final;
        final = "";
    };
    return [starter, keyList];
}

function decrypter(sentence, level=1, keyList) {
    let starter = sentence;
    let final = "";
    for (let i=level; i>0; i--) {
        for (let i=0; i<starter.length; i += 3) {
            for (let key of Object.keys(encryptionKey)){
                if (keyList[encryptionKey[key]] === starter.slice(i, i+3)){
                    final += key;
                };
            };
        };
        starter = final;
        final = "";
    };
    return starter;
}

let enc = encrypter("dad is an idiot", 10);
let dec = decrypter(enc[0], 10, enc[1]);
console.log(enc[0]);
console.log(dec);
console.log(enc[1]);
console.log(enc[0].length);
