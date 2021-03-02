var imcLabel = function(imc) {
  if (imc < 18.5) return 'Magreza';
  if (imc < 24.9) return 'Normal';
  if (imc < 30) return 'Sobrepeso';
  if (imc >= 30) return 'Obesidade';
  return 'N/A';
}

function Speaker() {
  this.speech = function(txt) {
    document.querySelector('#imc').innerHTML = txt;
  }
}

function Person(height, weight) {
  Speaker.call(this);
  this.height = height;
  this.weight = weight;
  this.imc = -1;
}

function Dietician(height, weight) {
  Person.call(this, height, weight);
  console.log('Creating Dietician...;');
  this.calculateImc = function() {
    this.imc = (this.weight / (this.height ** 2));
    this.speech(`${this.imc} ${imcLabel(this.imc)}`);
  }
}

Person.prototype = Object.create(Speaker.prototype);
Person.prototype.constructor = Person;
Dietician.prototype = Object.create(Person.prototype);
Dietician.prototype.constructor = Dietician;
Speaker.prototype.sayHey = function() { alert('Hey') };

function calculateImc(evt) {
  var heightElem = document.querySelector('#altura');
  var weightElem = document.querySelector('#peso');

  if(!heightElem) throw Error('height is required field!');
  if(!weightElem) throw Error('weight is required field!');

  var height = heightElem.value;
  var weight = weightElem.value;

  var dietician = new Dietician(parseFloat(height), parseFloat(weight));
  dietician.calculateImc();
  dietician.sayHey();
}

window.onload = function(evt) {
  console.log(evt);
  var btn = document.querySelector('.data .form button');
  
  btn.addEventListener('click', test);
  btn.addEventListener('click', calculateImc);
};

function test(evt){ 
  console.log(evt);
  console.log('oi test');

}