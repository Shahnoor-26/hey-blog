import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Protected = ({ children, authenticated = true }) => {
  const navigate = useNavigate();
  const [spin, updateSpin] = useState(true);
  const status = useSelector((state) => state.auth.status);

  console.table([status, authenticated]);

  useEffect(() => {
    if (!authenticated && authenticated !== status) navigate("/");
    else if (authenticated && authenticated !== status) navigate("/login");
    updateSpin(false);
  }, [status, navigate, authenticated]);

  return spin ? <div>Spinning</div> : <div>{children}</div>;
};

export default Protected;
