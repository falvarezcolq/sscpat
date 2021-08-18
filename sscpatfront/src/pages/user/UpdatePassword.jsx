import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import UpdatePasswordForm from "../../components/user/UpdatePasswordForm";
import AlertMessage from "../../components/atoms/AlertMessage";


class UpdatePassword extends Component {
  
  render() {
    return (
      <section className="content">
       <AlertMessage />
        <div className="container-fluid">
          <div className="block-header">
            <h2> <button
                type="button"
                className="btn btn-link"
                onClick={this.props.history.goBack}
                title="Volver atras"
              >
                <i className="material-icons">arrow_back</i>
              </button>Contraseña</h2> 
          </div>
        </div>
        <UpdatePasswordForm /> 
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
)(withRouter(UpdatePassword));
