import React from 'react';
import { AgapeLogo } from './ChurchSymbols';
import { Share2, CheckCircle2, Lock } from 'lucide-react';

interface HeaderProps {
  currentTab: 'form' | 'leader';
  onTabChange: (tab: 'form' | 'leader') => void;
  totalConfirmed: number;
  onOpenShareModal: () => void;
  isLeaderAuthenticated: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  totalConfirmed,
  onOpenShareModal,
  isLeaderAuthenticated,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#F6F1E8]/95 backdrop-blur-md border-b border-[#E4D9C5] shadow-2xs pt-[env(safe-area-inset-top)]">
      <div className="max-w-2xl mx-auto px-3.5 sm:px-6 h-16 sm:h-18 flex items-center justify-between gap-2">
        {/* Logo Ágape */}
        <button
          onClick={() => onTabChange('form')}
          className="flex items-center text-left focus:outline-hidden cursor-pointer shrink-0"
        >
          <AgapeLogo subtitle={true} className="scale-90 sm:scale-100 origin-left" />
        </button>

        {/* Abas: Meu Compromisso e Liderança */}
        <nav className="flex items-center bg-[#EBE2D3]/80 p-0.5 sm:p-1 rounded-full border border-[#DFD3BE] text-xs font-medium shrink-0">
          <button
            onClick={() => onTabChange('form')}
            className={`px-2.5 sm:px-3.5 py-1 rounded-full transition-all flex items-center gap-1 cursor-pointer ${
              currentTab === 'form'
                ? 'bg-[#FBF8F2] text-[#2A2418] shadow-xs font-semibold'
                : 'text-[#6D6352] hover:text-[#2A2418]'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-[#B8862E]" />
            <span className="text-[11px] sm:text-xs">Compromisso</span>
          </button>

          <button
            onClick={() => onTabChange('leader')}
            className={`px-2.5 sm:px-3 py-1 rounded-full transition-all flex items-center gap-1 cursor-pointer ${
              currentTab === 'leader'
                ? 'bg-[#FBF8F2] text-[#2A2418] shadow-xs font-semibold'
                : 'text-[#6D6352] hover:text-[#2A2418]'
            }`}
          >
            <Lock className={`w-3 h-3 ${isLeaderAuthenticated ? 'text-[#62723A]' : 'text-[#8F7F6A]'}`} />
            <span className="text-[11px] sm:text-xs">Liderança</span>
            {isLeaderAuthenticated && (
              <span className="bg-[#B8862E]/20 text-[#855D17] text-[9px] font-bold px-1 rounded-full">
                {totalConfirmed}
              </span>
            )}
          </button>
        </nav>

        {/* Botão Enviar aos Membros */}
        <div className="flex items-center shrink-0">
          <button
            onClick={onOpenShareModal}
            className="inline-flex items-center gap-1 bg-[#B8862E] hover:bg-[#A37422] text-[#FBF8F2] text-xs font-semibold px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full transition-all shadow-xs cursor-pointer active:scale-95"
            title="Enviar este link para os membros pelo WhatsApp"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Enviar Link</span>
            <span className="sm:hidden text-[11px]">Enviar</span>
          </button>
        </div>
      </div>
    </header>
  );
};
