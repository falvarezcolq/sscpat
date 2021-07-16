import React, { Component } from "react";
import { withRouter } from "react-router";
// import PropTypes from "prop-types";
import { connect } from "react-redux";
import Alert from "../../../components/atoms/Alert";

import { getTutor } from "../../../actions/tutors";

// import CardTutor from "../../../components/tutors/CardTutor";
import ProgressDetailCard from "../../../components/progress/ProgressDetailCard";
import DetailCard from "../../../components/projects/DetailCard";
import HistoryCard from "../../../components/projects/HistoryCard";
// import SelectForm from "../../../components/atoms/SelectForm";

import TracingProgressForm from "../../../components/tracingprogress/TracingProgressForm";
import ListTracingProgressComponent from "../../../components/tracingprogress/ListTracingProgressComponent";
import AlertMessage from "../../../components/atoms/AlertMessage";

class ProgressDetail extends Component {
  
  // componentDidMount() {
  //   const id = this.props.match.params.id;
  // }

  render() {
    const id = this.props.match.params.id;
    const { messages } = this.props;
    return (
      <section className="content">
        <div className="container-fluid">
          <div className="block-header">
            <h2>  <button
                type="button"
                className="btn btn-link"
                onClick={this.props.history.goBack}
                title="Volver atras"
              >
                <i className="material-icons">arrow_back</i>
              </button> 
              Avance del projecto</h2>
          </div>

          <ProgressDetailCard id={id} />

          <div className="row clearfix">
            <div className="col-xs-12 col-sm-12 col-md-9 col-lg-9">
              <AlertMessage/>
              
              <TracingProgressForm progress_id={id} />

              <ListTracingProgressComponent progress_id={id} />
            </div>

            {/* <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3">
              <HistoryCard />
            </div> */}
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
)(withRouter(ProgressDetail));
