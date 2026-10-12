import { CommitmentItem, MemberCommitment } from '../types';

export const CATEGORIES_CONFIG = {
  proposito: {
    label: 'Propósito & Visão',
    subtitle: 'Quem somos e por que existimos',
    badgeColor: 'bg-[#B8862E]/15 text-[#8F6317] border-[#B8862E]/30',
    dotColor: '#B8862E',
  },
  identidade: {
    label: 'Identidade & Tom de Voz',
    subtitle: 'Nossa estética e o jeito que falamos',
    badgeColor: 'bg-[#62723A]/15 text-[#4D5A2C] border-[#62723A]/30',
    dotColor: '#62723A',
  },
  publico: {
    label: 'Público & Acolhimento',
    subtitle: 'Pensar na pessoa do outro lado da tela',
    badgeColor: 'bg-[#4A3A2C]/15 text-[#382C21] border-[#4A3A2C]/30',
    dotColor: '#4A3A2C',
  },
  equipe: {
    label: 'Cultura do Reino & Equipe',
    subtitle: 'Constância, honra e amor entre nós',
    badgeColor: 'bg-[#E3912D]/15 text-[#A66113] border-[#E3912D]/30',
    dotColor: '#E3912D',
  },
};

export const DEFAULT_COMMITMENT_ITEMS: CommitmentItem[] = [
  // Propósito
  {
    id: 'prop-1',
    category: 'proposito',
    title: 'Filtro do Propósito em Cada Publicação',
    description: 'Passar todo post e ideia pelo filtro: "Revelar Cristo alcançando vidas por meio do amor que acolhe & transforma".',
    tag: 'Propósito',
    iconName: 'Compass',
  },
  {
    id: 'prop-2',
    category: 'proposito',
    title: 'Postar com Cuidado é Cuidar de Gente',
    description: 'Enxergar o Instagram e as redes como a porta de entrada da igreja, acolhendo quem procura um recomeço em Campo Bom.',
    tag: 'Amar & Cuidar',
    iconName: 'HeartHandshake',
  },
  {
    id: 'prop-3',
    category: 'proposito',
    title: 'Cristocentrismo no Centro da Mensagem',
    description: 'Garantir que Jesus Cristo seja sempre o centro e a razão do que comunicamos, combatendo o antropocentrismo e a religiosidade.',
    tag: 'Cristocentrismo',
    iconName: 'Cross',
  },

  // Identidade
  {
    id: 'iden-1',
    category: 'identidade',
    title: 'Escrever com a Voz Genuína da Ágape',
    description: 'Criar legendas autênticas que contam histórias reais com nome e rosto, abandonando clichês genéricos e textos impessoais.',
    tag: 'Tom de Voz',
    iconName: 'MessageSquareText',
  },
  {
    id: 'iden-2',
    category: 'identidade',
    title: 'Valorizar Nossa Terra & Parábolas Bíblicas',
    description: 'Usar paisagens locais de Campo Bom, a estética do trigo, lavoura e rebanho, com a identidade visual acolhedora da igreja.',
    tag: 'Identidade Visual',
    iconName: 'Wheat',
  },
  {
    id: 'iden-3',
    category: 'identidade',
    title: 'Clareza em 3 Segundos no Celular',
    description: 'Manter cards limpos, sem excesso de fontes ou poluição visual, destacando dia, horário e o que a pessoa precisa saber.',
    tag: 'Excelência Visual',
    iconName: 'Sparkles',
  },

  // Público
  {
    id: 'pub-1',
    category: 'publico',
    title: 'Lembrar do João Miguel (Nossa Persona)',
    description: 'Antes de postar, perguntar: "Isso faria o João Miguel (18 a 29 anos) ou quem ainda não conhece a Ágape parar de rolar o feed?"',
    tag: 'Persona: João Miguel',
    iconName: 'Users',
  },
  {
    id: 'pub-2',
    category: 'publico',
    title: 'Hospitalidade nos Destaques e Direct',
    description: 'Acolher com amor quem chega pela internet através de uma bio clara e respostas rápidas e carinhosas.',
    tag: 'Porta da Frente',
    iconName: 'DoorOpen',
  },

  // Equipe
  {
    id: 'eq-1',
    category: 'equipe',
    title: 'Constância e Fidelidade nas Escalas',
    description: 'Cumprir as escalas da mídia com zelo e pontualidade, sabendo que nossa constância gera fruto para o Reino.',
    tag: 'Constância',
    iconName: 'CalendarCheck',
  },
  {
    id: 'eq-2',
    category: 'equipe',
    title: 'Cultura de Honra no Feedback',
    description: 'Ao avaliar artes ou vídeos de um irmão, começar sempre pelo que ficou bom e sugerir melhorias com espírito de amor e paz.',
    tag: 'Cultura de Honra',
    iconName: 'ShieldCheck',
  },
  {
    id: 'eq-3',
    category: 'equipe',
    title: 'Orar pelas Vidas que Serão Tocadas',
    description: 'Interceder pelas vidas que serão alcançadas por cada foto, reels, culto ao vivo ou projeto que a equipe publicar.',
    tag: 'Oração',
    iconName: 'Flame',
  },
];

export const INITIAL_MEMBERS: MemberCommitment[] = [
  {
    id: 'mem-1',
    name: 'Pr. Joni',
    role: 'Liderança Pastoral',
    selectedItemIds: ['prop-1', 'prop-2', 'prop-3', 'iden-1', 'iden-2', 'eq-2', 'eq-3'],
    personalCommitment: 'Zelar para que cada mensagem aponte exclusivamente para Cristo e inspire nossa juventude.',
    createdAt: '2026-10-10T14:30:00Z',
  },
  {
    id: 'mem-2',
    name: 'Lucas Ferreira',
    role: 'Vídeo & Reels',
    selectedItemIds: ['prop-1', 'iden-1', 'iden-3', 'pub-1', 'eq-1'],
    personalCommitment: 'Captar histórias autênticas da nossa congregação e gravar nas ruas de Campo Bom.',
    createdAt: '2026-10-11T10:15:00Z',
  },
  {
    id: 'mem-3',
    name: 'Júlia Mendes',
    role: 'Design Gráfico',
    selectedItemIds: ['iden-2', 'iden-3', 'pub-1', 'eq-2', 'eq-3'],
    personalCommitment: 'Manter a paleta de cores acolhedora e nunca mais usar mais de 2 fontes no mesmo card!',
    createdAt: '2026-10-11T16:40:00Z',
  },
  {
    id: 'mem-4',
    name: 'Fernando Rocha',
    role: 'Fotografia & Stories',
    selectedItemIds: ['prop-2', 'iden-1', 'pub-2', 'eq-1'],
    personalCommitment: 'Registrar os abraços e o acolhimento do culto com o olhar de quem cuida de almas.',
    createdAt: '2026-10-12T08:20:00Z',
  },
];
