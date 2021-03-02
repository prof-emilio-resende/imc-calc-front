function createRequest() {
  var request = null;
  try {
    request = new XMLHttpRequest();
  } catch (tryMS) {
    try {
      request = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (otherMS) {
      try {
      request = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (failed) {
        console.log('no way to create XMLHttpRequest object');
      }
    }
  }

  return request;
}

function handleImcCalculateResponse(evt) {
  console.log(evt);
  if (evt.currentTarget.readyState == 4) {
    if (evt.currentTarget.status == 200) {
      console.log(evt.currentTarget.responseText);
      var obj = JSON.parse(evt.currentTarget.responseText);
      document.querySelector('#imc').innerHTML = obj.imc + ' ' + obj.imcDescription;
    } else {
      console.log('Ooops...');
    }
  } else {
    console.log(evt.currentTarget.readyState);
    console.log('pending');
  }
}

function calculateImcFromAPI(person) {
  var url = 'http://localhost:8080';
  var path = '/imc/calculate';

  var request = createRequest();
  request.onreadystatechange = handleImcCalculateResponse;
  request.open('POST', url+path, true);
  request.setRequestHeader("Content-Type", "application/json");
  console.log(JSON.stringify(person));
  request.send(JSON.stringify(person));
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
  this.imcDescription = 'N/A';
}

function Dietician(height, weight) {
  Person.call(this, height, weight);
  console.log('Creating Dietician...;');
  this.calculateImc = function() {
    calculateImcFromAPI(this);
  }
}

Person.prototype = Object.create(Speaker.prototype);
Person.prototype.constructor = Person;
Dietician.prototype = Object.create(Person.prototype);
Dietician.prototype.constructor = Dietician;

function calculateImc(evt) {
  var heightElem = document.querySelector('#altura');
  var weightElem = document.querySelector('#peso');

  if(!heightElem) throw Error('height is required field!');
  if(!weightElem) throw Error('weight is required field!');

  var height = heightElem.value;
  var weight = weightElem.value;

  var dietician = new Dietician(parseFloat(height), parseFloat(weight));
  dietician.calculateImc();
}

window.onload = function(evt) {
  console.log(evt);
  var btn = document.querySelector('.data .form button');
  
  btn.addEventListener('click', calculateImc);
};
