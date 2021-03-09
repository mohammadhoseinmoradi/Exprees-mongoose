const express = require('express');
const Company_router = express.Router()
const Company = require('../models/Company')

//! --------------------------------------------------------------------------------------------------------------------
// todo ----------------------------------------------------CREATE COMPANY----------------------

Company_router.put('/addCompany', (req, res) => {
    console.log(req.body)
    const NEW_COMPANY = new Company({
        Company_Name: req.body.Company_Name,
        Company_Number_Record: req.body.Company_Number_Record,
        Company_City: req.body.Company_City,
        Company_State: req.body.Company_State,
        Company_Date_Record: req.body.Company_Date_Record,
        Company_Number: req.body.Company_Number
    })
    NEW_COMPANY.save((err, Company_Data) => {
        if (err) return res.status(500).send("Something went wrong in add Company \n!" + err);
        return res.json({
            Company_Data,
            message: "Creat NEW Company successfully"
        })
    })
})

// todo ---------------------------------------------------READ COMPANY ------------------------

Company_router.get('/allCompany', (req, res) => {
    Company.find({}, (err, Company_All) => {
        if (err) return res.status(500).send("Something went wrong in get all uCompany! \n" + err);
        res.render('Company', { Company_All })
    })
})
Company_router.get('/:id', (req, res) => {
    Company.find({ _id: req.params.id }, (err, Company_All) => {
        if (err) return res.status(500).send("Something went wrong in get all uCompany! \n" + err);
        res.json(Company_All)
    })
})

// todo ---------------------------------------------------UPDATE COMPANY --------------------

Company_router.post("/updateCompany/:id", (req, res) => {
    console.log(1111);
    console.log(req.body);
    console.log(2222);
    console.log(req.params.id);
    Company.findOneAndUpdate({
        _id: req.params.id
    }, req.body, {
        $set: {
            Company_Name: req.body.Company_Name,
            Company_Number_Record: req.body.Company_Number_Record,
            Company_City: req.body.Company_City,
            Company_State: req.body.Company_State,
            Company_Date_Record: req.body.Company_Date_Record,
            Company_Number: req.body.Company_Number
        }
    }, (err, company_Updated) => {
        if (err) return res.status(500).json({
            msg: "Server Error :)",
            err: err.msg
        });
        res.json(company_Updated);
    })
});

// todo --------------------------------------------------- DELETE COMPANY -------------------
Company_router.delete("/deleteCompany/:id", (req, res) => {
    Company.findOneAndDelete({ _id: req.params.id }, (err, Company_deleted) => {
        if (err) return res.status(500).send("Something went wrong in delete Company! \n" + err);
        if (!Company_deleted) return res.status(404).send("Company not found")
        res.json({
            Company_deleted,
            massage: " delete is ok"


        })
    })
});
// !-----------------------------------------------------------------------------------------------------------------
// todo--------------------------------------------------------CHANG CITY -----------------------
Company_router.post('/changeCity', (req, res) => {

    company.updateMany({ "__v": 0 },
        req.body, {
            Company_City: req.body.Company_City,
            Company_State: req.body.Company_State,
        }, (err, company_changed) => {
            if (err) return res.status(500).json({
                msg: "Server Error :)",
                err: err.msg
            });
            res.json(company_changed);
        })


});
// todo -------------------------------------------------- FIND COMPANY GREATER THAN 1YEAR AGO -----------
Company_router.get('/CompanyRecently/:id', (req, res) => {
    var pastYear = new Date().getFullYear() - req.params.id;

    Company.find({
        "Company_Date_Record": {
            $gt: `${pastYear}`
        }
    }, (err, companies) => {
        if (err) return res.status(500).json({
            msg: "Server Error :)",
            err: err.msg
        });
        res.json(companies);
    });
});
module.exports = Company_router;