import React from 'react'

export default function Header({ theme, toggleTheme, user, onLogout, onGetStarted }) {
  // Shop owner profile completion check (profilePic optional)
  let profileComplete = false;
  if (user && user.role === 'shop_owner') {
    try {
      const raw = localStorage.getItem('shopProfile');
      if (raw) {
        const obj = JSON.parse(raw);
        profileComplete = !!(obj.shopName && obj.mobile && obj.address && obj.ownerName);
      }
    } catch (e) {}
  }

  return (
    <header className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-md bg-amber-500 flex items-center justify-center text-white font-bold">SS</div>
        <div>
          <div className="text-lg font-semibold">SaleSync</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 -mt-1">POS · Inventory · Billing</div>
        </div>
      </div>

      <nav className="flex items-center gap-4">
        {/* Shop owner nav items */}
        {user && user.role === 'shop_owner' ? (
          <>
            <button className="text-sm px-3 py-2 rounded-md bg-amber-500 text-white" disabled>Shop Profile</button>
            <button className={`text-sm px-3 py-2 rounded-md ${profileComplete ? 'bg-amber-500 text-white hover:bg-amber-600' : 'bg-gray-400 text-white cursor-not-allowed'}`} disabled={!profileComplete}>Sales{!profileComplete && ' 🔒'}</button>
            <button className={`text-sm px-3 py-2 rounded-md ${profileComplete ? 'bg-amber-500 text-white hover:bg-amber-600' : 'bg-gray-400 text-white cursor-not-allowed'}`} disabled={!profileComplete}>Cashiers{!profileComplete && ' 🔒'}</button>
            <button className={`text-sm px-3 py-2 rounded-md ${profileComplete ? 'bg-amber-500 text-white hover:bg-amber-600' : 'bg-gray-400 text-white cursor-not-allowed'}`} disabled={!profileComplete}>Shop Landing Page{!profileComplete && ' 🔒'}</button>
          </>
        ) : (
          <>
            <a className="text-sm text-gray-700 dark:text-gray-200 hover:underline" href="#features">Features</a>
            <a className="text-sm text-gray-700 dark:text-gray-200 hover:underline" href="#contact">Contact</a>
          </>
        )}

        <button onClick={toggleTheme} aria-label="Toggle theme" className="ml-2 inline-flex items-center px-3 py-2 border rounded-md bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-100 border-gray-200 dark:border-slate-700">
          {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
        </button>

        {!user ? (
          <button onClick={onGetStarted} className="ml-4 inline-flex items-center px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600">Get Started</button>
        ) : (
          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-700 dark:text-gray-200">{user.email}</div>
            <button onClick={onLogout} className="inline-flex items-center px-3 py-2 bg-white dark:bg-slate-800 text-sm rounded-md border border-gray-200 dark:border-slate-700">Logout</button>
          </div>
        )}
      </nav>
    </header>
  )
}
