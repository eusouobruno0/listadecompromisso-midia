import React, { useState } from 'react';
import { CommitmentItem, CommitmentCategory, MemberCommitment } from '../types';
import { CATEGORIES_CONFIG } from '../data/initialData';
import { WheatIcon, SeedIcon, SheepIcon } from './ChurchSymbols';
import {
  Check,
  CheckCheck,
  Sparkles,
  User,
  AlertCircle,
} from 'lucide-react';

interface CommitmentFormProps {
  items: CommitmentItem[];
  onSubmit: (commitment: Omit<MemberCommitment, 'id' | 'createdAt'>) => void;
  initialData?: Partial<MemberCommitment>;
}

export const CommitmentForm: React.FC<CommitmentFormProps> = ({
  items,
  onSubmit,
  initialData,
}) => {
  const [name, setName] = useState(initialData?.name || '');
  const [role, setRole] = useState(initialData?.role || '');
  // A lista de compromissos inicia desmarcada
  const [selectedIds, setSelectedIds] = useState<string[]>(
    initialData?.selectedItemIds || []
  );
  const [personalCommitment, setPersonalCommitment] = useState(
    initialData?.personalCommitment || ''
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
    setErrorMessage(null);
  };

  const handleSelectAll = () => {
    setSelectedIds(items.map((i) => i.id));
    setErrorMessage(null);
  };

  const handleClearAll = () => {
    setSelectedIds([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMessage('Por favor, informe seu nome para confirmar o compromisso.');
      return;
    }

    if (!role.trim()) {
      setErrorMessage('Por favor, informe sua área de atuação ou ministério.');
      return;
    }

    if (selectedIds.length === 0 && !personalCommitment.trim()) {
      setErrorMessage(
        'Selecione pelo menos um compromisso na lista ou escreva o seu compromisso pessoal.'
      );
      return;
    }

    onSubmit({
      name: name.trim(),
      role: role.trim(),
      selectedItemIds: selectedIds,
      personalCommitment: personalCommitment.trim() || undefined,
    });
  };

  const categories: CommitmentCategory[] = [
    'proposito',
    'identidade',
    'publico',
    'equipe',
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8 max-w-2xl mx-auto pb-24">
      {/* Bloco de Introdução com Identidade Ágape */}
      <div className="relative bg-[#FBF8F2] border border-[#E5DAC6] rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-xs overflow-hidden">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs uppercase tracking-widest text-[#B8862E] font-semibold">
            <WheatIcon width={14} height={14} />
            <span>Equipe de Mídia &amp; Comunicação</span>
          </div>

          <div className="sm:hidden">
            <SheepIcon size={36} />
          </div>
        </div>

        <h1 className="text-2xl sm:text-4xl font-bold text-[#2A2418] tracking-tight">
          Nosso <em className="italic text-[#B8862E] font-serif-church font-normal">compromisso</em>
        </h1>

        <p className="mt-2 text-xs sm:text-sm text-[#5D5344] leading-relaxed font-light">
          O que você vai fazer diferente a partir de hoje? Assuma os compromissos
          com a identidade e o cuidado da nossa igreja. Marque abaixo os pontos que você assume.
        </p>

        {/* Versículo de Salmos */}
        <div className="mt-4 pt-3 border-t border-[#EFE5D4] flex items-center justify-between gap-3">
          <div className="border-l-2 border-[#B8862E] pl-2.5 py-0.5">
            <span className="text-xs sm:text-sm italic text-[#635745] font-serif-church block">
              “Regozijem-se os campos e tudo o que neles há!”
            </span>
            <span className="text-[10px] tracking-widest uppercase font-semibold text-[#8F7F6A] block mt-0.5">
              SALMOS 96:12
            </span>
          </div>

          <div className="hidden sm:flex items-center">
            <SheepIcon size={46} />
          </div>
        </div>
      </div>

      {/* Identificação do Membro */}
      <div className="bg-[#FBF8F2] border border-[#E5DAC6] rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-2.5 border-b border-[#EFE5D4]">
          <User className="w-4 h-4 sm:w-5 sm:h-5 text-[#B8862E]" />
          <h2 className="font-semibold text-base sm:text-lg text-[#2A2418]">
            Seus Dados de Identificação
          </h2>
        </div>

        <div className="space-y-3.5 sm:space-y-4">
          {/* Nome */}
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-[#6B5F4E] mb-1">
              Seu Nome Completo <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setErrorMessage(null);
              }}
              placeholder="Ex: Gabriel Silva"
              className="w-full bg-[#F6F1E8] border border-[#D9CDB8] focus:border-[#B8862E] focus:bg-white rounded-xl px-3.5 py-3 text-base text-[#2A2418] outline-hidden transition-all shadow-2xs placeholder:text-[#9E907C]"
              required
            />
          </div>

          {/* Área / Ministério (campo livre preenchível) */}
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-[#6B5F4E] mb-1">
              Área de Atuação / Ministério <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
                setErrorMessage(null);
              }}
              placeholder="Ex: Fotografia, Vídeo, Stories, Recepção..."
              className="w-full bg-[#F6F1E8] border border-[#D9CDB8] focus:border-[#B8862E] focus:bg-white rounded-xl px-3.5 py-3 text-base text-[#2A2418] outline-hidden transition-all shadow-2xs placeholder:text-[#9E907C]"
              required
            />
          </div>
        </div>
      </div>

      {/* Lista de Compromissos por Categoria */}
      <div className="space-y-4 sm:space-y-5">
        <div className="flex items-center justify-between gap-2 px-1">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#2A2418] flex items-center gap-1.5">
              <SeedIcon size={18} className="text-[#62723A]" />
              <span>Lista de Compromissos</span>
            </h2>
            <p className="text-xs text-[#6B5F4E]">
              Toque para marcar os itens que você assume:
            </p>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={handleSelectAll}
              className="text-xs font-semibold text-[#B8862E] hover:text-[#94691E] bg-[#B8862E]/10 px-2.5 py-1.5 rounded-full transition-all cursor-pointer flex items-center gap-1 active:scale-95"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Marcar Todos</span>
            </button>
            {selectedIds.length > 0 && (
              <button
                type="button"
                onClick={handleClearAll}
                className="text-xs text-[#7A6E5D] bg-[#EFE5D4] px-2 py-1.5 rounded-full transition-all cursor-pointer active:scale-95"
              >
                Limpar
              </button>
            )}
          </div>
        </div>

        {/* Categorias */}
        {categories.map((catKey) => {
          const config = CATEGORIES_CONFIG[catKey];
          const catItems = items.filter((i) => i.category === catKey);

          return (
            <div
              key={catKey}
              className="bg-[#FBF8F2] border border-[#E5DAC6] rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xs space-y-3"
            >
              {/* Header da Categoria */}
              <div className="flex items-center justify-between border-b border-[#EFE5D4] pb-2.5">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: config.dotColor }}
                  />
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-[#2A2418]">
                      {config.label}
                    </h3>
                    <p className="text-[11px] text-[#7A6E5D] line-clamp-1">{config.subtitle}</p>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border shrink-0 ${config.badgeColor}`}
                >
                  {catItems.filter((i) => selectedIds.includes(i.id)).length}/{catItems.length}
                </span>
              </div>

              {/* Cards de Itens */}
              <div className="space-y-2">
                {catItems.map((item) => {
                  const isChecked = selectedIds.includes(item.id);

                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleItem(item.id)}
                      className={`relative flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer select-none active:scale-[0.99] ${
                        isChecked
                          ? 'bg-[#F5EDDD] border-[#B8862E]/70 shadow-2xs'
                          : 'bg-[#FBF8F2] border-[#E8DFC9] hover:bg-[#F8F2E6]'
                      }`}
                    >
                      {/* Checkbox grande tátil para celular */}
                      <div
                        className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                          isChecked
                            ? 'bg-[#B8862E] text-white shadow-2xs'
                            : 'border-2 border-[#C7B79E] bg-white text-transparent'
                        }`}
                      >
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-baseline gap-1.5">
                          <span
                            className={`font-semibold text-sm ${
                              isChecked ? 'text-[#2A2418]' : 'text-[#3E3426]'
                            }`}
                          >
                            {item.title}
                          </span>
                          <span className="text-[9px] uppercase tracking-wider font-medium text-[#8F7F6A] bg-[#EFE5D4] px-1.5 py-0.2 rounded-md">
                            {item.tag}
                          </span>
                        </div>
                        <p className="text-xs text-[#665A48] mt-1 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Compromisso Pessoal (Texto Livre sem tópicos pré-definidos) */}
      <div className="bg-[#FBF8F2] border border-[#E5DAC6] rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-xs space-y-3">
        <div className="flex items-center gap-2 pb-2.5 border-b border-[#EFE5D4]">
          <Sparkles className="w-4 h-4 text-[#B8862E]" />
          <div>
            <h3 className="font-semibold text-sm sm:text-base text-[#2A2418]">
              Compromisso Pessoal de Coração
            </h3>
            <p className="text-xs text-[#7A6E5D]">
              Escreva em suas próprias palavras o que você deseja entregar.
            </p>
          </div>
        </div>

        <div>
          <textarea
            value={personalCommitment}
            onChange={(e) => setPersonalCommitment(e.target.value)}
            placeholder="Escreva seu compromisso pessoal aqui..."
            rows={4}
            className="w-full bg-[#F6F1E8] border border-[#D9CDB8] focus:border-[#B8862E] focus:bg-white rounded-xl p-3 text-base text-[#2A2418] outline-hidden transition-all shadow-2xs placeholder:text-[#9E907C] leading-relaxed"
          />
        </div>
      </div>

      {/* Mensagem de Erro se houver */}
      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Botão de Envio / Confirmação Flutuante Otimizado para Mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-[#F6F1E8]/95 backdrop-blur-md px-4 pt-3 pb-[max(0.85rem,env(safe-area-inset-bottom))] border-t border-[#DFD3BE] shadow-xl">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-3">
          <div className="text-xs text-[#5D5344] leading-tight">
            {selectedIds.length === 0 ? (
              <span className="text-[#8F7F6A]">Nenhum marcado</span>
            ) : (
              <span className="font-bold text-[#2A2418]">
                {selectedIds.length} {selectedIds.length === 1 ? 'marcado' : 'marcados'}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-[#B8862E] hover:bg-[#A37422] text-[#FBF8F2] font-bold text-sm sm:text-base py-3 px-6 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <WheatIcon width={18} height={18} className="text-white shrink-0" />
            <span>Confirmar Compromisso 🌾</span>
          </button>
        </div>
      </div>
    </form>
  );
};
