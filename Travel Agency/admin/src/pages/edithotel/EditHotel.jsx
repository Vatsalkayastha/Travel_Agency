import "./EditHotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getCookie } from 'react-use-cookie';

const EditHotel = () => {
  const { id } = useParams();
  const [info, setInfo] = useState({});
  const [files, setFiles] = useState("");
  const [rooms, setRooms] = useState([]);
  const { data, loading, error } = useFetch("https://wizardingworldserver.onrender.com/api/rooms");
  const {
    data: Edata,
    loading: secondLoading,
    error: secondError,
  } = useFetch(`https://wizardingworldserver.onrender.com/api/hotels/find/${id}`);
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  
  let navigate = useNavigate(); 

  const handleSelect = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRooms(value);
  };
  

  console.log(files);

  const handleClick = async (e) => {
    e.preventDefault();
    const xsrfToken = getCookie('access_token');
    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/dhyfiy1ij/image/upload",
            data
          );

          const { url } = uploadRes.data;
          return url;
        })
      );

      const newhotel = {
        ...info,
        rooms,
        photos: [...Edata.photos, ...list],
      };

      await axios.put(`https://wizardingworldserver.onrender.com/api/hotels/${id}`, newhotel, { 
        headers:{
          access_token:xsrfToken
        }
      });
      let path = `/hotels`; 
      navigate(path);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Edit Hotel</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>
              <div className="formInput">
                <label>Name</label>
                <input
                  id="name"
                  onChange={handleChange}
                  type="text"
                  defaultValue={Edata.name || ""}
                />
              </div>
              <div className="formInput">
                <label>Type</label>
                <input
                  id="type"
                  onChange={handleChange}
                  type="text"
                  defaultValue={Edata.type || ""}
                />
              </div>
              <div className="formInput">
                <label>City</label>
                <input
                  id="city"
                  onChange={handleChange}
                  type="text"
                  defaultValue={Edata.city || ""}
                />
              </div>
              <div className="formInput">
                <label>Address</label>
                <input
                  id="address"
                  onChange={handleChange}
                  type="text"
                  defaultValue={Edata.address || ""}
                />
              </div>
              <div className="formInput">
                <label>Distance from City Center</label>
                <input
                  id="distance"
                  onChange={handleChange}
                  type="text"
                  defaultValue={Edata.distance || ""}
                />
              </div>
              <div className="formInput">
                <label>Title</label>
                <input
                  id="title"
                  onChange={handleChange}
                  type="text"
                  defaultValue={Edata.title || ""}
                />
              </div>
              <div className="formInput">
                <label>Description</label>
                <input
                  id="desc"
                  onChange={handleChange}
                  type="text"
                  defaultValue={Edata.desc || ""}
                />
              </div>
              <div className="formInput">
                <label>Price</label>
                <input
                  id="cheapestPrice"
                  onChange={handleChange}
                  type="text"
                  defaultValue={Edata.cheapestPrice || ""}
                />
              </div>

              <div className="formInput">
                <label>Featured</label>
                <select id="featured" onChange={handleChange}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
              <div className="selectRooms">
                <label>Rooms</label>
                <select id="rooms" multiple onChange={handleSelect}>
                  {loading
                    ? "loading"
                    : data &&
                      data.map((room) => (
                        <option key={room._id} value={room._id}>
                          {room.title}
                        </option>
                      ))}
                </select>
              </div>
              <button onClick={handleClick}>Update Data</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditHotel;
