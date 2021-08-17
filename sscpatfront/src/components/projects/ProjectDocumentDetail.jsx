import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getDocuments } from "../../actions/projects";
import {addFile} from "../../actions/projectsdocuments";
import Spinner from "../atoms/Spinner";
// import pdf_image from "../../img/pdf/_icon.png";

import {
  getDateTime,
  getDate,
  // getTypeTracing,
  // getTypeFile,
  // getNameMonth,
} from "../../actions/helper";
// import { Link } from "react-router-dom";
// import Config from "../../utils/Config";
// import HeaderDropdown from "../../components/atoms/HeaderDropdown";
import Modal from "../../components/atoms/Modal";
import ProgressUpdateForm from "./ProgresUpdateForm";
// import tracingprogress from "../../store/reducers/tracingprogress";
import TextCheck from "../../components/atoms/TextCheck";
// import { get } from "../../actions/documents";
// import FileComponent from "../atoms/FileComponent";
import UploadFileForm from "../projectsdocument/UploadFileForm";
// import Test from "../atoms/Test";

const ProjectDocumentsDetail = (props) => {
  const { project_id, documents,initialDocuments  } = props;
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modal ] = useState({
    title: "",
    message: "",
    cancel: null,
    confirm: null,
    accept: null,
  });

  useEffect(() => {
    setLoading(true);
    loadData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadData = async () => {
    await props.getDocuments(project_id);
    setLoading(false);
  };

  // const openEditModal = (id) => {
  //   setModal({
  //     progress_id: id,
  //     cancel: setOpenModal.bind(this, false),
  //     confirm: null,
  //     accept: null,
  //   });
  //   setOpenModal(true);
  // };

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

        {documents.length > 0  || initialDocuments.length > 0  ?
      (
        <>
         <div className="header">
            <h2>Documentos del proyecto</h2>
        </div>
        <table className="table table-bordered">
            <thead>
              <tr>
                <th>Documentos</th>
                <th>Archivos entregados</th>
              </tr>
            </thead>
            <tbody>

              {documents.length>0&&(
                <tr>
                  <td colSpan="2" className="align-center font-bold col-teal"> <strong>Documentos elaboración de la modalidad (Entrega de documentos finales)</strong> </td>
                </tr>
              )}
              {documents.map((doc) => 
              ( <tr key={doc.id}>
              <td>
                Documento: {doc.document.title} <br />
                Fecha límite de entrega:  {doc.deadline_date ? getDate(doc.deadline_date):"Cualquier momento"} <br />
                <TextCheck check={doc.reviewed}>
                {doc.reviewed ? "El documento fue revisado":"El documento no fue verificado"}
                </TextCheck> <br />

                {doc.reviewed_date ? "Revisado el " + getDateTime(doc.reviewed_date) : ""}
                    
              </td> 
                
              <td>  
              <UploadFileForm  key={doc.id} file={doc.file} type="document" projectdocument_id={doc.id}/>
              </td>
              </tr>)
              )}



              {initialDocuments.length>0&&(
                <tr>
                  <td colSpan="2" className="align-center font-bold col-cyan"> <strong>Documentos de inscripción a la modalidad</strong> </td>
                </tr>
              )}
              {initialDocuments.map((doc,index) => 
             ( <tr key={doc.id+"."+index}> 
              <td>
                Documento: {doc.document.title} <br />
                Fecha límite de entrega:  {doc.deadline_date ? getDate(doc.deadline_date):"Cualquier momento"} <br />
                <TextCheck check={doc.reviewed}>
                {doc.reviewed ? "El documento fue revisado":"El documento no fue verificado"}
                </TextCheck> <br />

                {doc.reviewed_date ? "Revisado el " + getDateTime(doc.reviewed_date) : ""}
                    
              </td>
              <td>
              <UploadFileForm key={doc.id+"."+index} file={doc.file} type="initialDocument" projectdocument_id={doc.id}/>
              </td>

              
              </tr>)
              )}

             
             
            </tbody>
          </table>
        </>
        
      )
      :
      ( 
        <div className="header">
            "no tiene documentos"
        </div>
      )
     
      } 
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
  documents: state.projects.documentList,
  initialDocuments: state.projects.initialDocumentList,
});

const mapDispatchToProps = {
  getDocuments,
  addFile,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDocumentsDetail);
