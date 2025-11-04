import React from 'react'

export default function Sales({ locked }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow">
      <h3 className="text-lg font-semibold mb-4">Sales</h3>
      {locked ? (
        <div className="text-sm text-gray-600 dark:text-gray-400">Complete your shop profile to unlock sales reporting and POS features.</div>
      ) : (
        <div className="text-gray-700 dark:text-gray-300">Sales dashboard and quick checkout tools will appear here (placeholder).</div>
      )}
    </div>
  )
}
