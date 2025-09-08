'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { insuranceProducts, RFQSection } from '@/utils/rfq-parser'
import toast, { Toaster } from 'react-hot-toast'

export default function CreateRFQPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user } = useAuth()
  
  const [selectedProduct, setSelectedProduct] = useState('')
  const [currentSection, setCurrentSection] = useState(0)
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [rfqSections, setRfqSections] = useState<RFQSection[]>([])
  const [loading, setLoading] = useState(false)
  const [isFirstRFQ, setIsFirstRFQ] = useState(true)

  useEffect(() => {
    const productParam = searchParams.get('product')
    if (productParam) {
      setSelectedProduct(productParam)
    }
  }, [searchParams])

  const handleProductSelect = (productId: string) => {
    setSelectedProduct(productId)
    setCurrentSection(0)
    setFormData({})
  }

  const handleInputChange = (fieldKey: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [fieldKey]: value
    }))
  }

  const handleNext = () => {
    if (currentSection < rfqSections.length - 1) {
      setCurrentSection(currentSection + 1)
    }
  }

  const handleBack = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      if (!isFirstRFQ) {
        await initiatePayment()
      } else {
        await createRFQ()
      }
    } catch (error) {
      toast.error('Failed to create RFQ. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const initiatePayment = async () => {
    toast.success('Redirecting to payment...')
    setTimeout(() => {
      router.push('/rfq/distribution/new-rfq-id')
    }, 2000)
  }

  const createRFQ = async () => {
    toast.success('RFQ created successfully!')
    setTimeout(() => {
      router.push('/rfq/distribution/new-rfq-id')
    }, 1500)
  }

  const renderField = (field: any, sectionName: string) => {
    const fieldKey = `${sectionName}_${field.questionNumber}`
    const value = formData[fieldKey] || ''

    if (field.responseField.includes('Yes/No')) {
      return (
        <div key={fieldKey} style={{ marginBottom: '20px' }}>
          <label className="label">{field.question}</label>
          <div style={{ display: 'flex', gap: '16px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input
                type="radio"
                name={fieldKey}
                value="yes"
                checked={value === 'yes'}
                onChange={(e) => handleInputChange(fieldKey, e.target.value)}
              />
              Yes
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input
                type="radio"
                name={fieldKey}
                value="no"
                checked={value === 'no'}
                onChange={(e) => handleInputChange(fieldKey, e.target.value)}
              />
              No
            </label>
          </div>
          {field.instructions && (
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              {field.instructions}
            </p>
          )}
        </div>
      )
    }

    return (
      <div key={fieldKey} style={{ marginBottom: '20px' }}>
        <label className="label">
          {field.question}
          {field.responseField.includes('Enter') && ' *'}
        </label>
        <input
          type="text"
          className="input-field"
          placeholder={field.responseField.replace('[', '').replace(']', '')}
          value={value}
          onChange={(e) => handleInputChange(fieldKey, e.target.value)}
        />
        {field.instructions && (
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            {field.instructions}
          </p>
        )}
      </div>
    )
  }

  if (!selectedProduct) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--background-secondary)' }}>
        <Toaster position="top-right" />
        <div className="content-wrapper">
          <div className="container" style={{ maxWidth: '960px' }}>
            <div style={{ marginBottom: '40px' }}>
              <button
                onClick={() => router.push('/dashboard')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  marginBottom: '16px',
                  fontSize: '0.875rem'
                }}
              >
                ← Back to Dashboard
              </button>
              <h1>Create New RFQ</h1>
              <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
                Select an insurance product to get started
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '20px'
            }}>
              {insuranceProducts.map(product => (
                <button
                  key={product.id}
                  onClick={() => handleProductSelect(product.id)}
                  className="card"
                  style={{
                    padding: '24px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    border: '2px solid transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--primary-purple)'
                    e.currentTarget.style.transform = 'translateY(-4px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'transparent'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>
                    {product.name}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    Click to create RFQ
                  </p>
                </button>
              ))}
            </div>

            {!isFirstRFQ && (
              <div style={{
                marginTop: '40px',
                padding: '24px',
                background: 'rgba(124, 58, 237, 0.05)',
                borderRadius: '12px',
                border: '1px solid rgba(124, 58, 237, 0.1)',
                textAlign: 'center'
              }}>
                <p style={{ color: 'var(--primary-purple)', fontWeight: '500' }}>
                  This RFQ will require a payment of ₹1,599
                </p>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '8px' }}>
                  Your first RFQ was free. Subsequent placements require a fee.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  const currentProduct = insuranceProducts.find(p => p.id === selectedProduct)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--background-secondary)' }}>
      <Toaster position="top-right" />
      <div className="content-wrapper">
        <div className="container" style={{ maxWidth: '720px' }}>
          <div style={{ marginBottom: '40px' }}>
            <button
              onClick={() => setSelectedProduct('')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                marginBottom: '16px',
                fontSize: '0.875rem'
              }}
            >
              ← Change Product
            </button>
            <h1>{currentProduct?.name} RFQ</h1>
            <div style={{
              display: 'flex',
              gap: '8px',
              marginTop: '24px'
            }}>
              {[1, 2, 3, 4, 5].map((step) => (
                <div
                  key={step}
                  style={{
                    flex: 1,
                    height: '4px',
                    borderRadius: '2px',
                    background: step <= currentSection + 1 ? 'var(--primary-purple)' : 'var(--border)',
                    transition: 'background 0.3s ease'
                  }}
                />
              ))}
            </div>
          </div>

          <div className="card">
            <h2 style={{ marginBottom: '24px' }}>Business Information</h2>
            
            <div>
              <div style={{ marginBottom: '20px' }}>
                <label className="label">Name of Insured *</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Enter company name"
                  value={formData.companyName || ''}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label className="label">Communication Address *</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Enter address"
                  value={formData.address || ''}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                <div>
                  <label className="label">Policy Period From *</label>
                  <input
                    type="date"
                    className="input-field"
                    value={formData.policyFrom || ''}
                    onChange={(e) => handleInputChange('policyFrom', e.target.value)}
                  />
                </div>
                <div>
                  <label className="label">Policy Period To *</label>
                  <input
                    type="date"
                    className="input-field"
                    value={formData.policyTo || ''}
                    onChange={(e) => handleInputChange('policyTo', e.target.value)}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label className="label">Risk Location Address *</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Enter risk location"
                  value={formData.riskLocation || ''}
                  onChange={(e) => handleInputChange('riskLocation', e.target.value)}
                />
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
                onClick={() => router.push('/dashboard')}
                className="secondary-button"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="primary-button"
                disabled={loading}
              >
                {loading ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="loading-spinner"></span>
                    Creating RFQ...
                  </span>
                ) : (
                  isFirstRFQ ? 'Create RFQ (Free)' : 'Proceed to Payment (₹1,599)'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}