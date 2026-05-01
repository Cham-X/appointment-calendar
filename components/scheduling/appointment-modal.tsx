'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Appointment } from '@/lib/mock-data';
import { format } from 'date-fns';
import { Calendar, Clock, Mail, User, FileText } from 'lucide-react';

interface AppointmentModalProps {
  appointment: Appointment | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function AppointmentModal({ appointment, isOpen, onClose }: AppointmentModalProps) {
  if (!appointment) return null;

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

  const initials = appointment.clientName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-start justify-between gap-2">
            <DialogTitle className="text-xl">{appointment.title}</DialogTitle>
            <Badge className={getStatusColor(appointment.status)}>
              {appointment.status}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Description */}
          {appointment.description && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <FileText className="w-4 h-4" />
                Description
              </div>
              <p className="text-sm text-muted-foreground ml-6">{appointment.description}</p>
            </div>
          )}

          {/* Date & Time */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Calendar className="w-4 h-4" />
              Date & Time
            </div>
            <div className="ml-6 space-y-1 text-sm text-muted-foreground">
              <div>{format(appointment.start, 'EEEE, MMMM d, yyyy')}</div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {format(appointment.start, 'h:mm a')} - {format(appointment.end, 'h:mm a')}
              </div>
              <div className="text-xs">Duration: {appointment.duration} minutes</div>
            </div>
          </div>

          {/* Service */}
          <div className="space-y-2">
            <div className="text-sm font-semibold text-foreground">Service</div>
            <Badge variant="secondary" className="ml-6">
              {appointment.service}
            </Badge>
          </div>

          {/* Client Info */}
          <div className="space-y-3">
            <div className="text-sm font-semibold text-foreground">Client Information</div>
            <div className="ml-6 space-y-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">
                      {appointment.clientName}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {appointment.clientEmail}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Time Slot */}
          <div className="space-y-2">
            <div className="text-sm font-semibold text-foreground">Time Slot</div>
            <Badge variant="outline" className="ml-6">
              {appointment.timeSlot}
            </Badge>
          </div>
        </div>

        <DialogFooter className="mt-8">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button>Edit Appointment</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
