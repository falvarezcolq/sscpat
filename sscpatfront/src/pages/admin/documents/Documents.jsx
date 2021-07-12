import React, { Component } from "react";
import { connect } from "react-redux";
import ListCard from "../../../components/documents/ListCard";
import AlertMessage from "../../../components/atoms/AlertMessage";


class Documents extends Component {



  render() {
    const messages = this.props.messages;
    return (
      <>
      <section className="content">
        <div className="container-fluid">
          <div className="block-header">
            <h2>Documentos academicos</h2>
          </div>
        </div>
        
        {/* <CreateForm /> */}

        
        <AlertMessage/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Documents);
