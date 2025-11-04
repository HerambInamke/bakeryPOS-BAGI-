import React from 'react'

export default function AdminDashboard({ user, activeTab }) {
  function renderTabContent() {
    switch (activeTab) {
      case 'users':
        return (
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow">
            <div className="font-semibold text-lg mb-2">Users</div>
            <div className="text-gray-600 dark:text-gray-300">User management tools will appear here.</div>
          </div>
        );
      case 'settings':
        return (
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow">
            <div className="font-semibold text-lg mb-2">Settings</div>
            <div className="text-gray-600 dark:text-gray-300">System settings and configuration will appear here.</div>
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <div className="text-sm text-gray-600 dark:text-gray-400">Signed in as {user.email}</div>
      </div>
      {renderTabContent()}
    </div>
  )
}
