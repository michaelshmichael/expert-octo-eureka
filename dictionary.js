function shuffleWord (word){
    var shuffledWord = '';
    word = word.split('');
    while (word.length > 0) {
      shuffledWord +=  word.splice(word.length * Math.random() << 0, 1);
    }
    return shuffledWord;
};

const DICTIONARY = [
{russian: "сыр",english: "cheese",hint: shuffleWord("cheese")},
{russian: "корова",english: "cow",hint: shuffleWord("cow")},
{russian: "яблоко",english: "apple",hint: shuffleWord("apple")},
{russian: "два",english: "two",hint: shuffleWord("two")}
];

//const check = document.getElementById("check");
const NEW_WORD = document.getElementById("newWord");
let initial = document.getElementById("initial");
//let translation = document.getElementById("translation");
let streak = document.getElementById("streak");
let highStreak = document.getElementById("highStreak");
//let randomInt = Math.floor(Math.random()*DICTIONARY.length);
//initial.textContent = '"' + DICTIONARY[randomInt].russian + '"';
let wrongArray = []
let counter = 0;
const correct = new Audio("ding.mp3");
const win = new Audio("yay-yeah.mp3");


// PROVIDES FIRST WORD AND ALL FUTURE WORDS
NEW_WORD.addEventListener("click", function(){
	randomInt = Math.floor(Math.random()*DICTIONARY.length);
		initial.textContent = '"' + DICTIONARY[randomInt].russian + '"';
			//RESET ALL VALUES
		$("#translation").val("");
		$("#result").text("");
		$("#hint").text("");
});

// RETURN KEY AS ENTERING TEXT FIELD
translation.addEventListener("keypress", function(e){
	if(e.keyCode === 13){
		let translation = document.getElementById("translation").value;

		// GUESS IS CORRECT
		if(translation === DICTIONARY[randomInt].english){
			result.textContent = "Correct!";
			result.style.color = "lime";
			correct.play();
			$("#hint").text("");

			$("#translation").keypress(function(e){
  				if (e.which == 13) {
    			return false;
  				}
			});
			
			// KEEPING COUNT
			counter++;
			streak.textContent = counter;

			// UPDATING STREAK SCORE
			if(streak.textContent > highStreak.textContent){
				highStreak.textContent = streak.textContent;
			};
			
			// REMOVE THAT WORD FROM OBJECT
			DICTIONARY.splice(randomInt, 1);

			// WHEN ALL WORDS ARE GUESSED CORRECTLY
			if(DICTIONARY.length === 0){
				initial.textContent = "Well Done! Set Finished!"
				// DISPLAY THE INCORRECT GUESSES TO LEARN AGAIN
				result.textContent = "You need to learn: " + wrongArray
				if(wrongArray.length === 0){
					result.textContent = "No mistakes! :)";
					win.play();
				};
			};
		
		// GUESS IS INCORRECT
		} else {
			result.textContent = "Try Again.";
			result.style.color = "red";
			counter = 0;
			streak.textContent = counter;
			//incorrect.play();
			$("#hint").text("Hint:  " + DICTIONARY[randomInt].hint);

			// CREATE ARRAY WITH INCORRECT GUESSES (NO REPEATS)
			if(wrongArray.includes(DICTIONARY[randomInt].english) === false) wrongArray.push(DICTIONARY[randomInt].english);
		};
	};
});