
import { useState } from 'react';
import { Users, UserPlus, Search, MessageCircle, Film, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const FriendsSection = () => {
  const [friends] = useState([
    {
      id: 1,
      name: 'Alice Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c75c?w=150&h=150&fit=crop&crop=face',
      isOnline: true,
      currentlyWatching: 'Oppenheimer',
      watchedTogether: 15,
      sharedGenres: ['Drama', 'Thriller']
    },
    {
      id: 2,
      name: 'Bob Smith',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      isOnline: false,
      lastSeen: '2 hours ago',
      watchedTogether: 23,
      sharedGenres: ['Action', 'Sci-Fi']
    },
    {
      id: 3,
      name: 'Carol Davis',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      isOnline: true,
      currentlyWatching: 'The Flash',
      watchedTogether: 8,
      sharedGenres: ['Comedy', 'Romance']
    }
  ]);

  const [friendRequests] = useState([
    {
      id: 4,
      name: 'David Wilson',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      mutualFriends: 3
    },
    {
      id: 5,
      name: 'Emma Brown',
      avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face',
      mutualFriends: 7
    }
  ]);

  const [watchParties] = useState([
    {
      id: 1,
      host: 'Alice Johnson',
      movie: 'Dune: Part Two',
      date: 'Tonight 8:00 PM',
      participants: 4,
      status: 'upcoming'
    },
    {
      id: 2,
      host: 'Bob Smith',
      movie: 'John Wick 4',
      date: 'Tomorrow 7:30 PM',
      participants: 6,
      status: 'upcoming'
    }
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-white flex items-center">
            <Users className="w-8 h-8 mr-3 text-purple-400" />
            Friends & Social
          </h1>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <UserPlus className="w-4 h-4 mr-2" />
            Find Friends
          </Button>
        </div>

        <Tabs defaultValue="friends" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800 border-gray-700">
            <TabsTrigger value="friends" className="text-white">My Friends</TabsTrigger>
            <TabsTrigger value="requests" className="text-white">Friend Requests</TabsTrigger>
            <TabsTrigger value="parties" className="text-white">Watch Parties</TabsTrigger>
            <TabsTrigger value="activity" className="text-white">Friend Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="friends" className="mt-6">
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search friends..."
                  className="pl-10 bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {friends.map((friend) => (
                <Card key={friend.id} className="bg-gray-800/50 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="relative">
                        <img
                          src={friend.avatar}
                          alt={friend.name}
                          className="w-12 h-12 rounded-full"
                        />
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-gray-800 ${
                          friend.isOnline ? 'bg-green-500' : 'bg-gray-500'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white">{friend.name}</h3>
                        <p className="text-sm text-gray-400">
                          {friend.isOnline 
                            ? friend.currentlyWatching 
                              ? `Watching ${friend.currentlyWatching}`
                              : 'Online'
                            : friend.lastSeen
                          }
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="text-sm text-gray-300">
                        <span className="font-medium">{friend.watchedTogether}</span> movies watched together
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {friend.sharedGenres.map((genre) => (
                          <Badge key={genre} variant="secondary" className="text-xs bg-purple-600/20 text-purple-300">
                            {genre}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <MessageCircle className="w-3 h-3 mr-1" />
                          Chat
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Film className="w-3 h-3 mr-1" />
                          Watch
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="requests" className="mt-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Friend Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {friendRequests.map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <img
                          src={request.avatar}
                          alt={request.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <h4 className="font-medium text-white">{request.name}</h4>
                          <p className="text-sm text-gray-400">{request.mutualFriends} mutual friends</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">Accept</Button>
                        <Button size="sm" variant="outline">Decline</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="parties" className="mt-6">
            <div className="space-y-6">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    Upcoming Watch Parties
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      <Calendar className="w-4 h-4 mr-2" />
                      Create Party
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {watchParties.map((party) => (
                      <div key={party.id} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                        <div>
                          <h4 className="font-medium text-white">{party.movie}</h4>
                          <p className="text-sm text-gray-400">Hosted by {party.host}</p>
                          <p className="text-sm text-gray-400">{party.date} • {party.participants} participants</p>
                        </div>
                        <Button variant="outline">Join Party</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="mt-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Recent Friend Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-gray-700/50 rounded-lg">
                    <img
                      src={friends[0].avatar}
                      alt={friends[0].name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <p className="text-white">
                        <span className="font-medium">{friends[0].name}</span> just finished watching "Oppenheimer"
                      </p>
                      <p className="text-gray-400 text-sm">2 minutes ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-4 bg-gray-700/50 rounded-lg">
                    <img
                      src={friends[1].avatar}
                      alt={friends[1].name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <p className="text-white">
                        <span className="font-medium">{friends[1].name}</span> added "Dune: Part Two" to their watchlist
                      </p>
                      <p className="text-gray-400 text-sm">1 hour ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FriendsSection;
