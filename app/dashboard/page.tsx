'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import Link from 'next/link'

const statsData = [
  { label: 'Active RFQs', value: '3', color: 'var(--primary-purple)' },
  { label: 'Quotes Received', value: '12', color: 'var(--success)' },
  { label: 'Pending Reviews', value: '5', color: 'var(--warning)' },
  { label: 'Saved This Month', value: '₹45,000', color: 'var(--info)' }
]

const recentRFQs = [
  { id: '1', product: 'Commercial General Liability', status: 'active', quotes: 4, deadline: '2025-09-15' },
  { id: '2', product: 'Cyber Liability Insurance', status: 'active', quotes: 3, deadline: '2025-09-18' },
  { id: '3', product: 'Directors & Officers Liability', status: 'closed', quotes: 5, deadline: '2025-09-05' }
]

export default function DashboardPage() {
  const { user, signOut } = useAuth()
  const router = useRouter()
  const [greeting, setGreeting] = useState('')

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Good morning')
    else if (hour < 18) setGreeting('Good afternoon')
    else setGreeting('Good evening')
  }, [])

  const handleCreateRFQ = () => {
    router.push('/rfq/create')
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--background-secondary)' }}>
      <nav style={{
        background: 'white',
        borderBottom: '1px solid var(--border)',
        padding: '16px 0',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
              <h2 style={{
                fontSize: '1.5rem',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Sanctuari
              </h2>
              <nav style={{ display: 'flex', gap: '24px' }}>
                <Link href="/dashboard" style={{ 
                  color: 'var(--primary-purple)', 
                  fontWeight: '500' 
                }}>
                  Dashboard
                </Link>
                <Link href="/rfq" style={{ 
                  color: 'var(--text-secondary)' 
                }}>
                  RFQs
                </Link>
                <Link href="/quotes" style={{ 
                  color: 'var(--text-secondary)' 
                }}>
                  Quotes
                </Link>
                <Link href="/settings" style={{ 
                  color: 'var(--text-secondary)' 
                }}>
                  Settings
                </Link>
              </nav>
            </div>
            <button
              onClick={signOut}
              className="secondary-button"
              style={{ padding: '8px 16px', fontSize: '0.875rem' }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      <div className="content-wrapper">
        <div className="container">
          <div style={{ marginBottom: '40px' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>
              {greeting}, {user?.email?.split('@')[0] || 'User'}!
            </h1>
            <p style={{ color: 'var(--text-secondary)' }}>
              Here's what's happening with your insurance requirements today.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
            marginBottom: '40px'
          }}>
            {statsData.map((stat, index) => (
              <div key={index} className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <p style={{ 
                      color: 'var(--text-secondary)', 
                      fontSize: '0.875rem',
                      marginBottom: '8px'
                    }}>
                      {stat.label}
                    </p>
                    <h3 style={{ 
                      fontSize: '2rem', 
                      fontWeight: '700',
                      color: stat.color
                    }}>
                      {stat.value}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
            <div className="card">
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '24px'
              }}>
                <h2 style={{ fontSize: '1.25rem' }}>Recent RFQs</h2>
                <button
                  onClick={handleCreateRFQ}
                  className="primary-button"
                  style={{ padding: '8px 16px', fontSize: '0.875rem' }}
                >
                  + Create New RFQ
                </button>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border)' }}>
                      <th style={{ 
                        padding: '12px', 
                        textAlign: 'left',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        color: 'var(--text-secondary)'
                      }}>
                        Product
                      </th>
                      <th style={{ 
                        padding: '12px', 
                        textAlign: 'left',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        color: 'var(--text-secondary)'
                      }}>
                        Status
                      </th>
                      <th style={{ 
                        padding: '12px', 
                        textAlign: 'left',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        color: 'var(--text-secondary)'
                      }}>
                        Quotes
                      </th>
                      <th style={{ 
                        padding: '12px', 
                        textAlign: 'left',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        color: 'var(--text-secondary)'
                      }}>
                        Deadline
                      </th>
                      <th style={{ 
                        padding: '12px', 
                        textAlign: 'left',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        color: 'var(--text-secondary)'
                      }}>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentRFQs.map(rfq => (
                      <tr key={rfq.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                        <td style={{ padding: '16px 12px', fontSize: '0.95rem' }}>
                          {rfq.product}
                        </td>
                        <td style={{ padding: '16px 12px' }}>
                          <span className={`badge ${rfq.status === 'active' ? 'badge-success' : 'badge-warning'}`}>
                            {rfq.status}
                          </span>
                        </td>
                        <td style={{ padding: '16px 12px', fontSize: '0.95rem' }}>
                          {rfq.quotes}
                        </td>
                        <td style={{ padding: '16px 12px', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                          {new Date(rfq.deadline).toLocaleDateString('en-IN')}
                        </td>
                        <td style={{ padding: '16px 12px' }}>
                          <Link 
                            href={`/rfq/${rfq.id}`}
                            style={{ 
                              color: 'var(--primary-purple)',
                              fontSize: '0.875rem',
                              fontWeight: '500'
                            }}
                          >
                            View Details →
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="card">
              <h2 style={{ fontSize: '1.25rem', marginBottom: '24px' }}>Quick Actions</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <button
                  onClick={handleCreateRFQ}
                  className="glass-button"
                  style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '16px',
                    textAlign: 'left',
                    width: '100%'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: '500' }}>Create New RFQ</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      Start a new insurance request
                    </div>
                  </div>
                </button>

                <button
                  className="glass-button"
                  style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '16px',
                    textAlign: 'left',
                    width: '100%'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: '500' }}>Invite Team Member</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      Add colleagues to your account
                    </div>
                  </div>
                </button>

                <button
                  className="glass-button"
                  style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '16px',
                    textAlign: 'left',
                    width: '100%'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: '500' }}>View Analytics</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      Track your insurance metrics
                    </div>
                  </div>
                </button>
              </div>

              <div style={{
                marginTop: '24px',
                padding: '16px',
                background: 'rgba(124, 58, 237, 0.05)',
                borderRadius: '8px',
                border: '1px solid rgba(124, 58, 237, 0.1)'
              }}>
                <p style={{ 
                  fontSize: '0.875rem', 
                  color: 'var(--primary-purple)',
                  fontWeight: '500',
                  marginBottom: '8px'
                }}>
                  Pro Tip
                </p>
                <p style={{ 
                  fontSize: '0.75rem', 
                  color: 'var(--text-secondary)',
                  lineHeight: '1.5'
                }}>
                  Compare multiple quotes side-by-side to get the best coverage at competitive rates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}