const Pet = require("../models/pet.model");

module.exports.index = (req, res) => {
  res.json({
    message: "Hello World",
  });
};

module.exports.createPet = (req, res) => {
  Pet.create(req.body)
    .then((pet) => res.json(pet))
    .catch((err) => res.status(400).json(err));
};

module.exports.showPets = (req, res) => {
  Pet.find({})
    .then((pet) => res.json(pet))
    .catch((err) => res.json(err));
};

module.exports.getOnePet = (req, res) => {
  Pet.findOne({ _id: req.params._id })
    .then((pet) => res.json(pet))
    .catch((err) => res.json(err));
};

module.exports.updatePet = (req, res) => {
  Pet.findOneAndUpdate({ _id: req.params._id }, req.body, {
    new: true,
    runValidators: true,
  })
    .then((updatedPet) => res.json(updatedPet))
    .catch((err) => res.status(400).json(err));
};

module.exports.removePet = (req, res) => {
  Pet.deleteOne({ _id: req.params._id })
    .then((confirmRemove) => res.json(confirmRemove))
    .catch((err) => res.json(err));
};
