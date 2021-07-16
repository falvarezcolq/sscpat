import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addTutor, removeTutor, searchTutor } from "../../../actions/tutors";

class TutorAdd extends React.Component {
  static propTypes = {
    tutorSearch: PropTypes.array.isRequired,
    tutorAddedList: PropTypes.array.isRequired,
  };
  state = {
    query: "",
  };
 
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    const query = this.state.query;
    console.log(query);
    this.props.searchTutor(query);
  };

  render() {
    console.log(this.props);
    return (
      <section className="content">
        <div className="container-fluid">
          <div className="block-header">
            <h2>Agregar Tutor</h2>
          </div>
        </div>

        <div className="row clearfix">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="card">
              <div className="header">
                <h2>
                  Agregar Tutores al sistema desde el sistema principal
                  <small>
                    El sistema hace una busqueda de los docentes de la Carrera
                    de Administracion de empresas, para que participen como
                    tutores.
                  </small>
                </h2>

                <div className="row">
                  <div className="col-lg-6">
                    <form onSubmit={this.onSubmit}>
                      <div className="input-group">
                        <div className="form-line">
                          <input
                            type="text"
                            name="query"
                            className="form-control"
                            placeholder=" Buscar por nombre o apellido..."
                            onChange={this.onChange}
                            value={this.state.query}
                          />
                        </div>
                        <span className="input-group-btn">
                          <button className="btn btn-primary" type="submit">
                            Buscar
                          </button>
                        </span>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div className="body table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Nombre</th>
                      <th>Apellido Paterno</th>
                      <th>Apellido Materno</th>
                      <th>Opciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.tutorSearch.map((tutor, index) => (
                      <tr key={index}>
                        <th scope="row">{tutor.ci}</th>
                        <td>{tutor.first_name}</td>
                        <td>{tutor.last_name}</td>
                        <td>{tutor.last_name2}</td>
                        <td>
                          <button
                            className="btn btn-primary btn-xs"
                            onClick={this.props.addTutor.bind(this, tutor.id)}
                          >
                            <b>+</b> Agregar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="row clearfix">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="card">
              <div className="header">
                <h2>Tutores agregados recientemente</h2>
              </div>
              <div className="body table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Nombre</th>
                      <th>Apellido Paterno</th>
                      <th>Apellido Materno</th>
                      <th>Opciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.tutorAddedList.map((tutor, index) => (
                      <tr key={index}>
                        <th scope="row">{tutor.ci}</th>
                        <td>{tutor.first_name}</td>
                        <td>{tutor.last_name}</td>
                        <td>{tutor.last_name2}</td>
                        <td>
                          <button
                            className="btn btn-danger btn-xs "
                            onClick={this.props.removeTutor.bind(
                              this,
                              tutor.id
                            )}
                          >
                            <i className="material-icons">delete</i>
                          </button>
                          <button className="btn btn-default btn-xs ">
                            <i className="material-icons">info</i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  tutorSearch: state.tutors.tutorSearch,
  tutorAddedList: state.tutors.tutorAddedList,
});

const mapDispatchToProps = {
  addTutor,
  removeTutor,
  searchTutor,
};

export default connect(mapStateToProps, mapDispatchToProps)(TutorAdd);
