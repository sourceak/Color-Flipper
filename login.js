var user = document.getElementById('username');
var emailAddress = document.getElementById('email');
var enteredCode = document.getElementById('coder');
var code = document.querySelector('#code');
var showColor = document.getElementById('showColor');
var userHint = document.getElementById('userHint');
var emailHint = document.getElementById('emailHint');
const submitBtn = document.getElementById('submitBtn').addEventListener('click', signUp);

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
let randomCode = [];
let userNameTruth = false;
let emailTruth = false;

var usernamePattern = /^[A-Za-z][\w-]*(?!_)\w$/;
var emailPattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

function userName(){
    let userValue = user.value;
    if (usernamePattern.test(userValue)){
        userHint.style.visibility='hidden';
        userNameTruth = true;
    }else{
        userHint.style.visibility='visible';
    }
}

function emailCheck(){
    let emailAddressValue = emailAddress.value;
    if (emailPattern.test(emailAddressValue)){
        emailHint.style.visibility='hidden';
        emailTruth = true;
    }else{
        emailHint.style.visibility='visible';
    }
}

for (let i = 0; i < 8; i++){
    const randomLetter = (Math.floor(Math.random() * 53));
    let letter = letters.charAt(randomLetter);
    randomCode.push(letter);
}
let shownCode = randomCode.join('');
let codeChild = code.children[1];
codeChild.innerHTML = shownCode;

function signUp(e){
    if (emailTruth != true || userNameTruth != true || enteredCode.value != shownCode){
        alert('Form Not Valid!');
    }else{
        document.body.style.backgroundColor = "rgb(48, 201, 145)";
        showColor.style.visibility= 'visible';
        user.readOnly = true;
        emailAddress.readOnly = true;
        enteredCode.readOnly = true;
    }
}





