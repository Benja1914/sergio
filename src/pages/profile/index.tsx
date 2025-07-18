import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, fetchUserProfile, RootState } from '@/store';
import { AuthService } from '@/services/auth.service';
import renderBenefitChips from '@/components/Chips/Chips';
import AuctionsComponent, { Auction } from '@/components/AuctionComponent/AuctionComponent';
import ChatSection from '@/components/ChatSection/ChatSection';
import { fetchUserAuctions } from '@/store/auction/thunk';

const ProfileContent = () => {
  
  const profile = useSelector((state: RootState) => state.profile);
  const auction = useSelector((state: RootState) => state.auction);
  
  const dispatch = useDispatch<AppDispatch>();
  const authService = new AuthService();
  const user = authService.getUser();

  useEffect(() => {
    if (user) dispatch(fetchUserProfile(user.id));
  }, []);

  useEffect(() => {
    console.log('profile data:', profile);
  }, [profile]);

  useEffect(() => {
    console.log('auction state:', auction);
    console.log('auctions array:', auction.auctions);
  }, [auction]);

  // Cargar auctions del usuario usando Redux
  useEffect(() => {
    if (user?.id) {
      console.log('Fetching auctions for user:', user.id);
      dispatch(fetchUserAuctions(user.id, {
        limit: 10,
        status: 'open'
      }));
    }
  }, [user?.id, dispatch]);

  // Convertir auctions del store a la interfaz del componente
  // Usar auction.auctions si no implementaste userAuctions en el slice
  const convertedAuctions: Auction[] = auction.auctions.map((storeAuction) => {
    console.log('Converting auction:', storeAuction);
    
    // Verificar y construir el array de imágenes de forma segura
    let images: string[] = [];
    if (storeAuction.attachedImage && storeAuction.attachedImage.trim() !== '') {
      images = [storeAuction.attachedImage];
    } else {
      // Si no hay imagen, usar una imagen por defecto que sabemos que funciona
      images = ['data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjMzc0MTUxIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5Q0E3QkYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPgo='];
    }
    
    return {
      id: storeAuction.id,
      title: storeAuction.title,
      images: images,
      startingBid: parseFloat(storeAuction.startingBidPrice) || 0,
      minimumBid: parseFloat(storeAuction.minimumBidIncrement) || 5,
      currentBid: storeAuction.currentPrice ? parseFloat(storeAuction.currentPrice) : undefined,
      description: storeAuction.description,
      endDate: storeAuction.auctionEndDate,
      status: storeAuction.auctionStatus === 'open' ? 'active' : 
              storeAuction.auctionStatus === 'closed' ? 'ended' : 
              storeAuction.auctionStatus === 'pending' ? 'upcoming' : undefined
    };
  });

  console.log('Converted auctions:', convertedAuctions);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Mobile Layout */}
      <div className="block lg:hidden">
        <div className="relative">
          {/* Hero Banner Mobile */}
          <div className="h-64 bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500 relative">
            <img
              src={profile.profileData?.userBanner || ""}
              alt="Banner"
              className="w-full h-full object-cover"
            />
            {/* Avatar Mobile */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-20">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-slate-950">
                <img
                  src={profile.profileData?.userImage || ""}
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
              <h1 className="text-3xl font-bold mb-3">{profile.profileData?.username || "unknow"}</h1>
              <div className="flex gap-2 justify-center flex-wrap">
                {renderBenefitChips(profile.profileData?.benefits)}
              </div>
            </div>

            {/* About Me Mobile */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-left">About Me</h2>
              <p className="text-slate-300 leading-relaxed text-left">
                {profile.profileData?.description || ""}
              </p>
            </div>

            {/* Auctions Mobile */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Auctions</h2>
              {auction.isLoading ? (
                <div className="text-center py-8">
                  <p className="text-slate-400">Loading auctions...</p>
                </div>
              ) : auction.error ? (
                <div className="text-center py-8">
                  <p className="text-red-400">{auction.error}</p>
                  <button 
                    onClick={() => user?.id && dispatch(fetchUserAuctions(user.id, { limit: 10 }))} 
                    className="mt-2 text-blue-400 hover:text-blue-300"
                  >
                    Try again
                  </button>
                </div>
              ) : convertedAuctions.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-slate-400">No auctions found for this user.</p>
                  <p className="text-xs text-slate-500 mt-2">
                    Raw auctions: {auction.auctions.length} | 
                    Converted: {convertedAuctions.length}
                  </p>
                </div>
              ) : (
                <AuctionsComponent auctions={convertedAuctions} />
              )}
            </div>

            {/* Chat Section Mobile */}
            <div className="mb-8">
              <ChatSection 
                userImage={profile.profileData?.userImage}
                username={profile.profileData?.username}
                userId={user?.id}
              />
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
                src={profile.profileData?.userBanner || ''}
                alt="Banner"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-20">
                <div className="w-[182px] h-[182px] rounded-full overflow-hidden border-4 border-slate-950">
                  <img
                    src={profile.profileData?.userImage || "https://media.gq.com.mx/photos/5f6ce732bc946e88f6c96320/16:9/w_2560%2Cc_limit/goky%2520ultra%2520instinto.jpg"}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="px-8 pt-24 pb-8">
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">{profile.profileData?.username || "unknow"}</h1>
                <div className="flex gap-3 justify-center">
                  {renderBenefitChips(profile.profileData?.benefits)}
                </div>
              </div>

              <div className="flex gap-12 justify-around">
                {/* Left Side Desktop */}
                <div className="flex-1 max-w-2xl">
                  <div className="mb-12">
                    <h2 className="text-2xl font-semibold mb-6 text-left">About Me</h2>
                    <p className="text-slate-300 leading-relaxed text-left text-base">
                      {profile.profileData?.description || ""}
                    </p>
                  </div>

                  <div className='flex justify-center flex-col align-middle items-center'>
                    <h2 className="text-2xl font-semibold mb-6 self-start">Auctions</h2>
                    {auction.isLoading ? (
                      <div className="text-center py-8 w-full">
                        <p className="text-slate-400">Loading auctions...</p>
                      </div>
                    ) : auction.error ? (
                      <div className="text-center py-8 w-full">
                        <p className="text-red-400">{auction.error}</p>
                        <button 
                          onClick={() => user?.id && dispatch(fetchUserAuctions(user.id, { limit: 10 }))}
                          className="mt-2 text-blue-400 hover:text-blue-300"
                        >
                          Try again
                        </button>
                      </div>
                    ) : convertedAuctions.length === 0 ? (
                      <div className="text-center py-8 w-full">
                        <p className="text-slate-400">No auctions found for this user.</p>
                        <p className="text-xs text-slate-500 mt-2">
                          Raw auctions: {auction.auctions.length} | 
                          Converted: {convertedAuctions.length}
                        </p>
                      </div>
                    ) : (
                      <AuctionsComponent auctions={convertedAuctions} className="w-full" />
                    )}

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
                  <ChatSection 
                    userImage={profile.profileData?.userImage}
                    username={profile.profileData?.username}
                    userId={user?.id}
                  />
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