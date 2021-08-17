import React, { Component } from "react";
import { withRouter } from "react-router";
// import PropTypes from "prop-types";
import { connect } from "react-redux";


import { getTutor } from "../../../actions/tutors";


import DetailCard from "../../../components/projects/DetailCard";

// import SelectForm from "../../../components/atoms/SelectForm";


import ProjectDocumentDetail from "../../../components/projects/ProjectDocumentDetail";


class ProjectsDetail extends Component {

  // componentDidMount() {
  //   // const id = this.props.match.params.id;
  //   // this.props.getTutor(id);
  // }

  render() {
    const id = this.props.match.params.id;
    // const { messages ,project} = this.props;
    return (
      <section className="content">
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
              </button>
              Proyectos académicos </h2>
          </div>

          <DetailCard id={id} />

          <div className="row">
            <div className="col-lg-12">
           
            {/* <ProgressReport project_id={id}/> */}
              <ProjectDocumentDetail project_id={id}/>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  messages: state.messages,
  project: state.projects.object,
});

const mapDispatchToProps = {
  getTutor,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProjectsDetail));
