import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import Alert from "../../components/atoms/Alert";
import UpdatePasswordForm from "../../components/user/UpdatePasswordForm";
import AlertMessage from "../../components/atoms/AlertMessage";
import ListCard from "../../components/notifications/ListCard";


class Notifications extends Component {
  
  render() {
    
    return (
      <section className="content">
        <AlertMessage/>
        <div className="container-fluid">
          <div className="block-header">
            <h2>Notificaciones</h2>
          </div>
          <ListCard/>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Notifications));
