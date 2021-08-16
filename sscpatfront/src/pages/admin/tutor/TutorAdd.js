import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  addTutor,
  removeTutor,
  getTutorServer as searchTutor,
} from "../../../actions/tutors";
import Modal from "../../../components/atoms/Modal";

class TutorAdd extends React.Component {
  static propTypes = {
    tutorSearch: PropTypes.array.isRequired,
    tutorAddedList: PropTypes.array.isRequired,
  };
  state = {
    search: "",
    modal:{
      title: "",
      message: "",
      cancel: null,
      confirm: null,
      accept: null,
      open:false,
    }
  };

  closeModal = () => this.setState(
    { ...this.state,
      modal:{
        title: "",
        message: "",
        cancel: null,
        confirm: null,
        accept: null,
        open:false,
      }
    });

  onChange = (e) => this.setState(
    {...this.state,
     [e.target.name]: e.target.value 
    });

  onSubmit = (e) => {
    e.preventDefault();
    const search = this.state.search;
    this.props.searchTutor(this.state);
  };

  action_confirm = (key) =>{
    this.props.addTutor(key)
    this.closeModal()
  }


  show_confirm = (tutor_data) =>{
    const {user,key} = tutor_data
    this.setState(
      { ...this.state,
        modal:{
          title: "Confirmar agregar Tutor desde el servidor central",
          message:  (<> Confirmar agregar al tutor:
            <p style={{color:"blue"}}> {user.first_name +" "+user.last_name+" "+user.last_name2}</p>
            </>),
          cancel:  this.closeModal,
          confirm: this.action_confirm.bind(this,key),
          accept: null,
          open:true,
        }
      }
    )
  }



  render() {
    // tutorSearch = {};
    const modal  = this.state.modal;
    return (
      <section className="content">
        <div className="container-fluid">
          <div className="block-header">
            <h2>Agregar Tutor desde el sistema principal</h2>
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
                            name="search"
                            className="form-control"
                            placeholder="Ingrese numero de CI:"
                            onChange={this.onChange}
                            value={this.state.search}
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
                {this.props.tutorSearch ? (
                  this.props.tutorSearch.value > 0 ? (
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>CI</th>
                          <th>Nombre</th>
                          <th>Apellido Paterno</th>
                          <th>Apellido Materno</th>
                          <th>Opciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="dropup bg-light-blue ">
                          <td>{this.props.tutorSearch.user.CI}</td>
                          <td>{this.props.tutorSearch.user.first_name}</td>
                          <td>{this.props.tutorSearch.user.last_name}</td>
                          <td>{this.props.tutorSearch.user.last_name2}</td>
                          <td>
                            <button className="btn btn-primary btn-xs ">
                              <i className="material-icons">info</i>
                            </button>
                            {this.props.tutorSearch.value == 1 && (
                              <button
                                className="btn btn-default btn-xs"
                                // onClick={this.props.addTutor.bind(
                                //   this,
                                //   this.props.tutorSearch.key
                                // )}
                                onClick={this.show_confirm.bind(this,this.props.tutorSearch)}
                                style={{ marginLeft: "10px" }}
                              >
                                <b>+</b> Agregar
                              </button>
                            )}

                            {this.props.tutorSearch.value == 2 && (
                              <button
                                className="btn btn-default btn-xs"
                                onClick={this.props.addTutor.bind(
                                  this,
                                  this.props.tutorSearch.key
                                )}
                                disabled={true}
                                style={{ marginLeft: "10px" }}
                              >
                                Usuario ya registrado en SSCPAT
                              </button>
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  ) : (
                    " No se ha encontrado a ninguna persona"
                  )
                ) : (
                  "Ingrese CI para encontrar y agregar tutor a este sistema"
                )}
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
                        <th scope="row">{tutor.user.CI}</th>
                        <td>{tutor.user.first_name}</td>
                        <td>{tutor.user.last_name}</td>
                        <td>{tutor.user.last_name2}</td>
                        <td>
                          <button
                            className="btn btn-danger btn-xs "
                            onClick={this.props.removeTutor.bind(
                              this,
                              tutor.id
                            )}
                            style={{ marginLeft: "20px" }}
                          >
                            <i className="material-icons">delete</i>
                          </button>

                          <button
                            className="btn btn-default btn-xs"
                            style={{ marginLeft: "20px" }}
                          >
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

        <Modal open={modal.open}>
        <div className="modal-header">
          <h4 className="modal-title" id="defaultModalLabel">
            {modal.title}
          </h4>
        </div>
        <div className="modal-body">{modal.message}</div>
        <div className="modal-footer">
          {modal.cancel && (
            <button
              type="button"
              className="btn btn-link waves-effect pull-left"
              onClick={modal.cancel}
            >
              Cancelar
            </button>
          )}

          {modal.confirm && (
            <button
              type="button"
              className="btn btn-success waves-effect"
              onClick={modal.confirm}
            >
              {false ? "Registrando...":"Confirmar"}
            </button>
          )}

          {modal.accept && (
            <button
              type="button"
              className="btn btn-primary waves-effect"
              onClick={modal.accept}
            >
              Aceptar
            </button>
          )}
        </div>
      </Modal>
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
