import React from "react";

import ImcController from "../controller/ImcController.js";

export default class ImcTableView extends React.Component {
  constructor() {
    super();

    this.state = {
      controller: new ImcController(),
      data: [],
    };
  }

  componentDidMount() {
    this.state.controller.getImcTable().then((data) => {
      console.log("retornou da api");
      console.log(data);
      this.setState({ data });
    });
  }

  renderTable() {
    if (this.state.data) {
      return this.state.data.map((el) => (
        <tr key={el.minValue}>
          <td>{el.minValue}</td>
          <td>{el.description}</td>
        </tr>
      ));
    }

    return null;
  }

  render() {
    return (
      <table>
        <tbody>{this.renderTable()}</tbody>
      </table>
    );
  }
}
