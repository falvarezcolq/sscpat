import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import CreateForm from "../../../components/modalities/CreateForm";
import AlertMessage from "../../../components/atoms/AlertMessage";

class ModalitiesCreate extends Component {
  
  render() {
    return (
      <section className="content">
        <AlertMessage/>
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
              </button> Modalidad de titulaci&oacute;n Nuevo</h2>
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
)(withRouter(ModalitiesCreate));
