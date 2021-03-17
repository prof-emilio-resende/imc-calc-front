import React from 'react';

import ImcController from '../controller/ImcController.js';

export default class ImcView extends React.Component {
  constructor() {
    super();
    this.state = {
      controller: new ImcController(),
      person: {}
    }
  }

  render() {
    console.log('rendering!');
    console.log(this.state.person);
    if (this.state.person)
      return (<strong>{this.state.person.imc} - {this.state.person.imcDescription}</strong>);
    else return (<span>N/A</span>);
  }

  async componentDidUpdate() {
    console.log('react updating component (imcview)...');

    const { person: propsPerson } = this.props;
    const { person } = this.state;

    if (propsPerson && propsPerson.isValid() && !propsPerson.equals(person)) {
      const newPerson = await this.state.controller.calculateImc(propsPerson);
      this.setState({person: newPerson});
    }
  }
}
