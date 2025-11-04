import React from 'react'

export default function CashierDashboard({ user }) {
  function renderTabContent() {
    switch (activeTab) {
      case 'checkout':
        return <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow">Checkout area (placeholder)</div>;
      case 'orders':
        return <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow">Orders tab (placeholder)</div>;
      default:
        return null;
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h2 className="text-2xl font-bold mb-4">Cashier Dashboard</h2>
      <p className="text-gray-700 dark:text-gray-300">Welcome, {user.email}. Use this screen to perform quick checkouts and manage orders.</p>
      {renderTabContent()}
    </div>
  )
}
