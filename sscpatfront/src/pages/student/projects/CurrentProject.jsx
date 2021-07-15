import React, { Component } from "react";
import { Redirect, withRouter } from "react-router";
// import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getStudent } from "../../../actions/students";

import AuthHandler from "../../../utils/AuthHandler";
import Config from "../../../utils/Config";
import Spinner from "../../../components/atoms/Spinner";

class CurrentProject extends Component {
  state = {
    student: null,
  };

  componentDidMount() {
    const id = AuthHandler.getUserId();
    this.loadData(id);
  }

  loadData = async (id) => {
    let student = await this.props.getStudent(id);
    this.setState({ student: student });
  };

  render() {
    const student = this.state.student

    if( student && student.current_project){
        return <Redirect to={Config.aProjectsUrl+"/"+student.current_project.id} />
    }

    return (
      <section className="content">
        <div className="container-fluid">
          <div className="block-header">
            <h2> Proyecto actual</h2>
          </div>
        </div>
        {!student ?<Spinner/>:
        
        student.current_project? student.current_project.title_academic_project:
        <div className="container-fluid">
          <div className="block-header">
          <h4>El estudiante no tiene un proyecto en etapa de desarrollo actualmente</h4>
          </div>
        </div>
        }

        
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  messages: state.messages,
  students: state.students.results,
});

const mapDispatchToProps = {
  getStudent,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CurrentProject));
