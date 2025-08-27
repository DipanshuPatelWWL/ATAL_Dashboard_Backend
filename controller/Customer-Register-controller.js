const bcrypt = require("bcryptjs");
const Customer = require("../model/customer-model"); // adjust path if needed

const registerCustomer = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            dateOfBirth,
            mobilePhone,
            smsOptIn,
            email,
            password,
            twoFactorAuth,
            address,
            communicationPreference,
            marketingOptIn,
        } = req.body;

        const existingCustomer = await Customer.findOne({ email });
        if (existingCustomer) {
            return res.status(400).json({ message: "Email already registered" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        const newCustomer = new Customer({
            firstName,
            lastName,
            dateOfBirth,
            mobilePhone,
            smsOptIn,
            email,
            password: hashedPassword,
            twoFactorAuth,
            address,
            communicationPreference,
            marketingOptIn,
            prescriptionFile: req.file ? req.file.path : null,
        });

        await newCustomer.save();

        res.status(201).json({
            message: "Customer registered successfully",
            customer: {
                id: newCustomer._id,
                firstName: newCustomer.firstName,
                lastName: newCustomer.lastName,
                email: newCustomer.email,
                mobilePhone: newCustomer.mobilePhone,
            },
        });
    } catch (error) {
        console.error("Error in registerCustomer:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { registerCustomer };
