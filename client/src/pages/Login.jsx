// Moved from LoginSignup.jsx
import React, { useState } from 'react'

export default function Login({ onAuth }) {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!email || !password || (mode === 'signup' && password !== confirm)) {
      setError('Please fill all fields correctly.')
      return
    }
    const API_BASE = window.__API_BASE__ || 'http://localhost:4000'
    try {
      const res = await fetch(`${API_BASE}/api/auth/${mode}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'server_error')
      onAuth && onAuth(data)
    } catch (e) {
      setError(e.message || 'Server error')
    }
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow max-w-md mx-auto">
      <h3 className="text-lg font-semibold mb-4">{mode === 'login' ? 'Login' : 'Sign Up'}</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-200">Email</label>
          <input value={email} onChange={e => setEmail(e.target.value)} type="email" className="mt-1 block w-full rounded-md border border-gray-300 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-300 dark:focus:ring-amber-600" />
        </div>
        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-200">Password</label>
          <div className="relative">
            <input value={password} onChange={e => setPassword(e.target.value)} type={show ? 'text' : 'password'} className="mt-1 block w-full rounded-md border border-gray-300 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-300 dark:focus:ring-amber-600 pr-10" />
            <button type="button" onClick={() => setShow(s => !s)} className="absolute right-2 top-2 text-gray-500 dark:text-gray-400">{show ? '🙈' : '👁️'}</button>
          </div>
        </div>
        {mode === 'signup' && (
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-200">Confirm Password</label>
            <input value={confirm} onChange={e => setConfirm(e.target.value)} type={show ? 'text' : 'password'} className="mt-1 block w-full rounded-md border border-gray-300 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-300 dark:focus:ring-amber-600" />
          </div>
        )}
        {error && <div className="text-sm text-red-600">{error}</div>}
        <div className="flex items-center gap-3">
          <button type="submit" className="px-4 py-2 bg-amber-500 text-white rounded-md">{mode === 'login' ? 'Login' : 'Sign Up'}</button>
          <button type="button" onClick={() => setMode(m => m === 'login' ? 'signup' : 'login')} className="px-4 py-2 border rounded-md">{mode === 'login' ? 'Switch to Sign Up' : 'Switch to Login'}</button>
        </div>
      </form>
    </div>
  )
}
