
import { useState } from 'react';
import { MessageSquare, Plus, ThumbsUp, ThumbsDown, Reply, Search, Filter, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const DiscussionForums = () => {
  const [discussions] = useState([
    {
      id: 1,
      title: 'Oppenheimer: A Masterpiece of Historical Storytelling',
      movie: 'Oppenheimer',
      author: 'MovieBuff2023',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face',
      content: 'Christopher Nolan has outdone himself with this biographical thriller. The cinematography, acting, and soundtrack create an unforgettable experience...',
      timestamp: '2 hours ago',
      likes: 24,
      dislikes: 2,
      replies: 8,
      rating: 9.2,
      spoilers: false,
      category: 'Review'
    },
    {
      id: 2,
      title: 'Plot hole in The Flash - Time travel inconsistencies',
      movie: 'The Flash',
      author: 'SciFiNerd',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
      content: 'I noticed several inconsistencies with the time travel mechanics in The Flash. [SPOILER WARNING] When Barry goes back...',
      timestamp: '4 hours ago',
      likes: 15,
      dislikes: 7,
      replies: 12,
      rating: 6.5,
      spoilers: true,
      category: 'Discussion'
    },
    {
      id: 3,
      title: 'Barbie: A surprisingly deep commentary on society',
      movie: 'Barbie',
      author: 'CinemaAnalyst',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c75c?w=50&h=50&fit=crop&crop=face',
      content: 'What started as a fun, colorful movie turned into a profound exploration of gender roles and societal expectations...',
      timestamp: '1 day ago',
      likes: 42,
      dislikes: 3,
      replies: 18,
      rating: 8.7,
      spoilers: false,
      category: 'Analysis'
    }
  ]);

  const [popularMovies] = useState([
    { name: 'Oppenheimer', discussions: 34 },
    { name: 'Barbie', discussions: 28 },
    { name: 'The Flash', discussions: 19 },
    { name: 'Fast X', discussions: 15 },
    { name: 'Guardians of the Galaxy Vol. 3', discussions: 22 }
  ]);

  const getDiscussionTypeColor = (category: string) => {
    switch (category) {
      case 'Review': return 'bg-blue-600/20 text-blue-300 border-blue-500/30';
      case 'Discussion': return 'bg-purple-600/20 text-purple-300 border-purple-500/30';
      case 'Analysis': return 'bg-green-600/20 text-green-300 border-green-500/30';
      default: return 'bg-gray-600/20 text-gray-300 border-gray-500/30';
    }
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 8) return 'text-green-400';
    if (rating >= 7) return 'text-yellow-400';
    if (rating >= 6) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-white flex items-center">
            <MessageSquare className="w-8 h-8 mr-3 text-purple-400" />
            Discussion Forums
          </h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="w-4 h-4 mr-2" />
                New Discussion
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 text-white border-gray-700 max-w-2xl">
              <DialogHeader>
                <DialogTitle>Start a New Discussion</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input placeholder="Discussion Title" className="bg-gray-800 border-gray-700" />
                <Input placeholder="Movie Name" className="bg-gray-800 border-gray-700" />
                <Textarea 
                  placeholder="Share your thoughts..." 
                  className="bg-gray-800 border-gray-700 min-h-[120px]" 
                />
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Contains Spoilers</span>
                  </label>
                  <select className="bg-gray-800 border-gray-700 rounded px-3 py-2">
                    <option>Review</option>
                    <option>Discussion</option>
                    <option>Analysis</option>
                    <option>Question</option>
                  </select>
                </div>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Post Discussion
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Discussions */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search and Filter */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search discussions..."
                      className="pl-10 bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <Button variant="outline" className="border-gray-600">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Discussion Tabs */}
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-gray-800 border-gray-700">
                <TabsTrigger value="all" className="text-white">All</TabsTrigger>
                <TabsTrigger value="reviews" className="text-white">Reviews</TabsTrigger>
                <TabsTrigger value="discussions" className="text-white">Discussions</TabsTrigger>
                <TabsTrigger value="analysis" className="text-white">Analysis</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-6">
                <div className="space-y-4">
                  {discussions.map((discussion) => (
                    <Card key={discussion.id} className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-colors">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <img
                            src={discussion.avatar}
                            alt={discussion.author}
                            className="w-10 h-10 rounded-full"
                          />
                          
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <Badge className={`${getDiscussionTypeColor(discussion.category)} border`}>
                                {discussion.category}
                              </Badge>
                              {discussion.spoilers && (
                                <Badge variant="destructive" className="bg-red-600/20 text-red-300 border-red-500/30">
                                  Spoilers
                                </Badge>
                              )}
                              <div className="flex items-center space-x-1">
                                <Star className={`w-3 h-3 ${getRatingColor(discussion.rating)} fill-current`} />
                                <span className={`text-sm font-medium ${getRatingColor(discussion.rating)}`}>
                                  {discussion.rating}
                                </span>
                              </div>
                            </div>
                            
                            <h3 className="text-lg font-semibold text-white mb-2 hover:text-purple-400 cursor-pointer">
                              {discussion.title}
                            </h3>
                            
                            <p className="text-gray-300 mb-3 line-clamp-2">
                              {discussion.content}
                            </p>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4 text-sm text-gray-400">
                                <span>by {discussion.author}</span>
                                <span>•</span>
                                <span>{discussion.timestamp}</span>
                                <span>•</span>
                                <span className="text-purple-400 font-medium">{discussion.movie}</span>
                              </div>
                              
                              <div className="flex items-center space-x-4">
                                <button className="flex items-center space-x-1 text-gray-400 hover:text-green-400 transition-colors">
                                  <ThumbsUp className="w-4 h-4" />
                                  <span>{discussion.likes}</span>
                                </button>
                                <button className="flex items-center space-x-1 text-gray-400 hover:text-red-400 transition-colors">
                                  <ThumbsDown className="w-4 h-4" />
                                  <span>{discussion.dislikes}</span>
                                </button>
                                <button className="flex items-center space-x-1 text-gray-400 hover:text-blue-400 transition-colors">
                                  <Reply className="w-4 h-4" />
                                  <span>{discussion.replies}</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <div className="space-y-4">
                  {discussions.filter(d => d.category === 'Review').map((discussion) => (
                    <Card key={discussion.id} className="bg-gray-800/50 border-gray-700">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <img
                            src={discussion.avatar}
                            alt={discussion.author}
                            className="w-10 h-10 rounded-full"
                          />
                          
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <Badge className={`${getDiscussionTypeColor(discussion.category)} border`}>
                                {discussion.category}
                              </Badge>
                              <div className="flex items-center space-x-1">
                                <Star className={`w-3 h-3 ${getRatingColor(discussion.rating)} fill-current`} />
                                <span className={`text-sm font-medium ${getRatingColor(discussion.rating)}`}>
                                  {discussion.rating}
                                </span>
                              </div>
                            </div>
                            
                            <h3 className="text-lg font-semibold text-white mb-2">
                              {discussion.title}
                            </h3>
                            
                            <p className="text-gray-300 mb-3">
                              {discussion.content}
                            </p>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4 text-sm text-gray-400">
                                <span>by {discussion.author}</span>
                                <span>•</span>
                                <span>{discussion.timestamp}</span>
                              </div>
                              
                              <div className="flex items-center space-x-4">
                                <button className="flex items-center space-x-1 text-gray-400 hover:text-green-400">
                                  <ThumbsUp className="w-4 h-4" />
                                  <span>{discussion.likes}</span>
                                </button>
                                <button className="flex items-center space-x-1 text-gray-400 hover:text-blue-400">
                                  <Reply className="w-4 h-4" />
                                  <span>{discussion.replies}</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Popular Movies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {popularMovies.map((movie, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 cursor-pointer transition-colors">
                      <span className="text-white font-medium">{movie.name}</span>
                      <Badge variant="outline" className="border-purple-500/30 text-purple-300">
                        {movie.discussions}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Discussion Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Total Discussions</span>
                    <span className="text-white font-semibold">1,247</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Active Today</span>
                    <span className="text-white font-semibold">34</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Your Posts</span>
                    <span className="text-white font-semibold">12</span>
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

export default DiscussionForums;
