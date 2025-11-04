import React from 'react'
import FeatureCard from './FeatureCard'

const FEATURES = [
  { title: 'Point of Sale', desc: 'Quick product search, barcode scanning, and fast checkout flows.', emoji: '💳' },
  { title: 'Inventory Management', desc: 'Track stock levels, low-stock alerts, and supplier info.', emoji: '📦' },
  { title: 'WhatsApp bill sending', desc: 'Send bills and receipts via WhatsApp with one click.', emoji: '📲' },
  { title: 'Customer Loyalty points', desc: 'Reward repeat customers and redeem points at checkout.', emoji: '🎁' },
  { title: 'Interactive Sales Dashboard', desc: 'Visualize sales, best-sellers, and daily trends in real time.', emoji: '📊' },
  { title: 'Reports & Exports', desc: 'Export sales and inventory reports for accounting.', emoji: '📤' },
]

export default function Features() {
  return (
    <section id="features" className="mt-12">
      <h2 className="text-2xl font-bold">Key features</h2>
      <p className="mt-2 text-gray-600 dark:text-gray-400">Everything you need to run sales, manage stock and keep customers coming back.</p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURES.map(f => (
          <FeatureCard key={f.title} title={f.title} desc={f.desc} emoji={f.emoji} />
        ))}
      </div>
    </section>
  )
}
