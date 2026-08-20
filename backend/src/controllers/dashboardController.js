const dashboardService = require("../services/dashboardService");

// ============================
// Dashboard Summary
// GET /api/dashboard
// ============================

const getDashboardSummary = async (req, res) => {

    try {

        const dashboard =
            await dashboardService.getDashboardSummary();

        res.status(200).json({
            success: true,
            data: dashboard
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    getDashboardSummary
};