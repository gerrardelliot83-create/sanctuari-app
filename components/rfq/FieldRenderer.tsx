'use client'

import { useState } from 'react'

interface FieldRendererProps {
  field: any
  sectionName: string
  value: any
  onChange: (key: string, value: any) => void
}

export default function FieldRenderer({ field, sectionName, value, onChange }: FieldRendererProps) {
  const [tagInput, setTagInput] = useState('')
  const fieldKey = `${sectionName}_${field.questionNumber}`
  
  const responseField = field.responseField || ''
  const responseLower = responseField.toLowerCase()
  const instructions = field.instructions || ''
  
  // Detect field type based on response field pattern
  const getFieldType = () => {
    // Dropdown with specific options
    if (responseField.includes('[Select:') || responseField.includes('Select from')) {
      const options = responseField
        .replace('[Select:', '')
        .replace('Select from', '')
        .replace(']', '')
        .split(',')
        .map((opt: string) => opt.trim())
        .filter((opt: string) => opt && opt !== '')
      
      return { type: 'dropdown', options }
    }
    
    // Choice between specific options (not yes/no)
    if (responseField.includes('/') && !responseLower.includes('yes') && !responseLower.includes('no') && !responseLower.includes('mm/yyyy')) {
      const options = responseField
        .replace('[', '')
        .replace(']', '')
        .split('/')
        .map((opt: string) => opt.trim())
      
      if (options.length >= 2 && options.length <= 5) {
        return { type: 'dropdown', options }
      }
    }
    
    // Multi-entry fields (tables/lists)
    if (responseField.includes('Enter for each:') || responseField.includes('for each')) {
      return { type: 'multi-entry' }
    }
    
    // Date range
    if (responseField.includes('From To') || responseField.includes('From:') && responseField.includes('To:')) {
      return { type: 'date-range' }
    }
    
    // Single date
    if (responseLower.includes('date') || responseLower.includes('dd/mm/yyyy') || responseLower.includes('dob')) {
      return { type: 'date' }
    }
    
    // Yes/No questions
    if (responseLower.includes('yes/no') || responseLower.includes('yes or no')) {
      return { type: 'yes-no' }
    }
    
    // Number fields
    if (responseLower.includes('number') || responseLower.includes('amount') || 
        responseLower.includes('₹') || responseLower.includes('count') || 
        responseLower.includes('percentage') || responseLower.includes('%')) {
      return { type: 'number' }
    }
    
    // Email
    if (responseLower.includes('email')) {
      return { type: 'email' }
    }
    
    // Phone
    if (responseLower.includes('phone') || responseLower.includes('mobile') || 
        responseLower.includes('contact number')) {
      return { type: 'phone' }
    }
    
    // Long text/details
    if (responseLower.includes('details') || responseLower.includes('description') || 
        responseLower.includes('explain') || field.question.toLowerCase().includes('additional')) {
      return { type: 'textarea' }
    }
    
    // Default to text
    return { type: 'text' }
  }
  
  const fieldInfo = getFieldType()
  
  // Handle tag addition for multi-entry
  const handleAddTag = () => {
    if (tagInput.trim()) {
      const currentValue = value || []
      onChange(fieldKey, [...currentValue, tagInput.trim()])
      setTagInput('')
    }
  }
  
  const handleRemoveTag = (index: number) => {
    const currentValue = value || []
    onChange(fieldKey, currentValue.filter((_: any, i: number) => i !== index))
  }
  
  switch (fieldInfo.type) {
    case 'dropdown':
      return (
        <div style={{ marginBottom: '20px' }}>
          <label className="label">
            {field.question}
            {field.required && <span style={{ color: 'var(--error)' }}> *</span>}
          </label>
          <select
            className="input-field"
            value={value || ''}
            onChange={(e) => onChange(fieldKey, e.target.value)}
            required={field.required}
          >
            <option value="">Select an option</option>
            {fieldInfo.options?.map((option: string) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {instructions && (
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              {instructions}
            </p>
          )}
        </div>
      )
      
    case 'multi-entry':
      return (
        <div style={{ marginBottom: '20px' }}>
          <label className="label">
            {field.question}
            {field.required && <span style={{ color: 'var(--error)' }}> *</span>}
          </label>
          <div style={{ 
            display: 'flex', 
            gap: '8px',
            marginBottom: '12px'
          }}>
            <input
              type="text"
              className="input-field"
              style={{ flex: 1 }}
              placeholder={responseField.replace('[', '').replace(']', '')}
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleAddTag()
                }
              }}
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="secondary-button"
              style={{ padding: '12px 20px' }}
            >
              Add
            </button>
          </div>
          {value && value.length > 0 && (
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '8px',
              padding: '12px',
              background: 'var(--background-secondary)',
              borderRadius: '8px'
            }}>
              {value.map((item: string, index: number) => (
                <span
                  key={index}
                  style={{
                    padding: '6px 12px',
                    background: 'white',
                    border: '1px solid var(--border)',
                    borderRadius: '20px',
                    fontSize: '0.875rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  {item}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(index)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-secondary)',
                      cursor: 'pointer',
                      padding: '0',
                      fontSize: '1.2rem',
                      lineHeight: '1'
                    }}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
          {instructions && (
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              {instructions}
            </p>
          )}
        </div>
      )
      
    case 'date-range':
      return (
        <div style={{ marginBottom: '20px' }}>
          <label className="label">
            {field.question}
            {field.required && <span style={{ color: 'var(--error)' }}> *</span>}
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>From</label>
              <input
                type="date"
                className="input-field"
                value={value?.from || ''}
                onChange={(e) => onChange(fieldKey, { ...value, from: e.target.value })}
                required={field.required}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>To</label>
              <input
                type="date"
                className="input-field"
                value={value?.to || ''}
                onChange={(e) => onChange(fieldKey, { ...value, to: e.target.value })}
                required={field.required}
              />
            </div>
          </div>
          {instructions && (
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              {instructions}
            </p>
          )}
        </div>
      )
      
    case 'date':
      return (
        <div style={{ marginBottom: '20px' }}>
          <label className="label">
            {field.question}
            {field.required && <span style={{ color: 'var(--error)' }}> *</span>}
          </label>
          <input
            type="date"
            className="input-field"
            value={value || ''}
            onChange={(e) => onChange(fieldKey, e.target.value)}
            required={field.required}
          />
          {instructions && (
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              {instructions}
            </p>
          )}
        </div>
      )
      
    case 'yes-no':
      return (
        <div style={{ marginBottom: '20px' }}>
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
                onChange={(e) => onChange(fieldKey, e.target.value)}
              />
              Yes
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input
                type="radio"
                name={fieldKey}
                value="no"
                checked={value === 'no'}
                onChange={(e) => onChange(fieldKey, e.target.value)}
              />
              No
            </label>
          </div>
          {instructions && (
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              {instructions}
            </p>
          )}
        </div>
      )
      
    case 'number':
      return (
        <div style={{ marginBottom: '20px' }}>
          <label className="label">
            {field.question}
            {field.required && <span style={{ color: 'var(--error)' }}> *</span>}
          </label>
          <input
            type="number"
            className="input-field"
            placeholder={responseField.replace('[', '').replace(']', '')}
            value={value || ''}
            onChange={(e) => onChange(fieldKey, e.target.value)}
            required={field.required}
          />
          {instructions && (
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              {instructions}
            </p>
          )}
        </div>
      )
      
    case 'email':
      return (
        <div style={{ marginBottom: '20px' }}>
          <label className="label">
            {field.question}
            {field.required && <span style={{ color: 'var(--error)' }}> *</span>}
          </label>
          <input
            type="email"
            className="input-field"
            placeholder={responseField.replace('[', '').replace(']', '')}
            value={value || ''}
            onChange={(e) => onChange(fieldKey, e.target.value)}
            required={field.required}
          />
          {instructions && (
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              {instructions}
            </p>
          )}
        </div>
      )
      
    case 'phone':
      return (
        <div style={{ marginBottom: '20px' }}>
          <label className="label">
            {field.question}
            {field.required && <span style={{ color: 'var(--error)' }}> *</span>}
          </label>
          <input
            type="tel"
            className="input-field"
            placeholder={responseField.replace('[', '').replace(']', '') || '+91 9876543210'}
            value={value || ''}
            onChange={(e) => onChange(fieldKey, e.target.value)}
            required={field.required}
          />
          {instructions && (
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              {instructions}
            </p>
          )}
        </div>
      )
      
    case 'textarea':
      return (
        <div style={{ marginBottom: '20px' }}>
          <label className="label">
            {field.question}
            {field.required && <span style={{ color: 'var(--error)' }}> *</span>}
          </label>
          <textarea
            className="input-field"
            placeholder={responseField.replace('[', '').replace(']', '')}
            value={value || ''}
            onChange={(e) => onChange(fieldKey, e.target.value)}
            required={field.required}
            rows={4}
            style={{ resize: 'vertical' }}
          />
          {instructions && (
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              {instructions}
            </p>
          )}
        </div>
      )
      
    default:
      return (
        <div style={{ marginBottom: '20px' }}>
          <label className="label">
            {field.question}
            {field.required && <span style={{ color: 'var(--error)' }}> *</span>}
          </label>
          <input
            type="text"
            className="input-field"
            placeholder={responseField.replace('[', '').replace(']', '')}
            value={value || ''}
            onChange={(e) => onChange(fieldKey, e.target.value)}
            required={field.required}
          />
          {instructions && (
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              {instructions}
            </p>
          )}
        </div>
      )
  }
}