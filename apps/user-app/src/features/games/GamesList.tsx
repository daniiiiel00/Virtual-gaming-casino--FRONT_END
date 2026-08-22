// Removed React
import { useQuery } from '@tanstack/react-query';
import { Gamepad2, Play } from 'lucide-react';
import { Card, EmptyState, Skeleton, ErrorState } from '../../shared/components';
import { normalizeApiError } from '../../shared/lib/api-client';

interface Game {
  id: string;
  name: string;
  provider: string;
  hot: boolean;
  thumbnail: string;
}

async function fetchGames(): Promise<Game[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 'g_1', name: 'Aviator', provider: 'Spribe', hot: true, thumbnail: 'https://i.pinimg.com/736x/23/42/04/23420488fb869cabc71d55629110c12b.jpg' },
        { id: 'g_2', name: 'Keno Classic', provider: 'Ahadu', hot: false, thumbnail: 'https://i.pinimg.com/736x/d9/7a/aa/d97aaa67e173b31a9a8d2e2df3cc34e5.jpg' },
        { id: 'g_3', name: 'Mines', provider: 'Spribe', hot: true, thumbnail: 'https://i.pinimg.com/736x/69/00/eb/6900eb0a764f364ee767ded173685a0a.jpg' },
        { id: 'g_4', name: 'Plinko', provider: 'Spribe', hot: false, thumbnail: 'https://i.pinimg.com/736x/4a/f0/3c/4af03c2b426d1548cf1eaa77f5d6c2c3.jpg' },
        { id: 'g_5', name: 'Dice', provider: 'Turbo', hot: false, thumbnail: 'https://i.pinimg.com/736x/51/78/bb/5178bbdb1a6accf54c13feb85cdb42ac.jpg' },
        { id: 'g_6', name: 'Goal', provider: 'Spribe', hot: true, thumbnail: 'https://i.pinimg.com/736x/99/c2/c1/99c2c108201f3ae767e8ea89c6304a3b.jpg' },
      ]);
    }, 400);
  });
}

export function GamesList() {
  const { data: games, isLoading, error, refetch } = useQuery({
    queryKey: ['games'],
    queryFn: fetchGames,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-3 mt-4">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="aspect-square w-full rounded-2xl" />
        ))}
      </div>
    );
  }

  if (error) {
    return <ErrorState message={normalizeApiError(error).message} onRetry={refetch} className="mt-4" />;
  }

  if (!games || games.length === 0) {
    return (
      <EmptyState 
        className="mt-4"
        icon={Gamepad2}
        title="No games available"
        description="Check back later for new releases."
      />
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 mt-4">
      {games.map((game) => (
        <Card key={game.id} className="group relative overflow-hidden flex flex-col bg-surface-raised cursor-pointer active:scale-95 transition-all">
          <div className="aspect-[4/3] w-full relative">
            <img 
              src={game.thumbnail} 
              alt={game.name} 
              className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105"
            />
            {game.hot && (
              <div className="absolute top-2 right-2 bg-coral text-background text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full z-10 animate-pulse">
                Hot
              </div>
            )}
            <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors z-0"></div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 bg-background/40 backdrop-blur-[2px]">
              <div className="bg-gold text-background p-3 rounded-full shadow-lg">
                <Play className="w-5 h-5 ml-1" />
              </div>
            </div>
          </div>
          <div className="p-3 border-t border-ink/5">
            <h3 className="font-medium text-ink text-sm truncate">{game.name}</h3>
            <p className="text-[10px] text-ink-muted uppercase tracking-wider">{game.provider}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}
