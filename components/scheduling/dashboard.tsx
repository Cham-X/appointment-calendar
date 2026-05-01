'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockAppointments, Appointment } from '@/lib/mock-data';
import CalendarView from './calendar-view';
import AppointmentsList from './appointments-list';
import BookingInterface from './booking-interface';
import AppointmentModal from './appointment-modal';
import { Calendar, Clock, Plus } from 'lucide-react';

export default function SchedulingDashboard() {
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('calendar');

  const handleAppointmentSelect = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAppointment(null);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Scheduling Hub</h1>
          <p className="text-muted-foreground">
            Manage your appointments and schedule new sessions efficiently.
          </p>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Calendar
            </TabsTrigger>
            <TabsTrigger value="appointments" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Appointments
            </TabsTrigger>
            <TabsTrigger value="booking" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Book Session
            </TabsTrigger>
          </TabsList>

          {/* Calendar Tab */}
          <TabsContent value="calendar" className="space-y-6">
            <CalendarView 
              appointments={mockAppointments}
              onAppointmentSelect={handleAppointmentSelect}
            />
          </TabsContent>

          {/* Appointments Tab */}
          <TabsContent value="appointments" className="space-y-6">
            <AppointmentsList 
              appointments={mockAppointments}
              onAppointmentSelect={handleAppointmentSelect}
            />
          </TabsContent>

          {/* Booking Tab */}
          <TabsContent value="booking" className="space-y-6">
            <BookingInterface />
          </TabsContent>
        </Tabs>
      </div>

      {/* Appointment Details Modal */}
      <AppointmentModal 
        appointment={selectedAppointment}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
