import React from "react";
import { connect } from "react-redux";
import AdminConsole from "./admin-console";
import Login from "./login";
import { resetSuccessMessage } from "../../store/form/form.actions";

const Admin = ({ auth }) => (
  <div className="admin content">
    {auth.uid ? (
      <AdminConsole resetSuccessMessage={resetSuccessMessage} />
    ) : (
      <Login />
    )}
  </div>
);

const mapStateToProps = (state) => ({
  auth: state.firebase.auth,
});

export default connect(mapStateToProps, {
  resetSuccessMessage,
})(Admin);
