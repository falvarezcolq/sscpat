import React from "react";
import { getDateTime, getTypeTracing, getTypeFile } from "../../actions/helper";
import pdf_image from "../../img/pdf_icon.png";
import HeaderDropdown from  "../../components/atoms/HeaderDropdown";

const TracingProgressCard = (props) => {
  const { tracingprogress , openEditModal } = props;
  return (
    <div className="card">
      <div className="header">
        <h2>
          
          <strong>{getTypeTracing(tracingprogress.typetracing)}</strong>
          {tracingprogress.institution && " " +tracingprogress.institution.name}
          <br />
          <small>
            {getDateTime(tracingprogress.created_at)}
            {tracingprogress.user &&
              " - " +
                tracingprogress.user.first_name +
                " " +
                tracingprogress.user.last_name +
                " " +
                tracingprogress.user.last_name2}
          </small>
        
        </h2>

  

        
        <HeaderDropdown>
                <li>
                  <span className="dropdown-link waves-effect waves-block" onClick={ () => openEditModal(tracingprogress.id)} > Editar </span>
                </li>
        </HeaderDropdown>
      </div>
      { tracingprogress.description!="" &&
      
      <div className="body">
        <div className="row">
          <div className="col-lg-8">
            <div style={{ whiteSpace: "pre-wrap" }}>
            {tracingprogress.description}
          </div>
          </div>
          <div className="col-lg-4">
          {tracingprogress.files.map((file) => (
            <div key={file.id}>
              <div className="link-container">
                <a class="file-link" href={file.path} title={file.title}>
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
                    <div class="text-link-title">{file.title}</div>
                    <div class="">
                      <div class="">{getTypeFile(file.format)}</div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
      }
    </div>
  );
};

export default TracingProgressCard;
