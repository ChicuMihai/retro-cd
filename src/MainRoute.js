import React from "react";
import Layout from "./components/layout/Layout";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { isLoaded } from "react-redux-firebase";
import Loader from "./components/common/Loader";
import AdminLayout from "./components/layout/AdminLayout";
const MainRoute = props => {
  const auth = useSelector(state => state.firebase.auth);
  const token = useSelector(state => state.firebase.profile.token);
  const isAdmin = token?.claims?.isAdmin;
  if (!isLoaded(auth)) return <Loader />;
  return isAdmin ? (
    <AdminLayout>
      <Route {...props}  />
    </AdminLayout>
  ) : (
    <Layout>
      <Route {...props} />
    </Layout>
  );
};
export default MainRoute;
