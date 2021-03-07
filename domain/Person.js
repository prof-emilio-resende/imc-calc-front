class Person {
  constructor(height, weight) {
    this.height = height;
    this.weight = weight;
    this.imc = -1;
    this.imcDescription = "N/A";
  }

  get height() {
    return this._height;
  }

  set height(theHeight) {
    this._height = theHeight;
  }

  get weight() {
    return this._weight;
  }

  set weight(theWeight) {
    this._weight = theWeight;
  }

  get imc() {
    return this._imc;
  }

  set imc(theImc) {
    this._imc = theImc;
  }

  toObject() {
    return {
      height: this._height,
      weight: this._weight
    }
  }
}
