import { FaWhatsapp } from "react-icons/fa";

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/5500000000000"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact on WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 before:content-[''] before:absolute before:inset-0 before:rounded-full before:bg-[#25D366] before:-z-10 before:animate-ping"
    >
      <FaWhatsapp className="w-8 h-8" />
    </a>
  );
}