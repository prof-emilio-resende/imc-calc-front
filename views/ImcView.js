class ImcView extends ViewComponent {
  constructor() {
    super(document.getElementById("imc-view"), new ImcController(), {
      person: null,
    });
  }

  render() {
    if (this.state.person)
      return `<strong>${this.state.person.imc} - ${this.state.person.imcDescription}</strong>`;
    else return 'N/A';
  }

  async update(person) {
    const p = await this.controller.calculateImc(person);
    this.setState({person: p});
  }
}
