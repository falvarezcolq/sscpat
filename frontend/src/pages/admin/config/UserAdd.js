import React from "react";
import { connect } from "react-redux";
// import PropTypes from "prop-types";
// import { addTutor, removeTutor, searchTutor } from "../../../actions/tutors";
import UserNewForm from '../../../components/forms/UserNewForm';
import Alert from '../../../components/atoms/Alert';

class UserAdd extends React.Component {
  // static propTypes = {};
  
  render() {
    const messages = this.props.messages;

    return (
      <section className="content">
         { messages.payload && messages.payload.detail? (
            <Alert message={messages.payload.detail} 
                      color={messages.color} />
           
          ) : (
            ""
          )}
          
        <div className="container-fluid">
          <div className="block-header">
            <h2> <button
                type="button"
                className="btn btn-link"
                onClick={this.props.history.goBack}
                title="Volver atras"
              >
                <i class="material-icons">arrow_back</i>
              </button>Agregar Nuevo Usuario </h2>
          </div>
        </div>

        <div className="row clearfix">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="card">
              <div className="header">
                <h2>
                  Agregar Nuevo usuario al sistema desde el sistema principal
                  <small>El formulario permite agregar un nuevo usuario</small>
                </h2>
              </div>

              <div className="body">
                <UserNewForm/>
                { messages.payload && messages.payload.detail? (
                  <Alert message={messages.payload.detail} 
                            color={messages.color} />
                
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>


       

      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  messages:state.messages,
  // UserAddedList: state.tutors.UserAddedList,
});

const mapDispatchToProps = {
  // addTutor,
  // removeTutor,
  // searchTutor,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserAdd);
