var simple = document.getElementById('simpleButton');
var shades = document.getElementById('complexButton');
var drawing = document.getElementById('background1');
var saves = document.getElementById('savedButton');
var firstSelect = document.getElementById('firstSelect');
var ul = document.getElementById('ul-items');
var element = document.querySelector('body');

var palette = false;
var sort = true;

simple.addEventListener("click", colorChange);
shades.addEventListener("click", infinite);
saves.addEventListener("click", saveColor);
ul.addEventListener("click", killColor);
var randomNum = [];
const colors = ['red', 'green', 'blue'];

//switch between primary colors (red, green, blue)
function colorChange(e){
    removed = colors.shift();
    currentColor = colors[0];
    element.style.background = currentColor;
    colors.push(removed);
    drawing.innerHTML = "Background Color: " + currentColor;
}
//randomly generates from all the combinations of (r,g,b) 
function infinite(e){
    palette = false;
    randomGen();
    setColors();
}
//generates 3 numbers and sorts them into (r,g,b) 
function randomGen(){
    randomNum.length = 0
    if (palette === true){
        function valueBetween(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min) + min); 
        }
        randomNum.push(valueBetween(114, 256));
        for(let i = 0; i < 2; i++){
            randomNum.push(Math.floor(Math.random() * 100));
        }
        if (sort === true){
            randomNum.sort(function(a, b){return b - a});
        }else if (sort === false){
            randomNum.sort(function(a, b){return a - b});
            setColors();
        }
    }else{
        for(let i = 0; i < 3; i++){
            randomNum.push(Math.floor(Math.random() * 256));
        }
    }
}
//this changes the background and shows the (r,g,b) code
function setColors(){
    element.style.background = `rgb( ${randomNum[0]}, ${randomNum[1]}, ${randomNum[2]})`;
    drawing.innerHTML = "Background Color: " + randomNum;
}
//this is shade. produces shades of only red, green or blue based on what the user chooses in select
function shade(){
    var selectedValue2 = firstSelect.options[firstSelect.selectedIndex].value;
    if (selectedValue2 == 'red') {
        shades.addEventListener("click", redShade);
        function redShade(e){
            palette = true;
            sort = true;
            randomGen();
            setColors();
        }
    }else if (selectedValue2 == 'green') {
        shades.addEventListener("click", greenShade);
        console.log('its green');
        function greenShade(e){
            palette = true;
            sort = true;
            randomGen();
            [randomNum[0], randomNum[1]] = [randomNum[1], randomNum[0]];
            setColors();
        }
    }else if (selectedValue2 == 'blue') {
        shades.addEventListener("click", blueShade);
        console.log('its blue');
        function blueShade(e){
            palette = true;
            sort = false;
            randomGen();
        }
    }else{
        shades.addEventListener("click", infinite)
        function infinite(e){
            palette = false;
            randomGen();
            setColors();
        }
    }
}
//this creates an element and saves the (r,g,b) code when the user clicks save
function saveColor(e){
    var li = document.createElement('li');
    linebreak = document.createElement("br");
    ul.appendChild(linebreak);
    const backgroundColor = drawing.innerHTML;
    const savedNum = backgroundColor.substring(18);
    li.appendChild(document.createTextNode(savedNum + ' '));
    var delBtn = document.createElement('button');
    delBtn.className = 'del-btn';
    delBtn.appendChild(document.createTextNode('X'));
    li.appendChild(delBtn);
    ul.appendChild(li);
}
//this removes from saved list when the user clicks the X
function killColor(e){
    if (e.target.classList.contains('del-btn')){
        li = e.target.parentElement;
        ul.removeChild(li);
    }
}
        
