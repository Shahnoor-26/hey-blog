import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Spin } from "../components/index.js";

const Protected = ({ children, authenticated = true }) => {
  const [spin, updateSpin] = useState(true);

  const status = useSelector((state) => state.auth.status);

  const navigate = useNavigate();

  useEffect(() => {
    if (authenticated && !status) navigate("/login");
    else if (!authenticated && status) navigate("/");

    updateSpin(false);
  }, [status, navigate, authenticated]);

  return (
    <Container>
      {spin && <Spin />}
      {children}
    </Container>
  );
};

export default Protected;
