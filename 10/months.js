var months = ["January", "February", "March", "April", "May", "June",
              "July", "August", "September", "October", "November", "December"];

exports.month = function(number) {
  return months[number];
}
exports.number = function(name) {
  return months.indexOf(name);
}

