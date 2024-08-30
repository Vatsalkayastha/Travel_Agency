import "./EditUser.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { getCookie } from 'react-use-cookie';

const EditUser = ({ inputs, title }) => {
  const { id } = useParams();
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const { data, loading, error } = useFetch(`https://wizardingworldserver.onrender.com/api/users/${id}`);
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  let navigate = useNavigate(); 
  const handleClick = async (e) => {
    e.preventDefault();
    const xsrfToken = getCookie('access_token');
    try {
      const newUser = {
        ...info,
        img: data.img,
      };

      await axios.put(`https://wizardingworldserver.onrender.com/api/users/${id}`, newUser,{ 
        headers:{
          access_token:xsrfToken
        }
      });
      let path = `/users`; 
      navigate(path);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(info);
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>

        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            {loading?"loading": data &&
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
              <div className="formInput">
                <label>Username</label>
                <input
                  onChange={handleChange}
                  type="text"
                  defaultValue={data.username || ""}
                  id="username"
                />
              </div>
              <div className="formInput">
                <label>Email</label>
                <input
                  onChange={handleChange}
                  type="email"
                  defaultValue={data.email || ""}
                  id="email"
                />
              </div>
              <div className="formInput">
                <label>Phone</label>
                <input
                  onChange={handleChange}
                  type="text"
                  defaultValue={data.phone || ""}
                  id="phone"
                />
              </div>
              <div className="formInput">
                <label>Country</label>
                <input
                  onChange={handleChange}
                  type="text"
                  defaultValue={data.country || ""}
                  id="country"
                />
              </div>
              <div className="formInput">
                <label>City</label>
                <input
                  onChange={handleChange}
                  type="text"
                  defaultValue={data.city || ""}
                  id="city"
                />
              </div>

              <button onClick={handleClick}>Update User</button>
            </form>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
