import React, { useState, useEffect } from "react";
import Spinner from "../atoms/Spinner";
import { connect } from "react-redux";
import { getInfo as get } from "../../actions/info";

// const initialValues = {
//   inscriptions: 0,
//   tutor: 0,
//   tracing_student: 0,
//   reviews_by_tutors: 0,
// };

const Info = (props) => {
  const { info, get } = props;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    loadData();
  }, []);

  const loadData = async () => {
    await get();
    setLoading(false);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="row clearfix">
      <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
        <div className="info-box bg-pink hover-expand-effect">
          <div className="icon">
            <i className="material-icons">playlist_add_check</i>
          </div>
          <div className="content">
            <div className="text">Proyectos academicos</div>
            <div
              className="number count-to"
              data-from="0"
              data-to="125"
              data-speed="15"
              data-fresh-interval="20"
            >
             {info.inscriptions}
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
        <div className="info-box bg-cyan hover-expand-effect">
          <div className="icon">
            <i className="material-icons">help</i>
          </div>
          <div className="content">
            <div className="text">Nro de tutores</div>
            <div
              className="number count-to"
              data-from="0"
              data-to="257"
              data-speed="1000"
              data-fresh-interval="20"
            >
              {info.tutor}
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
        <div className="info-box bg-light-green hover-expand-effect">
          <div className="icon">
            <i className="material-icons">forum</i>
          </div>
          <div className="content">
            <div className="text">Avances</div>
            <div
              className="number count-to"
              data-from="0"
              data-to="243"
              data-speed="1000"
              data-fresh-interval="20"
            >
              {info.tracing_student}
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
        <div className="info-box bg-orange hover-expand-effect">
          <div className="icon">
            <i className="material-icons">person_add</i>
          </div>
          <div className="content">
            <div className="text">Revisiones </div>
            <div
              className="number count-to"
              data-from="0"
              data-to="1225"
              data-speed="1000"
              data-fresh-interval="20"
            >
              {info.reviews_by_tutors}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  info: state.info,
});

const mapDispatchToProps = {
  get,
};
export default connect(mapStateToProps, mapDispatchToProps)(Info);
