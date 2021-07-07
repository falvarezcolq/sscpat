import React, { Component } from "react";
// import PropTypes from "prop-types";
import { connect } from "react-redux";
import Alert from "../../../components/atoms/Alert";
import ListCard from "../../../components/modalities/ListCard";




class Modalities extends Component {

  render() {
    const messages = this.props.messages;
    return (
      <>
      <section className="content">
        <div className="container-fluid">
          <div className="block-header">
            <h2>Modalidades de Titulación</h2>
          </div>
        </div>
        
        {/* <CreateForm /> */}

        {messages.payload && messages.payload.detail ? (
          <Alert message={messages.payload.detail} color={messages.color} />
        ) : (
          ""
        )}

        
        <ListCard />
   
      </section>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  messages: state.messages,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Modalities);
