import React from "react";
import { connect } from "react-redux";
// import { getNameType } from "../../actions/helper";
import { listStudents } from "../../actions/students";
import NavPagination from "./NavPagination";
import Config from "../../utils/Config";
import PropTypes from "prop-types";
import { validateInput } from "../../utils/Validations";
import { Link } from "react-router-dom";

const validate = {
  search: {
    max_length: 50,
  },
  size: {
    integer: true,
    max_integer: 100,
    min_integer: 1,
  },
};

class StundentTable extends React.Component {
  static url = Config.StudentApiUrl;
  static propTypes = {
    students: PropTypes.object.isRequired,
  };

  state = {
    search: "",
    size: 10,
    type: "",
    ordering: null,
    page: 1,
  };

  errors = {};

  onChange = (e) => {
    const { name, value: newValue, type } = e.target;
    const value = type === "number" ? +newValue : newValue;
    this.setState({ [name]: value });
    const error = validateInput(name, value, validate[name]);

    this.errors = {
      ...this.errors,
      [name]: error,
    };
  };

  componentDidMount() {
    this.props.listStudents(this.url);
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (Object.values(this.errors).every((t) => t === null)) {
      this.props.listStudents(this.url, this.state);
    }
  };

  percentBar = (current_project, id) => {
    if (!current_project) {
      return  <Link  className="btn btn-xs btn-warning"  to={Config.aProjectsNewUrl + id}> Asignar proyecto</Link>;
    }

    const percentage = current_project.progress === 0 ? 10 : (current_project.progress / 12) * 100;
    
    return (
      <>
        <div
          className="progress"
          style={{ margin: "0", width: "100%", display: "inline-block" }}
        >
          <div
            className={
              current_project.progress === 0 ?
              "progress-bar bg-red":
              "progress-bar bg-green"
            }
            style={{ width: percentage + "%" }}
          >
            {current_project.progress} 
          </div>
        </div>
      </>
    );
  };

  render() {
    const students = this.props.students;
    const { results } = students;
    return (
      <div className="row">
        <form onSubmit={this.onSubmit}>
          <div className="col-lg-6">
            <div className="form-group">
              <label>Buscar</label>
              <div className="form-line">
                <input
                  type="text"
                  className="form-control"
                  name="search"
                  placeholder="Buscar..."
                  onChange={this.onChange}
                  value={this.state.search}
                ></input>
              </div>
              {this.errors.search ? (
                <label id="search-error" className="error" htmlFor="search">
                  {this.errors.search}
                </label>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="col-lg-2">
            <div className="form-group">
              <label>Cantidad</label>
              <div className="form-line">
                <input
                  type="number"
                  className="form-control"
                  name="size"
                  onChange={this.onChange}
                  value={this.state.size}
                ></input>
              </div>
              {this.errors.size ? (
                <label id="size-error" className="error" htmlFor="username">
                  {this.errors.size}
                </label>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="col-lg-2">
            <div className="form-group">
              <button type="submit" className="btn btn-primary pt-20">
                Buscar
              </button>
            </div>
          </div>
        </form>
        <div className="col-lg-12">
          <div className="table-responsive">
            {results.length === 0 ? (
              <h3> No se ha encontrado estudiantes</h3>
            ) : (
              <>
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>CI</th>
                      <th>Apellidos y nombres</th>
                      <th>Proyecto</th>
                      <th>Cant. Proyectos</th>
                      <th>Nro de avances del estudiante</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((user) => (
                      <tr key={user.id}>
                        <td>{user.CI}</td>
                        <td>
                          <Link to={Config.aStudentsUrl + "/" + user.id}>
                            {user.last_name} {user.last_name2} {user.first_name}
                          </Link>
                        </td>

                        <td>
                          {" "}
                          {user.current_project && (
                            <Link
                              to={
                                Config.aProjectsUrl +
                                "/" +
                                user.current_project.id
                              }
                            >
                              {user.current_project.title_academic_project}
                            </Link>
                          )}
                        </td>
                        <td> {user.total}</td>
                        <td>
                          {this.percentBar(
                            user.current_project,
                            user.id
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <NavPagination
                  context={students.context}
                  loadList={this.props.listStudents}
                />
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  students: state.students,
});

const mapDispatchToProps = {
  listStudents,
};

export default connect(mapStateToProps, mapDispatchToProps)(StundentTable);
