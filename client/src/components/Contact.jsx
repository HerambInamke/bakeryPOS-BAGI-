import React from 'react'

export default function Contact() {
  return (
    <section id="contact" className="mt-12 bg-white dark:bg-slate-800 rounded-lg p-6 shadow">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">Ready to get started?</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Contact our team to set up SaleSync for your shop.</p>
        </div>
        <div className="flex gap-3">
          <a className="inline-flex items-center px-4 py-2 bg-amber-500 text-white rounded-md" href="#">Request demo</a>
          <a className="inline-flex items-center px-4 py-2 border border-amber-500 text-amber-600 rounded-md" href="#">Contact sales</a>
        </div>
      </div>
    </section>
  )
}
