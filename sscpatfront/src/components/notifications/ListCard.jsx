import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { list , listAdd, notificationsWereRead } from "../../actions/notifications";
import { Link } from "react-router-dom";
import Config from "../../utils/Config";

import NavPagination from "../tables/NavPagination";
import Spinner from "../atoms/Spinner";
import NotificationText from "./NotificationText";
import { getDateTime } from "../../actions/helper";

const initialValues = {
  page: 1,
  size: 20,
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



const ListCard = (props) => {

  const {notifications} = props
  const url = Config.NotificationApiUrl;
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    loadData();
  }, []);

  const loadData = async () => {
    console.log(values);
    await props.list(url, values);
    setLoading(false);
    await props.notificationsWereRead();
  };


  const loadAddData = async () => {
    await props.listAdd(notifications.next, null);
    setLoading(false);
  };
 
  const onSubmit = (e) => {
    e.preventDefault();
    if (Object.values(errors).every((t) => t === null)) {
      props.list(url, values);
    }
  };

  const loadMoreNotifications = async ()=>{
    setLoading(true);
    await loadAddData();
  }

  

  return (
    <>
      <div className="row clearfix">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="card">
            <div className="header">
              <h2>
                Notificaciones
              </h2>
            </div>

            <div className="body">
             
            <ul>
              {notifications.results.map( notification =>(
                <li className="list-group-item" style={notification.is_read ? {backgroundColor:"#fff"} : {backgroundColor:"#ededed"}}>
                   
                    <NotificationText  notification={notification}/>
                    <br />
                    <div className="col-blue-gray font-10">{getDateTime(notification.created_at)}</div>
                </li>
                ))} 
            </ul>

            { loading && (
              <div className="align-center">
              <Spinner/>
                </div>
            )}

            { notifications.next && (
              <div className="align-center">
                <button className="btn btn-default" onClick={loadMoreNotifications}> Cargar mas notificaciones</button>
              </div>
            )}
                  
                
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

const mapStateToProps = (state) => ({
  notifications: state.notifications,
});

const mapDispatchToProps = {
  list,
  listAdd,
  notificationsWereRead,
};

export default connect(mapStateToProps, mapDispatchToProps)(ListCard);
