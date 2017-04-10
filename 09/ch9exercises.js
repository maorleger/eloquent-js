var regex1 = new RegExp(/ca[a-z]/);
console.log(regex1.test("car"));
console.log(regex1.test("cat"));

var regex2 = new RegExp(/p[a-z]?op/);
console.log(regex2.test("pop"));
console.log(regex2.test("prop"));

var regex3 = new RegExp(/ferr[a-z]{0,3}/);
console.log(regex3.test("ferret"));
console.log(regex3.test("ferry"));
console.log(regex3.test("ferrari"));

var regex4 = new RegExp(/\b.*ious/);
console.log(regex4.test("glorious"));

var regex5 = new RegExp(/\s(\.|,|:|;)/);
console.log(regex5.test(" ."));
console.log(regex5.test(" ,"));
console.log(regex5.test(" :"));
console.log(regex5.test(" ;"));
console.log(regex5.test(" . fdsfds"));

var regex6 = new RegExp(/\b[a-z]{6,}\b/);
console.log(regex6.test("blah"));
console.log(regex6.test("abcdef"));
console.log(regex6.test("fkljdsfljds"));

var regex7 = new RegExp(/\b[^e]+\b/);

console.log("my test string 'here' is one quote and here is an apostro'phe and 'there is some more multi word quote' and that's it".replace(/\s'/g, ' "').replace(/'\s/g, '" '));

