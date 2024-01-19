// import PatientController
const PatientController = require('../controllers/PatientController')

// import express
const express = require("express");

// membuat object router
const router = express.Router();

/**
 * Membuat routing
 */
router.get("/", (req, res) => {
  res.send("Hello Covid API Express");
});

// Membuat routing patient
router.get('/patients', PatientController.index);
router.post('/patients', PatientController.store);
router.put('/patients/:id', PatientController.update);
router.delete('/patients/:id', PatientController.destroy);
// menambahkan route untuk get detail resource
router.get('/patients/:id', PatientController.show);
// menambahkan route untuk get resource by name
router.get('/patients/search/:name', PatientController.search);
// menambahkan route untuk get positive resource. ditambahkan /status ,karena jika tidak ditambahkan akan bentrok dengan /search name
router.get('/patients/search/status/positive', PatientController.positive);
// menambahkan route untuk get recovered resource. ditambahkan /status ,karena jika tidak ditambahkan akan bentrok dengan /search name
router.get('/patients/search/status/recovered', PatientController.recovered);
// menambahkan route untuk get dead resource. ditambahkan /status ,karena jika tidak ditambahkan akan bentrok dengan /search name 
router.get('/patients/search/status/dead', PatientController.dead);

// export router
module.exports = router;
