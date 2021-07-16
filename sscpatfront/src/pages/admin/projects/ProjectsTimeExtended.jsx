import React, { Component } from "react";
import { withRouter } from "react-router";
// import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getTutor } from "../../../actions/tutors";

import TimeForm from "../../../components/projects/TimeForm";

class ProjectsTimeExtended extends Component {
 
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

          <TimeForm project_id={id} />

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
)(withRouter(ProjectsTimeExtended));
