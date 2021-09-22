import React, { useState, useEffect } from "react";
import { connect , } from "react-redux";
// import { validateInput } from "../../utils/Validations";
// import { add } from "../../actions/documents"; 
import {getStudent } from '../../actions/students'
// import { useHistory } from "react-router-dom";
import Form from './Form';
// import students from "../../store/reducers/students";





const CreateForm = (props) => {

  const [student, setStudent] = useState(null)

  const loadData= async ()=>{
    const studentId = props.id
    let est = props.results.find((obj) => obj.id + "" === studentId+ "")
    if (!est ){
      est = await props.getStudent(studentId)
    }
    setStudent(est)
  }
  useEffect(()=>{
   loadData()
  },[]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="row clearfix">
      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <div className="card">
          <div className="header">
            <h2>
                  
              <small> </small>
            </h2>
          </div>

          <div className="body">

              { student ?
                <Form student={student}/>
                :
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
              }
              
          </div> 
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  results: state.students.results,
  object: state.students.object
});

const mapDispatchToProps = {
  getStudent,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateForm);
