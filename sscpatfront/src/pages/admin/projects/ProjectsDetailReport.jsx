import React, { Component } from "react";
import { withRouter } from "react-router";
// import PropTypes from "prop-types";
import { connect } from "react-redux";
// import Alert from "../../../components/atoms/Alert";

import { getTutor } from "../../../actions/tutors";

// import CardTutor  from "../../../components/tutors/CardTutor";
// import ListCard from "../../../components/projects/ListCard";
// import ProgresCard from "../../../components/projects/ProgresCard";
import DetailCard from "../../../components/projects/DetailCard";
// import HistoryCard from "../../../components/projects/HistoryCard";
// import SelectForm from "../../../components/atoms/SelectForm";

// import ProgresForm from "../../../components/projects/ProgresForm";
// import { UNDER_DEVELOPMENT } from "../../../actions/types";
// import AuthHandler from "../../../utils/AuthHandler";
// import AlertMessage from "../../../components/atoms/AlertMessage";
import ProgressReport from "../../../components/projects/ProgressReport";


class ProjectsDetail extends Component {

  // componentDidMount() {
  //   // const id = this.props.match.params.id;
  //   // this.props.getTutor(id);
  // }

  render() {
    const id = this.props.match.params.id;
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
              Proyectos academicos </h2>
          </div>

          <DetailCard id={id} />

          <div className="row">
            <dov className="col-lg-12">
           
            <ProgressReport project_id={id}/>
            </dov>
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
)(withRouter(ProjectsDetail));
