const express = require("express");

const router = express.Router();

const accountingController =
    require("../controllers/accountingController");


// Financial Summary
router.get(
    "/summary",
    accountingController.getFinancialSummary
);


module.exports = router;