import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";
import io from "socket.io-client";

const PetList = (props) => {
  const [socket] = useState(() => {
    return io(":8000");
  });
  const { allPets, setAllPets } = props;

  let navigate = useNavigate();

  useEffect(() => {
    console.log("inside use effect for client socket.io");

    socket.on("connect", () => {
      console.log("We are connected");
      console.log(socket.id);
    });

    socket.on("pet_removed", (_id) => {
      setAllPets((currentAllPetsValues) => {
        console.log(currentAllPetsValues);
        let filteredPetArray = currentAllPetsValues.filter((pet) => {
          console.log("ID", _id);
          return pet._id !== _id;
        });
        console.log("FIL ARR", filteredPetArray);
        return filteredPetArray;
      });
    });

    return () => socket.disconnect();
  }, []);

  const addNew = (e) => {
    e.preventDefault();
    navigate("/new");
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/pets")
      .then((res) => {
        console.log(res.data);
        setAllPets(res.data);
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
        <Link to={"/new"}>Add a pet to the shelter</Link>
      </div>
      <h3 style={{ textAlign: "start" }}>
        These pets are looking for a good home
      </h3>
      <br />
      <br />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allPets
            .sort((a, b) => {
              if (a.type.toLowerCase() < b.type.toLowerCase()) return -1;
              if (a.type.toLowerCase() > b.type.toLowerCase()) return 1;
              return 0;
            })
            .map((pet, index) => {
              return (
                <tr key={index}>
                  <td>{pet.name}</td>
                  <td>{pet.type}</td>
                  <td>
                    <Link to={`/pets/${pet._id}`}>
                      <button className="details-button" style={{ margin: 3 }}>
                        Details
                      </button>
                    </Link>
                    <Link to={`/pets/${pet._id}/edit`}>
                      <button className="edit-button" style={{ margin: 3 }}>
                        Edit
                      </button>
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
export default PetList;
