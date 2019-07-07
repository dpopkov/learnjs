console.log("Hello battleship.js");

function setClass(id, styleClass) {
	var e = document.getElementById(id)
	if (e) {
		e.setAttribute("class", styleClass);
	}
}

function setHit(id) {
	setClass(id, "hit");
}

function setMiss(id) {
	setClass(id, "miss");
}

var view = {
	placeShip: function(pos) {

	},
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

/*view.displayMiss("00");
view.displayHit("34");
view.displayMiss("55");
view.displayHit("12");
view.displayMiss("25");
view.displayHit("26");*/

var model = {
	boardSize: 7,
	numShips: 3,
	shipLength: 3,
	shipsSunk: 0,
	ships: [
		{ locations: ["10", "20", "30"], hits: ["", "", ""]},
		{ locations: ["32", "33", "34"], hits: ["", "", ""]},
		{ locations: ["63", "64", "65"], hits: ["", "", ""]}
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
	}
}

