var imcView = new ImcView();
var imcTableView = new ImcTableView();

function calculateImc(evt) {
  var heightElem = document.querySelector("#altura");
  var weightElem = document.querySelector("#peso");

  if (!heightElem) throw Error("height is required field!");
  if (!weightElem) throw Error("weight is required field!");

  var height = heightElem.value;
  var weight = weightElem.value;

  var person = new Person(parseFloat(height), parseFloat(weight));
  imcView.update(person);
}

window.onload = function (evt) {
  var btn = document.querySelector(".data .form button");
  btn.addEventListener("click", calculateImc);
};
