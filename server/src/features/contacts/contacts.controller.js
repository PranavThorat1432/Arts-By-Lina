import Contact from "./contacts.model.js";
import { sendContactNotification } from "../../utils/sendEmail.js";

// @desc    Submit contact form (public)
// @route   POST /api/contacts
// @access  Public
export const createContact = async (req, res, next) => {
  try {
    const { name, phone, email, message } = req.body;

    const contact = await Contact.create({ name, phone, email, message });

    // Send email notification (non-blocking)
    sendContactNotification(contact).catch((err) =>
      console.error("Contact email error:", err)
    );

    res.status(201).json({
      message: "Message sent successfully! We will get back to you soon.",
      contact,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all contacts (admin)
// @route   GET /api/contacts
// @access  Private
export const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single contact (admin)
// @route   GET /api/contacts/:id
// @access  Private
export const getContactById = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    // Mark as read
    if (!contact.isRead) {
      contact.isRead = true;
      await contact.save();
    }

    res.json(contact);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete contact (admin)
// @route   DELETE /api/contacts/:id
// @access  Private
export const deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Contact deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// @desc    Get contact stats (admin dashboard)
// @route   GET /api/contacts/stats
// @access  Private
export const getContactStats = async (req, res, next) => {
  try {
    const total = await Contact.countDocuments();
    const unread = await Contact.countDocuments({ isRead: false });
    res.json({ total, unread });
  } catch (error) {
    next(error);
  }
};
