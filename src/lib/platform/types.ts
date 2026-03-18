export type ModuleStage = "ativo" | "planejado" | "em-breve";

export type MemberStatus = "Ativo" | "Em integracao" | "Em cuidado";
export type EventRegistrationStatus = "Confirmada" | "Pendente" | "Lista de espera";
export type PaymentStatus = "Pago" | "Pendente" | "Gratuito";
export type OrderStatus = "Novo" | "Separando" | "Pronto para retirada" | "Retirado";
export type MinistryInterestStatus = "Novo interesse" | "Em conversa" | "Integrado";
export type ServingStatus = "Confirmado" | "Pendente" | "Substituicao";
export type FamilyConnectionStatus = "Ativo" | "Em acompanhamento";

export interface PlatformModule {
  slug: string;
  title: string;
  description: string;
  stage: ModuleStage;
  href: string;
}

export interface DashboardMetric {
  label: string;
  value: string;
  helper: string;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  neighborhood: string;
  status: MemberStatus;
  journeyStep: string;
  joinedAt: string;
  ebdClass: string;
  cell: string;
  ministries: string[];
  birthday: string;
}

export interface EbdClass {
  id: string;
  name: string;
  audience: string;
  teacher: string;
  schedule: string;
  room: string;
  enrolled: number;
  capacity: number;
  nextLesson: string;
  attendanceRate: string;
  materials: string[];
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  audience: string;
  priceLabel: string;
  registrations: number;
  capacity: number;
  paymentStatus: PaymentStatus;
}

export interface EventRegistration {
  id: string;
  eventTitle: string;
  memberName: string;
  status: EventRegistrationStatus;
  paymentStatus: PaymentStatus;
  requestedAt: string;
  confirmationCode?: string;
}

export interface CellGroup {
  id: string;
  name: string;
  leaders: string;
  neighborhood: string;
  schedule: string;
  members: number;
  vacancies: number;
  focus: string;
}

export interface CellRequest {
  id: string;
  neighborhood: string;
  interestedPeople: number;
  potentialLeader: string;
  status: string;
}

export interface MinistryOpportunity {
  id: string;
  name: string;
  description: string;
  coordinator: string;
  interestedCount: number;
  openRoles: string[];
}

export interface MinistryInterest {
  id: string;
  memberName: string;
  ministry: string;
  availability: string;
  status: MinistryInterestStatus;
}

export interface CalendarEntry {
  id: string;
  title: string;
  date: string;
  time: string;
  category: "Culto" | "EBD" | "Evento" | "Aniversario" | "Retirada";
  details: string;
}

export interface StoreProduct {
  id: string;
  name: string;
  category: string;
  price: string;
  stock: number;
  pickupWindow: string;
}

export interface StoreOrder {
  id: string;
  memberName: string;
  productName: string;
  quantity: number;
  status: OrderStatus;
  pickupDate: string;
}

export interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  birthday: string;
  phone: string;
  status: FamilyConnectionStatus;
  linkedToCell: boolean;
}

export interface ServingAssignment {
  id: string;
  ministry: string;
  role: string;
  date: string;
  time: string;
  leader: string;
  status: ServingStatus;
  notes: string;
}

export interface CellConnection {
  id: string;
  name: string;
  leaders: string;
  schedule: string;
  neighborhood: string;
  memberCount: number;
  householdLinkedCount: number;
  requestStatus: string;
}

export interface AvailableCellOption {
  id: string;
  name: string;
  neighborhood: string;
  leaders: string;
  schedule: string;
  memberCount: number;
  vacancies: number;
  focus: string;
}

export interface AuthAccessSnapshot {
  accountStatus: string;
  loginHint: string;
  canValidateExistingMember: boolean;
  availableRoles: string[];
}

export interface MemberPortalSnapshot {
  profile: Member;
  currentClass: EbdClass;
  enrolledEvents: EventRegistration[];
  materials: string[];
  suggestedMinistries: MinistryOpportunity[];
  attendanceCode: string;
  nextCalendarItems: CalendarEntry[];
  orders: StoreOrder[];
  familyMembers: FamilyMember[];
  servingAssignments: ServingAssignment[];
  cellConnection: CellConnection;
  availableCells: AvailableCellOption[];
  authAccess: AuthAccessSnapshot;
}
