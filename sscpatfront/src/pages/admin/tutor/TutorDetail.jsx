import React, { Component } from "react";
import { withRouter } from "react-router";

// import PropTypes from "prop-types";
import { connect } from "react-redux";


import { getTutor } from "../../../actions/tutors";

import CardTutor from "../../../components/tutors/CardTutor";
import ListCard from "../../../components/tutors/ListCard";
import AlertMessage from "../../../components/atoms/AlertMessage";

class TutorDetail extends Component {
  //   static propTypes = {
  //     messages: PropTypes,
  //   };

  state = {
    tutor: null,
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    let tutor = this.props.tutors.find((t) => t.id === id);
    if (tutor) {
      this.setState({ tutor: tutor });
    } else {
      this.loadData(id);
    }
  }
  s;

  loadData = async (id) => {
    let tutor = await this.props.getTutor(id);
    this.setState({ tutor: tutor });
  };

  render() {
    return (
      <section className="content">
        <AlertMessage/>

        <div className="container-fluid">
          <div className="block-header">
            <h2>
              {" "}
              <button
                type="button"
                className="btn btn-link"
                onClick={this.props.history.goBack}
                title="Volver atras"
              >
                <i class="material-icons">arrow_back</i>
              </button>
              Tutor{" "}
            </h2>
          </div>
        </div>

        {this.state.tutor ? <CardTutor tutor={this.state.tutor} /> : ""}

        {/* card list proyects of tutors */}

        {this.state.tutor ? <ListCard tutor={this.state.tutor} /> : ""}

        {/* <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="card">
                <div className="header">
                  <h2>
                    Proyectos del tutor
                    <small></small>
                  </h2>
                </div>
                <div className="body">
                  <div className="table-responsive">
                    <table className="table table-hover dashboard-task-infos">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Titulo</th>
                          <th>Status</th>
                          <th>Tipo</th>
                          <th>Progreso</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>
                            TTu lista de tareas actual te dará una idea clara de
                            cuáles son tus proyectos actuales
                          </td>
                          <td>
                            <span className="label bg-green">Concluido</span>
                          </td>
                          <td>Proyecto de grado</td>
                          <td>
                            <div className="progress">
                              <div
                                className="progress-bar bg-green"
                                role="progressbar"
                                aria-valuenow="62"
                                aria-valuemin="0"
                                aria-valuemax="100"
                                style={{ width: "62%" }}
                              ></div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>
                            tienes que hacer sin saber muy bien cómo has llegado a
                            esa situación
                          </td>
                          <td>
                            <span className="label bg-blue">En proceso</span>
                          </td>
                          <td>Trabajo dirigido</td>
                          <td>
                            <div className="progress">
                              <div
                                className="progress-bar bg-blue"
                                role="progressbar"
                                aria-valuenow="40"
                                aria-valuemin="0"
                                aria-valuemax="100"
                                style={{ width: "40%" }}
                              ></div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td>Task C</td>
                          <td>
                            <span className="label bg-light-blue">
                              En revision
                            </span>
                          </td>
                          <td>Trabajo dirijigo</td>
                          <td>
                            <div className="progress">
                              <div
                                className="progress-bar bg-light-blue"
                                role="progressbar"
                                aria-valuenow="72"
                                aria-valuemin="0"
                                aria-valuemax="100"
                                style={{ width: "72%" }}
                              ></div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>4</td>
                          <td>
                            proyectos no suele estar completa. Los coach de GTD{" "}
                          </td>
                          <td>
                            <span className="label bg-orange">Wait Approvel</span>
                          </td>
                          <td>(Plan de negocio)</td>
                          <td>
                            <div className="progress">
                              <div
                                className="progress-bar bg-orange"
                                role="progressbar"
                                aria-valuenow="95"
                                aria-valuemin="0"
                                aria-valuemax="100"
                                style={{ width: "95%" }}
                              ></div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>5</td>
                          <td>
                            Abierto a adquirir más compromisos de los necesarios.
                          </td>
                          <td>
                            <span className="label bg-red">Suspended</span>
                          </td>
                          <td>Tesis (articulo)</td>
                          <td>
                            <div className="progress">
                              <div
                                className="progress-bar bg-red"
                                role="progressbar"
                                aria-valuenow="87"
                                aria-valuemin="0"
                                aria-valuemax="100"
                                style={{ width: "87%" }}
                              ></div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        */}
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  messages: state.messages,
  tutors: state.tutors.results,
});

const mapDispatchToProps = {
  getTutor,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TutorDetail));
