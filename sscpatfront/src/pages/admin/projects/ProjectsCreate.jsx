import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import CreateForm from "../../../components/projects/CreateForm";
import AlertMessage from "../../../components/atoms/AlertMessage";


class ProjectsCreate extends Component {

  render() {
    const id = this.props.match.params.id;

    return (
      <section className="content">
        <AlertMessage/>
        <div className="container-fluid">
          <div className="block-header">
            <h2>  <button
                type="button"
                className="btn btn-link"
                onClick={this.props.history.goBack}
                title="Volver atras"
              >
                <i className="material-icons">arrow_back</i>
              </button> Inscribir estudiante a una modalidad de titulación </h2>
          </div>
        </div>
        
        <CreateForm id={id}/> 

      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  messages: state.messages,
});

const mapDispatchToProps = {
  // student: state.students.object,
  // studentResult : state.students.results,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProjectsCreate));
