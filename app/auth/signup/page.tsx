'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import toast, { Toaster } from 'react-hot-toast'

export default function SignupPage() {
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    companyName: '',
    phone: ''
  })
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.email || !formData.fullName || !formData.companyName) {
      toast.error('Please fill in all required fields')
      return
    }

    setLoading(true)
    
    try {
      localStorage.setItem('signupData', JSON.stringify(formData))
      
      const { error } = await signIn(formData.email)
      
      if (error) {
        toast.error(error.message)
      } else {
        toast.success('Magic link sent! Check your email to complete signup.')
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
          maxWidth: '480px',
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
              Welcome to Sanctuari
            </h1>
            <p style={{ color: 'var(--text-secondary)' }}>
              Start your journey to simplified insurance
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label className="label" htmlFor="fullName">
                Full Name *
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                className="input-field"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                disabled={loading}
                required
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label className="label" htmlFor="email">
                Business Email *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="input-field"
                placeholder="Enter your business email"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
                required
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label className="label" htmlFor="companyName">
                Company Name *
              </label>
              <input
                id="companyName"
                name="companyName"
                type="text"
                className="input-field"
                placeholder="Enter your company name"
                value={formData.companyName}
                onChange={handleChange}
                disabled={loading}
                required
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label className="label" htmlFor="phone">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                className="input-field"
                placeholder="+91 9876543210"
                value={formData.phone}
                onChange={handleChange}
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
                  Creating account...
                </span>
              ) : (
                'Get Started Free'
              )}
            </button>

            <div style={{
              marginTop: '16px',
              padding: '16px',
              background: 'rgba(124, 58, 237, 0.05)',
              borderRadius: '8px',
              border: '1px solid rgba(124, 58, 237, 0.1)'
            }}>
              <p style={{ 
                fontSize: '0.875rem', 
                color: 'var(--primary-purple)',
                textAlign: 'center',
                fontWeight: '500'
              }}>
                Your first RFQ placement is FREE!
              </p>
            </div>
          </form>

          <div style={{ 
            marginTop: '32px', 
            paddingTop: '32px', 
            borderTop: '1px solid var(--border-light)',
            textAlign: 'center'
          }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              Already have an account?{' '}
              <Link href="/auth/login" style={{ fontWeight: '600' }}>
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}