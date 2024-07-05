const asyncHandler = require("express-async-handler");
const Contact = require('../models/contactModels')

//@desc Get all contact
//@route GET /api/contact
//@access private

const getContacts = asyncHandler(async (req, res) => {
  const contact = await Contact.find({user_id:req.user.id});
  res.json({
    message: contact,
  });
});

//@desc Create all contact
//@route POST /api/contact
//@access private

const createContact = asyncHandler(async (req, res) => {
  console.log("the req", req.body);

  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id:req.user.id,
  })
  res.status(201).json({
    contact,
  });
});

//@desc Get one contact
//@route GET /api/contact
//@access private

const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
    }

  res.json({
    contact,
  });
});

//@desc Update one contact
//@route PUT /api/contact
//@access public

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if(!contact){
    res.status(404);
    throw new Error('contact not found');
  }
  if(contact.user_id.toString() !== req.user.id){
    res.status(403);
    throw new Error('user not have access to update ')
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(
    updatedContact
  );
});

//@desc Delete one contact
//@route DELETE /api/contact
//@access public

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if(!contact){
    res.status(404);
    throw new Error('contact not found');
  }
  if(contact.user_id !== req.user.id){
    res.status(403);
    throw new Error('user not have access to delete ')
  }
await contact.deleteOne({_id: req.params.id});

  res.status(200).json({ message: 'Contact deleted successfully'});
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
