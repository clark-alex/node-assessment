const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const ctrl = require('./usersCtrl')

app.use(bodyParser.json())


app.get('/api/users', ctrl.getAll)
app.get('/api/users/:id', ctrl.getById)
app.get('/api/admins', ctrl.getAdmins)
app.get('/api/nonAdmins', ctrl.getNonAdmins)
app.get('/api/user_type/:userType', ctrl.userType)
app.put('/api/users/:id', ctrl.editUser)
app.post('/api/users', ctrl.addUser)
app.delete('/api/users/:id', ctrl.deleteUser)

app.listen(3000, () => { console.log(`server is listening on port 3000`) })