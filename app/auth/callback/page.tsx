'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Auth callback error:', error)
          router.push('/auth/login')
          return
        }

        if (session) {
          const signupData = localStorage.getItem('signupData')
          
          if (signupData) {
            const data = JSON.parse(signupData)
            localStorage.removeItem('signupData')
            router.push('/onboarding')
          } else {
            router.push('/dashboard')
          }
        } else {
          router.push('/auth/login')
        }
      } catch (error) {
        console.error('Error in auth callback:', error)
        router.push('/auth/login')
      }
    }

    handleAuthCallback()
  }, [router])

  return (
    <div className="page-container">
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div className="glass-card" style={{
          padding: '40px',
          textAlign: 'center'
        }}>
          <div className="loading-spinner" style={{
            width: '48px',
            height: '48px',
            margin: '0 auto 24px'
          }}></div>
          <h2>Verifying your account...</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
            Please wait while we log you in
          </p>
        </div>
      </div>
    </div>
  )
}