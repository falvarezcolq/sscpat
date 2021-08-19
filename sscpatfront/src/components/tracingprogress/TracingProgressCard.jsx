import React from "react";
import {
  getDateTime,
  getTypeTracing,
  getTypeFile,
  filePath,
} from "../../actions/helper";
import pdf_image from "../../img/pdf_icon.png";
import HeaderDropdown from "../../components/atoms/HeaderDropdown";

const TracingProgressCard = (props) => {
  const { tracingprogress, openEditModal } = props;
  return (
    <div className="card">
      <div className="header">
        <p>
          <strong>
            {tracingprogress.user.first_name +
              " " +
              tracingprogress.user.last_name +
              " " +
              tracingprogress.user.last_name2}
          </strong>{" "}
          <small> : </small>{" "}
          <strong style={{ color: "#1967d2" }}>
            {getTypeTracing(tracingprogress.typetracing)}
          </strong>{" "}
          {tracingprogress.institution &&
            " " + tracingprogress.institution.name}
          <br />
          <small>{getDateTime(tracingprogress.created_at)}</small>
        </p>
        <HeaderDropdown>
          <li>
            <span
              className="dropdown-link waves-effect waves-block"
              onClick={() => openEditModal(tracingprogress.id)}
            >
              {" "}
              Editar{" "}
            </span>
          </li>
        </HeaderDropdown>

        <div className="row">
          <div className="col-lg-12">
            {tracingprogress.files.map((file) => (
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
                        alt="presentation"
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
  );
};

export default TracingProgressCard;
