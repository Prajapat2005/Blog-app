import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  /* if user is already exist */
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      await axios.post("/auth/register", inputs);
      navigate("/login");  //if successfully register we move to login page

    } catch (err) {
      setError(err.response.data);  // err.response.data:"user already exist"

    }
  };

  return (
    <div className="auth">
      <h1>Register</h1>
      <form>
        <input required type="text" placeholder="Username" name="username" onChange={handleChange} />
        <input required type="email" placeholder="E-mail" name="email" onChange={handleChange} />
        <input required type="password" placeholder="Password" name="password" onChange={handleChange} />
        <button onClick={handleSubmit}>Register</button>

        {err && <p>{err}</p>}

        <span>
          Do you have an account? <Link to="/login">Login</Link>
        </span>

      </form>
    </div>
  );
};

export default Register;
