const { Router } = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator')


const router = Router();

router.post(
  '/register',
  [
    check('email', 'email uncorrected').isEmail(),
    check('password', 'password uncorrected')
      .isLength({min: 6})
  ],
  async (req, resp) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return resp.status(400).json({
        errors: errors.array(),
        message: 'uncorrected data'
      })
    }

    const { email, password } = req.body

    const candidate = await User.findOne({ email })

    if (candidate) {
      return resp.status(400).json({ message: 'user already exist'})
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = new User({ email, password: hashedPassword })
    await user.save()

    resp.status(201).json({ message: 'User created' })

  } catch (e) {
    resp.status(500).json({ message: 'err' })
  }
})

router.post(
  '/login',
  [
    check('email', 'введите корректный email').normalizeEmail().isEmail(),
    check('password', 'введите пароль').exists()
  ],
  async (req, resp) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return resp.status(400).json({
          errors: errors.array(),
          message: 'uncorrected login at signing'
        })
      }

      const { email, password } = req.body

      const user = await User.findOne({ email })

      if (!user) {
        return resp.status(400).json({ message: 'user is not exists' })
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return resp.status(400).json({ message: 'неверный пароль' })
      }

      const token = jwt.sign(
        { userId: user.id },
        config.get('jwtSecret'),
        { expiresIn: '1h'}
      )

      resp.status(200).json({ token, userId: user.id})

    } catch (e) {
      resp.status(500).json({ message: 'err' })
    }
})


module.exports = router;