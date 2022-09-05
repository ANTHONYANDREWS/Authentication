import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { signupRoute } from "../../utils/api";

function Signup({ setIsSignUp }) {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState("");

  let navigate = useNavigate();

  const fullName = `${firstName}  ${lastName}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        setError("Passwords need to match!");
      } else {
        const response = await axios.post(signupRoute, {
          fullName,
          email,
          password,
        });
        localStorage.setItem("user", JSON.stringify(response.data));
        setIsSignUp(true);
        if (response) navigate("/user");
      }
    } catch (error) {
      window.alert(error.response.data.message);
    }
  };
  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.left}>
          <h1>Welcome Back</h1>
          <Link to="/login">
            <button type="button" className={styles.white_btn}>
              Sign in
            </button>
          </Link>
        </div>
        <div className={styles.right}>
          <form
            className={styles.form_container}
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <h1>Create Account</h1>
            <input
              type="text"
              placeholder="First Name"
              id="firstName"
              name="firstName"
              required={true}
              onChange={(e) => setFirstName(e.target.value)}
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Last Name"
              id="lastName"
              name="lastName"
              required={true}
              onChange={(e) => setLastName(e.target.value)}
              className={styles.input}
            />
            <input
              type="email"
              placeholder="Email"
              id="email"
              name="email"
              required={true}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              id="password"
              name="password"
              required={true}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Confirm password"
              id="password-check"
              name="password-check"
              required={true}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={styles.input}
            />
            <p>{error && <div className={styles.error_msg}>{error}</div>}</p>
            <button type="submit" className={styles.green_btn}>
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
