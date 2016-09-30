
var word = "SUN";
var letters = ["S","U","N"];
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

function createDivs(){

	
}


function guessFunc(){
	var guess = document.getElementById("guess").value;
	guess = guess.toUpperCase();
	if (word == guess){
		$("#spin").off("click");
		$("#submit").off("click");
		$("#buyVowel").off("click");
		alert("You guessed right!");
		$("#letter0").show();
		$("#letter1").show();
		$("#letter2").show();
	}else{
		alert("You guessed wrong!");
	}
	
}
function buyVowel(){
	
	var vowel = prompt("Vowels cost $250. Choose a vowel:");
	vowel = vowel.toUpperCase();
	if (vowel != undefined && isVowel(vowel)){
		cash = cash - 250;
		var search = searchWord(vowel);
		if (search== false){
			alert("That letter is not in our word. Make your Next Move");
			wrongLetters.push(letter);
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
		$("#submit").click(guessFunc);
		$("#spin").click(wheelSpin);
		$("#buyVowel").click();
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
					$("#buyVowel").click();
					alert("That letter is not in our word. Make your Next Move");
					$("#spinResult").html("$000");
					wrongLetters.push(letter);
				}else{
					var count = search;
					cash += wheelChoice;
					alert("That letter appears "+count+" times!");
					for(var i =0; i<count+1; i++){
						userLetters.push(letter);
					}
					if(userLetters.length == letters.length){
						youWin();
					}else{
						$("#submit").click(guessFunc);
						$("#spin").click(wheelSpin);
						$("#buyVowel").click();
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
	for(var i=0; i<letters.length; i++){
		if (letter==letters[i]){
			$("#letter"+i).show();
			console.log(i);
			count ++;
		}	
	}
	if (count == 0){
		console.log("letter not in word");
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