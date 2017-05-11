var MOUNTAINS = [
  {name: "Kilimanjaro", height: 5895, country: "Tanzania"},
  {name: "Everest", height: 8848, country: "Nepal"},
  {name: "Mount Fuji", height: 3776, country: "Japan"},
  {name: "Mont Blanc", height: 4808, country: "Italy/France"},
  {name: "Vaalserberg", height: 323, country: "Netherlands"},
  {name: "Denali", height: 6168, country: "United States"},
  {name: "Popocatepetl", height: 5465, country: "Mexico"}
];

function buildTable(data) {
  // naive, no error handling or edge cases
  var headers = Object.keys(data[0])
  var table = document.createElement("table");
  
  function buildRow(headers, f) {
    var parent = document.createElement("tr");
    Array.prototype.forEach.call(headers, function(headerName) {
      parent.appendChild(f(headerName));
    })

    table.appendChild(parent);
  }

  buildRow(headers, function(headerName) {
    var headerCell = document.createElement("th");
    headerCell.appendChild(document.createTextNode(headerName));
    return headerCell;
  });

  data.forEach(function(data) {
    buildRow(headers, function(headerName) {
      var dataCell = document.createElement("td");
      dataCell.appendChild(document.createTextNode(data[headerName]));
      return dataCell;
    });

  });

  console.log(table);
}


