const express = require('express')
const { Op } = require('sequelize')
const { getRefreshToken, getAccessToken, registerUser, accountConnected, sendResetLink, getUser, loginUser, getUserToken, deleteToken, checkToken, resetPassword } = require('../controllers/authorize')
const router = express.Router()
const { deleteRefreshToken, authenticateToken } = require('../middleware/auth')
const db = require('../models')

router.post('/register', registerUser)

router.post('/accountConnected', accountConnected)

router.post('/refresh_token', getRefreshToken)

router.post('/access_token', getAccessToken)

router.get('/getUser', getUser)

router.post('/login', loginUser)
router.post('/userToken', getUserToken)
router.delete('/logout', deleteRefreshToken, deleteToken)
router.get('/checkToken', authenticateToken, checkToken)
router.post('/resetLink', sendResetLink)
router.post('/resetPassword', resetPassword)

router.post('/testing', async (req, res) => {
    const { email } = req.body
    const user = await (await db.User.findOne({
        where: {
            email: {
                [Op.iLike]: email
            }
        }
    }))

    console.log(user?.dataValues)
})

module.exports = router
