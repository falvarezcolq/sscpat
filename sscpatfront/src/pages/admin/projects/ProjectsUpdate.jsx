import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import Alert from "../../../components/atoms/Alert";
import UpdateForm from "../../../components/projects/UpdateForm";

class ProjectsUpdate extends Component {
  render() {
    const { messages } = this.props;
    const id = this.props.match.params.id;
    console.log("id: " + id);

    return (
      <section className="content">
        {messages.payload && messages.payload.detail ? (
          <Alert message={messages.payload.detail} color={messages.color} />
        ) : (
          ""
        )}

        <div className="container-fluid">
          <div className="block-header">
            <h2>
              <button
                type="button"
                className="btn btn-link"
                onClick={this.props.history.goBack}
                title="Volver atras"
              >
                <i class="material-icons">arrow_back</i>
              </button>
              Actualizar informacion del estudiante en la modalidad de titulación
            </h2>
          </div>
        </div>

        <UpdateForm id={id} />

      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  messages: state.messages,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProjectsUpdate));
