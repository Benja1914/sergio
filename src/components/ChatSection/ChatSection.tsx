import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share, MoreHorizontal } from 'lucide-react';
import { Publication } from '@/services/publications.service';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchUserPublications, createNewPublication, likePublication as likePublicationThunk, unlikePublication as unlikePublicationThunk } from '@/store/publications/thunk';
import { ChatSectionProps, Post } from './interfaces';

const ChatSection: React.FC<ChatSectionProps> = ({ 
  userImage, 
  username, 
  userId,
  className = '' 
}) => {
  const [message, setMessage] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  
  const dispatch = useAppDispatch();
  const { userPublications, isLoading: loading, error } = useAppSelector(state => state.publications);

  // Cargar publications del usuario
  useEffect(() => {
    if (userId) {
      dispatch(fetchUserPublications(userId));
    }
  }, [userId, dispatch]);

  // Convertir publications del store a posts para el componente
  useEffect(() => {
    console.log('useEffect triggered:', { userId, userPublications, hasUserPublications: userId && userPublications[userId] });
    
    if (userId && userPublications[userId]) {
      console.log('Converting publications to posts:', userPublications[userId]);
      const convertedPosts: Post[] = userPublications[userId].map((pub: Publication) => ({
        id: pub.id,
        username: pub.username || username || 'Unknown User',
        userImage: pub.userImage || userImage || '',
        timestamp: new Date(pub.createdAt).toLocaleDateString(),
        content: pub.content,
        image: pub.attachedImage,
        likes: pub.likes || 0,
        isLiked: pub.isLiked || false
      }));
      console.log('Converted posts:', convertedPosts);
      setPosts(convertedPosts);
    } else if (error) {
      console.log('Using fallback posts due to error:', error);
      // Usar posts mock como fallback en caso de error
      setPosts([
        {
          id: '1',
          username: username || 'WolfWonder87',
          userImage: userImage || '',
          timestamp: '03/31/2025',
          content: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat.',
          image: 'https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2020/04/muerte-krilin-manos-freezer-1921217.jpg?tf=1200x900',
          likes: 12,
          isLiked: false
        }
      ]);
    }
  }, [userPublications, userId, username, userImage, error]);

  const handleSendMessage = async () => {
    if (message.trim() && userId) {
      await dispatch(createNewPublication({
        content: message.trim()
      }, userId));
      
      setMessage('');
    }
  };

  const handleLike = async (postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    if (post.isLiked) {
      await dispatch(unlikePublicationThunk(postId));
    } else {
      await dispatch(likePublicationThunk(postId));
    }

    // Actualizar el estado local
    setPosts(prevPosts => 
      prevPosts.map(p => 
        p.id === postId 
          ? { 
              ...p, 
              isLiked: !p.isLiked, 
              likes: p.isLiked ? p.likes - 1 : p.likes + 1 
            }
          : p
      )
    );
  };

  return (
    <div className={`w-full max-w-md ${className}`}>
      {/* Header */}
      <div className="mb-6">
        <p className="text-slate-400 text-lg font-medium">Tell us something...</p>
      </div>

      {/* Message Input */}
      <div className="flex gap-3 mb-8">
        <div className="flex-1 relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write a message..."
            className="w-full bg-slate-800 rounded-lg px-4 py-3 text-sm border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400 pr-12"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 text-slate-400 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
        <button 
          onClick={handleSendMessage}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-sm font-medium transition-colors text-white"
        >
          Send
        </button>
      </div>

      {/* Posts Feed */}
      <div className="space-y-6">
        
        {loading ? (
          <div className="text-center py-8">
            <p className="text-slate-400">Loading posts...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-400">{error}</p>
            <button 
              onClick={() => userId && window.location.reload()}
              className="mt-2 text-blue-400 hover:text-blue-300 text-sm"
            >
              Try again
            </button>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-slate-400">No posts yet.</p>
            <p className="text-slate-500 text-sm mt-1">Be the first to share something!</p>
          </div>
        ) : (
          posts.map((post) => (
          <div key={post.id} className="bg-slate-900/50 rounded-xl p-4 border border-slate-800">
            {/* Post Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={post.userImage || userImage || ''}
                    alt={`${post.username} Avatar`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiM0NzUzNjkiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIGZpbGw9IiM5Q0E3QkYiPgo8cGF0aCBkPSJNMTIgMTJjMi4yMSAwIDQtMS43OSA0LTRzLTEuNzktNC00LTQtNCAxLjc5LTQgNCAxLjc5IDQgNCA0em0wIDJjLTIuNjcgMC04IDEuMzQtOCA0djJoMTZ2LTJjMC0yLjY2LTUuMzMtNC04LTR6Ii8+Cjwvc3ZnPgo8L3N2Zz4K';
                    }}
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white">{post.username}</span>
                    <span className="text-xs text-slate-500">{post.timestamp}</span>
                  </div>
                </div>
              </div>
              <button className="text-slate-400 hover:text-white transition-colors p-1">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>

            {/* Post Content */}
            <div className="mb-4">
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                {post.content || "No content provided"}
              </p>
              
              {/* Post Image */}
              {post.image && (
                <div className="relative rounded-lg overflow-hidden">
                  <img 
                    src={post.image} 
                    alt="Post content" 
                    className="w-full h-auto object-cover max-h-96"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>

            {/* Post Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-700">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => handleLike(post.id)}
                  className="flex items-center gap-2 text-slate-400 hover:text-red-400 transition-colors"
                >
                  <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-red-400 text-red-400' : ''}`} />
                  <span className="text-sm">{post.likes}</span>
                </button>
                
                <button className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm">Comment</span>
                </button>
              </div>
              
              <button className="text-slate-400 hover:text-white transition-colors">
                <Share className="w-4 h-4" />
              </button>
            </div>
          </div>
        )))}
      </div>

      {/* Load More */}
      <div className="mt-6 text-center">
        <button className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">
          Load more posts...
        </button>
      </div>
    </div>
  );
};

export default ChatSection;