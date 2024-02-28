const asyncHandler = require('express-async-handler')
const UserSchema = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error('All Fields are mandatory')
  }

  const userAvailable = await UserSchema.findOne({ email })
  if (userAvailable) {
    res.status(400)
    throw new Error('User Already Registered')
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await UserSchema.create({
    name,
    email,
    password: hashedPassword
  })

  res.json({ message: 'Success', user })
})

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400)
    throw new Error('All Fields are mandatory')
  }

  const user =  await UserSchema.findOne({ email })
  console.log(user)
  console.log(user.password)
    
  const check = await bcrypt.compare(password,user.password)
  console.log(check)

  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
    {
      user: {
        name: user.name,
        email: user.email,
        id: user._id
      },
    },
    "jwt34323",
    { expiresIn: "1d" }
    );
    res.status(200).json({accessToken})
    console.log(accessToken);
  }
else{
    res.status(401).json({message:"error"})
}
})
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user)
})

module.exports = { registerUser, loginUser, currentUser }
