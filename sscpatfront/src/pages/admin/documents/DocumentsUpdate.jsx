import React, { Component } from "react";
import { withRouter } from "react-router";
// import PropTypes from "prop-types";
import { connect } from "react-redux";

import UpdateForm from "../../../components/documents/UpdateForm";
import AlertMessage from "../../../components/atoms/AlertMessage";


class DocumentsUpdate extends Component {
  
  render() {
    const { messages } = this.props; 
    const id = this.props.match.params.id;

    return (
      <section className="content">
         <AlertMessage/> 
        <div className="container-fluid">
          <div className="block-header">
            <h2> <button
                type="button"
                className="btn btn-link"
                onClick={this.props.history.goBack}
                title="Volver atras"
              >
                <i className="material-icons">arrow_back</i>
              </button> Documentos academicos</h2>
          </div>
        </div>
        <UpdateForm  id={id} /> 
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  messages: state.messages,
});

const mapDispatchToProps = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(DocumentsUpdate));
