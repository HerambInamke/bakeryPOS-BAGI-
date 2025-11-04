import React from 'react'

export default function Cashiers({ locked }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow">
      <h3 className="text-lg font-semibold mb-4">Cashiers</h3>
      {locked ? (
        <div className="text-sm text-gray-600 dark:text-gray-400">Complete your shop profile to add or manage cashiers.</div>
      ) : (
        <div className="text-gray-700 dark:text-gray-300">Manage cashier accounts and permissions here (placeholder).</div>
      )}
    </div>
  )
}
