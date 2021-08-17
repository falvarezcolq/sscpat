import React, { Component } from "react";
// import PropTypes from "prop-types";
import { connect } from "react-redux";
import {Link} from "react-router-dom";
import Alert from "../../../components/atoms/Alert";
import TutorTable from "../../../components/tables/TutorTable";
import Config from "../../../utils/Config";

class ExternalTutors extends Component {

  render() {
    const messages = this.props.messages;
    return (
      <section className="content">
        {messages.payload && messages.payload.detail ? (
          <Alert message={messages.payload.detail} color={messages.color} />
        ) : (
          ""
        )}

        <div className="container-fluid">
          <div className="block-header">
            <h2> Lista de Tutores externos </h2>
          </div>
        </div>

        <div className="row clearfix">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="card">
              <div className="header">
                <h2>
                  Tutores (Tutor Externos)
                  <small>Los tutores externos son aquellos profesionales que son externos a la carrera de Administración de Empresas</small>
                </h2>
                
                <Link to={Config.aUserNewUrl} className="btn btn-default pull-right m-t--25"> + Agregar tutor externo</Link>
              </div>

              <div className="body">
               <TutorTable url={Config.ExternalTutorApiUrl}/>
            
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

export default connect(mapStateToProps, mapDispatchToProps)(ExternalTutors);
