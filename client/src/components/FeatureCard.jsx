import React from 'react'

export default function FeatureCard({ title, desc, emoji }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="text-2xl">{emoji}</div>
        <div>
          <div className="font-semibold">{title}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{desc}</div>
        </div>
      </div>
    </div>
  )
}
