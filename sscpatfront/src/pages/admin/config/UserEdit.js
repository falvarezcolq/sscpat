import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
// import PropTypes from "prop-types";
// import { addTutor, removeTutor, searchTutor } from "../../../actions/tutors";
// import UserNewForm from "../../../components/forms/UserNewForm";
import Alert from "../../../components/atoms/Alert";
import UserEditForm from "../../../components/forms/UserEditForm";
import UserEditRestrictForm from "../../../components/forms/UserEditRestrictForm";

import AuthHandler from  "../../../utils/AuthHandler";


class UserEdit extends React.Component {
  render() {
    const messages = this.props.messages;
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
            <h2><button
                type="button"
                className="btn btn-link"
                onClick={this.props.history.goBack}
                title="Volver atras"
              >
                <i className="material-icons">arrow_back</i>
              </button>Actualizar información del usuario</h2>
          </div>
        </div>

        <div className="row clearfix">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="card">
              <div className="header">
                <h2>
                  Actualizar información del usuario
                  <small></small>
                </h2>
              </div>

              <div className="body">


                { AuthHandler.isAdmin() && <UserEditForm id={id}/> }
                { AuthHandler.isTutor() && <UserEditRestrictForm id={id}/> }

                { AuthHandler.isStudent() && <UserEditRestrictForm id={id}/> }
                {messages.payload && messages.payload.detail ? (
                  <Alert
                    message={messages.payload.detail}
                    color={messages.color}
                  />
                ) : (
                  ""
                )}
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
  // UserAddedList: state.tutors.UserAddedList,
});

const mapDispatchToProps = {
  // addTutor,
  // removeTutor,
  // searchTutor,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UserEdit));
