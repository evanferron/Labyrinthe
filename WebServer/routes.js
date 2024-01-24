const express = require("express");

const router = express.Router();
const stuffCtrl = require("./stuff");

//Accounts

router.post("/accounts/add", stuffCtrl.addAccount);
router.post("/accounts/isvalid", stuffCtrl.verifAccount);

//Mazes

router.post("/mazes/create", stuffCtrl.addMaze);
router.get("/mazes/generate", stuffCtrl.generateMaze);

module.exports = router;
