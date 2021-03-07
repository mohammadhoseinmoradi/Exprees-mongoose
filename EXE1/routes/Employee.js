const express = require('express');
const Employee_router = express.Router()
const Employee = require('../models/employee')

Employee_router.post('/addEmployee', (req, res) => {
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


Employee_router.get('/allEmployee', (req, res) => {
    console.log("get is ok");
    Employee.find({}, (err, Employee_All) => {
        if (err) return res.status(500).send("Something went wrong in get all uEmployee! \n" + err);
        res.json(Employee_All)
    })
})


Employee_router.put("/updateEmployee/:Employee_Name", (req, res) => {

    Employee.findByIdAndUpdate(req.params.Employee_Name, req.body, { new: true }, (err, Employee) => {
        if (err) return res.status(500).send("Something went wrong in update Employee! \n" + err);
        return res.json({
            Employee,
            massage: "updte is ok"



        })
    })
});


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


module.exports = Employee_router;