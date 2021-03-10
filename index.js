import ImcView from "./views/ImcView.js";
import ImcTableView from "./views/ImcTableView.js";
import Person from "./domain/Person.js";

function buildCalculateImc(imcView) {

  const person = imcView.observe('person', new Person());

  return function (evt) {
    const heightElem = document.querySelector("#altura");
    const weightElem = document.querySelector("#peso");

    if (!heightElem) throw Error("height is required field!");
    if (!weightElem) throw Error("weight is required field!");

    person.height = parseFloat(heightElem.value);
    person.weight = parseFloat(weightElem.value);
  };
}

function init(evt) {
  const imcView = new ImcView();
  new ImcTableView();

  const btn = document.querySelector(".data .form button");
  btn.addEventListener("click", buildCalculateImc(imcView));
}

window.onload = init;
