import ViewComponent from '../framework/ViewComponent.js';
import ImcController from '../controller/ImcController.js';

export default class ImcTableView extends ViewComponent {
  constructor() {
    super(document.getElementById("imc-table"), new ImcController(), { data: [] })
    
    this.controller.getImcTable().then(data => {
      console.log("retornou da api");
      console.log(data);
      this.setState({ data });
    });
  }

  renderTable() {
    if (this.state.data) {
      return this.state.data
        .map(
          (el) => `<tr>
                    <td>${el.minValue}</td>
                    <td>${el.description}</td>
                </tr>`
        )
        .join("");
    }

    return "";
  }

  render() {
    if (this.state.data)
      return `<table><tbody>${this.renderTable()}</tbody></table>`;
    else return `<table><tbody></tbody></table>`;
  }
}
