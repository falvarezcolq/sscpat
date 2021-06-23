import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { validateInput } from "../../utils/Validations";
// import { add } from "../../actions/documents";
import { get } from "../../actions/projects";
import { useHistory } from "react-router-dom";
import Form from "./Form";

const UpdateForm = (props) => {
  const [project, setProject] = useState(null);

  const loadData = async () => {
    const projectId = props.id;
    const proj = await props.get(projectId);
    console.log(proj);
    setProject(proj)
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="row clearfix">
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div className="card">
          <div className="header">
            <h2>
              Actualizar informacion del proyecto
              <small> </small>
            </h2>
          </div>

          <div className="body">
            {project ? (
              <Form project={project} />
            
            ) : (
              <div className="preloader pl-size-xl">
                <div className="spinner-layer">
                  <div className="circle-clipper left">
                    <div className="circle"></div>
                  </div>
                  <div className="circle-clipper right">
                    <div className="circle"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  //   results: state.students.results,
  //   object: state.students.object
});

const mapDispatchToProps = {
  get,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateForm);
