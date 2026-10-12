import React, { useState } from 'react';
import { WheatIcon } from './ChurchSymbols';
import { Copy, MessageCircle, Share2, Check, Smartphone, Info } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  if (!isOpen) return null;

  const currentUrl = window.location.href;

  const inviteMessage = `🌾 *ÁGAPE · LUGAR DE AMAR & CUIDAR*
Paz, equipe e família da Ágape!

Chegou o momento de confirmarmos nossos compromissos com a comunicação e o propósito da nossa igreja. 

Acesse a nossa plataforma online simples e prática pelo celular:
👉 ${currentUrl}

Marque os compromissos que você assume, adicione suas palavras de dedicação pessoal e confirme diretamente pela plataforma.

_“Regozijem-se os campos e tudo o que neles há!” (Sl 96:12)_`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {}
  };

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(inviteMessage);
      setCopiedMessage(true);
      setTimeout(() => setCopiedMessage(false), 2000);
    } catch {}
  };

  const handleSendToWhatsApp = () => {
    const text = encodeURIComponent(inviteMessage);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-[#FBF8F2] border border-[#E5DAC6] rounded-3xl max-w-lg w-full p-5 sm:p-7 shadow-2xl space-y-4 sm:space-y-5 relative overflow-hidden max-h-[92vh] overflow-y-auto">
        {/* Marca d'água sutil */}
        <div className="absolute -right-4 -top-6 opacity-10 pointer-events-none">
          <WheatIcon width={100} height={200} />
        </div>

        {/* Topo */}
        <div className="flex items-start justify-between border-b border-[#EFE5D4] pb-3 sm:pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#B8862E]/15 border border-[#B8862E]/30 flex items-center justify-center text-[#B8862E] shrink-0">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-[#2A2418]">
                Enviar para os Membros
              </h3>
              <p className="text-[11px] sm:text-xs text-[#7A6E5D]">
                Compartilhe o link no WhatsApp da equipe da igreja
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-[#8F7F6A] hover:text-[#2A2418] text-xl font-bold cursor-pointer p-1"
          >
            ✕
          </button>
        </div>

        {/* Mensagem Pronta Formatada */}
        <div className="space-y-1.5">
          <span className="text-[11px] uppercase tracking-wider font-semibold text-[#8F7F6A] block">
            Mensagem Pronta para o Grupo da Igreja:
          </span>
          <div className="bg-[#F6F1E8] border border-[#D9CDB8] rounded-xl p-3 text-xs sm:text-sm text-[#453A2A] font-sans leading-relaxed whitespace-pre-line max-h-40 overflow-y-auto">
            {inviteMessage}
          </div>
        </div>

        {/* Ações de Compartilhamento */}
        <div className="space-y-2 pt-0.5">
          <button
            onClick={handleSendToWhatsApp}
            className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BC5A] text-white font-bold py-3 px-4 rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer text-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Enviar no WhatsApp da Equipe</span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleCopyMessage}
              className="inline-flex items-center justify-center gap-1.5 bg-[#FBF8F2] hover:bg-[#EFE5D4] text-[#2A2418] border border-[#D5C6B1] font-semibold py-2.5 px-3 rounded-xl transition-all cursor-pointer text-xs active:scale-95"
            >
              {copiedMessage ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#62723A]" />
                  <span>Copiada!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#B8862E]" />
                  <span>Copiar Mensagem</span>
                </>
              )}
            </button>

            <button
              onClick={handleCopyLink}
              className="inline-flex items-center justify-center gap-1.5 bg-[#FBF8F2] hover:bg-[#EFE5D4] text-[#2A2418] border border-[#D5C6B1] font-semibold py-2.5 px-3 rounded-xl transition-all cursor-pointer text-xs active:scale-95"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#62723A]" />
                  <span>Link Copiado!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-[#B8862E]" />
                  <span>Copiar Link</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Dica para iPhone / WhatsApp */}
        <div className="p-3 bg-[#EFE5D4]/70 border border-[#D9CDB8] rounded-xl flex items-start gap-2.5 text-[11px] sm:text-xs text-[#5C503F] leading-relaxed">
          <Smartphone className="w-4 h-4 text-[#B8862E] shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-[#2A2418] block mb-0.5">
              Dica para quem abre no iPhone:
            </span>
            Se ao clicar pelo WhatsApp aparecer o aviso de segurança do navegador com o botão <span className="font-semibold text-[#2A2418]">"Close and continue"</span>, basta tocar nele, ou tocar nos três pontinhos <span className="font-semibold text-[#2A2418]">"..."</span> e escolher <span className="font-semibold text-[#2A2418]">"Abrir no Safari"</span>.
          </div>
        </div>

        {/* Rodapé do Modal */}
        <div className="pt-2 border-t border-[#EFE5D4] flex items-center justify-between text-xs text-[#8F7F6A]">
          <span className="flex items-center gap-1">
            <WheatIcon width={14} height={14} />
            <span>Ágape · Campo Bom</span>
          </span>
          <button
            onClick={onClose}
            className="hover:text-[#2A2418] underline cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
