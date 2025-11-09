import React, { useState, useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';
import LandingView from './views/LandingView';
import AuthView from './views/AuthView';
import MainAppView from './views/MainAppView';
import FAQView from './views/FAQView';
import PrivacyPolicyView from './views/PrivacyPolicyView';
import TermsOfServiceView from './views/TermsOfServiceView';
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner';

export type Route = '/' | '/login' | '/faq' | '/privacy' | '/terms';

const App: React.FC = () => {
  const [route, setRoute] = useState<Route>('/');
  const { user, loading } = useContext(AuthContext);

  const navigate = (newRoute: Route) => {
    setRoute(newRoute);
    window.scrollTo(0, 0);
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
          <p>Loading...</p>
        </div>
      );
    }

    if (user) {
      return <MainAppView />;
    }

    switch (route) {
      case '/login':
        return <AuthView navigate={navigate} />;
      case '/faq':
        return <FAQView navigate={navigate} />;
      case '/privacy':
        return <PrivacyPolicyView navigate={navigate} />;
      case '/terms':
        return <TermsOfServiceView navigate={navigate} />;
      case '/':
      default:
        return <LandingView navigate={navigate} />;
    }
  };

  return (
    <>
      {renderContent()}
      <CookieBanner />
    </>
  );
};

export default App;