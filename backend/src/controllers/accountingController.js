const accountingService = require("../services/accountingService");


// ============================
// Get Financial Summary
// GET /api/accounting/summary
// ============================

const getFinancialSummary = async (req, res) => {

    try {

        const summary =
            await accountingService.getFinancialSummary();

        res.status(200).json({

            success: true,

            data: summary

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


module.exports = {
    getFinancialSummary
};