"use strict";

function MultiplicationUnitFailure(message) {
  this.message = message;
  this.stack = (new Error()).stack;
}
MultiplicationUnitFailure.prototype = Object.create(Error.prototype);
MultiplicationUnitFailure.prototype.name = "MultiplicationUnitFailure";

function primitiveMultiply(n1, n2) {
  if (Date.now() % 2 == 0) {
    return n1 * n2;
  } else {
    throw new MultiplicationUnitFailure("get schwifty");
  }
}

function retryMultiply(n1, n2) {
  try {
    return primitiveMultiply(n1, n2);
  } catch (e) {
    if (e instanceof MultiplicationUnitFailure) {
      return retryMultiply(n1, n2);
    } else {
      throw e;
    }
  }
}

for (var i = 1; i < 10; i++) {
  for (var j = i; j < 10; j++) {
    console.log(retryMultiply(i, j));
  }
}
