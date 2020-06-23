const fs = require('fs')
const path = require('path')

const accountData = fs.readFileSync(path.join(__dirname, 'json', 'accounts.json'), 'utf-8')
const accounts = JSON.parse(accountData)
const userData = fs.readFileSync(path.join(__dirname, 'json', 'users.json'), 'utf-8')
const users = JSON.parse(userData)

function writeJSON() {
    const accountsJSON = JSON.stringify(accounts)
    fs.writeFileSync(path.join(__dirname, 'json', 'accounts.json'), accountsJSON, 'utf-8')
}

module.exports = {
    accounts, 
    users,
    writeJSON
}