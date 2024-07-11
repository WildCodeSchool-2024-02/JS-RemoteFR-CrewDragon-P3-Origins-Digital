// ErrorBoundary.js
import { useRouteError, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function ErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();

  useEffect(() => {
    if (error?.response?.status === 401) {
      navigate("/*");
    }
  }, [error, navigate]);

  return (
    <div>
      <h1>Something went wrong</h1>
      <p>{error.message}</p>
    </div>
  );
}

export default ErrorBoundary;
