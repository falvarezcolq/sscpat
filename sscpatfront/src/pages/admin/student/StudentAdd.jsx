import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  addStudent,
  // removeStudent,
  getStudentServer as searchStudent,
} from "../../../actions/students";
import Modal from "../../../components/atoms/Modal";
import Spinner from "../../../components/atoms/Spinner";
import Config from "../../../utils/Config";

class StudentAdd extends React.Component {
  static propTypes = {
    studentSearch: PropTypes.array.isRequired,
    studentAddedList: PropTypes.array.isRequired,
  };
  state = {
    search: "",
    loadingSearch: false,
    loadingSave: false,
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

  setLoadingSearch = (value) =>
    this.setState({ ...this.state, loadingSearch: value });

  setLoadingSave = (value) =>
    this.setState({ ...this.state, loadingSave: value });

  onChange = (e) => this.setState(
    {...this.state,
     [e.target.name]: e.target.value 
    });

  onSubmit = async (e) => {
    e.preventDefault();
    this.setLoadingSearch(true)
    const search = this.state.search;
    await this.props.searchStudent({search:search});
    this.setLoadingSearch(false);
  };

  action_confirm = async (key) =>{
    this.setState({
      ...this.state,
      loadingSave:true,
      modal: {
        title: "",
        message: "",
        cancel: null,
        confirm: null,
        accept: null,
        open: false,
      },
    })
    await this.props.addStudent(key)
    this.setLoadingSave(false);
  }


  show_confirm = (student_data) =>{
    const {user,key} = student_data
    this.setState(
      { ...this.state,
        modal:{
          title: "Confirmar agregar al estudiante el servidor central",
          message:  (<> Confirmar agregar al estudiante:
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


  show_confirm_update = (student_data) =>{
    const {user,key} = student_data
    this.setState(
      { ...this.state,
        modal:{
          title: "Confirmar actualización",
          message:  (<> La información del estudiante:
            <p style={{color:"blue"}}> {user.first_name +" "+user.last_name+" "+user.last_name2}</p>
             será actualizada con los datos del servidor central, el usuario y contraseña volverán a los que son por defecto, si el usuario estaba borrado del SSCPAT este volvera a ser habilidado
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
  
    const modal  = this.state.modal;
    return (
      <section className="content">
        <div className="container-fluid">
          <div className="block-header">
            <h2>Agregar estudiante desde el sistema principal</h2>
          </div>
        </div>

        <div className="row clearfix">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="card">
              <div className="header">
                <h2>
                  Agregar estudiante al sistema desde el sistema principal
                  <small>
                    El sistema hace una busqueda de los estudiantes de la Carrera
                    de Administración de empresas, para que participen como
                    estudiante con proyecto en alguna modalidad de titulación.
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
                            placeholder="Ingrese número de CI:"
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
                {this.state.loadingSearch ? (
                  <div className="align-center">
                    <Spinner />
                  </div>
                ):
                 this.props.studentSearch ? (
                  this.props.studentSearch.value > 0 ? (
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
                        <tr className="dropup bg-light-green ">
                          <td>{this.props.studentSearch.user.CI}</td>
                          <td>{this.props.studentSearch.user.first_name}</td>
                          <td>{this.props.studentSearch.user.last_name}</td>
                          <td>{this.props.studentSearch.user.last_name2}</td>
                          <td>
                            {/* <button className="btn btn-primary btn-xs ">
                              <i className="material-icons">info</i>
                            </button> */}
                            {this.props.studentSearch.value === 1 && (
                              <button
                                className="btn btn-default btn-xs"
                                onClick={this.show_confirm.bind(this,this.props.studentSearch)}
                                style={{ marginLeft: "10px" }}
                              >
                                <b>+</b> Agregar
                              </button>
                            )}

                            {this.props.studentSearch.value === 2 && (
                              <>
                              <p>Usuario ya registrado en SSCPAT</p>
                              <button
                                className="btn btn-default btn-xs"
                                onClick={this.show_confirm_update.bind(this,this.props.studentSearch)}
                                style={{ marginLeft: "10px" }}
                              >
                                Actualizar datos desde el servidor  central
                              </button>

                              </>
                            )}

                            {this.state.loadingSave && (
                              <div className="">
                                <div className='preloader pl-size-sm'>
                                  <div className="spinner-layer pl-white">
                                    <div className="circle-clipper left">
                                      <div className="circle"></div>
                                    </div>
                                    <div className="circle-clipper right">
                                      <div className="circle"></div>
                                    </div>
                                  </div>
                                </div>
                                ...Registrando
                              </div>
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  ) : (
                    " No se ha encontrado a ninguna persona"
                  )
                ) : (
                  "Ingrese CI para encontrar y agregar student a este sistema"
                )
                }
              </div>
            </div>
          </div>
        </div>

        <div className="row clearfix">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="card">
              <div className="header">
                <h2>Estudiantes agregados recientemente</h2>
              </div>
              <div className="body table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Nombres y apellidos</th>
                     
                      <th>Opciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.studentAddedList.map((student, index) => (
                      <tr key={index}>
                        <th scope="row">{student.CI}</th>
                        <td>
                        <Link to={Config.aStudentsUrl + "/" + student.id}>
                          {student.first_name +" "+student.last_name +" "+student.last_name2}
                        </Link>
                        
                        </td>
                        <td>
                    
                        <Link to={Config.aProjectsNewUrl +  student.id} className="btn btn-sm btn-warning"> 
                          Nuevo
                        </Link>
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
  studentSearch: state.students.studentSearch,
  studentAddedList: state.students.studentAddedList,
});

const mapDispatchToProps = {
  addStudent,
  searchStudent,
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentAdd);
