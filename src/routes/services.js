const express = require('express')
const router = express.Router()
const {accounts, writeJSON} = require('../data')

router.get('/transfer', (_,res) => res.render('transfer'))
router.post('/transfer', ({body}, res)=>{
    const fromAccount = accounts[body.from]
    const toAccount = accounts[body.to]
    toAccount.balance += parseInt(body.amount)
    fromAccount.balance -= parseInt(body.amount)
    writeJSON()
    res.render('transfer', {message: "Transfer Completed"})
})
router.get('/payment', (_,res) => res.render('payment', {account: accounts.credit}))
router.post('/payment', ({body},res) => {
    accounts.credit.balance -= parseInt(body.amount)
    accounts.credit.available += parseInt(body.amount)
    writeJSON()
    res.render('payment', {account: accounts.credit, message: 'Payment Successful'})
})

module.exports = router