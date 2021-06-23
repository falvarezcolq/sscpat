import React, { Component } from "react";
// import PropTypes from "prop-types";
import { connect } from "react-redux";
import Alert from "../../../components/atoms/Alert";
import StudentTable from "../../../components/tables/StudentTable";

class Students extends Component {

//   static propTypes = {
//     messages: PropTypes,
//   };

  render() {
    const messages = this.props.messages;
    const id = AuthHandler.getUserId();
    
    return (
      <section className="content">
        {messages.payload && messages.payload.detail ? (
          <Alert message={messages.payload.detail} color={messages.color} />
        ) : (
          ""
        )}

        <div className="container-fluid">
          <div className="block-header">
            <h2> Lista de Estudiantes </h2>
          </div>
        </div>

        <div className="row clearfix">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="card">
              <div className="header">
                <h2>
                  Estudiante 
                  <small></small>
                </h2>
              </div>

             <div className="body"> 
               <StudentTable/>
            
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
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Students);
