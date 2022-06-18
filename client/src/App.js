import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import PetForm from './components/PetForm';
import PetList from './components/PetList';
import PetDetails from './components/PetDetails';
import PetUpdate from './components/PetUpdate';

function App() {
  const [allPets, setAllPets] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/pets")
    .then((res) => {
      console.log(res.data)
      setAllPets(res.data)
    })
    .catch(err => {console.log(err)})
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<PetList allPets={allPets} setAllPets={setAllPets}/>}  path="/" />
          <Route element={<PetForm allPets={allPets} setAllPets={setAllPets}/>}  path="/new" />
          <Route element={<PetDetails allPets={allPets} setAllPets={setAllPets}/>}  path="/pets/:_id" />
          <Route element={<PetUpdate allPets={allPets} setAllPets={setAllPets}/>}  path="/pets/:_id/edit" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
