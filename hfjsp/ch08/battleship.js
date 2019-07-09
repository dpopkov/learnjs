function setClass(id, styleClass) {
	var e = document.getElementById(id)
	if (e) {
		e.setAttribute("class", styleClass);
	}
}

var view = {
	displayHit: function(id) {
		setClass(id, "hit");
	},
	displayMiss: function(id) {
		setClass(id, "miss");
	},
	displayMessage: function(msg) {
		var messageArea = document.getElementById("messageArea");
		messageArea.innerHTML = msg;
	}
};

var model = {
	boardSize: 7,
	numShips: 3,
	shipLength: 3,
	shipsSunk: 0,
	ships: [
		{ locations: [0, 0, 0], hits: ["", "", ""]},
		{ locations: [0, 0, 0], hits: ["", "", ""]},
		{ locations: [0, 0, 0], hits: ["", "", ""]}
	],
	isSunk: function(ship) {
		for (var i = 0; i < this.shipLength; i++) {
			if (ship.hits[i] != "hit") {
				return false;
			}
		}
		return true;
	},
	fire: function(guess) {
		for (var i = 0; i < this.numShips; i++) {
			var ship = this.ships[i];
			var index = ship.locations.indexOf(guess);
			if (index >= 0) {
				ship.hits[index] = "hit";
				view.displayHit(guess);
				view.displayMessage("HIT!");
				if (this.isSunk(ship)) {
					this.shipsSunk++;
				}
				return true;
			}
		}
		view.displayMiss(guess);
		view.displayMessage("You missed.");
		return false;
	},
	allSunk: function() {
		return this.shipsSunk == this.numShips;
	},
	generateShipLocations: function() {
		var locations;
		for (var i = 0; i < this.numShips; i++) {
			do {
				locations = this.generateShip();
			} while (this.collision(locations));
			this.ships[i].locations = locations;
		}
	},
	generateShip: function() {
		var horizontal = Math.random() < 0.5;
		var row, col;
		if (horizontal) {
			row = Math.floor(Math.random() * this.boardSize);
			col = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
		} else {
			row = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
			col = Math.floor(Math.random() * this.boardSize);
		}
		var newShipLocations = [];
		for (var i = 0; i < this.shipLength; i++) {
			newShipLocations.push("" + row + col);
			if (horizontal) {
				col++;
			} else {
				row++;
			}
		}
		return newShipLocations;
	},
	collision: function(locations) {
		for (var i = 0; i < this.numShips; i++) {
			var ship = model.ships[i];
			if (ship) {
				for (var j = 0; j < locations.length; j++) {
					if (ship.locations.indexOf(locations[j]) >= 0) {
						return true;
					}
				}
			}
		}
		return false;
	}
};

function parseGuess(guess) {
	var alphabet = "ABCDEFG";
	if (guess === null || guess.length !== 2) {
		alert("Oops, please enter a letter and a number on the board");
	} else {
		var firstChar = guess.charAt(0);
		var row = alphabet.indexOf(firstChar);
		var column = guess.charAt(1);
		if (row == -1 || isNaN(column)) {
			alert("Oops, that isn't on the board");
		} else if (column < 0 || column >= model.boardSize) {
			alert("Oops, that's off the board");
		} else {
			return row + column;
		}
	}
	return null;
}

var controller = {
	guesses: 0,
	processGuess: function(guess) {
		var location = parseGuess(guess);
		if (location) {
			this.guesses++;
			var hit = model.fire(location);
			if (hit && model.allSunk()) {
				view.displayMessage("You sank all my battleships, in " + this.guesses + " guesses");
			}
		}
	}
}

function handleFireButton() {
	var guessInput = document.getElementById("guessInput");
	var guess = guessInput.value;
	controller.processGuess(guess);
	guessInput.value = "";
}

function handleKeyPress(e) {
	if (e.keyCode === 13) {
		var fireButton = document.getElementById("fireButton");
		fireButton.click();
		return false;
	}
}

function init() {
	var fireButton = document.getElementById("fireButton");
	fireButton.onclick = handleFireButton;
	var guessInput = document.getElementById("guessInput");
	guessInput.onkeypress = handleKeyPress;
	model.generateShipLocations();
}

window.onload = init;
