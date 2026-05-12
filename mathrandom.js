var num;
var chip1_val = 0;
var chip2_val = 0;
var chip3_val = 0;
var chosen_chip = -1;
const res1 = document.getElementById('res1');
const res2 = document.getElementById('res2');
const res3 = document.getElementById('res3');
const resf = document.getElementById('resf');
const encr = document.getElementById('encr');


function chip_money(chip_num) {
    chosen_chip = chip_num;
    console.log(chip_num + "fart");
    var negChance=Math.floor((Math.random()*7));
    console.log(negChance);
    if (negChance>2) {
        num = Math.floor((Math.random()*-1499) - 1); //-1 - -1500
    }
    else  {
        num = Math.floor(1 + (Math.random()*499)); //1 - 500
    }

    if(chip1_val == 0 && chip_num == 1) {
        chip1_val = num;
    }
    if(chip2_val == 0 && chip_num == 2) {
        chip2_val = num;
    }
     if(chip3_val == 0 && chip_num == 3) {
        chip3_val = num;
    }
    console.log(chip1_val);
    console.log(chip2_val);
    console.log(chip3_val);
}   

function betResult() {
    var bet = document.getElementById("guessField").value;
    var result = 0;
    if (num>bet) {
        result=bet;
    }
    else {
        result=-(bet-num);
    }
    console.log(result);
    
    if (chosen_chip == -1) {
        alert("Choose a chip before betting on a value!");
    }
    else if (chosen_chip == 1) {
        res1.textContent = chip1_val.toString();
    }
    else if (chosen_chip == 2) {
        res2.textContent = chip2_val.toString();     
    }
    else if (chosen_chip == 3) {
        res3.textContent = chip3_val.toString();        
    }
    resf.textContent = result; 

    var ciph = cipher(result);
    encr.textContent = ciph;

}

function numberToLetter(digit) {

    const alphabet = [
  'A','B','C','D','E','F','G','H','I','J',
  'K','L','M','N','O','P','Q','R','S','T',
  'U','V','W','X','Y','Z'
    ];
    console.log(alphabet[digit]);
    return alphabet[(digit)];
}

function cipher(num) {
    var stringNum = num.toString();

    var digitCount = stringNum.length;
    var result = "";

    if(num < 0) {
        for(i = 1; i < digitCount; i++) {
        console.log(Number(stringNum[i]) + 1);
        result += numberToLetter(Number(stringNum[i]));
        }
    } else {
        for(i = 0; i < digitCount; i++) {
        console.log(Number(stringNum[i]) + 1);
        result += numberToLetter(Number(stringNum[i]));
        }
    }
    
    console.log(result);
    if(num < 0) {
        return "!" + result;
    }
    else {
        return result;
    }
}
