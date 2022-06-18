import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useNavigate, link } from "react-router-dom";
import "../App.css";
import io from "socket.io-client";

const PetDetails = (props) => {
  const [socket] = useState(() => {
    return io(":8000");
  });
  const [pet, setPet] = useState({});
  const navigate = useNavigate();
  const [likes, setLikes] = useState(0);

  const { _id } = useParams();

  const useLikes = (e) => {
    setLikes(likes + 1);
    e.currentTarget.disabled = true;
  };

  const handleDelete = () => {
    axios
      .delete("http://localhost:8000/api/pets/" + _id)
      .then((res) => {
        console.log(res.data);
        socket.emit("remove_pet", _id);
        socket.disconnect();
        navigate("/");
      })
      .catch((err) => console.log(err.response.data.errors));
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/pets/" + _id)
      .then((res) => {
        console.log(res.data);
        setPet(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={{ padding: 10 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Pet Shelter</h1>
        <Link to={"/"}>Back to Home</Link>
      </div>
      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3 style={{ textAlign: "start" }}>Details about: {pet.name}</h3>
        <button onClick={handleDelete} className="adopt-button">
          Adopt {pet.name}
        </button>
      </div>
      <br />
      <br />
      <div className="info-box">
        <p>
          {" "}
          <span style={{ fontWeight: "bold" }}>Pet Type:</span> {pet.type}
        </p>
        <br />
        <p>
          {" "}
          <span style={{ fontWeight: "bold" }}>Description: </span>{" "}
          {pet.description}
        </p>
        <br />
        <div style={{ display: "flex" }}>
          <p style={{ fontWeight: "bold" }}> Skills: </p>{" "}
          <ul style={{ listStyle: "none", marginLeft: 30 }}>
            <li>{pet.skillOne}</li>
            <br />
            <li>{pet.skillTwo}</li> <br />
            <li>{pet.skillThree}</li>
          </ul>
        </div>
        <br />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button className="like-button" onClick={useLikes}>
            Like
          </button>
          <p>{likes} Likes(s)</p>
        </div>
      </div>
    </div>
  );
};

export default PetDetails;
