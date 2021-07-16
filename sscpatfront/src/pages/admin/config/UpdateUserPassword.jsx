import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import Alert from "../../../components/atoms/Alert";
import UpdateUserPasswordForm from "../../../components/user/UpdateUserPasswordForm";
import UpdateUserAccess from "../../../components/user/UpdateUserAccess";


class UpdateUserPassword extends Component {
  render() {
    const id = this.props.match.params.id;
    const {messages} = this.props
    return (
      <section className="content">
        {messages.payload && messages.payload.detail ? (
          <Alert message={messages.payload.detail} color={messages.color} />
        ) : (
          ""
        )}
        <div className="container-fluid">
          <div className="block-header">
            <h2> <button
                type="button"
                className="btn btn-link"
                onClick={this.props.history.goBack}
                title="Volver atras"
              >
                <i className="material-icons">arrow_back</i>
              </button> Contraseña  </h2>
          </div>
        </div>
        <UpdateUserPasswordForm id={id} /> 

        <UpdateUserAccess id={id}/>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  messages: state.messages,
});

const mapDispatchToProps = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UpdateUserPassword));
