import React, { Component } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
// import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getTutor } from "../../../actions/tutors";
import ProgresCard from "../../../components/projects/ProgresCard";
import DetailCard from "../../../components/projects/DetailCard";
// import HistoryCard from "../../../components/projects/HistoryCard";
// import SelectForm from "../../../components/atoms/SelectForm";

import ProgresForm from "../../../components/projects/ProgresForm";
import { UNDER_DEVELOPMENT } from "../../../actions/types";
import AuthHandler from "../../../utils/AuthHandler";
import AlertMessage from "../../../components/atoms/AlertMessage";

import Config from "../../../utils/Config";

import AddUserToProject from "../../../components/projects/AddUserToProject";

class ProjectsDetail extends Component {
  componentDidMount() {
    // const id = this.props.match.params.id;
    // this.props.getTutor(id);
  }

  render() {
    const id = this.props.match.params.id;
    const { project } = this.props;
    return (
      <section className="content">
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
              Proyectos académicos{" "}
            </h2>
          </div>

          <DetailCard id={id} />

          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="card">
                <div className="header">
                  <h2>
                    Agregar estudiante autor al proyecto
                    <small>Los estudiantes deben estar registrados en el sistema SSCPAT</small>
                  </h2>
                </div>

                <div className="body">
                   <AlertMessage />
                  <AddUserToProject />
                  <AlertMessage />
                </div>
              </div>
            </div>
          </div>

          {/* <Link to={Config.aProjectsReportUrl+id}>Modo reporte</Link> */}

          {/* <div className="row clearfix">
            <div className="col-xs-12 col-sm-12 col-md-9 col-lg-9">
              <AlertMessage/> 

              { (project && project.id+""===id && project.state === UNDER_DEVELOPMENT && (AuthHandler.isAdmin() || AuthHandler.isStudent())) && 
                <ProgresForm project_id={id} />
              }

              <ProgresCard project_id={id} />
            </div>
          </div> */}
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  messages: state.messages,
  project: state.projects.object,
});

const mapDispatchToProps = {
  getTutor,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProjectsDetail));
