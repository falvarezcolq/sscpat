import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
// import { getNameType } from "../../actions/helper";
import { listTutors } from "../../actions/tutors";
import NavPagination from "./NavPagination";
import Config from "../../utils/Config";
import PropTypes from "prop-types";
import { validateInput } from "../../utils/Validations";
import { Link } from "react-router-dom";
import InputForm from "../atoms/InputForm";
import Spinner from "../atoms/Spinner";
import PercentBar from "../../components/atoms/PercentBar";

const initialValues = {
  search: "",
  size: 10,
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

const modalValues = {
  title: "",
  message: "",
  cancel: null,
  confirm: null,
  accept: null,
};

const TutorTable = (props) => {
  const { tutors, url} = props;
  const url_detail = url == Config.ExternalTutorApiUrl ? Config.aETutorUrl : Config.aTutorUrl; 
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [modal, setModal] = useState(modalValues);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loadingTable, setLoadingTable] = useState(false);
  const [filter, setFilter] = useState(false);

  const toggleFilter = () => setFilter(!filter);
  useEffect(() => {
    loadTable();
  }, []);

  const loadTable = async () => {
    setLoadingTable(true);
    loadData(url,null);
  };

  const loadData = async (url,value) => {
    await props.listTutors(url,value);
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

          <div className="row" 
          // style={{ display: filter ? "block" : "none" }}
          >
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
                {props.tutors.results.length === 0 ? (
                  <h4> No hay tutores </h4>
                ) : (
                  <>
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Apellidos y Nombres</th>
                          <th>Total</th>
                          <th>Concluidos</th>
                          <th>Abandonados</th>
                          <th>
                            Proyectos <br /> actuales
                          </th>
                          <th>Proyectos revisados</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tutors.results.map((user) => (
                          <tr key={user.id}>
                            <td>
                              <Link to={url_detail+ "/" + user.id}>
                                {user.abbreviation} {user.last_name}{" "}
                                {user.last_name2} {user.first_name}
                              </Link>
                            </td>
                            <td>{user.total}</td>
                            <td>{user.complete}</td>
                            <td>{user.abandoned}</td>
                            <td>{user.under_development}</td>
                            <td>
                              {PercentBar(
                                user.under_development,
                                user.pending_reviews
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <NavPagination
                      context={tutors.context}
                      loadList={props.listTutors}
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
  tutors: state.tutors,
});

const mapDispatchToProps = {
  listTutors,
};

export default connect(mapStateToProps, mapDispatchToProps)(TutorTable);
