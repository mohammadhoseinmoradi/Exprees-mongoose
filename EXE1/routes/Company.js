const express = require('express');
const Company_router = express.Router()
const Company = require('../models/Company')

Company_router.post('/addCompany', (req, res) => {
    console.log(req.body)
    const NEW_COMPANY = new Company({
        Company_Name: req.body.Company_Name,
        Company_Number_Record: req.body.Company_Number_Record,
        Company_City: req.body.Company_City,
        Company_State: req.body.Company_State,
        Company_Date_Record: req.body.Company_Date_Record,
        Company_Number: req.body.Company_Number
    })
    console.log(NEW_COMPANY)
    NEW_COMPANY.save((err, Company_Data) => {
        if (err) return res.status(500).send("Something went wrong in add Company \n!" + err);
        return res.json({
            Company_Data,
            message: "Creat NEW Company successfully"
        })
    })

})


Company_router.get('/allCompany', (req, res) => {
    console.log("get is ok");
    Company.find({}, (err, Company_All) => {
        if (err) return res.status(500).send("Something went wrong in get all uCompany! \n" + err);
        res.json(Company_All)
    })
})


Company_router.put("/updateCompany/:Company_Name", (req, res) => {

    Company.findByIdAndUpdate(req.params.Company_Name, req.body, { new: true }, (err, Company) => {
        if (err) return res.status(500).send("Something went wrong in update Company! \n" + err);
        return res.json({
            Company,
            massage: "updte is ok"



        })
    })
});


Company_router.delete("/deleteCompany/:Company_Name", (req, res) => {
    console.log(req.params.Company_Name)
    Company.findOneAndDelete({ Company_Name: req.params.Company_Name }, (err, Company) => {
        console.log(Company);
        if (err) return res.status(500).send("Something went wrong in delete Company! \n" + err);
        if (!Company) return res.status(404).send("Company not found")
        return res.json({
            Company,
            massage: " delete is ok"


        })
    })
});


module.exports = Company_router;