import React from 'react';

import Config from './Config'
import PrivateRoute from "./PrivateRoute";
import StudentDetail from '../pages/student/student/StudentDetail';

const RoutesStudent = () => {
    return (
        <>
            <PrivateRoute   
                exact
                path={Config.sHomeUrl}
                activepage="0"
                activepage2="0"
                page={StudentDetail}
            />
        </>
    )
}

export default RoutesStudent
