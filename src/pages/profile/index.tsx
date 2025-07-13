import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, fetchUserProfile, RootState } from '@/store';
import { AuthService } from '@/services/auth.service';
import renderBenefitChips from '@/components/Chips/Chips';

const ProfileContent = () => {
  const [message, setMessage] = useState('');
  const profile = useSelector((state: RootState) => state.profile);
  const profileData = profile.profileData;
  const dispatch = useDispatch<AppDispatch>();
  const authService = new AuthService();
  const user = authService.getUser();

  useEffect(() => {
    if (user) dispatch(fetchUserProfile(user.id));
  }, []);

  useEffect(() => {
    console.log('profile data:', profile);
  }, [profile]);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Mobile Layout */}
      <div className="block lg:hidden">
        <div className="relative">
          {/* Hero Banner Mobile */}
          <div className="h-64 bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500 relative">
            <img
              src={profileData?.userBanner || ""}
              alt="Banner"
              className="w-full h-full object-cover"
            />
            {/* Avatar Mobile */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-20">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-slate-950">
                <img
                  src={profileData?.userImage || ""}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Content Mobile */}
          <div className="px-4 pt-16 pb-8">
            {/* Profile Info Mobile */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-3">{profileData?.username || "unknow"}</h1>
              <div className="flex gap-2 justify-center flex-wrap">
                {renderBenefitChips(profileData?.benefits)}
              </div>
            </div>

            {/* About Me Mobile */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-left">About Me</h2>
              <p className="text-slate-300 leading-relaxed text-left">
                {profileData?.description || ""}
              </p>
            </div>

            {/* Auctions Mobile */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Auctions</h2>
              <div className="relative bg-slate-900 rounded-xl p-4 border border-slate-800">
                <div className="relative">
                  <img src="https://pbs.twimg.com/tweet_video_thumb/DK5MokkXoAYAPkx.jpg" alt="Auction Art" className="w-full h-80 object-cover rounded-lg mb-4" />
                  <button className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-slate-800/80 rounded-full p-2">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-slate-800/80 rounded-full p-2">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <h3 className="font-semibold mb-2">Example Title Auction example YCH</h3>
                <div className="text-sm text-slate-400 space-y-1">
                  <p><span className="font-medium">SB:</span> $180</p>
                  <p><span className="font-medium">MB:</span> $20</p>
                </div>
                <div className="flex justify-center mt-4">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                      <div key={i} className={`w-2 h-2 rounded-full ${i === 1 ? 'bg-white' : 'bg-slate-600'}`}></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Section Mobile */}
            <div className="mb-8">
              <p className="text-slate-400 mb-4">Tell us something...</p>
              <div className="flex gap-2 mb-6">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1 bg-slate-800 rounded-lg px-3 py-2 text-sm border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-slate-700 px-4 py-2 rounded-lg text-sm">Send</button>
              </div>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={profileData?.userImage || ""}
                      alt="User Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium">{profileData?.username || "Username"}</span>
                      <span className="text-xs text-slate-400">{profileData?.createdAt ? new Date(profileData.createdAt).toLocaleDateString() : ""}</span>
                    </div>
                    <p className="text-sm text-slate-300 mb-3">{profileData?.description || "No description provided."}</p>
                    <div className="relative">
                      <img src="https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2020/04/muerte-krilin-manos-freezer-1921217.jpg?tf=1200x900" alt="Art Post" className="h-[578px] w-[462px] object-cover rounded-lg" />
                      <div className="absolute bottom-2 left-2 flex items-center gap-1 text-white text-sm">
                        <Heart className="w-4 h-4" />
                        <span>12</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="flex">
          {/* Main Content Desktop */}
          <div className="flex-1 relative">
            <div className="h-64 bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500 relative">
              <img
                src={profileData?.userBanner || ''}
                alt="Banner"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-20">
                <div className="w-[182px] h-[182px] rounded-full overflow-hidden border-4 border-slate-950">
                  <img
                    src={profileData?.userImage || "https://media.gq.com.mx/photos/5f6ce732bc946e88f6c96320/16:9/w_2560%2Cc_limit/goky%2520ultra%2520instinto.jpg"}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="px-8 pt-24 pb-8">
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">{profileData?.username || "unknow"}</h1>
                <div className="flex gap-3 justify-center">
                  {renderBenefitChips(profileData?.benefits)}
                </div>
              </div>

              <div className="flex gap-12 justify-around">
                {/* Left Side Desktop */}
                <div className="flex-1 max-w-2xl">
                  <div className="mb-12">
                    <h2 className="text-2xl font-semibold mb-6 text-left">About Me</h2>
                    <p className="text-slate-300 leading-relaxed text-left text-base">
                      {profileData?.description || ""}
                    </p>
                  </div>

                  <div className='flex justify-center flex-col align-middle items-center'>
                    <h2 className="text-2xl font-semibold mb-6 self-start">Auctions</h2>
                    <div className="relative bg-slate-900 rounded-xl p-6 border border-slate-800">
                      <div className="relative">
                        <img src="https://pbs.twimg.com/tweet_video_thumb/DK5MokkXoAYAPkx.jpg" alt="Auction Art" className="w-full h-96 object-cover rounded-lg mb-4" />
                        <button className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-slate-800/80 rounded-full p-2">
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-slate-800/80 rounded-full p-2">
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                      <h3 className="font-semibold mb-2">Example Title Auction example YCH</h3>
                      <div className="text-sm text-slate-400 space-y-1">
                        <p><span className="font-medium">SB:</span> $180</p>
                        <p><span className="font-medium">MB:</span> $20</p>
                      </div>
                      <div className="flex justify-center mt-4">
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className={`w-2 h-2 rounded-full ${i === 1 ? 'bg-white' : 'bg-slate-600'}`}></div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-12 text-xs text-slate-500 space-y-2">
                      <div className="flex gap-6">
                        <span>Terms of use</span>
                        <span>Privacy Policy</span>
                      </div>
                      <p>© All Rights Reserved 2024</p>
                      <p>YCH - Devotions</p>
                    </div>
                  </div>
                </div>

                {/* Right Side Chat Desktop */}
                <div>
                  <p className="text-slate-400 mb-6 text-lg">Tell us something...</p>
                  <div className="flex gap-3 mb-8">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write a message..."
                      className="flex-1 bg-slate-800 rounded-lg px-4 py-3 text-sm border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400"
                    />
                    <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-sm font-medium transition-colors">Send</button>
                  </div>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                        <img
                          src={profileData?.userImage || ""}
                          alt="User Avatar"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm font-medium text-white">{profileData?.username || "Username"}</span>
                          <span className="text-xs text-slate-400">{profileData?.createdAt ? new Date(profileData.createdAt).toLocaleDateString() : ""}</span>
                        </div>
                        <p className="text-sm text-slate-300 mb-4 leading-relaxed">{profileData?.description || "No description provided."}</p>
                        <div className="flex justify-center">
                          <img src="https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2020/04/muerte-krilin-manos-freezer-1921217.jpg?tf=1200x900" alt="Art Post" className="h-[578px] w-[462px] object-cover rounded-lg" />
                          <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-black/50 rounded-full px-3 py-1">
                            <Heart className="w-4 h-4 text-red-400" />
                            <span className="text-white text-sm">12</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileContent;