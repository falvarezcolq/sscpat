import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import Alert from "../../../components/atoms/Alert";
import CreateForm from "../../../components/documents/CreateForm";


class DocumentsCreate extends Component {
  
  render() {
    const { messages } = this.props; 
   

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
              </button> Documentos Nuevo</h2>
          </div>
        </div>
        <CreateForm /> 
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
)(withRouter(DocumentsCreate));
