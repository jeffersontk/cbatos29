import type {
  AuthAccessSnapshot,
  AvailableCellOption,
  CalendarEntry,
  CellConnection,
  CellGroup,
  CellRequest,
  DashboardMetric,
  EbdClass,
  EventItem,
  EventRegistration,
  FamilyMember,
  Member,
  MemberPortalSnapshot,
  MinistryInterest,
  MinistryOpportunity,
  PlatformModule,
  ServingAssignment,
  StoreOrder,
  StoreProduct,
} from "@/lib/platform/types";
import type { AppUserRole } from "@/lib/auth/session";

type MemberSnapshotOptions = {
  fallbackName?: string;
  fallbackEmail?: string;
  source?: "imported" | "signup";
};

export const churchProfile = {
  name: "CB Atos 29",
  subtitle: "Comunidade Batista",
  mission: "Uma igreja para viver o Evangelho todos os dias.",
  address: "Rua Prof. Carlos Boisson, 495, Campo Grande, RJ",
  sundayServices: ["10h45", "17h00", "19h30"],
  ebdSchedule: "Domingos as 9h30",
  streamLabel: "Cultos, materiais e comunicacao organizados em uma so plataforma.",
};

export const platformModules: PlatformModule[] = [
  {
    slug: "overview",
    title: "Visao geral",
    description: "Indicadores da plataforma, mapa dos modulos e prioridades tecnicas.",
    stage: "ativo",
    href: "/dashboard",
  },
  {
    slug: "members",
    title: "Membros",
    description: "Cadastro, importacao em CSV, cuidado pastoral e perfil familiar.",
    stage: "ativo",
    href: "/dashboard/members",
  },
  {
    slug: "ebd",
    title: "EBD",
    description: "Turmas, materiais, inscricoes, check-in e acompanhamento de frequencia.",
    stage: "ativo",
    href: "/dashboard/ebd",
  },
  {
    slug: "events",
    title: "Eventos",
    description: "Inscricoes gratuitas ou pagas, comprovacao e operacao no dia do evento.",
    stage: "ativo",
    href: "/dashboard/events",
  },
  {
    slug: "cells",
    title: "Celulas",
    description: "Mapa de celulas, vagas, familias conectadas e abertura de novas frentes.",
    stage: "ativo",
    href: "/dashboard/cells",
  },
  {
    slug: "calendar",
    title: "Calendario",
    description: "Agenda compartilhada da igreja com cultos, eventos e aniversariantes.",
    stage: "ativo",
    href: "/dashboard/calendar",
  },
  {
    slug: "store",
    title: "Loja",
    description: "Encomendas online com retirada presencial e acompanhamento do pedido.",
    stage: "planejado",
    href: "/dashboard/store",
  },
  {
    slug: "ministries",
    title: "Ministerios",
    description: "Interesses, escalas, integracao de voluntarios e acompanhamento dos lideres.",
    stage: "ativo",
    href: "/dashboard/ministries",
  },
  {
    slug: "finance",
    title: "Financeiro",
    description: "Modulo reservado para a proxima fase com cobrancas e conciliacao.",
    stage: "em-breve",
    href: "/dashboard/finance",
  },
];

export const members: Member[] = [
  {
    id: "m-001",
    name: "Maria Fernanda Silva",
    email: "maria.fernanda@cbatos29.local",
    phone: "(21) 99888-1045",
    neighborhood: "Campo Grande",
    status: "Ativo",
    journeyStep: "Membro integrado e servindo na recepcao",
    joinedAt: "Marco de 2024",
    ebdClass: "Fundamentos",
    cell: "Videira",
    ministries: ["Recepcao", "Intercessao"],
    birthday: "12 de abril",
  },
  {
    id: "m-002",
    name: "Lucas Andrade",
    email: "lucas.andrade@cbatos29.local",
    phone: "(21) 99776-5520",
    neighborhood: "Cosmos",
    status: "Em integracao",
    journeyStep: "Participando do percurso de integracao",
    joinedAt: "Janeiro de 2026",
    ebdClass: "Primeiros Passos",
    cell: "Cedro",
    ministries: ["Louvor"],
    birthday: "03 de setembro",
  },
  {
    id: "m-003",
    name: "Ana Paula Souza",
    email: "ana.paula@cbatos29.local",
    phone: "(21) 99654-8810",
    neighborhood: "Santissimo",
    status: "Ativo",
    journeyStep: "Professora auxiliar da EBD infantil",
    joinedAt: "Agosto de 2022",
    ebdClass: "Panorama Biblico",
    cell: "Oliveira",
    ministries: ["Kids", "EBD"],
    birthday: "27 de maio",
  },
  {
    id: "m-004",
    name: "Thiago Ribeiro",
    email: "thiago.ribeiro@cbatos29.local",
    phone: "(21) 99123-4400",
    neighborhood: "Senador Camara",
    status: "Em cuidado",
    journeyStep: "Acompanhamento pastoral e retorno gradual",
    joinedAt: "Novembro de 2021",
    ebdClass: "Telos",
    cell: "Figueira",
    ministries: ["Homens"],
    birthday: "09 de novembro",
  },
  {
    id: "m-005",
    name: "Beatriz Nascimento",
    email: "beatriz.nascimento@cbatos29.local",
    phone: "(21) 99432-2198",
    neighborhood: "Inhoaiba",
    status: "Ativo",
    journeyStep: "Lider em treinamento para nova celula",
    joinedAt: "Fevereiro de 2023",
    ebdClass: "Telos",
    cell: "Videira",
    ministries: ["Mulheres", "Celulas"],
    birthday: "18 de junho",
  },
];

export const ebdClasses: EbdClass[] = [
  {
    id: "ebd-001",
    name: "Fundamentos",
    audience: "Novos convertidos e novos membros",
    teacher: "Pr. Daniel Costa",
    schedule: "Domingo as 9h30",
    room: "Sala 01",
    enrolled: 28,
    capacity: 35,
    nextLesson: "20 de marco - Novo nascimento e vida em Cristo",
    attendanceRate: "91%",
    materials: ["Guia da turma em PDF", "Roteiro da aula 05", "Plano devocional da semana"],
  },
  {
    id: "ebd-002",
    name: "Primeiros Passos",
    audience: "Jovens e adultos em integracao",
    teacher: "Luciana Rocha",
    schedule: "Domingo as 9h30",
    room: "Sala 02",
    enrolled: 19,
    capacity: 25,
    nextLesson: "20 de marco - Vida devocional",
    attendanceRate: "88%",
    materials: ["Resumo da aula 04", "Checklist de integracao", "Podcast complementar"],
  },
  {
    id: "ebd-003",
    name: "Panorama Biblico",
    audience: "Membros e lideres",
    teacher: "Alexandre Lima",
    schedule: "Domingo as 9h30",
    room: "Auditorio 1",
    enrolled: 36,
    capacity: 45,
    nextLesson: "20 de marco - Profetas menores",
    attendanceRate: "84%",
    materials: ["Linha do tempo do AT", "Slides da aula", "Plano de leitura semanal"],
  },
  {
    id: "ebd-004",
    name: "Telos",
    audience: "Professores, lideres e membros maduros",
    teacher: "Adriana Moreira",
    schedule: "Segunda as 20h30",
    room: "Online",
    enrolled: 22,
    capacity: 30,
    nextLesson: "21 de marco - Igreja, missao e cultura",
    attendanceRate: "86%",
    materials: ["Caderno do modulo 02", "Bibliografia sugerida", "Gravacao da ultima aula"],
  },
];

export const events: EventItem[] = [
  {
    id: "evt-001",
    title: "Imersao de Lideranca",
    date: "05 de abril de 2026",
    time: "08h30",
    location: "Templo principal",
    audience: "Lideres, professores e coordenadores",
    priceLabel: "Gratuito",
    registrations: 54,
    capacity: 80,
    paymentStatus: "Gratuito",
  },
  {
    id: "evt-002",
    title: "Conferencia de Jovens",
    date: "18 de abril de 2026",
    time: "18h00",
    location: "Auditorio central",
    audience: "Adolescentes e jovens",
    priceLabel: "R$ 35,00",
    registrations: 128,
    capacity: 150,
    paymentStatus: "Pago",
  },
  {
    id: "evt-003",
    title: "Treinamento de Recepcao",
    date: "27 de abril de 2026",
    time: "19h30",
    location: "Sala multiuso",
    audience: "Voluntarios do acolhimento",
    priceLabel: "Gratuito",
    registrations: 22,
    capacity: 30,
    paymentStatus: "Gratuito",
  },
  {
    id: "evt-004",
    title: "Retiro da Familia",
    date: "16 de maio de 2026",
    time: "07h00",
    location: "Sitio Vale Verde",
    audience: "Familias e casais",
    priceLabel: "R$ 220,00",
    registrations: 63,
    capacity: 90,
    paymentStatus: "Pago",
  },
];

export const eventRegistrations: EventRegistration[] = [
  {
    id: "reg-001",
    eventTitle: "Conferencia de Jovens",
    memberName: "Lucas Andrade",
    status: "Confirmada",
    paymentStatus: "Pago",
    requestedAt: "15 de marco, 14h10",
    confirmationCode: "CJ-2026-0418-102",
  },
  {
    id: "reg-002",
    eventTitle: "Retiro da Familia",
    memberName: "Maria Fernanda Silva",
    status: "Pendente",
    paymentStatus: "Pendente",
    requestedAt: "15 de marco, 20h42",
  },
  {
    id: "reg-003",
    eventTitle: "Imersao de Lideranca",
    memberName: "Beatriz Nascimento",
    status: "Confirmada",
    paymentStatus: "Gratuito",
    requestedAt: "16 de marco, 09h22",
    confirmationCode: "IL-2026-0405-031",
  },
  {
    id: "reg-004",
    eventTitle: "Conferencia de Jovens",
    memberName: "Ana Paula Souza",
    status: "Lista de espera",
    paymentStatus: "Pendente",
    requestedAt: "16 de marco, 11h08",
  },
  {
    id: "reg-005",
    eventTitle: "Treinamento de Recepcao",
    memberName: "Maria Fernanda Silva",
    status: "Confirmada",
    paymentStatus: "Gratuito",
    requestedAt: "16 de marco, 18h15",
    confirmationCode: "TR-2026-0427-014",
  },
];

export const cells: CellGroup[] = [
  {
    id: "cell-001",
    name: "Videira",
    leaders: "Thiago e Jessica",
    neighborhood: "Campo Grande",
    schedule: "Terca as 20h30",
    members: 18,
    vacancies: 4,
    focus: "Familias jovens",
  },
  {
    id: "cell-002",
    name: "Oliveira",
    leaders: "Paulo e Maria",
    neighborhood: "Santissimo",
    schedule: "Quinta as 19h30",
    members: 14,
    vacancies: 6,
    focus: "Casais e integracao",
  },
  {
    id: "cell-003",
    name: "Figueira",
    leaders: "Carlos e Ana",
    neighborhood: "Cosmos",
    schedule: "Quarta as 20h00",
    members: 16,
    vacancies: 3,
    focus: "Jovens adultos",
  },
  {
    id: "cell-004",
    name: "Cedro",
    leaders: "Joao e Beatriz",
    neighborhood: "Senador Camara",
    schedule: "Sexta as 19h00",
    members: 12,
    vacancies: 8,
    focus: "Integracao e discipulado",
  },
];

export const cellRequests: CellRequest[] = [
  {
    id: "req-001",
    neighborhood: "Inhoaiba",
    interestedPeople: 9,
    potentialLeader: "Beatriz Nascimento",
    status: "Viavel para abrir no proximo trimestre",
  },
  {
    id: "req-002",
    neighborhood: "Paciencia",
    interestedPeople: 5,
    potentialLeader: "Em oracao",
    status: "Precisa consolidar lideranca",
  },
];

export const ministryOpportunities: MinistryOpportunity[] = [
  {
    id: "min-001",
    name: "Recepcao",
    description: "Primeiro acolhimento de visitantes e apoio no fluxo dos cultos.",
    coordinator: "Priscila Menezes",
    interestedCount: 12,
    openRoles: ["Primeiro acolhimento", "Boas-vindas", "Pos-culto"],
  },
  {
    id: "min-002",
    name: "Kids",
    description: "Ensino biblico, recreacao e acompanhamento de familias.",
    coordinator: "Ana Paula Souza",
    interestedCount: 8,
    openRoles: ["Auxiliar de sala", "Check-in infantil", "Apoio criativo"],
  },
  {
    id: "min-003",
    name: "Louvor",
    description: "Musica, multimidia e apoio tecnico nos cultos e eventos.",
    coordinator: "Rafael Nunes",
    interestedCount: 11,
    openRoles: ["Back vocal", "Midia", "Tecnica de som"],
  },
  {
    id: "min-004",
    name: "Celulas",
    description: "Apoio a expansao, treinamento de lideres e acompanhamento.",
    coordinator: "Beatriz Nascimento",
    interestedCount: 6,
    openRoles: ["Anfitriao", "Auxiliar de lideranca", "Acompanhamento"],
  },
];

export const ministryInterests: MinistryInterest[] = [
  {
    id: "int-001",
    memberName: "Lucas Andrade",
    ministry: "Louvor",
    availability: "Sabado a tarde e domingo cedo",
    status: "Em conversa",
  },
  {
    id: "int-002",
    memberName: "Maria Fernanda Silva",
    ministry: "Intercessao",
    availability: "Durante a semana apos 20h",
    status: "Integrado",
  },
  {
    id: "int-003",
    memberName: "Daniela Alves",
    ministry: "Kids",
    availability: "Domingo pela manha",
    status: "Novo interesse",
  },
];

export const calendarEntries: CalendarEntry[] = [
  {
    id: "cal-001",
    title: "Culto da manha",
    date: "22 de marco de 2026",
    time: "10h45",
    category: "Culto",
    details: "Celebracao dominical com recepcao de visitantes.",
  },
  {
    id: "cal-002",
    title: "EBD presencial",
    date: "22 de marco de 2026",
    time: "09h30",
    category: "EBD",
    details: "Todas as turmas funcionando simultaneamente.",
  },
  {
    id: "cal-003",
    title: "Aniversario de Maria Fernanda",
    date: "12 de abril de 2026",
    time: "00h00",
    category: "Aniversario",
    details: "Lembrete para intercessao e contato pastoral.",
  },
  {
    id: "cal-004",
    title: "Imersao de Lideranca",
    date: "05 de abril de 2026",
    time: "08h30",
    category: "Evento",
    details: "Treinamento com lideres, professores e coordenadores.",
  },
  {
    id: "cal-005",
    title: "Retirada dos pedidos da loja",
    date: "29 de marco de 2026",
    time: "17h15",
    category: "Retirada",
    details: "Entrega concentrada apos o segundo culto.",
  },
];

export const storeProducts: StoreProduct[] = [
  {
    id: "prd-001",
    name: "Camiseta Conferencia de Jovens",
    category: "Vestuario",
    price: "R$ 49,90",
    stock: 18,
    pickupWindow: "Cultos de domingo",
  },
  {
    id: "prd-002",
    name: "Devocional Atos 29",
    category: "Livros",
    price: "R$ 32,00",
    stock: 25,
    pickupWindow: "Secretaria durante a semana",
  },
  {
    id: "prd-003",
    name: "Caneca da igreja",
    category: "Presentes",
    price: "R$ 24,90",
    stock: 12,
    pickupWindow: "Apos os cultos",
  },
];

export const storeOrders: StoreOrder[] = [
  {
    id: "ord-001",
    memberName: "Maria Fernanda Silva",
    productName: "Devocional Atos 29",
    quantity: 1,
    status: "Pronto para retirada",
    pickupDate: "22 de marco",
  },
  {
    id: "ord-002",
    memberName: "Lucas Andrade",
    productName: "Camiseta Conferencia de Jovens",
    quantity: 2,
    status: "Separando",
    pickupDate: "29 de marco",
  },
  {
    id: "ord-003",
    memberName: "Ana Paula Souza",
    productName: "Caneca da igreja",
    quantity: 1,
    status: "Novo",
    pickupDate: "22 de marco",
  },
];

const familyMembersByMemberId: Record<string, FamilyMember[]> = {
  "m-001": [
    {
      id: "fam-001",
      name: "Eduardo Silva",
      relationship: "Esposo",
      birthday: "08 de agosto",
      phone: "(21) 99910-4412",
      status: "Ativo",
      linkedToCell: true,
    },
    {
      id: "fam-002",
      name: "Livia Silva",
      relationship: "Filha",
      birthday: "19 de fevereiro",
      phone: "(21) 99888-1045",
      status: "Em acompanhamento",
      linkedToCell: true,
    },
  ],
  "m-002": [
    {
      id: "fam-003",
      name: "Clara Andrade",
      relationship: "Irma",
      birthday: "25 de julho",
      phone: "(21) 99776-5520",
      status: "Em acompanhamento",
      linkedToCell: false,
    },
  ],
  "m-003": [
    {
      id: "fam-004",
      name: "Marcos Souza",
      relationship: "Esposo",
      birthday: "14 de dezembro",
      phone: "(21) 99654-8810",
      status: "Ativo",
      linkedToCell: true,
    },
  ],
};

const servingAssignmentsByMemberId: Record<string, ServingAssignment[]> = {
  "m-001": [
    {
      id: "srv-001",
      ministry: "Recepcao",
      role: "Primeiro acolhimento",
      date: "22 de marco de 2026",
      time: "17h00",
      leader: "Priscila Menezes",
      status: "Confirmado",
      notes: "Chegar 30 minutos antes para alinhar a equipe.",
    },
    {
      id: "srv-002",
      ministry: "Intercessao",
      role: "Plantao de apoio",
      date: "29 de marco de 2026",
      time: "18h30",
      leader: "Silvia Santos",
      status: "Pendente",
      notes: "Confirmar disponibilidade ate quinta-feira.",
    },
  ],
  "m-002": [
    {
      id: "srv-003",
      ministry: "Louvor",
      role: "Back vocal",
      date: "22 de marco de 2026",
      time: "19h30",
      leader: "Rafael Nunes",
      status: "Confirmado",
      notes: "Passagem de som as 18h15.",
    },
  ],
  "m-003": [
    {
      id: "srv-004",
      ministry: "Kids",
      role: "Apoio de sala",
      date: "22 de marco de 2026",
      time: "10h45",
      leader: "Ana Paula Souza",
      status: "Confirmado",
      notes: "Equipe escalada para a classe infantil de 7 a 9 anos.",
    },
  ],
};

const defaultAvailableCells: AvailableCellOption[] = cells.map((cell) => ({
  id: cell.id,
  name: cell.name,
  neighborhood: cell.neighborhood,
  leaders: cell.leaders,
  schedule: cell.schedule,
  memberCount: cell.members,
  vacancies: cell.vacancies,
  focus: cell.focus,
}));

const memberRolesByMemberId: Record<string, AppUserRole[]> = {
  "m-001": ["member_common", "ministry_subleader"],
  "m-002": ["member_common"],
  "m-003": ["member_common", "ministry_leader", "ebd_teacher"],
  "m-004": ["member_common", "cell_leader"],
  "m-005": ["member_common", "ministry_leader", "cell_leader", "ebd_teacher"],
};

export const dashboardMetrics: DashboardMetric[] = [
  {
    label: "Membros acompanhados",
    value: `${members.length}`,
    helper: "Base inicial organizada para cadastro, integracao e cuidado.",
  },
  {
    label: "Turmas da EBD",
    value: `${ebdClasses.length}`,
    helper: "Com inscricao, materiais e presenca no mesmo fluxo.",
  },
  {
    label: "Eventos em operacao",
    value: `${events.length}`,
    helper: "Inclui eventos gratuitos e pagos com comprovacao de inscricao.",
  },
  {
    label: "Escalas ativas",
    value: `${Object.values(servingAssignmentsByMemberId).flat().length}`,
    helper: "Voluntarios conectados com os lideres dos ministerios.",
  },
];

function buildAuthAccess(
  source: MemberSnapshotOptions["source"],
  hasImportedMember: boolean,
  availableRoles: AppUserRole[],
): AuthAccessSnapshot {
  if (source === "signup" && !hasImportedMember) {
    return {
      accountStatus: "Cadastro em analise",
      loginHint: "A secretaria pode validar sua conta e liberar todos os modulos depois da importacao.",
      canValidateExistingMember: true,
      availableRoles,
    };
  }

  return {
    accountStatus: "Conta validada",
    loginHint: "Use email e telefone cadastrados para entrar novamente.",
    canValidateExistingMember: true,
    availableRoles,
  };
}

function buildFallbackMember(memberId: string, options: MemberSnapshotOptions): Member {
  return {
    id: memberId,
    name: options.fallbackName ?? "Novo cadastro",
    email: options.fallbackEmail ?? "cadastro@cbatos29.local",
    phone: "A confirmar",
    neighborhood: "A definir",
    status: "Em integracao",
    journeyStep: "Cadastro enviado e aguardando validacao da igreja.",
    joinedAt: "Marco de 2026",
    ebdClass: "Primeiros Passos",
    cell: "Sem celula vinculada",
    ministries: [],
    birthday: "A informar",
  };
}

function buildCellConnection(member: Member, familyMembers: FamilyMember[]): CellConnection {
  const currentCell = cells.find((cell) => cell.name === member.cell);
  const linkedFamilyCount = familyMembers.filter((familyMember) => familyMember.linkedToCell).length;

  if (!currentCell) {
    return {
      id: "cell-pending",
      name: "Sem celula vinculada",
      leaders: "A definir",
      schedule: "Escolha uma celula disponivel",
      neighborhood: member.neighborhood,
      memberCount: 0,
      householdLinkedCount: linkedFamilyCount,
      requestStatus: "Escolha uma celula para solicitar seu vinculo.",
    };
  }

  return {
    id: currentCell.id,
    name: currentCell.name,
    leaders: currentCell.leaders,
    schedule: currentCell.schedule,
    neighborhood: currentCell.neighborhood,
    memberCount: currentCell.members,
    householdLinkedCount: linkedFamilyCount,
    requestStatus: linkedFamilyCount > 0 ? "Familia vinculada a mesma celula." : "Vinculo individual confirmado.",
  };
}

export function getCellCoverageSnapshot() {
  return cells.map((cell) => {
    const linkedMembers = members.filter((member) => member.cell === cell.name);
    const householdLinkedCount = linkedMembers.reduce((total, member) => {
      return (
        total +
        (familyMembersByMemberId[member.id]?.filter((familyMember) => familyMember.linkedToCell).length ?? 0)
      );
    }, 0);

    return {
      ...cell,
      linkedMembers: linkedMembers.length,
      householdLinkedCount,
      totalPeopleInCare: cell.members + householdLinkedCount,
    };
  });
}

export function getRolesForMember(memberId: string) {
  return memberRolesByMemberId[memberId] ?? ["member_common"];
}

export function getMemberSnapshot(
  memberId = members[0].id,
  options: MemberSnapshotOptions = {},
): MemberPortalSnapshot {
  const importedMember = members.find((member) => member.id === memberId);
  const profile = importedMember ?? buildFallbackMember(memberId, options);
  const currentClass = ebdClasses.find((ebdClass) => ebdClass.name === profile.ebdClass) ?? ebdClasses[1];
  const familyMembers = familyMembersByMemberId[profile.id] ?? [];
  const enrolledEvents = eventRegistrations.filter((registration) => registration.memberName === profile.name);
  const orders = storeOrders.filter((order) => order.memberName === profile.name);
  const servingAssignments = servingAssignmentsByMemberId[profile.id] ?? [];
  const cellConnection = buildCellConnection(profile, familyMembers);
  const availableRoles: AppUserRole[] = importedMember ? getRolesForMember(importedMember.id) : ["member_common"];
  const authAccess = buildAuthAccess(options.source, Boolean(importedMember), availableRoles);

  return {
    profile,
    currentClass,
    enrolledEvents,
    materials:
      options.source === "signup" && !importedMember
        ? ["Seu acesso aos materiais sera liberado apos a validacao do cadastro."]
        : currentClass.materials,
    suggestedMinistries: ministryOpportunities.filter((ministry) => !profile.ministries.includes(ministry.name)).slice(0, 3),
    attendanceCode:
      options.source === "signup" && !importedMember
        ? "LIBERADO-APOS-VALIDACAO"
        : `ATOS29-${profile.id.replace("m-", "").toUpperCase()}-2203`,
    nextCalendarItems: calendarEntries.slice(0, 4),
    orders,
    familyMembers,
    servingAssignments,
    cellConnection,
    availableCells: defaultAvailableCells,
    authAccess,
  };
}

export const memberPortalSnapshot: MemberPortalSnapshot = getMemberSnapshot();

export const roadmap = [
  {
    title: "Autenticacao real",
    description: "Trocar o acesso mock por credenciais persistidas, recuperacao de senha e papeis por usuario.",
  },
  {
    title: "Persistencia e auditoria",
    description: "Salvar membros, familia, escalas, vinculos de celula e historico de inscricoes em banco.",
  },
  {
    title: "Pagamentos e uploads",
    description: "Adicionar checkout para eventos e loja, alem de materiais da EBD em armazenamento real.",
  },
];

export function getDashboardSnapshot() {
  return {
    churchProfile,
    dashboardMetrics,
    platformModules,
    members,
    ebdClasses,
    events,
    eventRegistrations,
    cells,
    cellRequests,
    ministryOpportunities,
    ministryInterests,
    calendarEntries,
    storeProducts,
    storeOrders,
    roadmap,
    cellCoverage: getCellCoverageSnapshot(),
  };
}

export function getPublicSnapshot() {
  return {
    churchProfile,
    ebdClasses,
    events,
    cells,
    ministryOpportunities,
    calendarEntries,
    platformModules,
  };
}
