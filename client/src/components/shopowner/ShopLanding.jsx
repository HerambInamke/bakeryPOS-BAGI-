import React from 'react'

export default function ShopLanding({ profile, locked }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow">
      <h3 className="text-lg font-semibold mb-4">Shop Landing Page</h3>
      {locked ? (
        <div className="text-sm text-gray-600 dark:text-gray-400">Complete your shop profile to publish your shop landing page.</div>
      ) : (
        <div className="text-gray-700 dark:text-gray-300">
          <div className="flex items-center gap-4">
            {profile?.profilePic ? <img src={profile.profilePic} alt="shop" className="h-20 w-20 rounded-full object-cover" /> : <div className="h-20 w-20 rounded-full bg-gray-200" />}
            <div>
              <div className="text-xl font-semibold">{profile?.shopName}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{profile?.address}</div>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">This is a preview of your shop landing page (placeholder).</div>
        </div>
      )}
    </div>
  )
}
