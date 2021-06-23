import React, { Component } from "react";
// import PropTypes from "prop-types";
import { connect } from "react-redux";
import Alert from "../../../components/atoms/Alert";
// import StudentTable from "../../../components/tables/StudentTable";
import AuthHandler from "../../../utils/AuthHandler";
import StundentByTutors from "../../../components/students/StudentByTutors";

import ListCard from "../../../components/tutors/ListCard";
import { getTutor } from "../../../actions/tutors";

class ListProjects extends Component {
  state = {
    tutor: null,
  };

  componentDidMount() {
    const id = AuthHandler.getUserId();
    this.loadData(id);
  }

  loadData = async (id) => {
    let tutor = await this.props.getTutor(id);
    this.setState({ tutor: tutor });
  };

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
            <h2> Lista proyectos bajo tutoría </h2>
          </div>
        </div>

        {this.state.tutor ? <ListCard tutor={this.state.tutor} /> : ""}
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  messages: state.messages,
});

const mapDispatchToProps = {
  getTutor,
};

export default connect(mapStateToProps, mapDispatchToProps)(ListProjects);
