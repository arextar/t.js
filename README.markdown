# t.js (Beta)
### Easy CSS3 transitions in JavaScript

## Examples:

````js

// Change text color to red over 1 second:
t(elem, "color", "red", "1s").go();

// Run code after a transition has completed
t(elem, "margin", "30px", "1s").go(function(){
    this.innerHTML = "Finished!";
});

// Run a transition, then reverse it
var tr = t(elem, "backgroundColor", "blue", "1s");
tr.go(tr.revert);

// Toggle a transition
var tr = t(elem, "marginLeft", "15px", ".5s");
setInterval(tr.toggle, 750);

// Binding transition to an event (will toggle transition on click)
t(elem, "padding", "10px", "1s").on("click");

// Using transitions (can get a little buggy)
t(elem, "rotate", "45deg", "1s").go();

// Running an element on hover (runs when hovered, reverts when mouse exits)
t(elem, "scale", "2", "1s").on("hover")

````

## Todo:
1. Allow more settings
    * Easing (possibly have plugins for custom easings)
2. Transitioning multiple properties at once (pass an object of properties)
3. Allow animation of transformations seperately
    * Will need to interpolate values and use ease-in/ease-outs