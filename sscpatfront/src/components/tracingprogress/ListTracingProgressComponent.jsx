import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { list } from "../../actions/tracingprogress";
import Spinner from "../atoms/Spinner";
// import { getNameMonth, getDateTime } from "../../actions/helper";
// import { Link } from "react-router-dom";
// import Config from "../../utils/Config";
import TracingProgressCard from "./TracingProgressCard";
import Modal from "../../components/atoms/Modal";
import TracingProgressUpdateForm  from  "./TracingProgressUpdateForm";

const ListTracingProgressComponent = (props) => {
  const {progress_id, results } = props;
  const [loading, setLoading] = useState(false);

  const [modal, setModal] = useState({
    title: "",
    message: "",
    cancel: null,
    confirm: null,
    accept: null,
  });

  const [openModal, setOpenModal] = useState(false);


  const openEditModal= (id) => {
    setModal({
      tracing_progress_id:id,
      cancel: setOpenModal.bind(this, false),
      confirm: null,
      accept: null,
    });
    setOpenModal(true);
  }


  useEffect(() => {
    setLoading(true);
    loadData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadData = async () => {
    await props.list(progress_id);
    setLoading(false);
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
       <div className="row">
           { results.map((tracingProgress,index) => (
            <div  key={index}className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <TracingProgressCard 
                tracingprogress={tracingProgress}
                openEditModal={openEditModal}
                />
            </div>
           
        ))}
       </div>
      ) : (

        <div className="row clearfix">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <div className="card">
          <div className="body align-center">
          <h5> El avance de proyecto aún no tiene revisiones, ni comentarios </h5>
          </div>
          </div>
        </div>
        </div>
          
      )}


      <Modal open={openModal}>
        {modal.tracing_progress_id &&
        <TracingProgressUpdateForm 
          progress_id={progress_id} 
          tracing_progress_id={modal.tracing_progress_id}
          cancel={()=>setOpenModal(false)}
          />
        }
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({
  results: state.tracingprogress.results,
});

const mapDispatchToProps = {
  list,
};

export default connect(mapStateToProps, mapDispatchToProps)(ListTracingProgressComponent);
