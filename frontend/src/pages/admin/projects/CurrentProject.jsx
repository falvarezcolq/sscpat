import React, { Component } from "react";
import { withRouter } from "react-router";
// import PropTypes from "prop-types";
import { connect } from "react-redux";
import Alert from "../../../components/atoms/Alert";

import { getTutor } from "../../../actions/tutors";

import CardTutor from "../../../components/tutors/CardTutor";
import ListCard from "../../../components/projects/ListCard";
import ProgresCard from "../../../components/projects/ProgresCard";
import DetailCard from "../../../components/projects/DetailCard";
import HistoryCard from "../../../components/projects/HistoryCard";

class ProjectsDetail extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    // this.props.getTutor(id);s
  }

  render() {
    const id = this.props.match.params.id;
    return (
      <section className="content">
        <div className="container-fluid">
          <div className="block-header">
            <h2>Proyecto academico actual del estudiante </h2>
          </div>

          <DetailCard id={id} />

          <div className="row clearfix">
            <div className="col-xs-12 col-sm-12 col-md-9 col-lg-9">
              <ProgresCard />
            </div>

            <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3">
              <HistoryCard />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  messages: state.messages,
  tutors: state.tutors,
});

const mapDispatchToProps = {
  getTutor,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProjectsDetail));
