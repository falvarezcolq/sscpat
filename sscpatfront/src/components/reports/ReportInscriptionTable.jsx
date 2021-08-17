import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { report as listProjects } from "../../actions/report_inscriptions";
import Config from "../../utils/Config";
import { validateInput } from "../../utils/Validations";
import { Link } from "react-router-dom";
import InputForm from "../atoms/InputForm";
import Spinner from "../atoms/Spinner";

import NavPagination from "../tables/NavPagination";
import {getNameDateMonth} from "../../actions/helper";

const initialValues = {
  search: "",
  size: 50,
  type: "",
  ordering: null,
  page: 1,
};

const validate = {
  search: {
    max_length: 50,
  },
  size: {
    integer: true,
    max_integer: 100,
    min_integer: 1,
  },
};



const ReportInscriptionTable = (props) => {
  const { projects } = props;
  const url = Config.ReportInscriptionApiUrl;
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [loadingTable, setLoadingTable] = useState(false);
 
  useEffect(() => {
    loadTable();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadTable = async () => {
    setLoadingTable(true);
    loadData(url,initialValues);
  };

  const loadData = async (url,value) => {
    await props.listProjects(url,value);
    setLoadingTable(false);
  };

  const onChange = (e) => {
    const { name, value: newValue, type } = e.target;
    const value = type === "number" ? +newValue : newValue;
    setValues({ ...values, [name]: value });
    const error = validateInput(name, value, validate[name]);
    setErrors({ ...errors, [name]: error });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (Object.values(errors).every((t) => t === null)) {
      setLoadingTable(true)
      loadData(url,values);
    }
  };

  return (
    <>

          <div className="row"  >
            <form onSubmit={onSubmit}>
              <div className="col-md-6 col-lg-8 m-0 p-0">
                <InputForm
                  name="search"
                  value={values.search}
                  error={errors.search}
                  placeholder="Buscar tutor.. "
                  onChange={onChange}
                  title="Buscar:"
                  touched={true}
                />
              </div>

              <div className="col-md-4 col-lg-2 m-0 p-0">
                <InputForm
                  type="number"
                  name="size"
                  value={values.size}
                  touched={true}
                  error={errors.size}
                  placeholder="Cantidad"
                  onChange={onChange}
                  title="Cantidad"
                />
              </div>

              <div className="col-md-4 col-lg-2 m-0 p-0">
                <div className="form-group">
                  <button type="submit" className="btn btn-primary pt-20">
                    Buscar
                  </button>
                </div>
              </div>
            </form>
          </div>
          {loadingTable ? (
        <div className="align-center">
          <Spinner />
        </div>
      ) : (
          <div className="row">
            <div className="col-lg-12">
              <div className="table-responsive">
                {projects.results.length === 0 ? (
                  <h4> No existen proyectos  registrados </h4>
                ) : (
                  <>
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Titulo</th>
                          <th>Autor</th>
                          <th>Gestion</th>
                          <th>Inicio-Finalizacion</th>
                          <th>Avances entregados</th>
                          <th>Avances sin entregar </th>
                          <th>Correos notificados</th>
                        </tr>
                      </thead>
                      <tbody> 
                        {projects.results.map((project) => (
                          <tr key={projects.id}>
                            <td>
                              <Link to={Config.aProjectsUrl+"/"+project.id}>
                                {project.title_academic_project}
                                <br /> <small> {project.modality.title}</small>
                              </Link>
                            </td>   
                            <td><Link to={Config.aStudentsUrl+"/"+project.student.id}>
                                {project.student.last_name +" "+project.student.last_name2 +" "+project.student.first_name}
                                </Link></td>
                            <td>{project.academic_period.title}</td>
                            <td>{project.date_init} {project.date_end}</td>
                            <td>{project.report.tracing_months.map((date)=>(
                                 <h6 className="col-green">{getNameDateMonth(date)}</h6>
                            ))}</td>

                            <td>{project.report.tracing_months_not_sent.map((date)=>(
                               <h6 className="col-red">{getNameDateMonth(date)}</h6>
                            ))}</td>

                            {/*<td>{user.pending_reviews.review}</td>
                            <td>{user.pending_reviews.pending_review}</td>
                            <td>{user.delay_project.inscription ? user.delay_project.inscription.title_academic_project:""}  
                            <br />
                            {user.delay_project.days>0 ? (
                              <span className="col-red"> <strong>{user.delay_project.days}</strong> días sin revisión</span>
                            ):" "}
                            </td>
                           
                            <td>
                              {PercentBar(
                                user.pending_reviews.progress,
                                user.pending_reviews.pending_review
                              )}
                            </td> */}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <NavPagination
                      context={projects.context}
                      loadList={props.listProjects}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
          )}
        
      
    </>
  );
};

const mapStateToProps = (state) => ({
  projects: state.report_inscriptions,
});

const mapDispatchToProps = {
  listProjects,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportInscriptionTable);
