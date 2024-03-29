import React, { Component } from "react";
import { withRouter } from "react-router";
// import PropTypes from "prop-types";
import { connect } from "react-redux";
// import Alert from "../../../components/atoms/Alert";

import { getTutor } from "../../../actions/tutors";

// import CardTutor  from "../../../components/tutors/CardTutor";
// import ListCard from "../../../components/projects/ListCard";
// import ProgresCard from "../../../components/projects/ProgresCard";
// import DetailCard from "../../../components/projects/DetailCard";
// import HistoryCard from "../../../components/projects/HistoryCard";
// import SelectForm from "../../../components/atoms/SelectForm";

// import ProgresForm from "../../../components/projects/ProgresForm";
import StateForm from "../../../components/projects/StateForm";

class ProjectState extends Component {

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
              Proyectos académicos </h2>
          </div>

          <StateForm project_id={id} />

        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  messages: state.messages,
  tutors: state.tutors,
});

const mapDispatchToProps = {
  getTutor,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProjectState));
