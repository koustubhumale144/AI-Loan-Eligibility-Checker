const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.json({
        message: "AI Financial Assistant backend is running!"
    });
});

// Financial Insights API
app.post("/api/financial-insights", (req, res) => {
    console.log("Financial insights request received:", req.body);

    try {
        const { income, emi, creditScore } = req.body;

        // Validate input
        if (!income || income <= 0 || emi < 0 || !creditScore || creditScore <= 0) {
            return res.status(400).json({
                success: false,
                message: "Please provide valid income, EMI, and credit score."
            });
        }

        // Calculate EMI-to-income ratio
        const emiRatio = (emi / income) * 100;

        let emiInsight = "";
        let creditInsight = "";
        let tips = [];

        // EMI analysis
        if (emiRatio <= 30) {
            emiInsight = `Your existing EMI is about ${emiRatio.toFixed(1)}% of your monthly income. This indicates a relatively manageable EMI burden.`;
            tips.push("Continue keeping your existing monthly obligations manageable.");
        } else if (emiRatio <= 50) {
            emiInsight = `Your existing EMI is about ${emiRatio.toFixed(1)}% of your monthly income. A significant portion of your income is already committed to EMI payments.`;
            tips.push("Consider maintaining a careful monthly budget before taking on another loan.");
        } else {
            emiInsight = `Your existing EMI is about ${emiRatio.toFixed(1)}% of your monthly income. This represents a high proportion of your income and may leave less room for additional repayments.`;
            tips.push("Review your existing debts and monthly expenses before considering additional borrowing.");
        }

        // Credit score analysis
        if (creditScore >= 750) {
            creditInsight = "Your credit score falls in the excellent range used by this project.";
            tips.push("Continue making credit payments on time and monitor your credit report.");
        } else if (creditScore >= 700) {
            creditInsight = "Your credit score falls in the good range used by this project.";
            tips.push("Maintaining timely payments can help you preserve a healthy credit profile.");
        } else if (creditScore >= 650) {
            creditInsight = "Your credit score falls in the fair range used by this project.";
            tips.push("Focus on timely payments and responsible credit usage.");
        } else {
            creditInsight = "Your credit score is below the fair range used by this project.";
            tips.push("Focus on consistent repayments and responsible credit management.");
        }

        // General tips
        tips.push("Keep an emergency savings buffer for unexpected expenses.");
        tips.push("Compare loan costs, interest rates, fees, and repayment terms before borrowing.");

        // Create final insight
        const insights = [
            `📊 EMI-to-Income Analysis`,
            emiInsight,
            "",
            `💳 Credit Score Analysis`,
            creditInsight,
            "",
            `💡 Practical Financial Tips`,
            `• ${tips[0]}`,
            `• ${tips[1]}`,
            `• ${tips[2]}`
        ].join("\n");

        console.log("Financial insights generated successfully.");

        res.json({
            success: true,
            insights: insights
        });

    } catch (error) {
        console.error("Financial insights error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to generate financial insights."
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});