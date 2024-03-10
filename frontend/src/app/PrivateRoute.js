import React from "react";
import { useSelector } from "react-redux";
import { Route, Navigate, useLocation } from "react-router-dom";
import Loading from "../components/home/loading/Loading";
import { selectCurrentUserToken, selectLoadingState } from "../features/selectors";

const PrivateRoute = ({ element: Element, ...rest }) => {
  const token = useSelector(selectCurrentUserToken);
  const loading = useSelector(selectLoadingState);
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  return (
    <Route
      {...rest}
      element={
        token ? (
          <Element />
        ) : (
          <Navigate to="/login" state={{ from: location }} replace />
        )
      }
    />
  );
};

export default PrivateRoute;
