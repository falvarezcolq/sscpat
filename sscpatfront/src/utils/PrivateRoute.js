import React from "react";
import { Route, Redirect } from "react-router-dom";
import MainComponent from "../components/MainComponent";
import { connect } from "react-redux";

export var PrivateRoute = ({
  page,
  activepage,
  activepage2,
  auth,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        auth.isAuthenticated ? (
          <MainComponent
            page={page}
            activepage={activepage}
            activepage2={activepage2}
            url={rest.path}
            {...props}
          />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(PrivateRoute);
