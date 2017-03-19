function Vector(x, y) {
  this.x = x;
  this.y = y;

}

Vector.prototype.plus = function(other) {
  return new Vector(this.x + other.x, this.y + other.y);
}

Vector.prototype.minus = function(other) {
  console.log(this);
  console.log(other);
  return new Vector(this.x - other.x, this.y - other.y);
}

Object.defineProperty(Vector.prototype, "length", {
  get: function() {
    return Math.sqrt(this.x*this.x + this.y*this.y);
  }
});

v1 = new Vector(5,5);
v2 = new Vector(6,2);
sum = v1.plus(v2);
diff = v1.minus(v2);

console.log(sum, sum.x == 11, sum.y == 7);
console.log(diff, diff.x == -1, diff.y == 3);
console.log(v1.length == (Math.sqrt(5*5+5*5)));

