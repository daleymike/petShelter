const PetController = require("../controllers/pet.controller");

module.exports = (app) => {
  app.get("/api", PetController.index);
  app.post("/api/pets", PetController.createPet);
  app.get("/api/pets", PetController.showPets);
  app.get("/api/pets/:_id", PetController.getOnePet);
  app.put("/api/pets/:_id", PetController.updatePet);
  app.delete("/api/pets/:_id", PetController.removePet);
};
