import React, { Component } from "react";
import { withRouter } from "react-router";

// import PropTypes from "prop-types";
import { connect } from "react-redux";
import Alert from "../../../components/atoms/Alert";

import { get as getTutor } from "../../../actions/externaltutors";

import CardTutor from "../../../components/tutors/CardTutor";
import ListCard from "../../../components/tutors/ListCard";
// import Config from "../../../utils/Config";

class ExternalTutorDetail extends Component {
  //   static propTypes = {
  //     messages: PropTypes,
  //   };

  state = {
    tutor: null,
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    let tutor = this.props.tutors.find((t) => t.id === id);
    if (tutor) {
      this.setState({ tutor: tutor });
    } else {
      this.loadData(id);
    }
  };

  loadData = async (id) => {
    let tutor = await this.props.getTutor(id);
    this.setState({ tutor: tutor });
  };

  render() {
    const messages = this.props.messages;
    const { tutor } = this.props.tutors;

    return (
      <section className="content">
        {messages.payload && messages.payload.detail ? (
          <Alert message={messages.payload.detail} color={messages.color} />
        ) : (
          ""
        )}

        <div className="container-fluid">
          <div className="block-header">
            <h2>
              {" "}
              <button
                type="button"
                className="btn btn-link"
                onClick={this.props.history.goBack}
                title="Volver atras"
              >
                <i class="material-icons">arrow_back</i>
              </button>
              Tutor{" "}
            </h2>
          </div>
        </div>

        {this.state.tutor ? <CardTutor tutor={this.state.tutor} /> : "" }
        {/* card list proyects of tutors */}
        {this.state.tutor ? <ListCard tutor={this.state.tutor} /> : "" }

      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  messages: state.messages,
  tutors: state.tutors.results,
});

const mapDispatchToProps = {
  getTutor,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ExternalTutorDetail));
