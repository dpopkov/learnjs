var location1 = 3;
var location2 = 4;
var location3 = 5;
var guess;
var hits = 0;
var guesses = 0;
var isSunk = false;

while (!isSunk) {
	guess = prompt("Ready, aim, fire! (enter a number 0-6):");
	guess = Number.parseInt(guess);
	if (guess >= 0 && guess <= 6) {
		guesses++;
		if (guess == location1 || guess == location2 || guess == location3) {
			hits++;
			alert("HIT!");
			if (hits == 3) {
				isSunk = true;
				alert("You sunk my battleship");
			}
		} else {
			alert("MISS.");
		}
	} else {
		alert("Pleas enter a valid cell number:");
	}
}
var stats = "You took " + guesses + " guesses to sink the battleship, "
	+ "which means your shooting accuracy was " + (3 / guesses);
alert(stats);
