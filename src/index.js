import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, NavbarBrand } from "reactstrap";
import "./styles.css";
import "font-awesome/css/font-awesome.min.css";
import employees from "./content.json";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      search: "",
      search2: "",
      sur: employees.Employess[0].surveys,
      emp_sur: employees.Surveys.filter(
        (x) => employees.Employess[0].surveys.indexOf(x) === -1
      ),
    };
    this.handleChange = this.handleChange.bind(this);
  }

  updateSearch(event) {
    this.setState({ search: event.target.value });
  }
  updateSearch2(event) {
    this.setState({ search2: event.target.value });
  }
  handleChange(event) {
    var names = [];
    for (var i = 0; i < employees.Employess.length; i++) {
      if (employees.Employess[i].name == event.target.value)
        names = employees.Employess[i].surveys;
    }
    var values = [];
    for (var i = 0; i < employees.Surveys.length; i++) {
      if (names.includes(employees.Surveys[i]) == false)
        values.push(employees.Surveys[i]);
    }

    this.setState({ value: event.target.value, sur: names, emp_sur: values });
  }
  deleteUser = (index, e) => {
    const copyemp_sur = Object.assign([], this.state.emp_sur);
    copyemp_sur.splice(index, 1);
    var valueAtIndex = this.state.emp_sur[index];
    this.setState({
      emp_sur: copyemp_sur,
      sur: this.state.sur.concat(valueAtIndex),
    });
  };
  deleteUser2 = (index, e) => {
    const copy_sur = Object.assign([], this.state.sur);
    copy_sur.splice(index, 1);
    var valueAtIndex = this.state.sur[index];
    this.setState({
      sur: copy_sur,
      emp_sur: this.state.emp_sur.concat(valueAtIndex),
    });
  };

  render() {
    let filtered = this.state.emp_sur.filter((survey) => {
      return survey.indexOf(this.state.search) !== -1;
    });
    let filtered2 = this.state.sur.filter((survey) => {
      return survey.indexOf(this.state.search2) !== -1;
    });
    return (
      <div>
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Survey App</NavbarBrand>
          </div>
        </Navbar>
        <br></br>
        <div className="container">
          <div className="row>">
            <p align="center">
              <h3> Select Employee</h3>
              <select onChange={this.handleChange}>
                {employees.Employess.map((employee) => (
                  <option value={employee.name}>{employee.name}</option>
                ))}
              </select>
            </p>
          </div>
          <br></br>
          <div className="row">
            <div className="col-6">
              <p align="center">
                <div className="input-icons">
                  {" "}
                  <h6>Surveys</h6>
                  <i className="fa fa-search icon"></i>
                  <input
                    className="input-field"
                    type="text"
                    value={this.state.search}
                    placeholder="Search"
                    onChange={this.updateSearch.bind(this)}
                  />
                </div>
                <ul className="list-group">
                  {filtered.map((survey, index) => (
                    <li className="d-flex p-2" key={survey} value={survey}>
                      {survey}
                      <button
                        className="badge badge-primary badge-pill"
                        onClick={this.deleteUser.bind(this, index)}
                      >
                        +
                      </button>
                    </li>
                  ))}
                </ul>
              </p>
            </div>
            <div className="col-6">
              <p align="center">
                <div className="input-icons">
                  <h6>Assigned Surveys</h6>
                  <i className="fa fa-search icon"></i>
                  <input
                    className="input-field"
                    type="text"
                    value={this.state.search2}
                    placeholder="Search"
                    onChange={this.updateSearch2.bind(this)}
                  ></input>
                </div>

                <ul className="list-group">
                  {filtered2.map((survey, index) => (
                    <li className="d-flex p-2 " key={survey} value={survey}>
                      {survey}
                      <button
                        className="badge badge-primary badge-pill"
                        onClick={this.deleteUser2.bind(this, index)}
                      >
                        -
                      </button>
                    </li>
                  ))}
                </ul>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
ReactDOM.render(<App />, document.querySelector("#root"));
