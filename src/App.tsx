/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { MemberCommitment, CommitmentItem } from './types';
import {
  DEFAULT_COMMITMENT_ITEMS,
  INITIAL_MEMBERS,
} from './data/initialData';
import { Header } from './components/Header';
import { CommitmentForm } from './components/CommitmentForm';
import { CommitmentCard } from './components/CommitmentCard';
import { LeaderDashboard } from './components/LeaderDashboard';
import { ShareModal } from './components/ShareModal';
import {
  HillsVector,
  AgapeLogo,
} from './components/ChurchSymbols';

const STORAGE_KEY_MEMBERS = 'agape_members_commitments_v1';
const STORAGE_KEY_ITEMS = 'agape_commitment_items_v1';
const STORAGE_KEY_MY_COMMITMENT = 'agape_my_active_commitment_v1';
const STORAGE_KEY_LEADER_AUTH = 'agape_leader_auth_v1';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'form' | 'leader'>('form');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Autenticação da liderança (senha: midiaagape2027)
  const [isLeaderAuthenticated, setIsLeaderAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEY_LEADER_AUTH) === 'true';
    } catch {
      return false;
    }
  });

  const handleLeaderAuthChange = (status: boolean) => {
    setIsLeaderAuthenticated(status);
    try {
      if (status) {
        sessionStorage.setItem(STORAGE_KEY_LEADER_AUTH, 'true');
      } else {
        sessionStorage.removeItem(STORAGE_KEY_LEADER_AUTH);
      }
    } catch {}
  };

  // Carregar dados persistidos no LocalStorage
  const [members, setMembers] = useState<MemberCommitment[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_MEMBERS);
      return saved ? JSON.parse(saved) : INITIAL_MEMBERS;
    } catch {
      return INITIAL_MEMBERS;
    }
  });

  const [items, setItems] = useState<CommitmentItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ITEMS);
      return saved ? JSON.parse(saved) : DEFAULT_COMMITMENT_ITEMS;
    } catch {
      return DEFAULT_COMMITMENT_ITEMS;
    }
  });

  // Compromisso ativo do usuário atual (se ele acabou de confirmar)
  const [activeCommitment, setActiveCommitment] = useState<MemberCommitment | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_MY_COMMITMENT);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Salvar alterações
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_MEMBERS, JSON.stringify(members));
    } catch {}
  }, [members]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ITEMS, JSON.stringify(items));
    } catch {}
  }, [items]);

  useEffect(() => {
    try {
      if (activeCommitment) {
        localStorage.setItem(STORAGE_KEY_MY_COMMITMENT, JSON.stringify(activeCommitment));
      }
    } catch {}
  }, [activeCommitment]);

  // Efeito de celebração com sementes e trigo
  const triggerCelebration = () => {
    const cols = ['#D9A441', '#62723A', '#E3912D', '#8A9A5B'];
    for (let i = 0; i < 28; i++) {
      const leaf = document.createElement('div');
      leaf.style.position = 'fixed';
      leaf.style.width = '12px';
      leaf.style.height = '18px';
      leaf.style.borderRadius = '50% 50% 50% 50% / 70% 70% 30% 30%';
      leaf.style.backgroundColor = cols[i % cols.length];
      leaf.style.left = `${window.innerWidth / 2 + (Math.random() - 0.5) * 200}px`;
      leaf.style.top = `${window.innerHeight / 2 - 100}px`;
      leaf.style.zIndex = '9999';
      leaf.style.pointerEvents = 'none';
      document.body.appendChild(leaf);

      const dx = (Math.random() - 0.5) * 400;
      const dy = -100 - Math.random() * 260;
      const rot = Math.random() * 720;

      leaf.animate(
        [
          { transform: 'translate(0, 0) rotate(0deg) scale(0.6)', opacity: 1 },
          { transform: `translate(${dx}px, ${dy}px) rotate(${rot}deg) scale(1.1)`, opacity: 0.9, offset: 0.5 },
          { transform: `translate(${dx * 1.3}px, ${dy + 260}px) rotate(${rot * 1.5}deg) scale(0.8)`, opacity: 0 }
        ],
        {
          duration: 1600 + Math.random() * 600,
          easing: 'cubic-bezier(0.2, 0.7, 0.3, 1)',
        }
      ).onfinish = () => leaf.remove();
    }
  };

  // Submissão do formulário do membro
  const handleCommitmentSubmit = (
    commitmentData: Omit<MemberCommitment, 'id' | 'createdAt'>
  ) => {
    const newMember: MemberCommitment = {
      ...commitmentData,
      id: `mem-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    setMembers((prev) => [newMember, ...prev]);
    setActiveCommitment(newMember);
    triggerCelebration();

    // Rola suavemente para o topo para ver o certificado
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Adicionar novo item pela liderança
  const handleAddNewItem = (newItemData: Omit<CommitmentItem, 'id'>) => {
    const newItem: CommitmentItem = {
      ...newItemData,
      id: `item-${Date.now()}`,
    };
    setItems((prev) => [...prev, newItem]);
  };

  // Remover registro (líder)
  const handleDeleteMember = (id: string) => {
    if (confirm('Deseja realmente remover este registro de compromisso?')) {
      setMembers((prev) => prev.filter((m) => m.id !== id));
      if (activeCommitment?.id === id) {
        setActiveCommitment(null);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F1E8] text-[#2A2418]">
      {/* Header Superior com Navegação e Compartilhar */}
      <Header
        currentTab={currentTab}
        onTabChange={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        totalConfirmed={members.length}
        onOpenShareModal={() => setIsShareModalOpen(true)}
        isLeaderAuthenticated={isLeaderAuthenticated}
      />

      {/* Conteúdo Principal */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {currentTab === 'form' && (
          <div>
            {activeCommitment ? (
              <CommitmentCard
                commitment={activeCommitment}
                allItems={items}
                onNewCommitment={() => {
                  setActiveCommitment(null);
                  try {
                    localStorage.removeItem(STORAGE_KEY_MY_COMMITMENT);
                  } catch {}
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onEdit={() => {
                  setActiveCommitment(null);
                }}
              />
            ) : (
              <CommitmentForm
                items={items}
                onSubmit={handleCommitmentSubmit}
              />
            )}
          </div>
        )}

        {currentTab === 'leader' && (
          <LeaderDashboard
            members={members}
            items={items}
            onAddNewItem={handleAddNewItem}
            onDeleteMember={handleDeleteMember}
            isAuthenticated={isLeaderAuthenticated}
            onAuthenticate={handleLeaderAuthChange}
          />
        )}
      </main>

      {/* Ilustração das Colinas Pastorais da Ágape no Rodapé */}
      <div className="relative mt-auto">
        <HillsVector />

        <footer className="bg-[#AAB57A]/30 border-t border-[#AAB57A]/40 py-8 px-4 sm:px-6 text-center text-xs sm:text-sm text-[#463D31] space-y-3">
          <div className="flex items-center justify-center gap-2">
            <AgapeLogo subtitle={false} />
          </div>

          <p className="italic text-[#4A4033] max-w-md mx-auto font-serif-church">
            “Regozijem-se os campos e tudo o que neles há!” — Salmos 96:12
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-[#635745] pt-1">
            <span>Igreja Ágape · Campo Bom / RS</span>
            <span>•</span>
            <span>Ministério de Mídia &amp; Comunicação</span>
            <span>•</span>
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="text-[#B8862E] hover:underline font-semibold cursor-pointer"
            >
              Compartilhar no WhatsApp
            </button>
          </div>
        </footer>
      </div>

      {/* Modal para Compartilhar com a Equipe */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />
    </div>
  );
}
