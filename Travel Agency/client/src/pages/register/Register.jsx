import "./register.css";
import axios from "axios";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [info, setInfo] = useState({});
  
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    console.log(info);
  };
  let navigate = useNavigate(); 
  const handleClick = async (e) => {
    e.preventDefault();
    try{
      await axios.post("https://wizardingworldserver.onrender.com/api/auth/register", info);
      let path = `/login`; 
      navigate(path);
    }catch (err) {
      console.log(err);
    }
  };


  return (
    <div className="login">
      <div className="lContainer">
        <div className="logo">Register Page</div>
        <input
          type="text"
          placeholder="UserName"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="text"
          placeholder="Country"
          id="country"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="text"
          placeholder="City"
          id="city"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="text"
          placeholder="Your Profile Img Link"
          id="img"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="text"
          placeholder="Phone Number"
          id="phone"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <button onClick={handleClick} className="lButton">
          Register
        </button>
        <p className="connect">Have an account ?
          <Link to="/login" style={{color:"#f2f0f0"}}>
      <span className="link"> Login </span>
          </Link>
    </p>
      </div>
    </div>
  );
};

export default Register;
