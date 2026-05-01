'use client';

import { useState } from 'react';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Appointment } from '@/lib/mock-data';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isSameDay } from 'date-fns';
import AppointmentModal from './appointment-modal';

interface CalendarViewProps {
  appointments: Appointment[];
  onAppointmentSelect: (appointment: Appointment) => void;
}

export default function CalendarView({ appointments, onAppointmentSelect }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 7, 1));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showModal, setShowModal] = useState(false);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getDaysInWeek = () => {
    const weeks: Date[][] = [];
    let week: Date[] = [];
    
    days.forEach((day, index) => {
      if (day.getDay() === 0 && week.length > 0) {
        weeks.push(week);
        week = [];
      }
      week.push(day);
    });
    
    if (week.length > 0) weeks.push(week);
    return weeks;
  };

  const getAppointmentsForDay = (date: Date) => {
    return appointments.filter(apt => isSameDay(apt.start, date));
  };

  const weeks = getDaysInWeek();
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-emerald-100 text-emerald-800';
      case 'pending':
        return 'bg-amber-100 text-amber-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={() => setCurrentDate(new Date())}
          >
            Today
          </Button>
          <Button
            variant="outline"
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
          >
            Next
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-7 gap-2 mb-4">
            {dayNames.map(day => (
              <div key={day} className="text-center font-semibold text-sm text-muted-foreground py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="space-y-2">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="grid grid-cols-7 gap-2">
                {week.map(day => {
                  const dayAppointments = getAppointmentsForDay(day);
                  const isCurrentDay = isToday(day);
                  const isSelected = selectedDate && isSameDay(day, selectedDate);
                  
                  return (
                    <button
                      key={day.toISOString()}
                      onClick={() => setSelectedDate(day)}
                      className={`min-h-24 p-2 rounded-lg border-2 transition-all ${
                        isCurrentDay
                          ? 'border-primary bg-primary/5'
                          : isSelected
                          ? 'border-primary bg-primary/10'
                          : 'border-transparent hover:border-primary/50'
                      } ${!isSameMonth(day, currentDate) ? 'opacity-40' : ''}`}
                    >
                      <div className="text-left">
                        <div className="font-semibold text-sm mb-1">{format(day, 'd')}</div>
                        <div className="space-y-1">
                          {dayAppointments.slice(0, 2).map(apt => (
                            <div
                              key={apt.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                onAppointmentSelect(apt);
                              }}
                              className="text-xs bg-primary/10 text-primary rounded px-1 py-0.5 truncate hover:bg-primary/20 cursor-pointer"
                            >
                              {apt.title}
                            </div>
                          ))}
                          {dayAppointments.length > 2 && (
                            <div className="text-xs text-muted-foreground">+{dayAppointments.length - 2} more</div>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedDate && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              {format(selectedDate, 'EEEE, MMMM d, yyyy')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {getAppointmentsForDay(selectedDate).length > 0 ? (
              <div className="space-y-3">
                {getAppointmentsForDay(selectedDate).map(apt => (
                  <div
                    key={apt.id}
                    onClick={() => onAppointmentSelect(apt)}
                    className="p-4 border rounded-lg hover:border-primary/50 cursor-pointer transition-all hover:shadow-md"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-foreground">{apt.title}</h3>
                        <p className="text-sm text-muted-foreground">{apt.description}</p>
                      </div>
                      <Badge className={getStatusColor(apt.status)}>
                        {apt.status}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {format(apt.start, 'h:mm a')} - {format(apt.end, 'h:mm a')}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {apt.clientName}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No appointments scheduled for this day.</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
