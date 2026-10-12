import React from 'react';
import { MemberCommitment, CommitmentItem } from '../types';
import { WheatIcon, SeedIcon, SheepIcon } from './ChurchSymbols';
import {
  CheckCircle,
  Copy,
  Calendar,
  Sparkles,
  MessageCircle,
  RotateCcw,
} from 'lucide-react';

interface CommitmentCardProps {
  commitment: MemberCommitment;
  allItems: CommitmentItem[];
  onNewCommitment: () => void;
  onEdit: () => void;
}

export const CommitmentCard: React.FC<CommitmentCardProps> = ({
  commitment,
  allItems,
  onNewCommitment,
  onEdit,
}) => {
  const [copied, setCopied] = React.useState(false);

  const selectedItems = allItems.filter((item) =>
    commitment.selectedItemIds.includes(item.id)
  );

  const formattedDate = new Date(commitment.createdAt).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  const generateShareText = () => {
    const itemsList = selectedItems.map((i) => `🌾 ${i.title}`).join('\n');
    let text = `*ÁGAPE · LUGAR DE AMAR & CUIDAR*\n`;
    text += `Eu, *${commitment.name}* (${commitment.role}), confirmei meus compromissos com a comunicação da nossa igreja:\n\n`;
    if (itemsList) {
      text += `${itemsList}\n`;
    }
    if (commitment.personalCommitment) {
      text += `\n✨ *Meu compromisso de coração:* "${commitment.personalCommitment}"\n`;
    }
    text += `\n_“Regozijem-se os campos e tudo o que neles há!” (Sl 96:12)_\n`;
    text += `Confirme o seu também no link: ${window.location.href}`;
    return text;
  };

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(generateShareText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {}
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(generateShareText());
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-5 sm:space-y-6 pb-12">
      {/* Banner de Parabéns */}
      <div className="bg-[#62723A]/10 border border-[#62723A]/25 rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#62723A] text-white flex items-center justify-center shrink-0 shadow-xs">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-sm sm:text-base text-[#2A2418]">
              Compromisso confirmado!
            </h3>
            <p className="text-xs text-[#5D5344]">
              Seu registro foi enviado para a liderança da igreja.
            </p>
          </div>
        </div>
        <div className="shrink-0">
          <SheepIcon size={42} />
        </div>
      </div>

      {/* Cartão Oficial / Certificado Visual Otimizado para Mobile */}
      <div
        id="commitment-certificate"
        className="relative bg-[#FBF8F2] border-2 border-[#D9A441] rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-lg overflow-hidden"
      >
        {/* Marca d'água / elemento de fundo */}
        <div className="absolute -right-6 -bottom-8 opacity-10 pointer-events-none">
          <WheatIcon width={140} height={280} />
        </div>

        {/* Topo do Certificado */}
        <div className="flex items-start justify-between pb-4 sm:pb-6 border-b border-[#EADCC8] gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-[#B8862E]/15 border border-[#B8862E]/30 flex items-center justify-center shrink-0">
              <WheatIcon width={18} height={18} className="text-[#B8862E]" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-[#B8862E] font-semibold">
                Aliança de Serviço
              </div>
              <div className="text-lg sm:text-2xl font-bold text-[#2A2418] flex items-baseline gap-1">
                ágape<span className="text-[#62723A]">.</span>
                <span className="text-[11px] italic text-[#B8862E] font-normal ml-0.5">
                  amar &amp; cuidar
                </span>
              </div>
            </div>
          </div>

          <div className="text-right text-[11px] text-[#7A6E5D] shrink-0">
            <div className="flex items-center justify-end gap-1 font-medium text-[#4A3A2C]">
              <Calendar className="w-3 h-3 text-[#B8862E]" />
              <span>{formattedDate}</span>
            </div>
            <div className="text-[10px]">Campo Bom · RS</div>
          </div>
        </div>

        {/* Nome do Membro */}
        <div className="my-5 sm:my-6">
          <span className="text-[11px] uppercase tracking-wider text-[#8A7D6B] font-medium block">
            Membro Comprometido:
          </span>
          <h2 className="text-xl sm:text-3xl font-bold text-[#2A2418] mt-0.5 tracking-tight">
            {commitment.name}
          </h2>
          <div className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-0.5 bg-[#62723A]/10 border border-[#62723A]/25 rounded-full text-xs font-medium text-[#4D5A2C]">
            <SeedIcon size={13} className="text-[#62723A]" />
            <span>{commitment.role}</span>
          </div>
        </div>

        {/* Lista de Compromissos Selecionados */}
        <div className="space-y-2.5 my-5 sm:my-6">
          <span className="text-[11px] uppercase tracking-wider text-[#8A7D6B] font-semibold block">
            Compromissos Assumidos ({selectedItems.length}):
          </span>

          <div className="grid grid-cols-1 gap-2">
            {selectedItems.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-2.5 bg-[#F6F1E8] border border-[#E8DEC9] rounded-xl p-3 text-xs sm:text-sm"
              >
                <div className="w-4 h-4 rounded-full bg-[#B8862E]/20 text-[#855D17] flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                  ✓
                </div>
                <div>
                  <span className="font-semibold text-[#2A2418] block leading-tight">
                    {item.title}
                  </span>
                  <span className="text-[#6B5F4E] text-[11px] sm:text-xs leading-relaxed block mt-0.5">
                    {item.description}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Compromisso pessoal se houver */}
          {commitment.personalCommitment && (
            <div className="mt-3.5 p-3.5 rounded-xl bg-[#FAF0D7] border border-[#E3CA92] text-xs">
              <span className="text-[10px] uppercase tracking-wider font-bold text-[#8F6317] flex items-center gap-1 mb-1">
                <Sparkles className="w-3 h-3" /> Meu compromisso de coração:
              </span>
              <p className="italic text-[#382C18] text-xs sm:text-sm leading-relaxed font-serif-church">
                "{commitment.personalCommitment}"
              </p>
            </div>
          )}
        </div>

        {/* Rodapé do Certificado com Versículo e Selo */}
        <div className="pt-4 sm:pt-5 border-t border-[#EADCC8] flex items-center justify-between gap-3">
          <div className="border-l-2 border-[#B8862E] pl-2.5 py-0.5">
            <p className="text-[11px] sm:text-xs italic text-[#544A3C]">
              “Regozijem-se os campos e tudo o que neles há!”
            </p>
            <span className="text-[9px] tracking-wider text-[#8A7D6B] font-bold block mt-0.5">
              SALMOS 96:12
            </span>
          </div>

          <div className="px-2.5 py-1 rounded-lg bg-[#EFE4D2] border border-[#D9CDB8] text-[10px] font-semibold text-[#4A3A2C] flex items-center gap-1 shrink-0">
            <CheckCircle className="w-3 h-3 text-[#62723A]" />
            <span>Confirmado</span>
          </div>
        </div>
      </div>

      {/* Botões de Ação para Celular */}
      <div className="flex flex-col sm:flex-row items-stretch gap-2.5 pt-1">
        <button
          onClick={handleShareWhatsApp}
          className="flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BC5A] text-white font-semibold py-3 px-4 rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer text-sm"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Compartilhar no WhatsApp</span>
        </button>

        <button
          onClick={handleCopyText}
          className="inline-flex items-center justify-center gap-2 bg-[#FBF8F2] hover:bg-[#EDE3D3] text-[#2A2418] border border-[#D5C6B1] font-medium py-3 px-4 rounded-xl shadow-2xs transition-all cursor-pointer text-sm active:scale-95"
        >
          <Copy className="w-4 h-4 text-[#B8862E]" />
          <span>{copied ? 'Copiado!' : 'Copiar Texto'}</span>
        </button>

        <button
          onClick={onNewCommitment}
          className="inline-flex items-center justify-center gap-2 bg-[#B8862E] hover:bg-[#A37422] text-white font-medium py-3 px-4 rounded-xl shadow-xs transition-all cursor-pointer text-sm active:scale-95"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Novo Preenchimento</span>
        </button>
      </div>

      <div className="text-center pt-1">
        <button
          onClick={onEdit}
          className="text-xs text-[#8A7D6B] hover:text-[#2A2418] underline cursor-pointer"
        >
          Deseja alterar as informações enviadas?
        </button>
      </div>
    </div>
  );
};
