import React, { Component } from "react";
import { withRouter } from "react-router";
// import PropTypes from "prop-types";
import { connect } from "react-redux";
import Alert from "../../../components/atoms/Alert";

import { getStudent } from "../../../actions/students";

import CardStudent from "../../../components/students/CardStudent";
import ListCard from "../../../components/students/ListCard";


class StudentDetail extends Component {
    state={
      student:null
    }

  componentDidMount() {
    const id = this.props.match.params.id;
    let student = this.props.students.find((e) => e.id === id)
    if (student){
      this.setState({student:student})
    }else{
      this.loadData(id)
    }
  }s


  loadData=async (id) => {
    let student =  await this.props.getStudent(id); 
    this.setState({student:student})
  }

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
            <h2> 
            <button
                type="button"
                className="btn btn-link"
                onClick={this.props.history.goBack}
                title="Volver atras"
              >
                <i className="material-icons">arrow_back</i>
              </button>
              Estudiante </h2>
          </div>
        </div>

        {this.state.student ? <CardStudent student={this.state.student} /> : ""}


        {/* card list of student's project */}

        {this.state.student ? <ListCard student={this.state.student}/> : ""}

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
)(withRouter(StudentDetail));
