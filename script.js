// ==========================================
// LOAN ELIGIBILITY CHECKER
// ==========================================

const checkEligibilityButton = document.getElementById("checkEligibilityButton");

checkEligibilityButton.addEventListener("click", function () {
    const age = Number(document.getElementById("age").value);
    const income = Number(document.getElementById("monthlyIncome").value);
    const creditScore = Number(document.getElementById("loanCreditScore").value);
    const existingEmi = Number(document.getElementById("existingEmi").value);
    const loanAmount = Number(document.getElementById("loanAmount").value);
    const loanTenure = Number(document.getElementById("loanTenure").value);

    const result = document.getElementById("eligibilityResult");

    if (
        age <= 0 ||
        income <= 0 ||
        creditScore <= 0 ||
        existingEmi < 0 ||
        loanAmount <= 0 ||
        loanTenure <= 0
    ) {
        result.style.display = "block";

        result.innerHTML = `
            <h3>⚠️ Please enter valid details</h3>
            <p>Fill in all the required fields before checking eligibility.</p>
        `;

        return;
    }

    const ageEligible = age >= 18;
    const creditEligible = creditScore >= 650;
    const incomeEligible = income >= 15000;
    const emiEligible = existingEmi <= income * 0.5;

    const eligible =
        ageEligible &&
        creditEligible &&
        incomeEligible &&
        emiEligible;

    result.style.display = "block";

    if (eligible) {
        result.innerHTML = `
            <h3>✅ Estimated Eligible</h3>

            <p>
                Based on the simple rules used in this project,
                your profile meets the demo eligibility conditions.
            </p>

            <p>
                <strong>Loan Amount:</strong>
                ₹${loanAmount.toLocaleString("en-IN")}
            </p>

            <p>
                <strong>Tenure:</strong>
                ${loanTenure} years
            </p>

            <p>
                <strong>Credit Score:</strong>
                ${creditScore}
            </p>

            <hr>

            <p>
                <strong>Note:</strong>
                This is only an educational estimate and is not an actual loan approval.
            </p>
        `;
    } else {
        result.innerHTML = `
            <h3>❌ Estimated Not Eligible</h3>

            <p>
                Based on the simple rules used in this project,
                one or more demo conditions were not met.
            </p>

            <p><strong>Possible areas to review:</strong></p>

            <ul>
                ${!ageEligible ? "<li>Age should be at least 18.</li>" : ""}
                ${!creditEligible ? "<li>Credit score is below the demo threshold of 650.</li>" : ""}
                ${!incomeEligible ? "<li>Monthly income is below the demo threshold of ₹15,000.</li>" : ""}
                ${!emiEligible ? "<li>Existing EMI is high compared with monthly income.</li>" : ""}
            </ul>

            <hr>

            <p>
                <strong>Note:</strong>
                This is only an educational estimate and is not an actual loan decision.
            </p>
        `;
    }
});


// ==========================================
// EMI CALCULATOR
// ==========================================

const calculateEmiButton = document.getElementById("calculateEmiButton");

calculateEmiButton.addEventListener("click", function () {
    const principal = Number(
        document.getElementById("emiLoanAmount").value
    );

    const annualRate = Number(
        document.getElementById("interestRate").value
    );

    const years = Number(
        document.getElementById("emiTenure").value
    );

    const result = document.getElementById("emiResult");

    if (principal <= 0 || annualRate < 0 || years <= 0) {
        result.style.display = "block";

        result.innerHTML = `
            <h3>⚠️ Please enter valid values</h3>
            <p>Enter a valid loan amount, interest rate, and tenure.</p>
        `;

        return;
    }

    const monthlyRate = annualRate / 12 / 100;
    const numberOfMonths = years * 12;

    let emi;

    if (monthlyRate === 0) {
        emi = principal / numberOfMonths;
    } else {
        emi =
            (principal *
                monthlyRate *
                Math.pow(1 + monthlyRate, numberOfMonths)) /
            (Math.pow(1 + monthlyRate, numberOfMonths) - 1);
    }

    const totalPayment = emi * numberOfMonths;
    const totalInterest = totalPayment - principal;

    result.style.display = "block";

    result.innerHTML = `
        <h3>📊 EMI Calculation</h3>

        <p>
            <strong>Monthly EMI:</strong>
            ₹${emi.toLocaleString("en-IN", {
                maximumFractionDigits: 2
            })}
        </p>

        <p>
            <strong>Total Interest:</strong>
            ₹${totalInterest.toLocaleString("en-IN", {
                maximumFractionDigits: 2
            })}
        </p>

        <p>
            <strong>Total Payment:</strong>
            ₹${totalPayment.toLocaleString("en-IN", {
                maximumFractionDigits: 2
            })}
        </p>
    `;
});


// ==========================================
// CREDIT SCORE ANALYZER
// ==========================================

const analyzeCreditButton = document.getElementById("analyzeCreditButton");

analyzeCreditButton.addEventListener("click", function () {
    const creditScore = Number(
        document.getElementById("creditScoreInput").value
    );

    const result = document.getElementById("creditResult");

    if (creditScore <= 0) {
        result.style.display = "block";

        result.innerHTML = `
            <h3>⚠️ Please enter a valid credit score</h3>
        `;

        return;
    }

    let category;
    let message;

    if (creditScore >= 750) {
        category = "Excellent";
        message =
            "Your score falls in the excellent range used by this project.";
    } else if (creditScore >= 700) {
        category = "Good";
        message =
            "Your score falls in the good range used by this project.";
    } else if (creditScore >= 650) {
        category = "Fair";
        message =
            "Your score falls in the fair range used by this project.";
    } else {
        category = "Needs Improvement";
        message =
            "Your score is below the fair range used by this project.";
    }

    result.style.display = "block";

    result.innerHTML = `
        <h3>💳 Credit Score Analysis</h3>

        <p>
            <strong>Credit Score:</strong>
            ${creditScore}
        </p>

        <p>
            <strong>Category:</strong>
            ${category}
        </p>

        <p>${message}</p>

        <hr>

        <p>
            <strong>Tip:</strong>
            Consistent and timely credit repayments can help maintain
            responsible credit management.
        </p>

        <p>
            <strong>Note:</strong>
            These categories are simplified ranges created for this
            educational project and are not official lending criteria.
        </p>
    `;
});


// ==========================================
// FINANCIAL SUMMARY
// ==========================================

const summaryButton = document.getElementById("summaryButton");

summaryButton.addEventListener("click", function () {

    const income = Number(
        document.getElementById("summaryIncome").value
    );

    const emi = Number(
        document.getElementById("summaryEmi").value
    );

    const creditScore = Number(
        document.getElementById("summaryCreditScore").value
    );

    const loanAmount = Number(
        document.getElementById("summaryLoanAmount").value
    );

    const tenure = Number(
        document.getElementById("summaryTenure").value
    );

    const result = document.getElementById("summaryResult");


    // Validation

    if (
        income <= 0 ||
        emi < 0 ||
        creditScore <= 0 ||
        loanAmount <= 0 ||
        tenure <= 0
    ) {

        result.style.display = "block";

        result.innerHTML = `
            <h3>⚠️ Please enter valid details</h3>

            <p>
                Fill in all the financial information before generating
                the summary.
            </p>
        `;

        return;
    }


    // EMI-to-income ratio

    const emiRatio = (emi / income) * 100;


    // Credit category

    let creditCategory;

    if (creditScore >= 750) {
        creditCategory = "Excellent";
    } else if (creditScore >= 700) {
        creditCategory = "Good";
    } else if (creditScore >= 650) {
        creditCategory = "Fair";
    } else {
        creditCategory = "Needs Improvement";
    }


    // Demo eligibility

    const incomeEligible = income >= 15000;
    const creditEligible = creditScore >= 650;
    const emiEligible = emi <= income * 0.5;

    const eligible =
        incomeEligible &&
        creditEligible &&
        emiEligible;


    // EMI status

    let emiStatus;

    if (emiRatio <= 30) {
        emiStatus = "Manageable";
    } else if (emiRatio <= 50) {
        emiStatus = "Moderate";
    } else {
        emiStatus = "High";
    }


    // Display result

    result.style.display = "block";

    result.innerHTML = `
        <h3>📋 Financial Profile Summary</h3>

        <p>
            <strong>Monthly Income:</strong>
            ₹${income.toLocaleString("en-IN")}
        </p>

        <p>
            <strong>Existing EMI:</strong>
            ₹${emi.toLocaleString("en-IN")}
        </p>

        <p>
            <strong>EMI-to-Income Ratio:</strong>
            ${emiRatio.toFixed(1)}%
        </p>

        <p>
            <strong>EMI Status:</strong>
            ${emiStatus}
        </p>

        <p>
            <strong>Credit Score:</strong>
            ${creditScore}
        </p>

        <p>
            <strong>Credit Category:</strong>
            ${creditCategory}
        </p>

        <p>
            <strong>Requested Loan:</strong>
            ₹${loanAmount.toLocaleString("en-IN")}
        </p>

        <p>
            <strong>Loan Tenure:</strong>
            ${tenure} years
        </p>

        <hr>

        <h3>
            ${eligible ? "✅ Estimated Eligible" : "⚠️ Estimated Not Eligible"}
        </h3>

        <p>
            ${eligible
                ? "The information entered meets the simplified eligibility conditions used in this educational project."
                : "The information entered does not meet one or more simplified eligibility conditions used in this educational project."
            }
        </p>

        <hr>

        <p>
            <strong>⚠️ Important:</strong>
            This summary uses simplified project rules. It is not a
            bank decision, loan approval, or professional financial advice.
        </p>
    `;
});


// ==========================================
// FINANCIAL INSIGHTS
// ==========================================

const aiButton = document.getElementById("aiButton");

aiButton.addEventListener("click", async function () {

    const income = Number(
        document.getElementById("aiIncome").value
    );

    const emi = Number(
        document.getElementById("aiEmi").value
    );

    const creditScore = Number(
        document.getElementById("aiCreditScore").value
    );

    const aiResult = document.getElementById("aiResult");


    if (
        income <= 0 ||
        emi < 0 ||
        creditScore <= 0
    ) {

        aiResult.style.display = "block";

        aiResult.innerHTML = `
            <h3>⚠️ Please enter valid details</h3>

            <p>
                Enter your monthly income, existing EMI,
                and credit score.
            </p>
        `;

        return;
    }


    // Loading message

    aiResult.style.display = "block";

    aiResult.innerHTML = `
        <h3>🤖 Generating Financial Insights...</h3>

        <p>
            Analyzing your information. Please wait...
        </p>
    `;


    try {

        const response = await fetch(
            "http://localhost:5000/api/financial-insights",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    income: income,
                    emi: emi,
                    creditScore: creditScore
                })
            }
        );


        const data = await response.json();


        if (data.success) {

            aiResult.innerHTML = `
                <h3>💡 Financial Insights</h3>

                <p>
                    <strong>Monthly Income:</strong>
                    ₹${income.toLocaleString("en-IN")}
                </p>

                <p>
                    <strong>Existing EMI:</strong>
                    ₹${emi.toLocaleString("en-IN")}
                </p>

                <p>
                    <strong>Credit Score:</strong>
                    ${creditScore}
                </p>

                <hr>

                <p>
                    ${data.insights.replace(/\n/g, "<br>")}
                </p>

                <hr>

                <p>
                    <strong>⚠️ Note:</strong>
                    These insights are educational and are not a loan
                    approval decision or professional financial advice.
                </p>
            `;

        } else {

            aiResult.innerHTML = `
                <h3>⚠️ Unable to generate insights</h3>

                <p>
                    ${data.message}
                </p>
            `;
        }

    } catch (error) {

        console.error(
            "Financial insights connection error:",
            error
        );

        aiResult.innerHTML = `
            <h3>⚠️ Backend Connection Error</h3>

            <p>
                Could not connect to the financial insights service.
            </p>

            <p>
                Please make sure the backend server is running on
                <strong>http://localhost:5000</strong>.
            </p>
        `;
    }
});