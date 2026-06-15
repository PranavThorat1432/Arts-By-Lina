import Settings from "./settings.model.js";

// @desc    Get settings (public)
// @route   GET /api/settings
// @access  Public
export const getSettings = async (req, res, next) => {
  try {
    let settings = await Settings.findOne();

    // Create default settings if none exist
    if (!settings) {
      settings = await Settings.create({});
    }

    res.json(settings);
  } catch (error) {
    next(error);
  }
};

// @desc    Update settings (admin)
// @route   PUT /api/settings
// @access  Private
export const updateSettings = async (req, res, next) => {
  try {
    const {
      businessName,
      tagline,
      aboutContent,
      contactEmail,
      phoneNumber,
      whatsappNumber,
      instagramURL,
      serviceAreaText,
    } = req.body;

    let settings = await Settings.findOne();

    if (!settings) {
      settings = await Settings.create({
        businessName,
        tagline,
        aboutContent,
        contactEmail,
        phoneNumber,
        whatsappNumber,
        instagramURL,
        serviceAreaText,
      });
    } else {
      settings.businessName = businessName !== undefined ? businessName : settings.businessName;
      settings.tagline = tagline !== undefined ? tagline : settings.tagline;
      settings.aboutContent = aboutContent !== undefined ? aboutContent : settings.aboutContent;
      settings.contactEmail = contactEmail !== undefined ? contactEmail : settings.contactEmail;
      settings.phoneNumber = phoneNumber !== undefined ? phoneNumber : settings.phoneNumber;
      settings.whatsappNumber = whatsappNumber !== undefined ? whatsappNumber : settings.whatsappNumber;
      settings.instagramURL = instagramURL !== undefined ? instagramURL : settings.instagramURL;
      settings.serviceAreaText = serviceAreaText !== undefined ? serviceAreaText : settings.serviceAreaText;

      await settings.save();
    }

    res.json(settings);
  } catch (error) {
    next(error);
  }
};
