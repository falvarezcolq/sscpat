import React from "react";
import GoogleFontLoader from "react-google-font-loader";
import "adminbsb-materialdesign/plugins/bootstrap/css/bootstrap.css";
import "adminbsb-materialdesign/plugins/node-waves/waves.css";
import "adminbsb-materialdesign/plugins/animate-css/animate.css";
import "adminbsb-materialdesign/css/style.css";
import "../style/design.css";
import Config from "../utils/Config";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../actions/auth";
import Alert from "../components/atoms/Alert";

// import Overlay from "../components/Overlay";

class Login extends React.Component {
  state = {
    username: "",
    password: "",
    btnDisabled: true,
    loginStatus: 0,
  };
  static propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    this.props.login(username, password);
  };

  render() {
    if (this.props.isAuthenticated) {
      switch (this.props.type) {
        case "ADMIN":
          window.location = Config.HomeUrl;
          break;
        case "TUTOR":
          window.location = Config.tHomeUrl;
          break;
        case "EXTERNAL_TUTOR":
          window.location = Config.HomeUrl;
          break;
        case "STUDENT":
          window.location = Config.sHomeUrl;
          break;

        default:
          break;
      }
    }
    document.body.className = "login-page";

    const { username, password } = this.state;
    const messages = this.props.messages;
    return (
      <>
        <GoogleFontLoader
          fonts={[
            {
              font: "Roboto",
              weights: [400, 700],
            },
          ]}
          subsets={["latin", "cyrillic-ext"]}
        />
        <GoogleFontLoader
          fonts={[
            {
              font: "Material+Icons",
            },
          ]}
        />
        <div className="login-box">
          <div className="logo">
            <h1 style={{ color: "#fff", textAlign: "center" }}>SSCPAT</h1>
            <small>
              Sistema de seguimiento y control de proyectos de titulacion
            </small>
          </div>
          <div className="card">
            <div className="body">
              <form id="sign_in" onSubmit={this.onSubmit}>
                <div className="msg">Ingresar</div>
                <div className="input-group">
                  <span className="input-group-addon">
                    <i className="material-icons">person</i>
                  </span>
                  <div className="form-line">
                    <input
                      type="text"
                      className="form-control"
                      name="username"
                      placeholder="Nombre de usuario"
                      required
                      // autofocus="true"
                      onChange={this.onChange}
                      value={username}
                    />
                  </div>
                </div>
                <div className="input-group">
                  <span className="input-group-addon">
                    <i className="material-icons">lock</i>
                  </span>
                  <div className="form-line">
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="Contraseña"
                      required
                      onChange={this.onChange}
                      value={password}
                    />
                  </div>
                </div>

                {messages.payload && messages.payload.detail ? (
                  <Alert
                    message={messages.payload.detail}
                    color={messages.color}
                  />
                ) : (
                  ""
                )}

                {this.props.isLoading ? (
                  <div style={{ textAlign: "center", margin: "auto" }}>
                    <div className="preloader pl-size-xs">
                      <div className="spinner-layer pl-teal">
                        <div className="circle-clipper left">
                          <div className="circle"></div>
                        </div>
                        <div className="circle-clipper right">
                          <div className="circle"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {/* <Overlay display={'block'}/> */}

                <div className="row">
                  <div className="col-xs-8 p-t-5">
                    <input
                      type="checkbox"
                      name="rememberme"
                      id="rememberme"
                      className="filled-in chk-col-pink"
                    />
                    <label htmlFor="rememberme">Recorda contraseña</label>
                  </div>
                  <div className="col-xs-4">
                    {/* <button className="btn btn-block bg-pink waves-effect" type="submit">{t('login.sign_in')}</button> */}
                    <button
                      className="btn btn-block bg-pink waves-effect"
                      type="submit"
                      disabled={this.props.isLoading}
                    >
                      {this.props.isLoading ? "Entrando..." : "Ingresar"}
                    </button>
                  </div>
                </div>
                <div className="row m-t-15 m-b--20">
                  <div className="col-xs-6">
                    {/* <a href="forgot-password.html">Olvide mi contraseña</a> */}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  type: state.auth.type,
  isLoading: state.auth.isLoading,
  messages: state.messages,
});
export default connect(mapStateToProps, { login })(Login);
