var resource = "http://eloquentjavascript.net/author";

function request(accepts) {
  var req = new XMLHttpRequest();
  req.open("GET", resource, false);
  req.setRequestHeader("Accept", accepts);
  req.send(null);
}

