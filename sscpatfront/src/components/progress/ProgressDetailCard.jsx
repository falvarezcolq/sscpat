import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getDetails as get } from "../../actions/tracingstudent";
import Config from "../../utils/Config";
// import HeaderDropdown from "../atoms/HeaderDropdown";
import { LabelStatus } from "../atoms/LabelStatus";
import Spinner from "../atoms/Spinner";
import {
  getNameDateMonth,
  getDateTime,
  getTypeFile,
  filePath,
} from "../../actions/helper";
import pdf_image from "../../img/pdf_icon.png";
import TextCheck from "../atoms/TextCheck";

const DetailCard = (props) => {
  const { id, progress } = props;
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    // setLoading(true)
    loadData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadData = async () => {
    await props.get(id);
    // setLoading(false);
  };

  
  if (!progress || progress.id + "" !== id + "") {
    return (
      <div className="row clearfix">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <div className="card">
            <div className="body align-center">
              <Spinner />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="row clearfix">
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <div className="card">
          <div className="header">
            <Link to={Config.aProjectsUrl + "/" + progress.inscription.id}>
              <h3>
                {progress.inscription.title_academic_project}{" "}
                {LabelStatus(progress.inscription.state)}
              </h3>
            </Link>
            

            <h2 className="pull-right">
              {progress.inscription.modality.title}{" "}
              {progress.inscription.academic_period &&
                progress.inscription.academic_period.title}
            </h2>
            <h2>
              Autor:{" "}
              {progress.inscription.student.last_name +
                " " +
                progress.inscription.student.last_name2 +
                " " +
                progress.inscription.student.first_name}
            </h2>

            {progress.inscription.tutors.map((tutor, index) => (
              <h2 key={index}>
                Tutor:{" "}
                <span style={{ fontFamily: "cursive" }}>
                  {tutor.abbreviation + " "}
                  {tutor.last_name + " "}
                  {tutor.last_name2 + " "}
                  {tutor.first_name + " "}
                </span>
              </h2>
            ))}

            {progress.inscription.external_tutors.map((tutor, index) => (
              <h2 key={index}>
                Tutor externo:{" "}
                <span style={{ fontFamily: "cursive" }}>
                  {tutor.abbreviation + " "}
                  {tutor.last_name + " "}
                  {tutor.last_name2 + " "}
                  {tutor.first_name + " "}
                </span>
              </h2>
            ))}

            {progress.inscription.institution && (
              <h2>
                Institución o empresa: {progress.inscription.institution.name}
              </h2>
            )}

            {/* <HeaderDropdown></HeaderDropdown> */}
          </div>

          <div className="header">
            <h2 style={{ color: "#1967d2" }}>
              Avance nro: <strong>{progress.number}</strong> correspondiente al
              mes de <strong>{getNameDateMonth(progress.date_month)}</strong>
              <br />
              <small style={{ color: "#222" }}>
                {getDateTime(progress.created_at)} {" "}

                {progress.created_by &&(
                  <>
                    Avance subido por {" "} 
                    <strong>{
                    progress.created_by.first_name +
                    " " +
                    progress.created_by.last_name +
                    " " +
                    progress.created_by.last_name2}</strong>
                  </>)}
              </small>
            </h2>
            <br />

            <div className="row">
              <div className="col-sm-12 col-md-12 col-lg-12">
               <div>
               {progress.files.length > 0
                  ? "Los archivos del avance: "
                  : "No hay archivos"}
               </div>

                {progress.files.map((file) => (
                  <div key={file.id} style={{display:"inline-block"}}>
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
                            alt="presentation"
                            data-mime-type="image/jpeg"
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
                <br />
              </div>
              <div className="col-lg-12">
                <div
                  style={{
                    whiteSpace: "pre-wrap",
                    backgroundColor: "#eee",
                    padding: "5px",
                  }}
                >
                  {progress.description}
                </div>
              </div>
              <div className="col-sm-12 col-md-12 col-lg-12">

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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  progress: state.tracingstudent.object,
});

const mapDispatchToProps = {
  get,
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailCard);
