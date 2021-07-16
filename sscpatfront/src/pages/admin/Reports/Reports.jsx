import React, { Component } from "react";
import { connect } from "react-redux";

class Reports extends Component {
  render() {
    return (
      <>
      <section className="content">
        <div className="container-fluid">
          <div className="block-header">
            <h2>Reportes de estado en el sistema</h2>
          </div>
        </div>
        
      </section>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  messages: state.messages,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Reports);
