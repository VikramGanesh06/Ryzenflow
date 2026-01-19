
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './firebase';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Logos } from './components/Logos';
import { Footer } from './components/Footer';
import { AuthForm } from './components/AuthForm';
import { Dashboard } from './components/Dashboard';
import { VerificationPending } from './components/VerificationPending';
import { Product } from './components/Product';
import { Solutions } from './components/Solutions';
import { Pricing } from './components/Pricing';
import { Support } from './components/Support';
import { Profile } from './components/Profile';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAuth, setShowAuth] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      // Close auth form if user logged in successfully (even if unverified, logic handles view below)
      if (currentUser) {
        setShowAuth(false);
      }
    });

    // Handle URL-based routing
    const handleRouting = () => {
      const hash = window.location.hash.slice(1) || 'home';
      setCurrentPage(hash);
    };

    handleRouting();
    window.addEventListener('hashchange', handleRouting);
    return () => {
      unsubscribe();
      window.removeEventListener('hashchange', handleRouting);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // User is authenticated
  if (user) {
    // Block unverified users
    if (!user.emailVerified) {
      return <VerificationPending email={user.email || ''} />;
    }

    // Profile Page for authenticated users
    if (currentPage === 'profile') {
      return (
        <div className="min-h-screen bg-white">
          <Navbar
            onAuthClick={() => setShowAuth(true)}
            currentPage={currentPage}
            onNavigate={setCurrentPage}
            isLoggedIn={true}
            onProfileClick={() => setCurrentPage('profile')}
          />
          <Profile onLogout={() => setUser(null)} />
        </div>
      );
    }

    return <Dashboard onProfileClick={() => setCurrentPage('profile')} />;
  }

  // User is on Auth screen
  if (showAuth) {
    return <AuthForm onBack={() => setShowAuth(false)} />;
  }

  // Page Navigation
  if (currentPage === 'product') {
    return (
      <div className="min-h-screen bg-white">
        <Navbar onAuthClick={() => setShowAuth(true)} currentPage={currentPage} onNavigate={setCurrentPage} isLoggedIn={false} />
        <Product />
        <Footer />
      </div>
    );
  }

  if (currentPage === 'solutions') {
    return (
      <div className="min-h-screen bg-white">
        <Navbar onAuthClick={() => setShowAuth(true)} currentPage={currentPage} onNavigate={setCurrentPage} isLoggedIn={false} />
        <Solutions />
        <Footer />
      </div>
    );
  }

  if (currentPage === 'pricing') {
    return (
      <div className="min-h-screen bg-white">
        <Navbar onAuthClick={() => setShowAuth(true)} currentPage={currentPage} onNavigate={setCurrentPage} isLoggedIn={false} />
        <Pricing />
        <Footer />
      </div>
    );
  }

  if (currentPage === 'support') {
    return (
      <div className="min-h-screen bg-white">
        <Navbar onAuthClick={() => setShowAuth(true)} currentPage={currentPage} onNavigate={setCurrentPage} isLoggedIn={false} />
        <Support />
        <Footer />
      </div>
    );
  }

  // User is on Auth screen
  if (showAuth) {
    return <AuthForm onBack={() => setShowAuth(false)} />;
  }

  // User is on Landing Page
  return (
    <div className="min-h-screen bg-white">
      <Navbar onAuthClick={() => setShowAuth(true)} currentPage={currentPage} onNavigate={setCurrentPage} isLoggedIn={false} />
      <main>
        <Hero onAuthClick={() => setShowAuth(true)} />
        <Logos />
        
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 text-center">
             <h2 className="text-3xl font-bold text-gray-900 mb-16 tracking-tight">Security first, <span className="text-emerald-500">always.</span></h2>
             <div className="grid md:grid-cols-3 gap-12">
                <div className="text-left p-8 rounded-3xl bg-gray-50/50 border border-gray-100">
                  <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center mb-6 text-emerald-500 font-bold">01</div>
                  <h3 className="text-xl font-bold mb-4">Granular Control</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">Assign permissions with precision. Know exactly who can access what.</p>
                </div>
                <div className="text-left p-8 rounded-3xl bg-gray-50/50 border border-gray-100">
                  <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center mb-6 text-emerald-500 font-bold">02</div>
                  <h3 className="text-xl font-bold mb-4">Audit Logs</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">Full transparency with real-time audit logs for every action taken.</p>
                </div>
                <div className="text-left p-8 rounded-3xl bg-gray-50/50 border border-gray-100">
                  <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center mb-6 text-emerald-500 font-bold">03</div>
                  <h3 className="text-xl font-bold mb-4">Encrypted Assets</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">Your data is yours. End-to-end encryption by default for everything.</p>
                </div>
             </div>
          </div>
        </section>

        <section className="pb-32 px-6">
          <div className="max-w-5xl mx-auto bg-[#10b981] rounded-[40px] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-emerald-500/20">
             <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
             <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-8 tracking-tight relative z-10">Start scaling your <br /> team securely</h2>
             <button 
               onClick={() => setShowAuth(true)}
               className="px-10 py-4 bg-white text-[#10b981] rounded-full font-bold text-lg hover:bg-gray-50 transition-all shadow-xl relative z-10"
             >
               Get Started for Free
             </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default App;
