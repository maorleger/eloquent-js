"use strict";

function numberToString(n, base) {
  var result = "", sign = "";

  if (n < 0) {
    sign = "-";
    n = -n;
  }

  do { 
    result = String(n % base) + result;
    n = Math.floor(n / base); 
  } while (n > 0);
  return sign + result;
}

console.log(numberToString(13, 10));

function InputError(message) {
  this.message = message;
  this.stack = (new Error()).stack;
}
InputError.prototype = Object.create(Error.prototype);
InputError.prototype.name = "InputError";

function promptDirection(question) {
  var result = prompt(question, "");
  if (result.toLowerCase() == "left") return "L";
  if (result.toLowerCase() == "right") return "R";
  throw new InputError("Invalid direction: " + result);
}

for (;;) {
  try {
    var dir = promtDirection("Where?");
    console.log("You chose", dir);
    break;
  } catch (e) {
    if (e instanceof InputError)
      console.log("Not a valid direction");
    else 
      throw e;
  }
}
