import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Config from "../../../utils/Config";

class Reports extends Component {
  render() {
    return (
      <>
      <section className="content">
        <div className="container-fluid">
          <div className="block-header">
            <h2>Reportes de estado en el sistema</h2>
          </div>
        </div>
        <div className="row clearfix">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="card">
              <div className="header">
                <h2>
                  Lista de reportes
                </h2>
                {/* <Link to={Config.aTutorNewUrl} className="btn btn-default pull-right m-t--25"> + Agregar tutor interno</Link> */}
              </div>
      
              <div className="body">
               <Link to={Config.aReportsTutorsUrl}>Seguimiento proyectos acad&eacute;micos por los docentes</Link>
              </div>
            </div>
          </div>
        </div>
        
      </section>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  messages: state.messages,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Reports);
