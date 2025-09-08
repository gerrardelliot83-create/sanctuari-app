'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import toast, { Toaster } from 'react-hot-toast'

const industries = [
  'Manufacturing',
  'IT & Software',
  'Healthcare',
  'Retail & E-commerce',
  'Financial Services',
  'Real Estate',
  'Transportation & Logistics',
  'Hospitality',
  'Education',
  'Construction',
  'Other'
]

const companySizes = [
  '1-10 employees',
  '11-50 employees',
  '51-200 employees',
  '201-500 employees',
  '500+ employees'
]

// Popular products to show during onboarding
const popularProducts = [
  { id: 'commercial_general_liability', name: 'Commercial General Liability', icon: 'CGL' },
  { id: 'fire_special_perils', name: 'Fire & Special Perils', icon: 'FSP' },
  { id: 'cyber_liability', name: 'Cyber Liability Insurance', icon: 'CL' },
  { id: 'directors_officers', name: 'Directors & Officers Liability', icon: 'D&O' },
  { id: 'workmen_compensation', name: "Workmen's Compensation", icon: 'WC' },
  { id: 'professional_indemnity', name: 'Professional Indemnity', icon: 'PI' },
  { id: 'marine_cargo_open', name: 'Marine Cargo Insurance', icon: 'MC' },
  { id: 'group_health', name: 'Group Health Insurance', icon: 'GH' },
  { id: 'product_liability', name: 'Product Liability', icon: 'PL' },
  { id: 'public_liability_industrial', name: 'Public Liability', icon: 'PL' },
  { id: 'business_interruption', name: 'Business Interruption', icon: 'BI' },
  { id: 'view_all', name: 'View All 47 Products', icon: '→' }
]

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    industry: '',
    companySize: '',
    annualRevenue: '',
    gstNumber: '',
    panNumber: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    website: '',
    description: '',
    selectedProduct: ''
  })
  
  const router = useRouter()
  const { user } = useAuth()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleProductSelect = (productId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedProduct: productId
    }))
  }

  const handleNext = () => {
    if (step === 1) {
      if (!formData.industry || !formData.companySize) {
        toast.error('Please fill in all required fields')
        return
      }
    } else if (step === 2) {
      if (!formData.address || !formData.city || !formData.state || !formData.pincode) {
        toast.error('Please fill in all required fields')
        return
      }
    }
    setStep(step + 1)
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const handleComplete = async () => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      if (formData.selectedProduct === 'view_all') {
        router.push('/rfq/create')
      } else if (formData.selectedProduct) {
        router.push(`/rfq/create?product=${formData.selectedProduct}`)
      } else {
        router.push('/dashboard')
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-container" style={{ minHeight: '100vh' }}>
      <Toaster position="top-right" />
      <div className="content-wrapper">
        <div className="container" style={{ maxWidth: '720px' }}>
          <div style={{ marginBottom: '40px' }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '32px'
            }}>
              <h1 style={{ 
                fontSize: '2rem',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Welcome to Sanctuari
              </h1>
              <span className="badge badge-info">
                Step {step} of 3
              </span>
            </div>
            
            <div style={{
              display: 'flex',
              gap: '8px',
              marginBottom: '32px'
            }}>
              {[1, 2, 3].map((s) => (
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

          <div className="glass-card">
            {step === 1 && (
              <div className="fade-in">
                <h2 style={{ marginBottom: '24px' }}>Tell us about your business</h2>
                
                <div style={{ display: 'grid', gap: '20px' }}>
                  <div>
                    <label className="label" htmlFor="industry">
                      Industry *
                    </label>
                    <select
                      id="industry"
                      name="industry"
                      className="input-field"
                      value={formData.industry}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select your industry</option>
                      {industries.map(ind => (
                        <option key={ind} value={ind}>{ind}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="label" htmlFor="companySize">
                      Company Size *
                    </label>
                    <select
                      id="companySize"
                      name="companySize"
                      className="input-field"
                      value={formData.companySize}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select company size</option>
                      {companySizes.map(size => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="label" htmlFor="annualRevenue">
                      Annual Revenue (₹)
                    </label>
                    <input
                      id="annualRevenue"
                      name="annualRevenue"
                      type="number"
                      className="input-field"
                      placeholder="Enter annual revenue"
                      value={formData.annualRevenue}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="label" htmlFor="website">
                      Company Website
                    </label>
                    <input
                      id="website"
                      name="website"
                      type="url"
                      className="input-field"
                      placeholder="https://example.com"
                      value={formData.website}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="label" htmlFor="description">
                      Business Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      className="input-field"
                      placeholder="Briefly describe your business..."
                      rows={3}
                      value={formData.description}
                      onChange={handleChange}
                      style={{ resize: 'vertical' }}
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="fade-in">
                <h2 style={{ marginBottom: '24px' }}>Business Details</h2>
                
                <div style={{ display: 'grid', gap: '20px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label className="label" htmlFor="gstNumber">
                        GST Number
                      </label>
                      <input
                        id="gstNumber"
                        name="gstNumber"
                        type="text"
                        className="input-field"
                        placeholder="Enter GST number"
                        value={formData.gstNumber}
                        onChange={handleChange}
                      />
                    </div>

                    <div>
                      <label className="label" htmlFor="panNumber">
                        PAN Number
                      </label>
                      <input
                        id="panNumber"
                        name="panNumber"
                        type="text"
                        className="input-field"
                        placeholder="Enter PAN number"
                        value={formData.panNumber}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="label" htmlFor="address">
                      Business Address *
                    </label>
                    <input
                      id="address"
                      name="address"
                      type="text"
                      className="input-field"
                      placeholder="Enter business address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
                    <div>
                      <label className="label" htmlFor="city">
                        City *
                      </label>
                      <input
                        id="city"
                        name="city"
                        type="text"
                        className="input-field"
                        placeholder="Enter city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div>
                      <label className="label" htmlFor="pincode">
                        Pincode *
                      </label>
                      <input
                        id="pincode"
                        name="pincode"
                        type="text"
                        className="input-field"
                        placeholder="Enter pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="label" htmlFor="state">
                      State *
                    </label>
                    <input
                      id="state"
                      name="state"
                      type="text"
                      className="input-field"
                      placeholder="Enter state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="fade-in">
                <h2 style={{ marginBottom: '8px' }}>Select your first insurance product</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
                  Your first RFQ placement is completely free!
                </p>
                
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                  gap: '16px',
                  marginBottom: '24px'
                }}>
                  {popularProducts.map(product => (
                    <button
                      key={product.id}
                      onClick={() => handleProductSelect(product.id)}
                      className="glass-button"
                      style={{
                        padding: '20px',
                        textAlign: 'center',
                        border: formData.selectedProduct === product.id ? 
                          '2px solid var(--primary-purple)' : 
                          '1px solid var(--glass-border)',
                        background: formData.selectedProduct === product.id ?
                          'rgba(124, 58, 237, 0.05)' : 
                          'var(--glass-bg)'
                      }}
                    >
                      <div style={{ 
                        fontSize: '1.25rem', 
                        marginBottom: '8px',
                        fontWeight: '700',
                        color: formData.selectedProduct === product.id ? 
                          'var(--primary-purple)' : 
                          'var(--text-secondary)'
                      }}>
                        {product.icon}
                      </div>
                      <div style={{ 
                        fontSize: '0.875rem', 
                        fontWeight: '500',
                        color: 'var(--text-primary)'
                      }}>
                        {product.name}
                      </div>
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setFormData(prev => ({ ...prev, selectedProduct: '' }))}
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.875rem',
                    textDecoration: 'underline',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Skip for now
                </button>
              </div>
            )}

            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              marginTop: '32px',
              paddingTop: '24px',
              borderTop: '1px solid var(--border-light)'
            }}>
              {step > 1 ? (
                <button
                  onClick={handleBack}
                  className="secondary-button"
                >
                  Back
                </button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <button
                  onClick={handleNext}
                  className="primary-button"
                >
                  Continue
                </button>
              ) : (
                <button
                  onClick={handleComplete}
                  className="primary-button"
                  disabled={loading}
                >
                  {loading ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className="loading-spinner"></span>
                      Setting up...
                    </span>
                  ) : (
                    formData.selectedProduct ? 'Create First RFQ' : 'Complete Setup'
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}