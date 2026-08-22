import { FaWhatsapp } from "react-icons/fa";
import { useSettings } from "../../hooks/useSettings";
import { getWhatsAppURL } from "../../utils/helpers";
import { WHATSAPP_MESSAGE } from "../../utils/constants";

const WhatsAppButton = () => {
  const { settings } = useSettings();

  if (!settings?.whatsappNumber) return null;

  const url = getWhatsAppURL(settings.whatsappNumber, WHATSAPP_MESSAGE);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white
                 w-14 h-14 rounded-full flex items-center justify-center shadow-lg
                 transition-all duration-300 hover:scale-110"
    >
      <FaWhatsapp size={28} />
    </a>
  );
};

export default WhatsAppButton;
