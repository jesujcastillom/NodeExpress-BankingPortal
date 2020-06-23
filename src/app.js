const fs = require('fs')
const path = require('path')
const express = require('express')
const {accounts, users, writeJSON} = require('./data')

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))



app.get('/', (_, res)=>res.render('index', {
    title: 'Account Summary',
    accounts,
}))

app.get('/savings', (_,res) => res.render('account', {account: accounts.savings}))
app.get('/checking', (_,res) => res.render('account', {account: accounts.checking}))
app.get('/credit', (_,res) => res.render('account', {account: accounts.credit}))
app.get('/profile', (_,res) => res.render('profile', {user: users[0]}))
app.get('/transfer', (_,res) => res.render('transfer'))
app.post('/transfer', ({body}, res)=>{
    const fromAccount = accounts[body.from]
    const toAccount = accounts[body.to]
    toAccount.balance += parseInt(body.amount)
    fromAccount.balance -= parseInt(body.amount)
    writeJSON()
    res.render('transfer', {message: "Transfer Completed"})
})
app.get('/payment', (_,res) => res.render('payment', {account: accounts.credit}))
app.post('/payment', ({body},res) => {
    accounts.credit.balance -= parseInt(body.amount)
    accounts.credit.available += parseInt(body.amount)
    writeJSON()
    res.render('payment', {account: accounts.credit, message: 'Payment Successful'})
})

app.listen(3000, ()=>{
    console.log('PS Project Running on port 3000!')
})
