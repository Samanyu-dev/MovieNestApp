
import { useState } from 'react';
import { User, Settings, Heart, Clock, Star, Calendar, Trophy, Film } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ProfileSection = () => {
  const [user] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    joinDate: '2023-01-15',
    moviesWatched: 247,
    watchlistCount: 32,
    favoriteGenres: ['Action', 'Sci-Fi', 'Thriller'],
    recentActivity: [
      { type: 'watched', movie: 'Oppenheimer', date: '2 days ago' },
      { type: 'added', movie: 'Barbie', date: '3 days ago' },
      { type: 'rated', movie: 'The Flash', rating: 7.5, date: '1 week ago' },
    ]
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <Card className="bg-gray-800/50 border-gray-700 mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-32 h-32 rounded-full border-4 border-purple-500"
                />
                <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2">
                  <User className="w-4 h-4 text-white" />
                </div>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-white mb-2">{user.name}</h1>
                <p className="text-gray-400 mb-4">{user.email}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">{user.moviesWatched}</div>
                    <div className="text-sm text-gray-400">Movies Watched</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">{user.watchlistCount}</div>
                    <div className="text-sm text-gray-400">Watchlist</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">156</div>
                    <div className="text-sm text-gray-400">Reviews</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">23</div>
                    <div className="text-sm text-gray-400">Friends</div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {user.favoriteGenres.map((genre) => (
                    <Badge key={genre} className="bg-purple-600 text-white">
                      {genre}
                    </Badge>
                  ))}
                </div>
                
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Settings className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Tabs */}
        <Tabs defaultValue="activity" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800 border-gray-700">
            <TabsTrigger value="activity" className="text-white">Recent Activity</TabsTrigger>
            <TabsTrigger value="watchlist" className="text-white">Watchlist</TabsTrigger>
            <TabsTrigger value="favorites" className="text-white">Favorites</TabsTrigger>
            <TabsTrigger value="stats" className="text-white">Statistics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="activity" className="mt-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {user.recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 bg-gray-700/50 rounded-lg">
                      {activity.type === 'watched' && <Film className="w-5 h-5 text-green-400" />}
                      {activity.type === 'added' && <Heart className="w-5 h-5 text-red-400" />}
                      {activity.type === 'rated' && <Star className="w-5 h-5 text-yellow-400" />}
                      
                      <div className="flex-1">
                        <p className="text-white">
                          {activity.type === 'watched' && `Watched "${activity.movie}"`}
                          {activity.type === 'added' && `Added "${activity.movie}" to watchlist`}
                          {activity.type === 'rated' && `Rated "${activity.movie}" ${activity.rating}/10`}
                        </p>
                        <p className="text-gray-400 text-sm">{activity.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="watchlist" className="mt-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Your Watchlist ({user.watchlistCount} movies)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">Your saved movies will appear here...</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="favorites" className="mt-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Favorite Movies</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">Your favorite movies will appear here...</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="stats" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Movie Buff</span>
                      <Badge className="bg-yellow-600">Unlocked</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Genre Explorer</span>
                      <Badge className="bg-green-600">Unlocked</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Social Watcher</span>
                      <Badge variant="outline">Locked</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-blue-400" />
                    This Month
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Movies Watched</span>
                      <span className="text-white font-semibold">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Hours Watched</span>
                      <span className="text-white font-semibold">24h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Reviews Written</span>
                      <span className="text-white font-semibold">8</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfileSection;
