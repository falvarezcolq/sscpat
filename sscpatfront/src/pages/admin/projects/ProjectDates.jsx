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


import AlertMessage from "../../../components/atoms/AlertMessage";




import ProjectListDates from "../../../components/projects/ProjectListDates";

class ProjectsDates extends Component {
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
                    Fechas extendidas del proyeto
                    <small>La extensión de la fecha es solicitada mediante nota extensión de fecha de finalizacion del proyecto</small>
                  </h2>
                </div>

                <div className="body">
                   <AlertMessage />
                  <ProjectListDates id={id} />
                  <AlertMessage />
                </div>
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
  project: state.projects.object,
});

const mapDispatchToProps = {
  getTutor,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProjectsDates));
