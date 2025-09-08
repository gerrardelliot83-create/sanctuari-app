'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import toast, { Toaster } from 'react-hot-toast'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      toast.error('Please enter your email')
      return
    }

    setLoading(true)
    
    try {
      const { error } = await signIn(email)
      
      if (error) {
        toast.error(error.message)
      } else {
        toast.success('Magic link sent! Check your email.')
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-container">
      <Toaster position="top-right" />
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div className="glass-card" style={{
          width: '100%',
          maxWidth: '420px',
          padding: '40px'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ 
              fontSize: '2.5rem', 
              marginBottom: '8px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Sanctuari
            </h1>
            <p style={{ color: 'var(--text-secondary)' }}>
              Insurance made simple for businesses
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '24px' }}>
              <label className="label" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className="input-field"
                placeholder="Enter your business email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className="primary-button"
              style={{ width: '100%' }}
              disabled={loading}
            >
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <span className="loading-spinner"></span>
                  Sending magic link...
                </span>
              ) : (
                'Send Magic Link'
              )}
            </button>
          </form>

          <div style={{ 
            marginTop: '32px', 
            paddingTop: '32px', 
            borderTop: '1px solid var(--border-light)',
            textAlign: 'center'
          }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              Don't have an account?{' '}
              <Link href="/auth/signup" style={{ fontWeight: '600' }}>
                Sign up for free
              </Link>
            </p>
          </div>

          <div style={{ 
            marginTop: '24px',
            textAlign: 'center'
          }}>
            <p style={{ 
              color: 'var(--text-light)', 
              fontSize: '0.75rem',
              lineHeight: '1.5'
            }}>
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}