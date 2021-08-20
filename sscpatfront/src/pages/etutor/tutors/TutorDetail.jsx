import React, { Component } from "react";
import { withRouter } from "react-router";
// import PropTypes from "prop-types";
import { connect } from "react-redux";

import { get as getTutor } from "../../../actions/externaltutors";

import CardTutor from "../../../components/tutors/CardTutor";
import ListCard from "../../../components/tutors/ListCard";
import AuthHandler from "../../../utils/AuthHandler";
import AlertMessage from "../../../components/atoms/AlertMessage";


class TutorDetail extends Component {
    state={
      tutor:null
    }

  componentDidMount() {
    const id = AuthHandler.getUserId();
    this.loadData(id)
  }


  loadData=async (id) => {
    let tutor =  await this.props.getTutor(id); 
    this.setState({tutor:tutor})
  }

  render() {
 

    return (
      <section className="content">
       <AlertMessage/>

        <div className="container-fluid">
          <div className="block-header">
            <h2> Tutor </h2>
          </div>
        </div>

        {this.state.tutor ? <CardTutor tutor={this.state.tutor} /> : ""}

        {/* card list of tutor's project */}

        {this.state.tutor ? <ListCard tutor={this.state.tutor}/> : ""}

      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  messages: state.messages,
//   tutors: state.tutors.results,
});

const mapDispatchToProps = {
  getTutor,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TutorDetail));
