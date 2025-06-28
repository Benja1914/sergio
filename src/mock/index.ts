export const filtersConfig = [
  {
    id: 'tag',
    title: 'Tag',
    cols: 2, // Cambiado a number
    options: [
      { id: 'ych', label: 'Ych' },
      { id: 'commission', label: 'Commission' },
      { id: 'adoptable', label: 'Adoptable' },
    ],
  },
  {
    id: 'safetyLevel',
    title: 'Safety Level',
    cols: 2, // Cambiado a number
    options: [
      { id: 'safe', label: 'Safe' },
      { id: 'explicit', label: 'Explicit' },
      { id: 'questionable', label: 'Questionable' },
      { id: 'shock', label: 'Shock' },
    ],
  },
  {
    id: 'auctionStatus',
    title: 'Auction Status',
    cols: 1, // Cambiado a number
    options: [
      { id: 'started', label: 'Started' },
      { id: 'ending-soon', label: 'Ending Soon (24hrs)' },
      { id: 'auto-buy', label: 'Auto Buy' },
    ],
  },
  {
    id: 'artStyle',
    title: 'Art Style',
    cols: 2, // Cambiado a number
    options: [
      { id: 'anime', label: 'Anime/Manga' },
      { id: 'realistic', label: 'Realistic' },
      { id: 'cartoon', label: 'Cartoon' },
      { id: 'pixelArt', label: 'Pixel-Art' },
      { id: 'chibi', label: 'Chibi' },
    ],
  },
];