import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CountrySelectionPage from './pages/CountrySelectionPage';
import ChatRoomPage from './pages/ChatRoomPage';
import SubscriptionPage from './pages/SubscriptionPage';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="countries" element={<CountrySelectionPage />} />
          <Route path="chat/:countryId" element={<ChatRoomPage />} />
          <Route path="subscribe" element={<SubscriptionPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;