import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

function Pagenotfound() {
  let navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <div>
        <img
          src="https://i0.wp.com/learn.onemonth.com/wp-content/uploads/2017/08/1-10.png?w=845&ssl=1"
          height={500}
          alt="profile pic preview"
        />
      </div>
      <button
        className="back-home"
        onClick={user ? navigate("/userInfo") : navigate("/login")}
      >
        Back to Home
      </button>
    </>
  );
}

export default Pagenotfound;
