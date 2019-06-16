function playBottles(count) {
    var word = "bottles";
    while (count > 0) {
        console.log(count + " " + word + " of beer on the wall");
        console.log(count + " " + word + " of beer, ");
        console.log("take one down, pass it around");
        count--;
        if (count == 1) {
            word = "bottle";
        }
        if (count > 0) {
            console.log(count + " " + word + " of beer on the wall.");
        } else {
            console.log("No more " + word + " of beer on the wall.");
        }
    }
}
