'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast'

const sanctuariNetwork = {
  insurers: [
    { id: '1', name: 'HDFC ERGO General Insurance', email: 'contact@hdfcergo.com' },
    { id: '2', name: 'ICICI Lombard', email: 'contact@icicilombard.com' },
    { id: '3', name: 'Bajaj Allianz', email: 'contact@bajajallianz.com' },
    { id: '4', name: 'Tata AIG', email: 'contact@tataaig.com' },
    { id: '5', name: 'New India Assurance', email: 'contact@newindia.co.in' }
  ],
  brokers: [
    { id: '1', name: 'Marsh India', email: 'contact@marsh.com' },
    { id: '2', name: 'Willis Towers Watson', email: 'contact@willistowerswatson.com' },
    { id: '3', name: 'Aon India', email: 'contact@aon.com' },
    { id: '4', name: 'JB Boda', email: 'contact@jbboda.com' }
  ]
}

export default function RFQDistributionPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [customEmails, setCustomEmails] = useState<string[]>([''])
  const [selectedInsurers, setSelectedInsurers] = useState<string[]>([])
  const [selectedBrokers, setSelectedBrokers] = useState<string[]>([])
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)

  const handleAddEmail = () => {
    setCustomEmails([...customEmails, ''])
  }

  const handleEmailChange = (index: number, value: string) => {
    const newEmails = [...customEmails]
    newEmails[index] = value
    setCustomEmails(newEmails)
  }

  const handleRemoveEmail = (index: number) => {
    setCustomEmails(customEmails.filter((_, i) => i !== index))
  }

  const toggleInsurer = (id: string) => {
    setSelectedInsurers(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const toggleBroker = (id: string) => {
    setSelectedBrokers(prev =>
      prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
    )
  }

  const handleDistribute = async () => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const totalRecipients = customEmails.filter(e => e).length + 
                             selectedInsurers.length + 
                             selectedBrokers.length
      
      toast.success(`RFQ distributed to ${totalRecipients} recipients`)
      
      setTimeout(() => {
        router.push(`/rfq/${params.id}/dashboard`)
      }, 1500)
    } catch (error) {
      toast.error('Failed to distribute RFQ')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--background-secondary)' }}>
      <Toaster position="top-right" />
      <div className="content-wrapper">
        <div className="container" style={{ maxWidth: '960px' }}>
          <div style={{ marginBottom: '40px' }}>
            <h1>Distribute Your RFQ</h1>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
              Select insurers and brokers to receive your RFQ
            </p>
            
            <div style={{
              display: 'flex',
              gap: '8px',
              marginTop: '24px'
            }}>
              {[1, 2].map((s) => (
                <div
                  key={s}
                  style={{
                    flex: 1,
                    height: '4px',
                    borderRadius: '2px',
                    background: s <= step ? 'var(--primary-purple)' : 'var(--border)',
                    transition: 'background 0.3s ease'
                  }}
                />
              ))}
            </div>
          </div>

          {step === 1 && (
            <div className="card fade-in">
              <h2 style={{ marginBottom: '24px' }}>Add Your Existing Contacts</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
                Add email addresses of brokers or insurers you've worked with before
              </p>

              {customEmails.map((email, index) => (
                <div key={index} style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                  <input
                    type="email"
                    className="input-field"
                    placeholder="Enter email address"
                    value={email}
                    onChange={(e) => handleEmailChange(index, e.target.value)}
                    style={{ flex: 1 }}
                  />
                  {customEmails.length > 1 && (
                    <button
                      onClick={() => handleRemoveEmail(index)}
                      className="secondary-button"
                      style={{ padding: '12px 20px' }}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}

              <button
                onClick={handleAddEmail}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--primary-purple)',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  marginTop: '12px'
                }}
              >
                + Add another email
              </button>

              <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: '32px',
                paddingTop: '24px',
                borderTop: '1px solid var(--border-light)'
              }}>
                <button
                  onClick={() => setStep(2)}
                  className="primary-button"
                >
                  Continue to Sanctuari Network
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="fade-in">
              <div className="card" style={{ marginBottom: '24px' }}>
                <h2 style={{ marginBottom: '24px' }}>Select from Sanctuari Network</h2>
                
                <div style={{ marginBottom: '32px' }}>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Insurers</h3>
                  <div style={{ display: 'grid', gap: '12px' }}>
                    {sanctuariNetwork.insurers.map(insurer => (
                      <label
                        key={insurer.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: '16px',
                          background: selectedInsurers.includes(insurer.id) ? 
                            'rgba(124, 58, 237, 0.05)' : 'white',
                          border: `2px solid ${selectedInsurers.includes(insurer.id) ? 
                            'var(--primary-purple)' : 'var(--border)'}`,
                          borderRadius: '8px',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={selectedInsurers.includes(insurer.id)}
                          onChange={() => toggleInsurer(insurer.id)}
                          style={{ marginRight: '12px' }}
                        />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: '500' }}>{insurer.name}</div>
                          <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                            {insurer.email}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Partner Brokers</h3>
                  <div style={{ display: 'grid', gap: '12px' }}>
                    {sanctuariNetwork.brokers.map(broker => (
                      <label
                        key={broker.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: '16px',
                          background: selectedBrokers.includes(broker.id) ? 
                            'rgba(124, 58, 237, 0.05)' : 'white',
                          border: `2px solid ${selectedBrokers.includes(broker.id) ? 
                            'var(--primary-purple)' : 'var(--border)'}`,
                          borderRadius: '8px',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={selectedBrokers.includes(broker.id)}
                          onChange={() => toggleBroker(broker.id)}
                          style={{ marginRight: '12px' }}
                        />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: '500' }}>{broker.name}</div>
                          <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                            {broker.email}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="card">
                <h3 style={{ marginBottom: '16px' }}>Distribution Summary</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                  <div style={{ 
                    padding: '16px',
                    background: 'var(--background-secondary)',
                    borderRadius: '8px',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: '600', color: 'var(--primary-purple)' }}>
                      {customEmails.filter(e => e).length}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      Custom Emails
                    </div>
                  </div>
                  <div style={{ 
                    padding: '16px',
                    background: 'var(--background-secondary)',
                    borderRadius: '8px',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: '600', color: 'var(--primary-purple)' }}>
                      {selectedInsurers.length}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      Insurers
                    </div>
                  </div>
                  <div style={{ 
                    padding: '16px',
                    background: 'var(--background-secondary)',
                    borderRadius: '8px',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: '600', color: 'var(--primary-purple)' }}>
                      {selectedBrokers.length}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      Brokers
                    </div>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '32px',
                  paddingTop: '24px',
                  borderTop: '1px solid var(--border-light)'
                }}>
                  <button
                    onClick={() => setStep(1)}
                    className="secondary-button"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleDistribute}
                    className="primary-button"
                    disabled={loading}
                  >
                    {loading ? (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span className="loading-spinner"></span>
                        Distributing RFQ...
                      </span>
                    ) : (
                      'Distribute RFQ'
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}