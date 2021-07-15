import React, { Component } from "react";
// import PropTypes from "prop-types";
import { connect } from "react-redux";
// import StudentTable from "../../../components/tables/StudentTable";
import AuthHandler from "../../../utils/AuthHandler";
// import StundentByTutors from "../../../components/students/StudentByTutors";

import ListCard from "../../../components/tutors/ListCard";
import { getTutor } from "../../../actions/tutors";
import AlertMessage from "../../../components/atoms/AlertMessage";

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
  
    return (
      <section className="content">
       <AlertMessage/>

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
