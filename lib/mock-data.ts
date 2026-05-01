export interface Appointment {
  id: string;
  title: string;
  description: string;
  start: Date;
  end: Date;
  service: string;
  clientName: string;
  clientEmail: string;
  clientAvatar?: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  timeSlot: 'Morning' | 'Afternoon' | 'Evening';
  duration: number; // in minutes
}

export interface TimeSlot {
  id: string;
  period: 'Morning' | 'Afternoon' | 'Evening';
  startTime: string;
  endTime: string;
  available: boolean;
  appointments: number;
}

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    title: 'Frontend Development',
    description: 'Gathering Frontend Developer Resources',
    start: new Date(2026, 7, 12, 10, 0),
    end: new Date(2026, 7, 12, 11, 0),
    service: 'Tutoring',
    clientName: 'Stephanie Coben',
    clientEmail: 'stephanie@example.com',
    status: 'confirmed',
    timeSlot: 'Morning',
    duration: 60,
  },
  {
    id: '2',
    title: 'UI/UX Design Session',
    description: 'Design system discussion',
    start: new Date(2026, 7, 12, 14, 0),
    end: new Date(2026, 7, 12, 15, 30),
    service: 'Design Consultation',
    clientName: 'Maya Herrera',
    clientEmail: 'maya@example.com',
    status: 'confirmed',
    timeSlot: 'Afternoon',
    duration: 90,
  },
  {
    id: '3',
    title: 'React Workshop',
    description: 'Advanced React patterns',
    start: new Date(2026, 7, 13, 9, 0),
    end: new Date(2026, 7, 13, 11, 0),
    service: 'Workshop',
    clientName: 'David Lee',
    clientEmail: 'david@example.com',
    status: 'pending',
    timeSlot: 'Morning',
    duration: 120,
  },
  {
    id: '4',
    title: 'Client Presentation',
    description: 'Project proposal presentation',
    start: new Date(2026, 7, 13, 16, 0),
    end: new Date(2026, 7, 13, 17, 0),
    service: 'Presentation',
    clientName: 'Sarah Johnson',
    clientEmail: 'sarah@example.com',
    status: 'confirmed',
    timeSlot: 'Evening',
    duration: 60,
  },
  {
    id: '5',
    title: 'Mentoring Session',
    description: '1-on-1 career guidance',
    start: new Date(2026, 7, 14, 11, 30),
    end: new Date(2026, 7, 14, 12, 30),
    service: 'Mentoring',
    clientName: 'Alex Martinez',
    clientEmail: 'alex@example.com',
    status: 'confirmed',
    timeSlot: 'Morning',
    duration: 60,
  },
  {
    id: '6',
    title: 'Portfolio Review',
    description: 'Portfolio feedback and suggestions',
    start: new Date(2026, 7, 14, 15, 0),
    end: new Date(2026, 7, 14, 16, 0),
    service: 'Review',
    clientName: 'Jordan Smith',
    clientEmail: 'jordan@example.com',
    status: 'confirmed',
    timeSlot: 'Afternoon',
    duration: 60,
  },
];

export const timeSlots: TimeSlot[] = [
  {
    id: 'morning',
    period: 'Morning',
    startTime: '7:00 AM',
    endTime: '12:00 PM',
    available: true,
    appointments: 2,
  },
  {
    id: 'afternoon',
    period: 'Afternoon',
    startTime: '12:00 PM',
    endTime: '5:00 PM',
    available: true,
    appointments: 1,
  },
  {
    id: 'evening',
    period: 'Evening',
    startTime: '5:00 PM',
    endTime: '9:00 PM',
    available: true,
    appointments: 1,
  },
];

export const services = [
  'Tutoring',
  'Mentoring',
  'Design Consultation',
  'Workshop',
  'Presentation',
  'Review',
  'Consultation',
  'Training',
];
