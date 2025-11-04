import React from 'react'

export default function Footer() {
  return (
    <footer className="mt-12 border-t bg-amber-50 dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-6 py-6 text-sm text-gray-600 dark:text-gray-300 flex items-center justify-between">
        <div>© {new Date().getFullYear()} SaleSync</div>
        <div className="flex gap-4">
          <a className="hover:underline" href="#">Privacy</a>
          <a className="hover:underline" href="#">Terms</a>
        </div>
      </div>
    </footer>
  )
}
