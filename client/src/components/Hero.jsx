import React from 'react'

export default function Hero() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div>
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">SaleSync — Simplify your bakery sales</h1>
        <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">Fast, modern point of sale with inventory management, WhatsApp bill sending, loyalty points and interactive sales dashboards — built for small shops and bakeries.</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a id="get-started" className="inline-flex items-center px-5 py-3 bg-amber-500 text-white rounded-md shadow hover:bg-amber-600" href="#">Start free trial</a>
          <a className="inline-flex items-center px-5 py-3 border border-amber-500 text-amber-600 rounded-md hover:bg-amber-50 dark:hover:bg-slate-800" href="#features">See features</a>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-200/10 flex items-center justify-center text-amber-600">✓</div>
            <div>
              <div className="font-medium">Easy setup</div>
              <div className="text-xs">Start in minutes</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-200/10 flex items-center justify-center text-amber-600">⚡</div>
            <div>
              <div className="font-medium">Fast checkout</div>
              <div className="text-xs">Optimized for speed</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Live demo</h3>
        <div className="h-64 bg-gradient-to-b from-amber-50 to-white dark:from-slate-800 dark:to-slate-700 border rounded-md flex items-center justify-center text-amber-600 dark:text-amber-300">Interactive sales dashboard preview</div>
      </div>
    </section>
  )
}
