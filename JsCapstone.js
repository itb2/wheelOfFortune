
var word = prompt("Choose a word or phrase for your friend to guess.");
word = word.toUpperCase();
var letters;
var theme = prompt("What is the theme of your word or phrase?");
var allVowels = ["A","E","I","O","U"];
var userLetters = [];
var userVowels =[];
var userCons = [];

var wrongLetters = [];

var cash = 0;

var wheelOptions = [5000, 600, 500, 300, 500, 800, 550, 400, 300, 900, 500, 300, 900, "Bankrupt", 600, 400, 300, "Lose A Turn", 800, 350, 450, 700, 300 , 600];


$("#submit").click(guessFunc);
$("#spin").click(wheelSpin);
$("#buyVowel").click(buyVowel);

function makeArray(){
	letters = word.split("");
	for (var i=0;i<letters.length;i++){
		if(letters[i]== " "){
			letters.splice(i,1);
		}
	}
	
}
makeArray();
console.log(letters);

function createDivs(){
	$("#theme").html(theme);
	for(var i=0; i<word.length; i++){
		var elem = document.createElement("div");
		document.getElementById("display").appendChild(elem);
		elem.setAttribute("id",String(i));
		elem.setAttribute("class","letters");
		$("#"+i+"").html(word[i]);
		if(word[i] == " "){
			$("#"+i).css("background-color","black");
		}else{
			$("#"+i).css("color", "white");	
		}
	}
}
createDivs();


function guessFunc(){
	var guess = document.getElementById("guess").value;
	guess = guess.toUpperCase();
	if (word == guess){
		$("#spin").off("click");
		$("#submit").off("click");
		$("#buyVowel").off("click");
		alert("You guessed right!");
		for(var i=0; i<word.length; i++){
			$("#"+i).css("color", "black");
		}
	}else{
		alert("You guessed wrong!");
	}
	
}
function buyVowel(){
	
	var vowel = prompt("Vowels cost $250. Choose a vowel:");
	vowel = vowel.toUpperCase();
	if (vowel != undefined && isVowel(vowel)){
		cash = cash - 250;
		$("#cash").html(String(cash));
		var search = searchWord(vowel);
		if (search== false){
			alert("That letter is not in our word. Make your Next Move");
			wrongLetters.push(vowel);
			$("#wrong").html(String(wrongLetters));
		}else{
			var count = search;
			alert("That letter appears "+count+" times!");
			for(var i =0; i<count+1; i++){
				userLetters.push(vowel);
			}
			if(userLetters.length == letters.length){
				youWin();
			}
			
		}
	}else if(!isVowel(vowel) && vowel != undefined){
		buyVowel();
	}
}

function wheelSpin(){
	$("#spin").off("click");
	$("#submit").off("click");
	$("#buyVowel").off("click");
	var index = getRandomIntInclusive(0, 23);
	console.log("index: " + index);
	var wheelChoice = wheelOptions[index];
	console.log("spin result: " + wheelChoice);

	if( wheelChoice == "Bankrupt"){
		cash = 0;
		$("#cash").html(String(cash));
		$("#submit").click(guessFunc);
		$("#spin").click(wheelSpin);
		$("#buyVowel").click(buyVowel);
		$("#spinResult").html("Bankrupt");
		alert("Yikes! You lost all your cash! Make your next move.");
	}else if( wheelChoice == "Lose A Turn"){
		$("#spin").click(wheelSpin);
		$("#spinResult").html("Lose A Turn");
		alert("That turn was no good. Turn again!");
	}else{
		$("#spinResult").html("$"+wheelChoice);
		setTimeout(popUp(), 1000);
	}
	function popUp(){
			var letter = prompt("Choose a consonant:")
			letter = letter.toUpperCase();
			if (letter.length > 1 || isVowel(letter)){
				console.log(letter);
				popUp();
			}else{
				var search = searchWord(letter);
				if (search== false){
					$("#submit").click(guessFunc);
					$("#spin").click(wheelSpin);
					$("#buyVowel").click(buyVowel);
					alert("That letter is not in our word. Make your Next Move");
					$("#spinResult").html("$000");
					wrongLetters.push(letter);
					$("#wrong").html(String(wrongLetters));
				}else{
					var count = search;
					cash += wheelChoice;
					$("#cash").html(String(cash));
					alert("That letter appears "+count+" times!");
					for(var i =0; i<count+1; i++){
						userLetters.push(letter);
					}
					if(userLetters.length == letters.length){
						youWin();
					}else{
						$("#submit").click(guessFunc);
						$("#spin").click(wheelSpin);
						$("#buyVowel").click(buyVowel);
					}
					
				}
				
			}	
		}	
}
function youWin(){
	alert("You Won!");
}

function searchWord(letter){
	var count = 0;
	for(var i=0; i<word.length; i++){
		if (letter==word[i]){
			$("#"+i).css("color", "black");
			count ++;
		}	
	}
	if (count == 0){
		alert("letter not in word");
		return false;
	}else{
		return count;
	}

}

//following code borrowed from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function isVowel(x){
	if(x == "A" || x == "E" || x == "I" || x == "O" || x == "U" ) {
		return true;
	}else{
		return false;
	}

}
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}