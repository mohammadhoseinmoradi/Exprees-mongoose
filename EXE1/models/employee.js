const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    Employee_First_Name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 30
    },
    Employee_Last_Name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 30
    },
    Employee_National_Number: {
        type: Number,
        required: true
    },
    Employee_Gender: {
        type: String,
        trim: true,
        default: true
    },
    Employee_Manager: {
        type: Boolean,
        default: false
    },
    Employee_birthday: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('employee', employeeSchema);