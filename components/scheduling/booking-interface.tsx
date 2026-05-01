'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { services } from '@/lib/mock-data';
import { Clock, Calendar, Check } from 'lucide-react';

interface TimeSlotOption {
  id: string;
  period: 'Morning' | 'Afternoon' | 'Evening';
  startTime: string;
  endTime: string;
  available: boolean;
  count: number;
}

export default function BookingInterface() {
  const [selectedService, setSelectedService] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [selectedDuration, setSelectedDuration] = useState<string>('60');
  const [bookingStep, setBookingStep] = useState(1);
  const [isBooked, setIsBooked] = useState(false);

  const timeSlots: TimeSlotOption[] = [
    {
      id: 'morning',
      period: 'Morning',
      startTime: '7:00 AM',
      endTime: '12:00 PM',
      available: true,
      count: 2,
    },
    {
      id: 'afternoon',
      period: 'Afternoon',
      startTime: '12:00 PM',
      endTime: '5:00 PM',
      available: true,
      count: 1,
    },
    {
      id: 'evening',
      period: 'Evening',
      startTime: '5:00 PM',
      endTime: '9:00 PM',
      available: true,
      count: 1,
    },
  ];

  const getDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const handleBooking = () => {
    setIsBooked(true);
    setTimeout(() => {
      setIsBooked(false);
      setBookingStep(1);
      setSelectedService('');
      setSelectedDate('');
      setSelectedTimeSlot('');
    }, 2000);
  };

  if (isBooked) {
    return (
      <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 border-emerald-200">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="rounded-full bg-emerald-100 p-3 mb-4">
            <Check className="w-8 h-8 text-emerald-600" />
          </div>
          <h3 className="text-2xl font-bold text-emerald-900 mb-2">Booking Confirmed!</h3>
          <p className="text-emerald-700 text-center">
            Your appointment has been successfully scheduled. A confirmation email will be sent shortly.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Book an Appointment</CardTitle>
        <div className="flex gap-2 mt-4">
          {[1, 2, 3].map(step => (
            <div
              key={step}
              className={`flex-1 h-1 rounded-full transition-all ${
                step <= bookingStep ? 'bg-primary' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Step 1: Select Service */}
        {bookingStep >= 1 && (
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">Select Service</label>
            <Select value={selectedService} onValueChange={setSelectedService}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a service..." />
              </SelectTrigger>
              <SelectContent>
                {services.map(service => (
                  <SelectItem key={service} value={service}>
                    {service}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {selectedService && bookingStep >= 1 && (
          <>
            <Separator />
            {/* Step 2: Select Date */}
            {bookingStep >= 2 && (
              <div className="space-y-3">
                <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Select Date
                </label>
                <Select value={selectedDate} onValueChange={setSelectedDate}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a date..." />
                  </SelectTrigger>
                  <SelectContent>
                    {getDates().map(date => {
                      const dateStr = date.toISOString().split('T')[0];
                      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
                      const day = date.getDate();
                      const month = date.toLocaleDateString('en-US', { month: 'short' });
                      return (
                        <SelectItem key={dateStr} value={dateStr}>
                          {dayName}, {month} {day}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
            )}

            {selectedDate && bookingStep >= 2 && (
              <>
                <Separator />
                {/* Step 3: Select Time Slot & Duration */}
                {bookingStep >= 3 && (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-semibold text-foreground flex items-center gap-2 mb-3">
                        <Clock className="w-4 h-4" />
                        Select Time Slot
                      </label>
                      <div className="grid gap-3">
                        {timeSlots.map(slot => (
                          <button
                            key={slot.id}
                            onClick={() => setSelectedTimeSlot(slot.id)}
                            className={`p-4 rounded-lg border-2 transition-all text-left ${
                              selectedTimeSlot === slot.id
                                ? 'border-primary bg-primary/5'
                                : 'border-gray-200 hover:border-primary/50'
                            } ${!slot.available ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                            disabled={!slot.available}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-foreground">{slot.period}</h4>
                              <Badge variant={slot.available ? 'secondary' : 'destructive'}>
                                {slot.available ? `${slot.count} available` : 'Full'}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {slot.startTime} - {slot.endTime}
                            </p>
                          </button>
                        ))}
                      </div>
                    </div>

                    {selectedTimeSlot && (
                      <div>
                        <label className="text-sm font-semibold text-foreground mb-3 block">
                          Session Duration
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {['30', '60', '90'].map(duration => (
                            <button
                              key={duration}
                              onClick={() => setSelectedDuration(duration)}
                              className={`py-2 px-3 rounded-lg border-2 transition-all font-medium ${
                                selectedDuration === duration
                                  ? 'border-primary bg-primary/10 text-primary'
                                  : 'border-gray-200 text-foreground hover:border-primary/50'
                              }`}
                            >
                              {duration}m
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-3 mt-8">
          {bookingStep > 1 && (
            <Button variant="outline" onClick={() => setBookingStep(bookingStep - 1)}>
              Back
            </Button>
          )}
          {bookingStep < 3 ? (
            <Button
              className="ml-auto"
              disabled={
                (bookingStep === 1 && !selectedService) ||
                (bookingStep === 2 && !selectedDate)
              }
              onClick={() => setBookingStep(bookingStep + 1)}
            >
              Next
            </Button>
          ) : (
            <Button className="ml-auto" disabled={!selectedTimeSlot} onClick={handleBooking}>
              Confirm Booking
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
