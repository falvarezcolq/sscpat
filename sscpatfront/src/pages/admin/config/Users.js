import React, { Component } from "react";
// import PropTypes from "prop-types";
import { connect } from "react-redux";
import AlertMessage from "../../../components/atoms/AlertMessage";
import UserTable from "../../../components/tables/UserTable";


class Users extends Component {
//   static propTypes = {
//     messages: PropTypes,
//   };

  render() {
    
    return (
      <section className="content">

        <AlertMessage/>

        <div className="container-fluid">
          <div className="block-header">
            <h2>Lista de usuarios </h2>
          </div>
        </div>

        <div className="row clearfix">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="card">
              <div className="header">
                <h2>
                  Usuarios en el sistema
                  <small>Usuario registrados en el sistema</small>
                </h2>
              </div>

              <div className="body">
               <UserTable/>
               <AlertMessage/>
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
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
