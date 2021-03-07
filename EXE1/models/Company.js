const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CompanySchema = new Schema({
    Company_Name: {
        type: String,
        unique: true,
        required: true
    },
    Company_Number_Record: {
        type: Number,

    },
    Company_City: {
        type: String,

    },
    Company_State: {
        Type: String,

    },
    Company_Date_Record: {
        Type: Date,

    },
    Company_Number: {
        type: Number,

    }
});

module.exports = mongoose.model('Company', CompanySchema);