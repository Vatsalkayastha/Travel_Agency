import "./editRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { roomInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getCookie } from 'react-use-cookie';
import { useNavigate } from "react-router-dom";

const EditRoom = () => {
  const {id} = useParams();
  const [info, setInfo] = useState({});
  const [hotelId, setHotelId] = useState(""); // Initialize hotelId with an empty string
  const [rooms, setRooms] = useState([]);

  const { data, loading, error } = useFetch("https://wizardingworldserver.onrender.com/api/hotels");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  let navigate = useNavigate();
  const handleClick = async (e) => {
    e.preventDefault();
    const xsrfToken = getCookie('access_token');
    const roomNumbers = rooms.split(",").map((room) => ({ number: room }));
    try {
      await axios.post(`https://wizardingworldserver.onrender.com/api/rooms/${hotelId}`, { ...info, roomNumbers },{ 
        headers:{
          access_token:xsrfToken
        }
      });
      let path = `/rooms`; 
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
          <h1>Edit Room</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {roomInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Rooms</label>
                <textarea
                  onChange={(e) => setRooms(e.target.value)}
                  placeholder="give comma between room numbers."
                />
              </div>
              <div className="formInput">
                <label>Choose a hotel</label>
                <select
                  id="hotelId"
                  value={hotelId} // Assign the value of hotelId to the select element
                  onChange={(e) => setHotelId(e.target.value)}
                >
                  {loading
                    ? "loading"
                    : data &&
                      data.map((hotel) => (
                        <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
                      ))}
                </select>
              </div>
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRoom;