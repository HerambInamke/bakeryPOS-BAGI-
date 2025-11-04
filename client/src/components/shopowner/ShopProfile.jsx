import React, { useState, useEffect } from 'react'

const STORAGE_KEY = 'shopProfile'

export default function ShopProfile({ onProfileChange, user, lastSavedProfile }) {
  const [shopName, setShopName] = useState('')
  const [mobile, setMobile] = useState('')
  const [address, setAddress] = useState('')
  const [ownerName, setOwnerName] = useState('')
  const [profilePic, setProfilePic] = useState(null) // base64
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    // If user is provided, try fetching profile from server; otherwise fall back to localStorage
    async function load() {
      const API_BASE = window.__API_BASE__ || 'http://localhost:4000'
      let loaded = false;
      if (user && user.id) {
        try {
          const res = await fetch(`${API_BASE}/api/shop/profile?userId=${user.id}`)
          if (res.ok) {
            const data = await res.json()
            if (data && (data.shopName || data.mobile || data.address || data.ownerName)) {
              // Use camelCase keys from Prisma response
              setShopName(data.shopName || '')
              setMobile(data.mobile || '')
              setAddress(data.address || '')
              setOwnerName(data.ownerName || '')
              setProfilePic(data.profilePic || null)
              onProfileChange && onProfileChange({
                id: data.id,
                shopName: data.shopName || '',
                mobile: data.mobile || '',
                address: data.address || '',
                ownerName: data.ownerName || '',
                profilePic: data.profilePic || null
              })
              // Also update localStorage for consistency
              try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify({
                  id: data.id,
                  shopName: data.shopName || '',
                  mobile: data.mobile || '',
                  address: data.address || '',
                  ownerName: data.ownerName || '',
                  profilePic: data.profilePic || null
                }))
              } catch (e) {}
              loaded = true;
            }
          }
        } catch (e) {
          // ignore and fallback to localStorage
        }
      }

      if (!loaded) {
        try {
          const raw = localStorage.getItem(STORAGE_KEY)
          if (raw) {
            const obj = JSON.parse(raw)
            setShopName(obj.shopName || '')
            setMobile(obj.mobile || '')
            setAddress(obj.address || '')
            setOwnerName(obj.ownerName || '')
            setProfilePic(obj.profilePic || null)
            onProfileChange && onProfileChange(obj)
          }
        } catch (e) {}
      }
    }
    load()
  }, [user])

  function handleFile(e) {
    const file = e.target.files && e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setProfilePic(reader.result)
    reader.readAsDataURL(file)
  }

  // Helper: compare current profile to last saved
  function isChanged() {
    if (!lastSavedProfile) return true;
    return (
      shopName !== (lastSavedProfile.shopName || '') ||
      mobile !== (lastSavedProfile.mobile || '') ||
      address !== (lastSavedProfile.address || '') ||
      ownerName !== (lastSavedProfile.ownerName || '') ||
      profilePic !== (lastSavedProfile.profilePic || null)
    );
  }

  async function save(e) {
    e && e.preventDefault()
    setError('')
    setSuccess('')
    // Validation
    if (!shopName || !mobile || !address || !ownerName) {
      setError('Please fill all fields to complete the shop profile.')
      return
    }
    if (!/^\d{10,15}$/.test(mobile)) {
      setError('Mobile number must be 10-15 digits.')
      return
    }
    if (address.length < 5) {
      setError('Address must be at least 5 characters.')
      return
    }
    const obj = { shopName, mobile, address, ownerName, profilePic }

    // If user present, persist to server, otherwise localStorage
    if (user && user.id) {
      try {
        const API_BASE = window.__API_BASE__ || 'http://localhost:4000'
        const res = await fetch(`${API_BASE}/api/shop/profile`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id, shopName, mobile, address, ownerName, profilePic })
        })
        if (!res.ok) throw new Error('server')
        onProfileChange && onProfileChange(obj)
        setSuccess('Profile saved successfully!')
        return
      } catch (e) {
        setError('Failed to save to server; saved locally instead')
      }
    }

    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(obj)) } catch (e) {}
    onProfileChange && onProfileChange(obj)
    setSuccess('Profile saved locally!')
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow">
      <h3 className="text-lg font-semibold mb-4">Shop Profile</h3>
      <form onSubmit={save} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-200">Shop name</label>
          <input value={shopName} onChange={e => setShopName(e.target.value)} className="mt-1 block w-full rounded-md border border-gray-300 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-300 dark:focus:ring-amber-600" />
        </div>

        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-200">Shop mobile number</label>
          <input value={mobile} onChange={e => setMobile(e.target.value)} className="mt-1 block w-full rounded-md border border-gray-300 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-300 dark:focus:ring-amber-600" />
        </div>

        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-200">Shop address</label>
          <textarea value={address} onChange={e => setAddress(e.target.value)} className="mt-1 block w-full rounded-md border border-gray-300 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-300 dark:focus:ring-amber-600" rows={3} />
        </div>

        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-200">Owner name</label>
          <input value={ownerName} onChange={e => setOwnerName(e.target.value)} className="mt-1 block w-full rounded-md border border-gray-300 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-300 dark:focus:ring-amber-600" />
        </div>

        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-200">Profile picture</label>
          <div className="mt-1 flex items-center gap-3">
            <input type="file" accept="image/*" onChange={handleFile} />
            {profilePic && <img src={profilePic} alt="profile" className="h-16 w-16 rounded-full object-cover border" />}
          </div>
        </div>

  {error && <div className="text-sm text-red-600">{error}</div>}
  {success && <div className="text-sm text-green-600">{success}</div>}

        <div className="flex items-center gap-3">
          <button
            type="submit"
            className={`px-4 py-2 rounded-md text-white ${isChanged() ? 'bg-amber-500' : 'bg-gray-400 cursor-not-allowed'}`}
            disabled={!isChanged()}
          >
            Save profile
          </button>
          <button type="button" onClick={() => {
            setShopName(''); setMobile(''); setAddress(''); setOwnerName(''); setProfilePic(null); setError(''); setSuccess('');
            if (!user || !user.id) { try { localStorage.removeItem(STORAGE_KEY) } catch (e) {} }
          }} className="px-4 py-2 border rounded-md">Reset</button>
        </div>
      </form>
    </div>
  )
}
