import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { list } from "../../actions/tracingstudent";
import Spinner from "../atoms/Spinner";
import { getNameMonth, getDateTime, getTypeFile, filePath } from "../../actions/helper";
import { Link } from "react-router-dom";
import Config from "../../utils/Config";
import HeaderDropdown from "../../components/atoms/HeaderDropdown";
import Modal from "../../components/atoms/Modal";
import ProgressUpdateForm from "./ProgresUpdateForm";
import pdf_image from "../../img/pdf_icon.png";
import TextCheck from "../atoms/TextCheck";

const ProgresCard = (props) => {
  const { project_id, results } = props;
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
                  Entrega de avance nro: <strong>{progress.number}</strong>{" "}
                  correspondiente al mes de{" "}
                  <strong>{getNameMonth(progress.month)}</strong>
                  <br />
                  <small>
                    {getDateTime(progress.created_at)}
                    {progress.created_by &&
                      "  Avance subido por  " +
                        progress.created_by.first_name +
                        " " +
                        progress.created_by.last_name +
                        " " +
                        progress.created_by.last_name2}
                  </small>
                </Link>
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
            </div>
            <div className="body">
              <div className="row">
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
                <div className="col-lg-6">
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
                </div>
                <div className="col-lg-6">
                  {progress.files.map((file) => (
                    <div key={file.id}>
                      <div className="link-container">
                        <a
                          className="file-link"
                          href={filePath(file.path)}
                          title={file.title}
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
              </div>

              <br />
            </div>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(ProgresCard);
