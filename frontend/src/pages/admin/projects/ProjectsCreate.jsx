import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import Alert from "../../../components/atoms/Alert";
import CreateForm from "../../../components/projects/CreateForm";


class ProjectsCreate extends Component {

  render() {
    const { messages } = this.props; 
    const id = this.props.match.params.id;

    return (
      <section className="content">
        {messages.payload && messages.payload.detail ? (
          <Alert message={messages.payload.detail} color={messages.color} />
        ) : (
          ""
        )}
        <div className="container-fluid">
          <div className="block-header">
            <h2>  <button
                type="button"
                className="btn btn-link"
                onClick={this.props.history.goBack}
                title="Volver atras"
              >
                <i class="material-icons">arrow_back</i>
              </button> Inscribir estudiante a una modalidad de titulacion </h2>
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
