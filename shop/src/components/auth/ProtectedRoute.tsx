// import { useRouter } from 'next/navigation';
// import { useEffect } from 'react';
// import { useAuth } from './AuthContext'; // یا useSelector از Redux
// import { useSelector } from 'react-redux';
// import { RootState } from '@/store';

// export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
//   //   const { state } = useAuth(); // یا
//   //
//   const { state } = useSelector((state: RootState) => state.auth);
//   const router = useRouter();

//   useEffect(() => {
//     if (!state.isAuthenticated) {
//       router.push('/login');
//     }
//   }, [state.isAuthenticated, router]);

//   return state.isAuthenticated ? <>{children}</> : null;
// }
