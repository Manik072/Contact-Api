const asyncHandler = require('express-async-handler')
const ContactSchema = require('../model/contactModel')

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await ContactSchema.find({ UserId: req.user.id }).populate('UserId')
  res.send(contacts)
})

const createContact = asyncHandler(async (req, res) => {
  console.log(req.body)
  const { ContactName, ContactNumber } = req.body //POST REQ AND CREATING DATA
  if (!ContactName || !ContactNumber) {
    //req.body means like storing data of json body annd sending to database
    res.status(400)
    throw new Error('All Field are Neccesary')
  }
  const contact = await ContactSchema.create({
    UserId: req.user.id,
    ContactName,
    ContactNumber
  })
  res.json(contact)
})
const getSingleContact = asyncHandler(async (req, res) => {
  const contact = await ContactSchema.findById(req.params.id) //req.params.id means to print id enteted along with get request api route

  if (!contact) {
    res.status(404)
    throw new Error('Contact Not Found')
  }
  res.json(contact)
})

const updateContact = asyncHandler(async (req, res) => {
  const contact = await ContactSchema.findById(req.params.id)

  if (!contact) {
    res.status(404)
    throw new Error('Contact Not Found')
  }

  const updatedContact = await ContactSchema.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )
  //UPDATE
  res.json(updatedContact)
})

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await ContactSchema.findById(req.params.id)

  if (!contact) {
    res.status(404)
    throw new Error('Contact Not Found')
  }
  await ContactSchema.deleteMany()
  //DELETE
  res.status(200).json(contact)
})

module.exports = {
  getContacts,
  createContact,
  getSingleContact,
  updateContact,
  deleteContact
}
