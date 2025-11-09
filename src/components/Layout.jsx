import { Link, useLocation } from 'react-router-dom';
import { Home, Scan, Compass, Mountain, Navigation, Shield, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

function Layout({ children }) {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/scan', icon: Scan, label: 'Scan' },
    { path: '/explore', icon: Compass, label: 'Explore' },
    { path: '/near-me', icon: Navigation, label: 'Near Me' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="glass-card sticky top-0 z-50 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-3">
            <Link to="/" className="flex items-center gap-2">
              <Mountain className="w-8 h-8 text-nepal-red" />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-nepal-red to-nepal-blue bg-clip-text text-transparent">
                  Heritage Nepal
                </h1>
                <p className="text-xs text-gray-600">Discover Sacred Sites</p>
              </div>
            </Link>
            
            <div className="flex items-center gap-2">
              {/* Support Button */}
              <a
                href="https://ko-fi.com/heritagenepal"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-yellow-50 to-orange-50 hover:from-yellow-100 hover:to-orange-100 rounded-xl transition-all duration-200 border border-orange-200"
              >
                <Heart className="w-4 h-4 text-orange-500 fill-orange-500" />
                <span className="text-sm font-semibold text-gray-700 hidden sm:inline">Support</span>
              </a>
              
              {/* Admin Button */}
              <Link
                to="/admin/login"
                className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-nepal-red/10 to-nepal-blue/10 hover:from-nepal-red/20 hover:to-nepal-blue/20 rounded-xl transition-all duration-200 border border-nepal-red/20"
              >
                <Shield className="w-4 h-4 text-nepal-red" />
                <span className="text-sm font-semibold text-gray-700 hidden sm:inline">Admin</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-20">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 glass-card border-t z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-around items-center py-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative flex flex-col items-center gap-1 px-6 py-2 rounded-xl transition-all"
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-nepal-red/10 rounded-xl"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                  <Icon
                    className={`w-6 h-6 relative z-10 transition-colors ${
                      isActive ? 'text-nepal-red' : 'text-gray-600'
                    }`}
                  />
                  <span
                    className={`text-xs font-medium relative z-10 transition-colors ${
                      isActive ? 'text-nepal-red' : 'text-gray-600'
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Layout;
