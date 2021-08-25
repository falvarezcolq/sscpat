import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  list,
  addListTracing,
  setLoadingListTracing,
  getListTracing,
} from "../../actions/tracingstudent";

import Spinner from "../atoms/Spinner";
import {
  getNameDateMonth,
  getDateTime,
  getTypeTracing,
  getTypeFile,
  filePath,
} from "../../actions/helper";
import { Link } from "react-router-dom";
import Config from "../../utils/Config";
import HeaderDropdown from "../../components/atoms/HeaderDropdown";
import Modal from "../../components/atoms/Modal";
import ProgressUpdateForm from "./ProgresUpdateForm";
import pdf_image from "../../img/pdf_icon.png";
import TextCheck from "../atoms/TextCheck";
import AuthHandler from "../../utils/AuthHandler";
import { getFirstCharacter } from "../../actions/helper";

const ProgresCard = (props) => {
  const {
    project_id,
    results,
    addListTracing,
    setLoadingListTracing,
    getListTracing,
  } = props;
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({
    title: "",
    message: "",
    cancel: null,
    confirm: null,
    accept: null,
  });

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setLoading(true);
    loadData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadData = async () => {
    await props.list(project_id);
    setLoading(false);
  };

  // const iconDone = (bool) => {
  //   return bool ? (
  //     <i className="material-icons col-green" title="completado">
  //       done
  //     </i>
  //   ) : (
  //     <i className="material-icons col-orange" title="No realizado">
  //       error_outline
  //     </i>
  //   );
  // };

  const loadListTracingProgres = async (id) => {
    addListTracing(id);
    setLoadingListTracing(id, true);
    await getListTracing(id);
  };

  const openEditModal = (id) => {
    setModal({
      progress_id: id,
      cancel: setOpenModal.bind(this, false),
      confirm: null,
      accept: null,
    });
    setOpenModal(true);
  };

  if (loading) {
    return (
      <div className="card">
        <div className="body">
          <div className="align-center">
            <Spinner />
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      {results.length > 0 ? (
        results.map((progress) => (
          <div className="card" key={progress.id}>
            <div className="header">
              <h2>
                <Link to={Config.aProgressUrl + "/" + progress.id}>
                  Avance nro: <strong>{progress.number}</strong> correspondiente
                  al mes de{" "}
                  <strong>{getNameDateMonth(progress.date_month)}</strong>
                  <br />
                  <small>
                    {getDateTime(progress.created_at)}
                    {progress.created_by && (
                      <>
                        {" "}
                        Avance subido por{" "}
                        <strong style={{ color: "#555" }}>
                          {progress.created_by.first_name +
                            " " +
                            progress.created_by.last_name +
                            " " +
                            progress.created_by.last_name2}
                        </strong>
                      </>
                    )}
                  </small>
                </Link>

                {AuthHandler.isStudent() &&
                  progress.require_institution_report &&
                  !progress.institution_report_was_sent && (
                    <Link
                      className="btn btn-sm btn-danger pull-right"
                      to={Config.aProgressUrl + "/" + progress.id}
                    >
                      Subir informe de la Institución
                    </Link>
                  )}

                {AuthHandler.isInternalTutor() &&
                  progress.require_tutor_review &&
                  !progress.reviewed_by_tutor && (
                    <Link
                      className="btn btn-sm btn-danger pull-right"
                      to={Config.aProgressUrl + "/" + progress.id}
                    >
                      Subir reporte de tutor
                    </Link>
                  )}

                {AuthHandler.isExternalTutor() &&
                  progress.require_external_tutor_review &&
                  !progress.reviewed_by_external_tutor && (
                    <Link
                      className="btn btn-sm btn-danger pull-right"
                      to={Config.aProgressUrl + "/" + progress.id}
                    >
                      Subir reporte de tutor
                    </Link>
                  )}
              </h2>

              <HeaderDropdown>
                <li>
                  <span
                    className="dropdown-link waves-effect waves-block"
                    onClick={() => openEditModal(progress.id)}
                  >
                    {" "}
                    Editar{" "}
                  </span>
                </li>
              </HeaderDropdown>
              <br />

              <div className="row">
                <div className="col-lg-12">
                  {progress.files.map((file) => (
                    <div key={file.id} style={{ display: "inline-block" }}>
                      <div className="link-container">
                        <a
                          className="file-link"
                          href={filePath(file.path)}
                          title={file.title}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <div className="image-link">
                            <img
                              className=""
                              src={
                                file.format === "application/pdf"
                                  ? pdf_image
                                  : file.thumbnail
                              }
                              aria-hidden="true"
                              role="presentation"
                              data-mime-type="image/jpeg"
                              alt=""
                            />
                          </div>
                          <div className="text-link">
                            <div className="text-link-title">{file.title}</div>
                            <div className="">
                              <div className="">{getTypeFile(file.format)}</div>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="col-lg-12">
                  <div
                    style={{
                      whiteSpace: "pre-wrap",
                      backgroundColor: "#F4F4F4",
                      padding: "5px",
                    }}
                  >
                    {progress.description}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-12" style={{ marginBottom: "0px" }}>
                  {/* {progress.require_admin_review && (
                    <>
                      {iconDone(progress.reviewed_by_admin)}
                      <span
                        className="icon-name"
                        style={{ position: "relative", top: "-6px" }}
                      >
                        Dirección de carrera
                      </span>
                      <br />
                    </>
                  )} */}

                  {progress.require_tutor_review && (
                    <TextCheck check={progress.reviewed_by_tutor}>
                      {" "}
                      Revisado por el tutor
                    </TextCheck>
                  )}

                  {progress.require_external_tutor_review && (
                    <TextCheck check={progress.reviewed_by_external_tutor}>
                      {" "}
                      Revisado por los tutores externos
                    </TextCheck>
                  )}

                  {progress.require_institution_report && (
                    <TextCheck check={progress.institution_report_was_sent}>
                      {" "}
                      Informe de la institución
                    </TextCheck>
                  )}

                  {progress.tracingcount > 0 && (
                    <div className="pull-right">
                      <button
                        className="btn btn-link"
                        style={{ fontWeight: "lighter", color: "#1967d2" }}
                        onClick={loadListTracingProgres.bind(this, progress.id)}
                      >
                        Ver detalle
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {progress.list_tracing_progress &&
              progress.list_tracing_progress.loading && (
                <div className="Body">
                  <div className="align-center">
                    {" "}
                    <Spinner />
                  </div>
                </div>
              )}

            {progress.list_tracing_progress &&
              progress.list_tracing_progress.results.length > 0 && (
                <div className="body">
                  {progress.list_tracing_progress.results.map(
                    (tracingprogress) => (
                      <div className="row" key={tracingprogress.id}>
                        <div className="col-lg-12">
                          <div className="tracing-progress-box">
                            <div className="tracing-progress-image-letter">
                              {getFirstCharacter(tracingprogress.user.first_name)}
                            </div>
                            <div className="tracing-progress-card">
                              <div className="tracing-progress-file">
                                <div>
                                  <div>
                                    {" "}
                                    <strong>
                                      {tracingprogress.user.first_name +
                                        " " +
                                        tracingprogress.user.last_name +
                                        " " +
                                        tracingprogress.user.last_name2}
                                    </strong>{" "}
                                    <small> : </small>{" "}
                                    <strong style={{ color: "#1967d2" }}>
                                      {getTypeTracing(
                                        tracingprogress.typetracing
                                      )}
                                    </strong>{" "}
                                    <small>{getDateTime(tracingprogress.created_at)}</small>
                                  </div>
                                  <div>
                                    {" "}
                                    {tracingprogress.files.length >  0 && (<p>Archivos subidos:</p>)}
                                    {tracingprogress.files.map((file) => (
                                      <div key={file.id}>
                                        <div className="link-container">
                                          <a
                                            className="file-link"
                                            href={filePath(file.path)}
                                            title={file.title}
                                            target="_blank"
                                            rel="noreferrer"
                                          >
                                            <div className="image-link-small">
                                              <img
                                                className=""
                                                src={
                                                  file.format ===
                                                  "application/pdf"
                                                    ? pdf_image
                                                    : file.thumbnail
                                                }
                                                alt="presentation"
                                              />
                                            </div>
                                            <div className="text-link">
                                              <div className="text-link-title">
                                                {file.title}
                                              </div>
                                            </div>
                                          </a>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <div
                                className="tracing-progress-text"
                                style={{
                                  whiteSpace: "pre-wrap",
                                  backgroundColor: "#eeeeee",
                                  borderRadius: "5px",
                                  padding: "5px",
                                }}
                              >
                                {tracingprogress.description}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}
          </div>
        ))
      ) : (
        <h5> El proyecto aún no tiene avances </h5>
      )}

      <Modal open={openModal}>
        {modal.progress_id && (
          <ProgressUpdateForm
            project_id={project_id}
            progress_id={modal.progress_id}
            cancel={() => setOpenModal(false)}
          />
        )}
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({
  results: state.tracingstudent.results,
});

const mapDispatchToProps = {
  list,
  addListTracing,
  setLoadingListTracing,
  getListTracing,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProgresCard);
