import React, { useState } from 'react';
import { MemberCommitment, CommitmentItem } from '../types';
import { WheatIcon, SeedIcon } from './ChurchSymbols';
import {
  Copy,
  PlusCircle,
  FileSpreadsheet,
  TrendingUp,
  Users,
  CheckCircle,
  Trash2,
  Lock,
  KeyRound,
  AlertCircle,
  Eye,
  EyeOff,
  LogOut,
  Calendar,
} from 'lucide-react';

interface LeaderDashboardProps {
  members: MemberCommitment[];
  items: CommitmentItem[];
  onAddNewItem: (item: Omit<CommitmentItem, 'id'>) => void;
  onDeleteMember?: (id: string) => void;
  isAuthenticated: boolean;
  onAuthenticate: (status: boolean) => void;
}

export const LeaderDashboard: React.FC<LeaderDashboardProps> = ({
  members,
  items,
  onAddNewItem,
  onDeleteMember,
  isAuthenticated,
  onAuthenticate,
}) => {
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [copied, setCopied] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItemTitle, setNewItemTitle] = useState('');
  const [newItemDesc, setNewItemDesc] = useState('');
  const [newItemTag, setNewItemTag] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<'proposito' | 'identidade' | 'publico' | 'equipe'>('equipe');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput.trim() === 'midiaagape2027') {
      onAuthenticate(true);
      setPasswordError(false);
      setPasswordInput('');
    } else {
      setPasswordError(true);
    }
  };

  // Se não estiver autenticado, exibe a tela de bloqueio por senha
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-6 sm:my-16 px-2">
        <div className="bg-[#FBF8F2] border border-[#E5DAC6] rounded-3xl p-6 sm:p-8 shadow-md text-center space-y-5">
          <div className="w-14 h-14 rounded-2xl bg-[#B8862E]/15 border border-[#B8862E]/30 mx-auto flex items-center justify-center text-[#B8862E] shadow-2xs">
            <KeyRound className="w-7 h-7" />
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#2A2418]">
              Acesso da Liderança
            </h2>
            <p className="text-xs sm:text-sm text-[#6B5F4E] mt-1 leading-relaxed">
              Área restrita à coordenação e pastores para visualização das confirmações.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#6B5F4E] mb-1.5">
                Senha de Acesso
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    setPasswordError(false);
                  }}
                  placeholder="Digite a senha..."
                  className="w-full bg-[#F6F1E8] border border-[#D9CDB8] focus:border-[#B8862E] focus:bg-white rounded-xl pl-4 pr-10 py-3 text-base text-[#2A2418] outline-hidden transition-all shadow-2xs"
                  autoFocus
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8F7F6A] hover:text-[#2A2418] cursor-pointer p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {passwordError && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>Senha incorreta. Verifique e tente novamente.</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 bg-[#B8862E] hover:bg-[#A37422] text-[#FBF8F2] font-bold py-3.5 px-4 rounded-xl shadow-xs transition-all cursor-pointer active:scale-95 text-base"
            >
              <Lock className="w-4 h-4" />
              <span>Entrar no Painel</span>
            </button>
          </form>

          <div className="pt-2 border-t border-[#EFE5D4] text-[11px] text-[#8F7F6A]">
            Igreja Ágape · Campo Bom / RS
          </div>
        </div>
      </div>
    );
  }

  // Estatísticas
  const commitmentCounts: { [key: string]: number } = {};
  items.forEach((item) => {
    commitmentCounts[item.id] = members.filter((m) =>
      m.selectedItemIds.includes(item.id)
    ).length;
  });

  const sortedItems = [...items].sort(
    (a, b) => (commitmentCounts[b.id] || 0) - (commitmentCounts[a.id] || 0)
  );

  // Relatório formatado para WhatsApp
  const generateWhatsAppReport = () => {
    let report = `📊 *RELATÓRIO DE COMPROMISSOS · ÁGAPE MÍDIA*\n`;
    report += `_Lugar de amar & cuidar · Campo Bom_\n\n`;
    report += `👥 *Total de Membros Confirmados:* ${members.length}\n\n`;
    report += `🌾 *MEMBROS CONFIRMADOS:*\n`;
    members.forEach((m, idx) => {
      report += `${idx + 1}. *${m.name}* (${m.role}) - ${m.selectedItemIds.length} compromissos\n`;
      if (m.personalCommitment) {
        report += `   ↳ _"${m.personalCommitment}"_\n`;
      }
    });
    report += `\n🌟 *COMPROMISSOS MAIS ASSUMIDOS PELA EQUIPE:*\n`;
    sortedItems.slice(0, 5).forEach((item, idx) => {
      const count = commitmentCounts[item.id] || 0;
      const pct = members.length > 0 ? Math.round((count / members.length) * 100) : 0;
      report += `${idx + 1}. ${item.title} (${count} membros - ${pct}%)\n`;
    });
    report += `\n_Gerado pela Plataforma de Compromissos da Ágape_`;
    return report;
  };

  const handleCopyReport = async () => {
    try {
      await navigator.clipboard.writeText(generateWhatsAppReport());
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {}
  };

  const handleDownloadCSV = () => {
    let csv = '\uFEFF';
    csv += 'Nome,Ministério / Área,Compromissos Quantidade,Compromisso Pessoal,Data Confirmação\n';
    members.forEach((m) => {
      const personal = m.personalCommitment
        ? `"${m.personalCommitment.replace(/"/g, '""')}"`
        : '""';
      csv += `"${m.name}","${m.role}",${m.selectedItemIds.length},${personal},"${m.createdAt}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `agape-membros-compromissos-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleCreateItemSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemTitle.trim() || !newItemDesc.trim()) return;

    onAddNewItem({
      category: newItemCategory,
      title: newItemTitle.trim(),
      description: newItemDesc.trim(),
      tag: newItemTag.trim() || 'Equipe',
      iconName: 'Sparkles',
    });

    setNewItemTitle('');
    setNewItemDesc('');
    setNewItemTag('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto pb-16">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E5DAC6] pb-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#B8862E] font-semibold mb-0.5">
            <WheatIcon width={14} height={14} />
            <span>Gestão da Liderança</span>
          </div>
          <h1 className="text-xl sm:text-3xl font-bold text-[#2A2418] tracking-tight">
            Painel da <em className="italic text-[#B8862E] font-serif-church font-normal">Liderança</em>
          </h1>
        </div>

        {/* Ações de Exportação e Sair */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleCopyReport}
            className="inline-flex items-center gap-1 bg-[#FBF8F2] hover:bg-[#EFE5D4] text-[#2A2418] border border-[#D5C6B1] text-xs font-semibold px-2.5 py-1.5 rounded-xl transition-all cursor-pointer shadow-2xs active:scale-95"
          >
            <Copy className="w-3.5 h-3.5 text-[#B8862E]" />
            <span>{copied ? 'Copiado!' : 'Copiar Resumo'}</span>
          </button>

          <button
            onClick={handleDownloadCSV}
            className="inline-flex items-center gap-1 bg-[#62723A] hover:bg-[#52602F] text-white text-xs font-semibold px-2.5 py-1.5 rounded-xl transition-all cursor-pointer shadow-xs active:scale-95"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>CSV</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1 bg-[#B8862E] hover:bg-[#A37422] text-white text-xs font-semibold px-2.5 py-1.5 rounded-xl transition-all cursor-pointer shadow-xs active:scale-95"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>+ Novo Item</span>
          </button>

          <button
            onClick={() => onAuthenticate(false)}
            className="inline-flex items-center gap-1 text-[#8F7F6A] hover:text-red-700 text-xs font-medium px-2 py-1.5 rounded-xl transition-all cursor-pointer"
            title="Bloquear painel"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sair</span>
          </button>
        </div>
      </div>

      {/* Cards de Métricas Principais */}
      <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
        <div className="bg-[#FBF8F2] border border-[#E5DAC6] rounded-2xl p-3 sm:p-5 shadow-2xs text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-between text-[#8F7F6A]">
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
              Membros
            </span>
            <Users className="w-4 h-4 text-[#B8862E] hidden sm:block" />
          </div>
          <div className="mt-1 sm:mt-2 text-2xl sm:text-3xl font-bold text-[#2A2418]">
            {members.length}
          </div>
          <p className="text-[10px] text-[#7A6E5D] mt-0.5 hidden sm:block">Confirmados</p>
        </div>

        <div className="bg-[#FBF8F2] border border-[#E5DAC6] rounded-2xl p-3 sm:p-5 shadow-2xs text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-between text-[#8F7F6A]">
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
              Diretrizes
            </span>
            <CheckCircle className="w-4 h-4 text-[#62723A] hidden sm:block" />
          </div>
          <div className="mt-1 sm:mt-2 text-2xl sm:text-3xl font-bold text-[#2A2418]">
            {items.length}
          </div>
          <p className="text-[10px] text-[#7A6E5D] mt-0.5 hidden sm:block">Compromissos</p>
        </div>

        <div className="bg-[#FBF8F2] border border-[#E5DAC6] rounded-2xl p-3 sm:p-5 shadow-2xs text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-between text-[#8F7F6A]">
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
              Média
            </span>
            <TrendingUp className="w-4 h-4 text-[#E3912D] hidden sm:block" />
          </div>
          <div className="mt-1 sm:mt-2 text-2xl sm:text-3xl font-bold text-[#2A2418]">
            {members.length > 0
              ? (
                  members.reduce((acc, m) => acc + m.selectedItemIds.length, 0) /
                  members.length
                ).toFixed(1)
              : '0'}
          </div>
          <p className="text-[10px] text-[#7A6E5D] mt-0.5 hidden sm:block">Itens/membro</p>
        </div>
      </div>

      {/* Compromissos Mais Abraçados pela Equipe */}
      <div className="bg-[#FBF8F2] border border-[#E5DAC6] rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xs space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-[#2A2418] flex items-center gap-1.5">
          <SeedIcon size={16} className="text-[#62723A]" />
          <span>Compromissos Mais Assumidos</span>
        </h2>

        <div className="space-y-2.5">
          {sortedItems.slice(0, 5).map((item) => {
            const count = commitmentCounts[item.id] || 0;
            const pct =
              members.length > 0
                ? Math.round((count / members.length) * 100)
                : 0;

            return (
              <div key={item.id} className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-[#2A2418] font-semibold truncate max-w-[70%]">{item.title}</span>
                  <span className="text-[#8F7F6A]">
                    {count} ({pct}%)
                  </span>
                </div>
                <div className="w-full bg-[#EFE5D4] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#B8862E] h-full rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lista de Membros Cadastrados */}
      <div className="bg-[#FBF8F2] border border-[#E5DAC6] rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xs space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-[#2A2418] flex items-center gap-1.5">
          <Users className="w-4 h-4 sm:w-5 sm:h-5 text-[#B8862E]" />
          <span>Membros Cadastrados ({members.length})</span>
        </h2>

        {/* Visual em Cards no Celular */}
        <div className="block sm:hidden space-y-2.5">
          {members.map((m) => (
            <div
              key={m.id}
              className="p-3 bg-[#F6F1E8] border border-[#E0D5C1] rounded-xl space-y-1.5 text-xs"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="font-bold text-sm text-[#2A2418] block leading-tight">
                    {m.name}
                  </span>
                  <span className="text-[11px] text-[#62723A] font-medium">
                    {m.role}
                  </span>
                </div>
                {onDeleteMember && (
                  <button
                    onClick={() => onDeleteMember(m.id)}
                    className="text-red-500 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 text-[10px] text-[#7A6E5D]">
                <span className="bg-[#B8862E]/15 text-[#855D17] px-2 py-0.5 rounded-md font-semibold">
                  {m.selectedItemIds.length} compromissos
                </span>
                <span>{new Date(m.createdAt).toLocaleDateString('pt-BR')}</span>
              </div>

              {m.personalCommitment && (
                <p className="italic text-[#4A3A2C] text-[11px] bg-white/60 p-2 rounded-lg font-serif-church">
                  "{m.personalCommitment}"
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Tabela nos Tablets e Desktop */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#E5DAC6] text-[#8F7F6A] text-[11px] uppercase tracking-wider">
                <th className="pb-3 font-semibold">Nome</th>
                <th className="pb-3 font-semibold">Ministério / Área</th>
                <th className="pb-3 font-semibold">Total Assumido</th>
                <th className="pb-3 font-semibold">Compromisso Pessoal</th>
                <th className="pb-3 font-semibold">Data</th>
                {onDeleteMember && <th className="pb-3 font-semibold text-right">Ação</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFE5D4]">
              {members.map((m) => (
                <tr key={m.id} className="hover:bg-[#FAF4E6]/50">
                  <td className="py-3 font-semibold text-[#2A2418]">{m.name}</td>
                  <td className="py-3 text-[#5C503F]">{m.role}</td>
                  <td className="py-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-[#B8862E]/15 text-[#855D17]">
                      {m.selectedItemIds.length} itens
                    </span>
                  </td>
                  <td className="py-3 text-[#6B5F4E] max-w-xs truncate italic">
                    {m.personalCommitment || '—'}
                  </td>
                  <td className="py-3 text-[#8F7F6A] whitespace-nowrap text-xs">
                    {new Date(m.createdAt).toLocaleDateString('pt-BR')}
                  </td>
                  {onDeleteMember && (
                    <td className="py-3 text-right">
                      <button
                        onClick={() => onDeleteMember(m.id)}
                        className="text-red-500 hover:text-red-700 p-1 rounded-md transition-all cursor-pointer"
                        title="Remover registro"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal para Adicionar Novo Compromisso */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-[#FBF8F2] border border-[#E5DAC6] rounded-2xl sm:rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#EFE5D4] pb-2.5">
              <h3 className="font-bold text-base sm:text-lg text-[#2A2418]">
                Adicionar Novo Compromisso
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-[#8F7F6A] hover:text-[#2A2418] text-xl font-bold cursor-pointer p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateItemSubmit} className="space-y-3.5 text-xs sm:text-sm">
              <div>
                <label className="block text-xs uppercase font-semibold text-[#6B5F4E] mb-1">
                  Categoria
                </label>
                <select
                  value={newItemCategory}
                  onChange={(e) =>
                    setNewItemCategory(e.target.value as any)
                  }
                  className="w-full bg-[#F6F1E8] border border-[#D9CDB8] rounded-xl p-2.5 text-base sm:text-sm text-[#2A2418]"
                >
                  <option value="proposito">Propósito &amp; Visão</option>
                  <option value="identidade">Identidade &amp; Tom de Voz</option>
                  <option value="publico">Público &amp; Acolhimento</option>
                  <option value="equipe">Cultura do Reino &amp; Equipe</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-[#6B5F4E] mb-1">
                  Título do Compromisso
                </label>
                <input
                  type="text"
                  value={newItemTitle}
                  onChange={(e) => setNewItemTitle(e.target.value)}
                  placeholder="Ex: Chegar com 15 minutos de antecedência"
                  className="w-full bg-[#F6F1E8] border border-[#D9CDB8] rounded-xl p-2.5 text-base sm:text-sm text-[#2A2418]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-[#6B5F4E] mb-1">
                  Descrição Explicativa
                </label>
                <textarea
                  value={newItemDesc}
                  onChange={(e) => setNewItemDesc(e.target.value)}
                  placeholder="Ex: Garantir que todos os equipamentos estejam alinhados..."
                  rows={3}
                  className="w-full bg-[#F6F1E8] border border-[#D9CDB8] rounded-xl p-2.5 text-base sm:text-sm text-[#2A2418]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-[#6B5F4E] mb-1">
                  Tag Resumida
                </label>
                <input
                  type="text"
                  value={newItemTag}
                  onChange={(e) => setNewItemTag(e.target.value)}
                  placeholder="Ex: Pontualidade"
                  className="w-full bg-[#F6F1E8] border border-[#D9CDB8] rounded-xl p-2.5 text-base sm:text-sm text-[#2A2418]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2.5 border-t border-[#EFE5D4]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3.5 py-2 rounded-xl text-[#7A6E5D] hover:bg-[#EFE5D4] cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#B8862E] hover:bg-[#A37422] text-white font-bold cursor-pointer"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
