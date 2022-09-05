import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles.css";

function UserInfo() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    age: "",
    dob_day: "",
    dob_month: "",
    dob_year: "",
    gender: "",
    mobile: "",
    url: "",
    about: "",
  });
  let navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const user_Id = user.result._id;

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {}, [formData]);

  const getData = async () => {
    const response = await axios.get(
      "http://localhost:5000/api/userInfo/" + user_Id
    );
    if (!response?.data?.val) {
      return;
    }

    setFormData({
      fullName: response?.data?.val?.fullName,
      age: response?.data?.val?.age,
      gender: response?.data?.val?.gender,
      dob_day: response?.data?.val?.dob_day,
      dob_month: response?.data?.val?.dob_month,
      dob_year: response?.data?.val?.dob_year,
      mobile: response?.data?.val?.mobile,
      about: response?.data?.val?.about,
    });
  };

  const logout = () => {
    localStorage.clear("user");
    navigate("/login");
  };

  return (
    <div className="user-info">
      <h1>Your details</h1>
      {formData.url === " " ? (
        <img src={formData.url} height={200} alt="profile pic preview" />
      ) : (
        <img
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          height={200}
          alt="profile pic preview"
        />
      )}
      <p>Name: {formData.fullName}</p>
      <p>Gender:{formData.gender}</p>
      <p>Age: {formData.age}</p>
      <p>
        Date of Birth: {formData.dob_day} -{formData.dob_month}-
        {formData.dob_year}
      </p>
      <p>Mobile: {formData.mobile}</p>
      <p>About: {formData.about}</p>

      <button className="logout" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default UserInfo;
