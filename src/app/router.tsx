import { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Shell } from './layout/Shell';

// Lazy load feature pages
const WalletPage = lazy(() => import('../features/wallet/WalletPage'));
const GamesPage = lazy(() => import('../features/games/GamesPage'));
const PromotionsPage = lazy(() => import('../features/promotions/PromotionsPage'));
const HistoryPage = lazy(() => import('../features/wallet/HistoryPage'));
const ProfilePage = lazy(() => import('../features/auth/ProfilePage'));
// const AdminPage = lazy(() => import('../features/admin/AdminPage'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Shell />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div className="p-4">Loading Wallet...</div>}>
            <WalletPage />
          </Suspense>
        ),
      },
      {
        path: 'games',
        element: <Suspense fallback={<div className="p-4">Loading Games...</div>}><GamesPage /></Suspense>,
      },
      {
        path: 'promotions',
        element: <Suspense fallback={<div className="p-4">Loading Promos...</div>}><PromotionsPage /></Suspense>,
      },
      {
        path: 'history',
        element: <Suspense fallback={<div className="p-4">Loading History...</div>}><HistoryPage /></Suspense>,
      },
      {
        path: 'profile',
        element: <Suspense fallback={<div className="p-4">Loading Profile...</div>}><ProfilePage /></Suspense>,
      }
    ],
  },
  // {
  //   path: '/admin/*',
  //   element: <Suspense fallback={<div>Loading Admin...</div>}><AdminPage /></Suspense>,
  // }
]);
