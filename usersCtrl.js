
const userData = require('./userData.json')
module.exports = {
    getAll: (req, res) => {
        let sendRes = []
        if (req.query.favorites) {
            res.status(200).send(
                userData.filter(e => {
                    if (e.favorites.indexOf(req.query.favorites) !== -1) {
                        return true
                    } else if (e.favorites.indexOf(req.query.favorites) === -1) {
                        return false;
                    }
                })
            )
        }
        else if (req.query.age) { res.status(200).send(userData.filter((e) => e.age < req.query.age)) }
        else if (req.query.lastname) { res.status(200).send(
            userData.filter((e) => e.last_name === req.query.lastname)) }
        else if (req.query.email) { res.status(200).send(userData.filter((e) => e.email === req.query.email)) }
        else res.status(200).send(userData)
    },
    getById: (req, res) => {
        if (req.params.id < userData.length )
        {for (let i = 0; i < userData.length; i++) {
            if (userData[i].id === +req.params.id) {
                res.status(200).send(userData[i])
                return 
            }}
        }
        res.status(404).json(null)
    },
    getAdmins: (req, res) => {

        res.status(200).send(userData.filter(e => e.type === 'admin'))
    },
    getNonAdmins: (req, res) => {
        res.status(200).send(userData.filter(e => e.type !== 'admin'))

    },
    userType: (req, res) => {
        let { userType } = req.params
        res.status(200).send(userData.filter(e => e.type === userType))
    },
    editUser: (req, res) => {
        const userIndex = userData.findIndex(user => user.id === +req.params.id)
        userData[userIndex] = req.body
        res.status(200).send(userData)
    },
    addUser: (req, res) => {
        let currentID = userData.length + 1
        req.body.id = currentID
        userData.push(req.body)
        res.status(200).send(userData);
    },
    deleteUser: (req, res) => {


        let userId = req.params.id

        const userIndex = userData.findIndex(user => user.id === +userId)
        userData.splice(userIndex, 1)
        res.status(200).send(userData)
    }
}