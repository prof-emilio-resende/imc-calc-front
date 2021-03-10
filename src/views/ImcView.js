import ViewComponent from '../framework/ViewComponent.js';
import ImcController from '../controller/ImcController.js';

export default class ImcView extends ViewComponent {
  constructor() {
    super(document.getElementById("imc-view"), new ImcController(), {
      person: null,
    });
  }

  render() {
    console.log('rendering!');
    console.log(this.state.person);
    if (this.state.person)
      return `<strong>${this.state.person.imc} - ${this.state.person.imcDescription}</strong>`;
    else return 'N/A';
  }

  async update(person) {
    const p = await this.controller.calculateImc(person);
    await this.setState({person: p});
  }

  async stateChanged(oldState) {
    const { person } = this.state;

    if (person && person.isValid()) {
      this.state.person = await this.controller.calculateImc(person);
    }
  }
}
