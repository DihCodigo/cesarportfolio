import { FaWhatsapp } from "react-icons/fa";

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/5512982211873"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contato pelo WhatsApp"
      data-testid="whatsapp-float-button"
      className="fixed bottom-8 right-8 z-50 group"
    >
      <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-lg shadow-[#25D366]/40 hover:scale-110 transition-transform duration-300">
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
        <FaWhatsapp className="w-7 h-7 text-white relative z-10" />
      </div>
    </a>
  );
}
