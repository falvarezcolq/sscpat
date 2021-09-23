import React from "react";
import { connect } from "react-redux";
// import { getNameType } from "../../actions/helper";
import { listStudents } from "../../actions/students";
import {
  add_to_author_list,
  remove_author_list,
  add_authors,
} from "../../actions/projects";
import { messageWarning } from "../../actions/messages";
// import NavPagination from "./NavPagination";
import NavPagination from "../tables/NavPagination";
import Config from "../../utils/Config";
import PropTypes from "prop-types";
import { validateInput } from "../../utils/Validations";
import { Link } from "react-router-dom";
import Spinner from "../atoms/Spinner";

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

class AddUserProject extends React.Component {
  static url = Config.StudentApiUrl;
  static propTypes = {
    students: PropTypes.object.isRequired,
    project: PropTypes.object.isRequired,
  };

  state = {
    search: "",
    size: 10,
    type: "",
    ordering: null,
    page: 1,
    loading: false,
  };

  errors = {};

  setLoading = (value) => {
    this.setState({ ...this.state, loading: value });
  };
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

  save_authors = async () => {
    const project = this.props.project;
    const authors = this.props.authors;
    if (project) {
     
      if (authors.length <= project.modality.config.max_author) {
        const users = Array.from(authors, (obj) => obj.id);
        this.setLoading(true);
        await this.props.add_authors(project.id, { users: users });
        this.setLoading(false);
      } else {
        this.props.messageWarning({
          detail:
            "¡No esta permitido registrar mas de " +
            project.modality.config.max_author +
            " estudiante(s)  en esta modalidad!",
        });
      }
    }
  };

  render() {
    const students = this.props.students;
    const project = this.props.project;
    const authors = this.props.authors;
    const { results } = students;
    return (
      <div className="row">
        <div className="col-lg-6">
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
              <div
                className="table-responsive"
                style={{ boxShadow: "0px 0px 2px 5px rgba(0, 0, 0, 0.2)" }}
              >
                {results.length === 0 ? (
                  <h3> No se ha encontrado estudiantes</h3>
                ) : (
                  <>
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>CI</th>
                          <th>Apellidos y nombres</th>
                          <th>Acción</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.map((user) => (
                          <tr key={user.id}>
                            <td>{user.CI}</td>
                            <td>
                              <Link to={Config.aStudentsUrl + "/" + user.id}>
                                {user.last_name} {user.last_name2}{" "}
                                {user.first_name}
                              </Link>
                            </td>

                            <td>
                              <button
                                className="btn btn-primary btn-xs"
                                onClick={() => {
                                  this.props.add_to_author_list(user.id);
                                }}
                              >
                                Agregar
                              </button>
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
        </div>
        <div className="col-lg-6">
          <div className="row">
            {project && (
              <>
                <div className="col-lg-12">
                  <h2>Agregar Estudiante</h2>
                  Tema: {project.title_academic_project} <br />
                  Modalidad: {project.modality.title} <br />
                  Cantidad de m&aacute;xima de estudiantes:{" "}
                  {project.modality.config.max_author}
                </div>

                <div className="col-lg-12">
                  <div
                    className="table-responsive"
                    style={{ boxShadow: "0px 0px 2px 5px rgba(0, 0, 0, 0.2)" }}
                  >
                    {project.authors.length === 0 ? (
                      <h4> No se ha agregado ningun estudiante </h4>
                    ) : (
                      <>
                        <table className="table table-hover">
                          <thead>
                            <tr>
                              <th>CI</th>
                              <th>Apellidos y nombres</th>
                              <th>Acción</th>
                            </tr>
                          </thead>
                          <tbody>
                            {authors.map((user) => (
                              <tr key={user.id}>
                                <td>{user.CI}</td>
                                <td>
                                  <Link
                                    to={Config.aStudentsUrl + "/" + user.id}
                                  >
                                    {user.last_name} {user.last_name2}{" "}
                                    {user.first_name}
                                  </Link>
                                </td>

                                <td>
                                  <button
                                    className="btn btn-warning btn-xs"
                                    onClick={() =>
                                      this.props.remove_author_list(user.id)
                                    }
                                  >
                                    X
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                        {this.state.loading ? (
                          <div className="align-center">
                            <Spinner size="sm"/> Registrando...
                          </div>
                        ) : (
                          <div className="align-center">
                            <button
                              className="btn btn-success"
                              onClick={this.save_authors}
                            >
                              Registrar y/o guardar cambios de autores
                            </button>
                          </div>
                        )}
                        <br />
                      </>
                    )}
                  </div>
                </div>
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
  project: state.projects.object,
  authors: state.projects.authors,
});

const mapDispatchToProps = {
  listStudents,
  add_to_author_list,
  remove_author_list,
  messageWarning,
  add_authors,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUserProject);
