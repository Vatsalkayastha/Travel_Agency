import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import PlaceIcon from "@mui/icons-material/Place";
import BedIcon from "@mui/icons-material/Bed";
import useFetch from "../../hooks/useFetch";
import { NavLink } from "react-router-dom";

const Widget = ({ type }) => {
  let d;

  let path;
  if (type === "balance") {
    path = "/users";
  } else {
    path = `/${type}`;
  }
  const { data, loading, error } = useFetch(
    `https://wizardingworldserver.onrender.com/api/${type}/countobject/no`
  );
  //temporary
  const amount = data.count || 100;
  const diff = 20;

  switch (type) {
    case "users":
      d = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "hotels":
      d = {
        title: "PLACES",
        isMoney: false,
        link: "View all places",
        icon: (
          <PlaceIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "rooms":
      d = {
        title: "ROOMS",
        isMoney: false,
        link: "View all rooms",
        icon: (
          <BedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "balance":
      d = {
        title: "BALANCE",
        isMoney: true,
        link: "See details",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{d.title}</span>
        <span className="counter">
          {d.isMoney && "$"} {amount}
        </span>
        <span className="link">
          <NavLink to={path} style={{ textDecoration: "none" ,color:"black"}}>
            {d.link}
          </NavLink>
        </span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {d.icon}
      </div>
    </div>
  );
};

export default Widget;
