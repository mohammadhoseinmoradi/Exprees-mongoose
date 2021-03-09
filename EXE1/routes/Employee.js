const express = require('express');
const Employee_router = express.Router()
const Employee = require('../models/employee')
    // !---------------------------------------------------------------------------------
    // todo-----------------------------------------------------------------------------CREATE EMPLOYEE
Employee_router.put('/addEmployee', (req, res) => {
    console.log(req.body)
    const NEW_Employee = new Employee({
        Employee_First_Name: req.body.Employee_First_Name,
        Employee_Last_Name: req.body.Employee_Last_Name,
        Employee_National_Number: req.body.Employee_National_Number,
        Employee_Gender: req.body.Employee_Gender,
        Employee_Manager: req.body.Employee_Manager,
        Employee_birthday: req.body.Employee_Number
    })
    console.log(NEW_Employee)
    NEW_Employee.save((err, Employee_Data) => {
        if (err) return res.status(500).send("Something went wrong in add Employee \n!" + err);
        return res.json({
            Employee_Data,
            message: "Creat NEW Employee successfully"
        })
    })

})

// todo-----------------------------------------------------------------------------READ EMPLOYEE'S

Employee_router.get('/allEmployee', (req, res) => {
    console.log("get is ok");
    Employee.find({}, (err, Employee_All) => {
        if (err) return res.status(500).send("Something went wrong in get all uEmployee! \n" + err);
        res.json(Employee_All)
    })
})

//  todo----------------------------------------------------------------------------UPDATE EMPLOYEES
Employee_router.post("/updateEmployee/:id", (req, res) => {
    Employee.findOneAndUpdate({
        _id: req.params.id
    }, req.body, {
        Employee_First_Name: req.body.Employee_First_Name,
        Employee_Last_Name: req.body.Employee_Last_Name,
        Employee_National_Number: req.body.Employee_National_Number,
        Employee_Gender: req.body.Employee_Gender,
        Employee_Manager: req.body.Employee_Manager,
        Employee_birthday: req.body.Employee_Number
    }, (err, employee) => {
        if (err) return res.status(500).json({
            msg: "Server Error :)",
            err: err.msg
        });
        res.json(employee);
    })
});

// todo-----------------------------------------------------------------------------DELETE EMPLOYEE
Employee_router.delete("/deleteEmployee/:Employee_Name", (req, res) => {
    console.log(req.params.Employee_Name)
    Employee.findOneAndDelete({ Employee_Name: req.params.Employee_Name }, (err, Employee) => {
        console.log(Employee);
        if (err) return res.status(500).send("Something went wrong in delete Employee! \n" + err);
        if (!Employee) return res.status(404).send("Employee not found")
        return res.json({
            Employee,
            massage: " delete is ok"


        })
    })
});
// !--------------------------------------------------------------------------------------------------------------------------
//  todo------------------------------------------------------------------------------------FIND EMPLOYEE AGE BETWEEN 20-30
Employee_router.get('/FindAge', (req, res) => {
        let Age20 = new Date().getFullYear() - 30;
        let Age30 = new Date().getFullYear() - 20;
        console.log(Age20, Age30);
        Employee.find({ $and: [{ Employee_Birthday: { $gt: `${Age20}` } }, { Employee_Birthday: { $lt: `${Age30}` } }] }, { "_id": 0 }, (err, Employee_Age) => {
            if (err) return res.status(500).send("Something went wrong in get all uEmployee! \n" + err);
            res.json(Employee_Age)
        })
    })
    //  todo----------------------------------------------------------------------------------- READ ALL EMPLOYEE MANAGER
Employee_router.get('/AllManager', (req, res) => {

    Employee.find({
        "Employee_Manager": true
    }, (err, employee) => {
        if (err) return res.status(500).json({
            msg: "Server Error :)",
            err: err.msg
        });
        res.json(employee);
    })

});
module.exports = Employee_router;