'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { insuranceProducts, loadRFQData, RFQSection } from '@/utils/products'
import toast, { Toaster } from 'react-hot-toast'

function CreateRFQContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user } = useAuth()
  
  const [selectedProduct, setSelectedProduct] = useState('')
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [rfqSections, setRfqSections] = useState<RFQSection[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingData, setLoadingData] = useState(false)
  const [isFirstRFQ, setIsFirstRFQ] = useState(true)

  useEffect(() => {
    const productParam = searchParams.get('product')
    if (productParam) {
      handleProductSelect(productParam)
    }
  }, [searchParams])

  const handleProductSelect = async (productId: string) => {
    setSelectedProduct(productId)
    setCurrentSectionIndex(0)
    setFormData({})
    setLoadingData(true)
    
    try {
      const sections = await loadRFQData(productId)
      setRfqSections(sections)
    } catch (error) {
      toast.error('Failed to load product data')
      console.error(error)
    } finally {
      setLoadingData(false)
    }
  }

  const handleInputChange = (fieldKey: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [fieldKey]: value
    }))
  }

  const handleNext = () => {
    const currentSection = rfqSections[currentSectionIndex]
    const requiredFields = currentSection.fields.filter(f => f.required)
    const missingFields = requiredFields.filter(f => {
      const key = `${currentSection.name}_${f.questionNumber}`
      return !formData[key]
    })

    if (missingFields.length > 0) {
      toast.error(`Please fill all required fields`)
      return
    }

    if (currentSectionIndex < rfqSections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1)
    }
  }

  const handleBack = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1)
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
    // Razorpay integration pending - bypass for testing
    toast.success('Payment feature coming soon! Creating RFQ for testing...')
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

    // Handle different response field types
    const responseField = field.responseField.toLowerCase()
    
    if (responseField.includes('yes/no') || responseField.includes('yes or no')) {
      return (
        <div key={fieldKey} style={{ marginBottom: '20px' }}>
          <label className="label">
            {field.question}
            {field.required && <span style={{ color: 'var(--error)' }}> *</span>}
          </label>
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

    if (responseField.includes('date') || responseField.includes('dd/mm/yyyy')) {
      return (
        <div key={fieldKey} style={{ marginBottom: '20px' }}>
          <label className="label">
            {field.question}
            {field.required && <span style={{ color: 'var(--error)' }}> *</span>}
          </label>
          <input
            type="date"
            className="input-field"
            value={value}
            onChange={(e) => handleInputChange(fieldKey, e.target.value)}
            required={field.required}
          />
          {field.instructions && (
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              {field.instructions}
            </p>
          )}
        </div>
      )
    }

    if (responseField.includes('number') || responseField.includes('amount') || responseField.includes('₹')) {
      return (
        <div key={fieldKey} style={{ marginBottom: '20px' }}>
          <label className="label">
            {field.question}
            {field.required && <span style={{ color: 'var(--error)' }}> *</span>}
          </label>
          <input
            type="number"
            className="input-field"
            placeholder={field.responseField.replace('[', '').replace(']', '')}
            value={value}
            onChange={(e) => handleInputChange(fieldKey, e.target.value)}
            required={field.required}
          />
          {field.instructions && (
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              {field.instructions}
            </p>
          )}
        </div>
      )
    }

    if (responseField.includes('email')) {
      return (
        <div key={fieldKey} style={{ marginBottom: '20px' }}>
          <label className="label">
            {field.question}
            {field.required && <span style={{ color: 'var(--error)' }}> *</span>}
          </label>
          <input
            type="email"
            className="input-field"
            placeholder={field.responseField.replace('[', '').replace(']', '')}
            value={value}
            onChange={(e) => handleInputChange(fieldKey, e.target.value)}
            required={field.required}
          />
          {field.instructions && (
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              {field.instructions}
            </p>
          )}
        </div>
      )
    }

    // Default text input
    return (
      <div key={fieldKey} style={{ marginBottom: '20px' }}>
        <label className="label">
          {field.question}
          {field.required && <span style={{ color: 'var(--error)' }}> *</span>}
        </label>
        <input
          type="text"
          className="input-field"
          placeholder={field.responseField.replace('[', '').replace(']', '')}
          value={value}
          onChange={(e) => handleInputChange(fieldKey, e.target.value)}
          required={field.required}
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
          <div className="container" style={{ maxWidth: '1200px' }}>
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
                Select an insurance product to get started ({insuranceProducts.length} products available)
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '16px',
              maxHeight: '600px',
              overflowY: 'auto',
              padding: '4px'
            }}>
              {insuranceProducts.map(product => (
                <button
                  key={product.id}
                  onClick={() => handleProductSelect(product.id)}
                  className="card"
                  style={{
                    padding: '20px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    border: '2px solid transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--primary-purple)'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'transparent'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  <h3 style={{ fontSize: '1rem', marginBottom: '8px' }}>
                    {product.name}
                  </h3>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
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
  const currentSection = rfqSections[currentSectionIndex]

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
            {rfqSections.length > 0 && (
              <div style={{
                display: 'flex',
                gap: '8px',
                marginTop: '24px'
              }}>
                {rfqSections.map((_, index) => (
                  <div
                    key={index}
                    style={{
                      flex: 1,
                      height: '4px',
                      borderRadius: '2px',
                      background: index <= currentSectionIndex ? 'var(--primary-purple)' : 'var(--border)',
                      transition: 'background 0.3s ease'
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {loadingData ? (
            <div className="card" style={{ textAlign: 'center', padding: '60px' }}>
              <div className="loading-spinner" style={{ margin: '0 auto', width: '48px', height: '48px' }}></div>
              <p style={{ marginTop: '20px', color: 'var(--text-secondary)' }}>Loading RFQ questions...</p>
            </div>
          ) : currentSection ? (
            <div className="card">
              <h2 style={{ marginBottom: '24px' }}>
                {currentSection.name}
                <span style={{ 
                  fontSize: '0.875rem', 
                  color: 'var(--text-secondary)',
                  marginLeft: '12px'
                }}>
                  (Section {currentSectionIndex + 1} of {rfqSections.length})
                </span>
              </h2>
              
              <div style={{ maxHeight: '500px', overflowY: 'auto', paddingRight: '12px' }}>
                {currentSection.fields.map(field => renderField(field, currentSection.name))}
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '32px',
                paddingTop: '24px',
                borderTop: '1px solid var(--border-light)'
              }}>
                {currentSectionIndex > 0 ? (
                  <button
                    onClick={handleBack}
                    className="secondary-button"
                  >
                    Back
                  </button>
                ) : (
                  <button
                    onClick={() => setSelectedProduct('')}
                    className="secondary-button"
                  >
                    Cancel
                  </button>
                )}

                {currentSectionIndex < rfqSections.length - 1 ? (
                  <button
                    onClick={handleNext}
                    className="primary-button"
                  >
                    Next Section
                  </button>
                ) : (
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
                )}
              </div>
            </div>
          ) : (
            <div className="card" style={{ textAlign: 'center', padding: '60px' }}>
              <p style={{ color: 'var(--text-secondary)' }}>No data available for this product</p>
              <button
                onClick={() => setSelectedProduct('')}
                className="primary-button"
                style={{ marginTop: '20px' }}
              >
                Select Another Product
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function CreateRFQPage() {
  return (
    <Suspense fallback={
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <div className="loading-spinner" style={{ width: '48px', height: '48px' }}></div>
      </div>
    }>
      <CreateRFQContent />
    </Suspense>
  )
}