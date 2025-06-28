
import { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Plus, Clock, Users, Film } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const MovieCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events] = useState([
    {
      id: 1,
      date: new Date(2024, 11, 15),
      title: 'Oppenheimer',
      time: '8:00 PM',
      type: 'solo',
      participants: 1
    },
    {
      id: 2,
      date: new Date(2024, 11, 18),
      title: 'Barbie',
      time: '7:30 PM',
      type: 'party',
      participants: 4
    },
    {
      id: 3,
      date: new Date(2024, 11, 22),
      title: 'Dune: Part Two',
      time: '9:00 PM',
      type: 'date',
      participants: 2
    }
  ]);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getEventsForDate = (date: number) => {
    return events.filter(event => 
      event.date.getDate() === date && 
      event.date.getMonth() === currentDate.getMonth() &&
      event.date.getFullYear() === currentDate.getFullYear()
    );
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-white flex items-center">
            <Calendar className="w-8 h-8 mr-3 text-purple-400" />
            Movie Calendar
          </h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="w-4 h-4 mr-2" />
                Schedule Movie
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 text-white border-gray-700">
              <DialogHeader>
                <DialogTitle>Schedule a Movie</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input placeholder="Movie Title" className="bg-gray-800 border-gray-700" />
                <div className="grid grid-cols-2 gap-4">
                  <Input type="date" className="bg-gray-800 border-gray-700" />
                  <Input type="time" className="bg-gray-800 border-gray-700" />
                </div>
                <Textarea placeholder="Notes (optional)" className="bg-gray-800 border-gray-700" />
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Schedule Movie
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigateMonth('prev')}
                      className="border-gray-600 hover:bg-gray-700"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigateMonth('next')}
                      className="border-gray-600 hover:bg-gray-700"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {dayNames.map(day => (
                    <div key={day} className="text-center text-gray-400 font-medium py-2">
                      {day}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-7 gap-2">
                  {emptyDays.map((_, index) => (
                    <div key={`empty-${index}`} className="h-20"></div>
                  ))}
                  
                  {days.map(day => {
                    const dayEvents = getEventsForDate(day);
                    const isToday = 
                      day === new Date().getDate() &&
                      currentDate.getMonth() === new Date().getMonth() &&
                      currentDate.getFullYear() === new Date().getFullYear();

                    return (
                      <div
                        key={day}
                        className={`h-20 p-2 border border-gray-700 rounded-lg ${
                          isToday ? 'bg-purple-600/20 border-purple-500' : 'bg-gray-800/30'
                        }`}
                      >
                        <div className={`text-sm font-medium mb-1 ${
                          isToday ? 'text-purple-300' : 'text-white'
                        }`}>
                          {day}
                        </div>
                        
                        <div className="space-y-1">
                          {dayEvents.slice(0, 2).map(event => (
                            <div
                              key={event.id}
                              className={`text-xs p-1 rounded truncate ${
                                event.type === 'solo' ? 'bg-blue-600/50 text-blue-200' :
                                event.type === 'party' ? 'bg-green-600/50 text-green-200' :
                                'bg-pink-600/50 text-pink-200'
                              }`}
                            >
                              {event.title}
                            </div>
                          ))}
                          {dayEvents.length > 2 && (
                            <div className="text-xs text-gray-400">
                              +{dayEvents.length - 2} more
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Events */}
          <div className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Upcoming Movies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {events.map(event => (
                    <div key={event.id} className="p-4 bg-gray-700/50 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-white">{event.title}</h4>
                        <Badge variant={
                          event.type === 'solo' ? 'default' :
                          event.type === 'party' ? 'secondary' : 'outline'
                        }>
                          {event.type}
                        </Badge>
                      </div>
                      
                      <div className="space-y-1 text-sm text-gray-400">
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-2" />
                          {event.date.toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-2" />
                          {event.time}
                        </div>
                        <div className="flex items-center">
                          <Users className="w-3 h-3 mr-2" />
                          {event.participants} participant{event.participants > 1 ? 's' : ''}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">This Month</span>
                    <span className="text-white font-semibold">12 movies</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Watch Parties</span>
                    <span className="text-white font-semibold">3 scheduled</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Solo Watches</span>
                    <span className="text-white font-semibold">8 planned</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCalendar;
