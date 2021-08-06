import React, { Component } from "react";
// import PropTypes from "prop-types";
import { connect } from "react-redux";
import AlertMessage from "../../../components/atoms/AlertMessage";
import ReportInscriptionTable from "../../../components/reports/ReportInscriptionTable";

class InscriptionReport extends Component {
  render() {
    return (
      <section className="content">
        <AlertMessage />
        <div className="container-fluid">
          <div className="block-header">
            <h2>
              <button
                type="button"
                className="btn btn-link"
                onClick={this.props.history.goBack}
                title="Volver atras"
              >
                <i className="material-icons">arrow_back</i>
              </button>
              Reporte de proyectos y estudiantes
            </h2>
          </div>
        </div>

        <div className="row clearfix">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="card">
              <div className="header">
                <h2>
                  Reporte de proyectos
                  <small>
                    La lista es un reporte actual del estado de avance de los proyectos
                  </small>
                </h2>
                {/* <Link to={Config.aTutorNewUrl} className="btn btn-default pull-right m-t--25"> + Agregar tutor interno</Link> */}
              </div>

              <div className="body">
                <ReportInscriptionTable />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  messages: state.messages,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(InscriptionReport);
