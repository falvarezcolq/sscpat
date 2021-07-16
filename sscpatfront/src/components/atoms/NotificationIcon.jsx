import React, { useEffect} from 'react';
import { connect } from 'react-redux';
import Config from "../../utils/Config";
import { getNumberNotifications } from "../../actions/notifications";
import { Link } from "react-router-dom";

const NotificationIcon = (props) => {

    const { notifications} = props
    useEffect(() => { 
        loadData();
        // props.getNumberNotifications();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps 
    
    const loadData = async () => {
        await props.getNumberNotifications();
    };
    
    return (
        <Link
            to={Config.aNotificationUrl}
            className="dropdown-toggle"
            data-toggle="dropdown"
            role="button"
        >
        <i className="material-icons">notifications</i>
        { notifications.number > 0 && (
            <span className="label-count">{notifications.number}</span>
        )}
       
        </Link>
    )
}

const mapStateToProps = (state) => ({
    notifications: state.notifications
})

const mapDispatchToProps = {
    getNumberNotifications
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationIcon)
