import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { listReport as list } from "../../actions/tracingstudent";
import Spinner from "../atoms/Spinner";
import pdf_image from "../../img/pdf_icon.png";

import {
  getDateTime,
  getTypeTracing,
  getTypeFile,
  getNameMonth,
} from "../../actions/helper";
import { Link } from "react-router-dom";
import Config from "../../utils/Config";
import HeaderDropdown from "../../components/atoms/HeaderDropdown";
import Modal from "../../components/atoms/Modal";
import ProgressUpdateForm from "./ProgresUpdateForm";
import tracingprogress from "../../store/reducers/tracingprogress";
import TextCheck from "../../components/atoms/TextCheck";

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
  }, []);

  const loadData = async () => {
    await props.list(project_id);
    setLoading(false);
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
      <div className="card">
        {results.length > 0 ? (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Documentos</th>
                <th>Tipo y fecha</th>
                <th>Detalle</th>
                <th>Archivos</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {results.map((progress) => (
                <>
                  <tr>
                    <td colSpan="4">
                      <Link to={Config.aProgressUrl + "/" + progress.id}>
                        <span
                          style={{
                            color: "rgb(25, 103, 210)",
                            fontSize: "1.5rem",
                          }}
                        >
                          Avance nro: <strong>{progress.number}</strong>{" "}
                          correspondiente al mes de{" "}
                          <strong>{getNameMonth(progress.month)}</strong>{" "}
                        </span>

                        <small style={{ color: "#aaa", fontSize: "1 rem" }}>
                          {getDateTime(progress.created_at)}
                          {progress.created_by &&
                            " Avance subido por  " +
                              progress.created_by.first_name +
                              " " +
                              progress.created_by.last_name +
                              " " +
                              progress.created_by.last_name2}
                        </small>
                      </Link>
                    </td>
                  </tr>
                  {progress.tracingprogress.length == 0 && (
                    <tr>
                      <td>
                        {progress.require_tutor_review && (
                          <TextCheck check={progress.reviewed_by_tutor}>
                            {" "}
                            Revisado por el tutor
                          </TextCheck>
                        )}

                        {progress.require_external_tutor_review && (
                          <TextCheck
                            check={progress.reviewed_by_external_tutor}
                          >
                            {" "}
                            Revisado por los tutores externos
                          </TextCheck>
                        )}

                        {progress.require_institution_report && (
                          <TextCheck
                            check={progress.institution_report_was_sent}
                          >
                            {" "}
                            Informe de la institución
                          </TextCheck>
                        )}

                        {progress.description !== "" && (
                          <>
                            <br />
                            <div
                              style={{
                                whiteSpace: "pre-wrap",
                                backgroundColor: "#eee",
                                padding: "5px",
                              }}
                            >
                              {progress.description}
                            </div>
                          </>
                        )}

                        {progress.files.map((file) => (
                          <div key={file.id}>
                            <div className="link-container">
                              <a
                                class="file-link"
                                href={file.path}
                                title={file.title}
                              >
                                <div class="image-link">
                                  <img
                                    class=""
                                    src={
                                      file.format === "application/pdf"
                                        ? pdf_image
                                        : file.thumbnail
                                    }
                                    aria-hidden="true"
                                    role="presentation"
                                    data-mime-type="image/jpeg"
                                  />
                                </div>
                                <div class="text-link">
                                  <div class="text-link-title">
                                    {file.title}
                                  </div>
                                  <div class="">
                                    <div class="">
                                      {getTypeFile(file.format)}
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                        ))}
                      </td>

                      <td colSpan="3" className="align-center">
                        {" "}
                        Sin acciones
                      </td>
                    </tr>
                  )}

                  {progress.tracingprogress.length > 0 &&
                    progress.tracingprogress.map((tracing, index) => (
                      <tr key={index}>
                        {index == 0 && (
                          <td rowSpan={"" + progress.tracingprogress.length}>
                            {progress.require_tutor_review && (
                              <TextCheck check={progress.reviewed_by_tutor}>
                                {" "}
                                Revisado por el tutor
                              </TextCheck>
                            )}

                            {progress.require_external_tutor_review && (
                              <TextCheck
                                check={progress.reviewed_by_external_tutor}
                              >
                                {" "}
                                Revisado por los tutores externos
                              </TextCheck>
                            )}

                            {progress.require_institution_report && (
                              <TextCheck
                                check={progress.institution_report_was_sent}
                              >
                                {" "}
                                Informe de la institución
                              </TextCheck>
                            )}

                            {progress.description !== "" && (
                              <>
                                <br />
                                <div
                                  style={{
                                    whiteSpace: "pre-wrap",
                                    backgroundColor: "#eee",
                                    padding: "5px",
                                  }}
                                >
                                  {progress.description}
                                </div>
                              </>
                            )}

                            {progress.files.map((file) => (
                              <div key={file.id}>
                                <div className="link-container">
                                  <a
                                    class="file-link"
                                    href={file.path}
                                    title={file.title}
                                  >
                                    <div class="image-link">
                                      <img
                                        class=""
                                        src={
                                          file.format === "application/pdf"
                                            ? pdf_image
                                            : file.thumbnail
                                        }
                                        aria-hidden="true"
                                        role="presentation"
                                        data-mime-type="image/jpeg"
                                      />
                                    </div>
                                    <div class="text-link">
                                      <div class="text-link-title">
                                        {file.title}
                                      </div>
                                      <div class="">
                                        <div class="">
                                          {getTypeFile(file.format)}
                                        </div>
                                      </div>
                                    </div>
                                  </a>
                                </div>
                              </div>
                            ))}
                          </td>
                        )}

                        <td>
                          <strong>{getTypeTracing(tracing.typetracing)}</strong>

                          {tracing.institution && (
                            <>
                              {" "}
                              <br /> {tracing.institution.name}
                            </>
                          )}
                          <br />
                          <small>
                            {tracing.user &&
                              tracing.user.first_name +
                                " " +
                                tracing.user.last_name +
                                " " +
                                tracing.user.last_name2}
                            <br />
                            {getDateTime(tracing.created_at)}
                          </small>
                        </td>
                        <td>
                          {tracing.description != "" && (
                            <div style={{ whiteSpace: "pre-wrap" }}>
                              {tracing.description}
                            </div>
                          )}
                        </td>
                        <td>
                          {tracing.files.map((file) => (
                            <div key={file.id}>
                              <div className="link-container">
                                <a
                                  class="file-link"
                                  href={file.path}
                                  title={file.title}
                                >
                                  <div class="image-link">
                                    <img
                                      class=""
                                      src={
                                        file.format === "application/pdf"
                                          ? pdf_image
                                          : file.thumbnail
                                      }
                                      aria-hidden="true"
                                      role="presentation"
                                      data-mime-type="image/jpeg"
                                    />
                                  </div>
                                  <div class="text-link">
                                    <div class="text-link-title">
                                      {file.title}
                                    </div>
                                    <div class="">
                                      <div class="">
                                        {getTypeFile(file.format)}
                                      </div>
                                    </div>
                                  </div>
                                </a>
                              </div>
                            </div>
                          ))}
                        </td>
                      </tr>
                    ))}
                </>
              ))}
            </tbody>
          </table>
        ) : (
          <h5> El proyecto aún no tiene avances </h5>
        )}
      </div>
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
  results: state.tracingstudent.resultsReport,
});

const mapDispatchToProps = {
  list,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProgresCard);
