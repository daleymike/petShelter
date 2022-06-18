import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import "../App.css";

const PetForm = (props) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [skillOne, setSkillOne] = useState("");
  const [skillTwo, setSkillTwo] = useState("");
  const [skillThree, setSkillThree] = useState("");
  const navigate = useNavigate();

  const [errors, setErrors] = useState([]);

  const { allPets, setAllPets } = props;

  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/pets", {
        name: name,
        type: type,
        description: description,
        skillOne: skillOne,
        skillTwo: skillTwo,
        skillThree: skillThree,
      })
      .then((res) => {
        console.log(res.data);
        setAllPets([res.data, ...allPets]);
        setName("");
        setType("");
        setDescription("");
        setSkillOne("");
        setSkillTwo("");
        setSkillThree("");
        navigate("/");
      })
      .catch((err) => {
        const errorResponse = err.response.data.errors;
        const errArr = [];
        for (const key of Object.keys(errorResponse)) {
          errArr.push(errorResponse[key].message);
        }
        setErrors(errArr);
      });
  };

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
      <h3 style={{ textAlign: "start" }}>Know a pet needing a home?</h3>
      <br />
      <br />
      <form onSubmit={onSubmitHandler} className="form">
        {errors.map((err, index) => (
          <p style={{ color: "red", textAlign: "center" }} key={index}>
            {err}
          </p>
        ))}
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                margin: 10,
                backgroundColor: "lightGrey",
                borderRadius: 5,
                padding: 5,
                width: 300,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <label style={{ margin: 5 }}>Pet Name</label>
              <input
                type="text"
                value={name || ""}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div
              style={{
                margin: 10,
                backgroundColor: "lightGrey",
                borderRadius: 5,
                padding: 5,
                width: 300,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <label style={{ margin: 5 }}>Pet Type</label>
              <input
                type="float"
                value={type || ""}
                onChange={(e) => setType(e.target.value)}
              />
            </div>
            <div
              style={{
                margin: 10,
                backgroundColor: "lightGrey",
                borderRadius: 5,
                padding: 5,
                width: 300,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <label style={{ margin: 5 }}>Pet Description</label>
              <input
                type="textarea"
                value={description || ""}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <div>
            <h4>Skills (Optional)</h4>
            <div
              style={{
                margin: 10,
                backgroundColor: "lightGrey",
                borderRadius: 5,
                padding: 5,
                width: 300,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <label style={{ margin: 5 }}>Skill #1</label>
              <input
                type="text"
                value={skillOne || ""}
                onChange={(e) => setSkillOne(e.target.value)}
              />
            </div>
            <div
              style={{
                margin: 10,
                backgroundColor: "lightGrey",
                borderRadius: 5,
                padding: 5,
                width: 300,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <label style={{ margin: 5 }}>Skill #2</label>
              <input
                type="float"
                value={skillTwo || ""}
                onChange={(e) => setSkillTwo(e.target.value)}
              />
            </div>
            <div
              style={{
                margin: 10,
                backgroundColor: "lightGrey",
                borderRadius: 5,
                padding: 5,
                width: 300,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <label style={{ margin: 5 }}>Skill #3</label>
              <input
                type="textarea"
                value={skillThree || ""}
                onChange={(e) => setSkillThree(e.target.value)}
              />
            </div>
          </div>
        </div>
        <br />
        <div style={{ textAlign: "center" }}>
          <input type="submit" value="Create" className="create-button" />
        </div>
      </form>
    </div>
  );
};
export default PetForm;
