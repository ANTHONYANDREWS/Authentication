import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles.css";
import { userRoute } from "../../utils/api";

const User = ({ isSignUp }) => {
  const [formData, setFormData] = useState({
    user_id: "",
    token: "",
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

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      setFormData((prev) => {
        return { ...prev, user_id: user.result._id, token: user.token };
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(userRoute, { ...formData });
      console.log(response.data);
      if (response) navigate("/UserInfo");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const name = e.target.name;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  console.log(formData);
  return (
    <>
      <div className="user">
        <h2>CREATE ACCOUNT</h2>

        <form onSubmit={handleSubmit}>
          <section>
            <label htmlFor="age">Age</label>
            <input
              id="age"
              type="number"
              min="1"
              max="150"
              name="age"
              placeholder="Age"
              required={true}
              value={formData.age}
              onChange={handleChange}
            />

            <label>Birthday</label>
            <div className="multiple-input-container">
              <input
                id="dob_day "
                type="number"
                min="1"
                max="31"
                name="dob_day"
                placeholder="DD"
                required={true}
                maxLength={2}
                value={formData.dob_day}
                onChange={handleChange}
              />
              <input
                id="dob_month"
                type="number"
                min="1"
                max="12"
                name="dob_month"
                placeholder="MM"
                required={true}
                value={formData.dob_month}
                onChange={handleChange}
              />
              <input
                id="dob_year"
                type="number"
                min="1900"
                max="2022"
                name="dob_year"
                placeholder="YYYY"
                required={true}
                value={formData.dob_year}
                onChange={handleChange}
              />
            </div>

            <label>Gender</label>
            <div className="multiple-input-container">
              <input
                id="man-gender-identity"
                type="radio"
                name="gender"
                value="man"
                onChange={handleChange}
                checked={formData.gender === "man"}
              />
              <label htmlFor="man-gender-identity">Man</label>

              <input
                id="woman-gender-identity"
                type="radio"
                name="gender"
                value="woman"
                onChange={handleChange}
                checked={formData.gender === "woman"}
              />
              <label htmlFor="woman-gender-identity">Woman</label>

              <input
                id="more-gender-identity"
                type="radio"
                name="gender"
                value="more"
                onChange={handleChange}
                checked={formData.gender === "more"}
              />
              <label htmlFor="more-gender-identity">More</label>
            </div>

            <label htmlFor="mobile">Contact number</label>
            <input
              id="mobile"
              type="number"
              name="mobile"
              minLength={9}
              maxLength={10}
              placeholder="Enter your mobile number"
              required={true}
              value={formData.number}
              onChange={handleChange}
            />

            <label htmlFor="about">About me</label>
            <input
              id="about"
              type="text"
              name="about"
              required={true}
              placeholder="I like long walks.."
              value={formData.about}
              onChange={handleChange}
            />
            <input type="submit" />
          </section>

          <section>
            <label htmlFor="url">Profile Photo</label>
            <input
              type="text"
              name="url"
              id="url"
              placeholder="Please enter link of your photo"
              value={formData.url}
              onChange={handleChange}
            />
            <div className="photo-container">
              {formData.url && (
                <img src={formData.url} alt="profile pic preview" />
              )}
            </div>
          </section>
        </form>
      </div>
    </>
  );
};

export default User;
