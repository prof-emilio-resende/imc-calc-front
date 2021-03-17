import 'whatwg-fetch'; //polyfill for fetch API
import ProxyPolyfillBuilder from 'proxy-polyfill/src/proxy'; //polyfill for Proxy
// polyfill Proxy in the whole app
window.Proxy = ProxyPolyfillBuilder();

import React from 'react';
import ReactDOM from 'react-dom';

import Person from "./domain/Person.js";
import ImcView from './views/ImcView.jsx';
import ImcTableView from './views/ImcTableView.jsx';

import './index.scss';

class App extends React.Component {
  constructor() {
    super();

    const personObserved = this.observe(new Person());

    this.state = {
      personObserved,
      person: {}
    }

  }

  observe(obj) {
    const self = this;
    if (obj) {
      return new Proxy(obj, {
        set(target, prop, value, receiver) {
          const updated = Reflect.set(target, prop, value);
          console.log(`updated ${updated}`);
          if (target.isValid()) {
            console.log("triggering update to the view");
            self.setState({ person: target });
          } else {
            console.log("object not valid yet, skiping update on view...");
          }

          return true;
        },
      });
    }

    return obj;
  }

  calculateImc() {
    const heightElem = document.querySelector("#altura");
    const weightElem = document.querySelector("#peso");

    if (!heightElem) throw Error("height is required field!");
    if (!weightElem) throw Error("weight is required field!");

    const {personObserved: person} = this.state;

    person.height = parseFloat(heightElem.value);
    person.weight = parseFloat(weightElem.value);
  }

  render() {
    console.log('react rendering ...');

    return (<div>
      <div className="data">
        <div className="form">
          <div className="row">
            <ImcTableView />
          </div>
          <div className="row">
            <label>Altura</label>
            <input id="altura" placeholder="0.00" />
          </div>
          <div className="row">
            <label>Peso</label>
            <input id="peso" placeholder="0.00" />
          </div>
          <button type="button" className="action" onClick={this.calculateImc.bind(this)}>Calcular</button>
        </div>
      </div>
      <hr />
      <div className="data">Seu IMC &eacute; <ImcView person={this.state.person} /></div>
    </div>);
  }
}

function init(evt) {
  ReactDOM.render(<App />, document.getElementById('app'));
}

window.onload = init;
