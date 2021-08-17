import React, { Component } from "react";
import { withRouter } from "react-router";
// import PropTypes from "prop-types";
import { connect } from "react-redux";
import Alert from "../../../components/atoms/Alert";
import UpdateForm from "../../../components/academicperiods/UpdateForm";
import { get } from "../../../actions/academicsperiod";

class AcademicPeriodsUpdate extends Component {
  
  render() {
    const { messages } = this.props; 
    const id = this.props.match.params.id;

    return (
      <section className="content">
        {messages.payload && messages.payload.detail ? (
          <Alert message={messages.payload.detail} color={messages.color} />
        ) : (
          ""
        )}
        <div className="container-fluid">
          <div className="block-header">
            <h2> <button
                type="button"
                className="btn btn-link"
                onClick={this.props.history.goBack}
                title="Volver atras"
              >
                <i className="material-icons">arrow_back</i>
              </button> 
              Periodos académicos</h2>
          </div>
        </div>
        <UpdateForm  id={id} /> 
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  messages: state.messages,
  object: state.academicperiods.object
});

const mapDispatchToProps = {
  get,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AcademicPeriodsUpdate));
