import  { combineReducers } from 'redux';
// import leads from './leads';
// import errors from './errors'; 
import messages from './messages'; 
import auth from './auth';
import tutors from './tutors';
import externaltutors from './externaltutors'
import form from './form';
import users from './users';
import students from './students';
import academicperiods from './academicperiods';
import documents from './documents';
import modalities from './modalities';
import institutions from './institutions';
import projects from './projects';
import tracingstudent from './tracingstudent';
import tracingprogress from './tracingprogress';
import info from './info';
import notifications from "./notifications"


export default combineReducers({
    messages,
    auth,
    tutors,
    externaltutors,
    form,
    users,
    students,
    academicperiods,
    documents,
    modalities,  
    institutions, 
    projects, 
    tracingstudent,
    tracingprogress,
    info,
    notifications,
})