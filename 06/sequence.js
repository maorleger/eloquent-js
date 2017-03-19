function RangeSeq(from, to) {
  this.curr = from - 1;
  this.to = to;
}

RangeSeq.prototype.current = function() {
  return this.curr;
}

RangeSeq.prototype.next = function() {
  if (this.curr >= this.to) {
    return false;
  }
  this.curr++;
  return true;
}

function ArraySeq(array) {
  this.curr = 0;
  this.arr = array;
}

ArraySeq.prototype.current = function() {
  return this.arr[this.curr];
}

ArraySeq.prototype.next = function() { 
  if (this.curr >= this.arr.length - 1) {
    return false;
  }
  this.curr++;
  return true;
}

var x = new ArraySeq([1,2,3,4]);
console.log(x.current());
x.next();
console.log(x.current());
x.next();
console.log(x.current());
x.next();
console.log(x.current());
x.next();
console.log(x.current());
x.next();
