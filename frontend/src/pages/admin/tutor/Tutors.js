import React, { Component } from "react";
// import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Alert from "../../../components/atoms/Alert";
import TutorTable from "../../../components/tables/TutorTable";
import Config from "../../../utils/Config";


class Tutors extends Component {

//   static propTypes = {
//     messages: PropTypes,
//   };

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
            <h2>Lista de Tutores </h2>
          </div>
        </div>

        <div className="row clearfix">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="card">
              <div className="header">
                <h2>
                  Tutores (Tutor interno)
                  <small>Los tutores estan encargados de la revision y el avance de los proyectos a su cargo</small>
                </h2>
                <Link to={Config.aTutorNewUrl} className="btn btn-default pull-right m-t--25"> + Agregar tutor interno</Link>
              </div>

              <div className="body">
               <TutorTable url={Config.TutorApiUrl}/>
            
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

export default connect(mapStateToProps, mapDispatchToProps)(Tutors);
