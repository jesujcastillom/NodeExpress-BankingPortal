const express = require('express')
const router = express.Router()
const {accounts} = require('../data')

router.get('/savings', (_,res) => res.render('account', {account: accounts.savings}))
router.get('/checking', (_,res) => res.render('account', {account: accounts.checking}))
router.get('/credit', (_,res) => res.render('account', {account: accounts.credit}))

module.exports = router