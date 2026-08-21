import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Gamepad2, Play, Search, Filter } from 'lucide-react';
import { Card, EmptyState, Skeleton, ErrorState, cn } from '../../shared/components';
import { normalizeApiError } from '../../shared/lib/api-client';

interface Game {
  id: string;
  name: string;
  provider: string;
  hot: boolean;
  category: 'Crash' | 'Instant' | 'Table';
  thumbnail: string;
}

async function fetchGames(): Promise<Game[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 'g_1', name: 'Aviator', provider: 'Spribe', hot: true, category: 'Crash', thumbnail: 'https://i.pinimg.com/736x/23/42/04/23420488fb869cabc71d55629110c12b.jpg' },
        { id: 'g_2', name: 'Keno Classic', provider: 'Ahadu', hot: false, category: 'Table', thumbnail: 'https://i.pinimg.com/736x/d9/7a/aa/d97aaa67e173b31a9a8d2e2df3cc34e5.jpg' },
        { id: 'g_3', name: 'Mines', provider: 'Spribe', hot: true, category: 'Instant', thumbnail: 'https://i.pinimg.com/736x/69/00/eb/6900eb0a764f364ee767ded173685a0a.jpg' },
        { id: 'g_4', name: 'Plinko', provider: 'Spribe', hot: false, category: 'Instant', thumbnail: 'https://i.pinimg.com/736x/4a/f0/3c/4af03c2b426d1548cf1eaa77f5d6c2c3.jpg' },
        { id: 'g_5', name: 'Dice', provider: 'Turbo', hot: false, category: 'Table', thumbnail: 'https://i.pinimg.com/736x/51/78/bb/5178bbdb1a6accf54c13feb85cdb42ac.jpg' },
        { id: 'g_6', name: 'Goal', provider: 'Spribe', hot: true, category: 'Crash', thumbnail: 'https://i.pinimg.com/736x/99/c2/c1/99c2c108201f3ae767e8ea89c6304a3b.jpg' },
      ]);
    }, 400);
  });
}

const CATEGORIES = ['All', 'Crash', 'Instant', 'Table'];

export default function GamesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const { data: games, isLoading, error, refetch } = useQuery({
    queryKey: ['games'],
    queryFn: fetchGames,
  });

  const filteredGames = useMemo(() => {
    if (!games) return [];
    return games.filter(game => {
      const matchesSearch = game.name.toLowerCase().includes(searchQuery.toLowerCase()) || game.provider.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || game.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [games, searchQuery, activeCategory]);

  return (
    <div className="flex flex-col h-full min-h-screen bg-background pb-6">
      {/* Sticky Header with Search & Filters */}
      <div className="sticky top-0 z-40 bg-background/90 backdrop-blur-xl border-b border-ink/5 pt-4 pb-2 px-4 space-y-4">
        <header className="flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-display font-medium text-ink mb-1">Casino</h1>
            <p className="text-sm text-ink-muted">Play and win with top providers.</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center border border-gold/20 shadow-inner">
            <Gamepad2 className="w-5 h-5 text-gold" />
          </div>
        </header>

        {/* Search Bar */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-ink-muted group-focus-within:text-gold transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2.5 bg-surface-raised border border-ink/10 rounded-xl text-sm placeholder:text-ink-muted focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold transition-all shadow-sm"
            placeholder="Search games or providers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Categories Horizontal Scroll */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 snap-x">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-raised text-ink-muted shrink-0 shadow-sm border border-ink/5 mr-1">
            <Filter className="w-3.5 h-3.5" />
          </div>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 snap-start",
                activeCategory === cat 
                  ? "bg-gradient-to-r from-gold to-amber-500 text-background shadow-[0_2px_10px_rgba(232,169,59,0.3)]" 
                  : "bg-surface-raised text-ink-muted hover:bg-surface-raised/80 hover:text-ink border border-ink/5 shadow-sm"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4">
        {isLoading ? (
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="aspect-[3/4] w-full rounded-2xl" />
            ))}
          </div>
        ) : error ? (
          <ErrorState message={normalizeApiError(error).message} onRetry={refetch} />
        ) : filteredGames.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {filteredGames.map((game) => (
              <Card key={game.id} className="group relative overflow-hidden flex flex-col bg-surface cursor-pointer border-0 shadow-lg ring-1 ring-ink/5 transition-all hover:ring-gold/30 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(232,169,59,0.15)] rounded-2xl">
                <div className="aspect-[3/4] w-full relative">
                  <img 
                    src={game.thumbnail} 
                    alt={game.name} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Overlay Gradient for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent opacity-90 z-0 transition-opacity group-hover:opacity-100"></div>

                  {/* Hot Badge */}
                  {game.hot && (
                    <div className="absolute top-2 right-2 bg-gradient-to-r from-coral to-red-600 text-background text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full z-10 shadow-md flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-background rounded-full animate-pulse"></span>
                      Hot
                    </div>
                  )}

                  {/* Category Tag */}
                  <div className="absolute top-2 left-2 bg-background/60 backdrop-blur-md text-ink text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md z-10 border border-ink/10 shadow-sm">
                    {game.category}
                  </div>

                  {/* Play Button Hover Effect */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 bg-background/10 backdrop-blur-[1px]">
                    <div className="bg-gold text-background p-4 rounded-full shadow-[0_0_20px_rgba(232,169,59,0.6)] transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <Play className="w-6 h-6 ml-1 fill-background" />
                    </div>
                  </div>

                  {/* Card Content at Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 z-10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-display font-bold text-ink text-sm sm:text-base truncate drop-shadow-md">{game.name}</h3>
                    <p className="text-[10px] text-gold font-bold uppercase tracking-widest drop-shadow-sm mt-0.5">{game.provider}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState 
            icon={Gamepad2}
            title="No games found"
            description="Try adjusting your search or category filters."
          />
        )}
      </div>
    </div>
  );
}
