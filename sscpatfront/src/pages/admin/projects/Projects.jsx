import React, { Component } from "react";
// import PropTypes from "prop-types";
import { connect } from "react-redux";
import ListCard from "../../../components/projects/ListCard";
import AlertMessage from "../../../components/atoms/AlertMessage";

class Projects extends Component {
  render() {
  
    return (
      <section className="content">
        <AlertMessage/>

        <div className="container-fluid">
          <div className="block-header">
            <h2> Lista de proyectos </h2>
          </div>
        </div>

        <ListCard/>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  messages: state.messages,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
