export interface RFQField {
  section: string
  questionNumber: string
  question: string
  responseField: string
  notes?: string
  instructions?: string
}

export interface RFQSection {
  name: string
  fields: RFQField[]
}

export function parseRFQData(csvData: string): RFQSection[] {
  const lines = csvData.split('\n').filter(line => line.trim())
  const sections: Map<string, RFQField[]> = new Map()
  
  // Skip header
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i]
    const parts = line.split(',')
    
    if (parts.length < 4) continue
    
    const field: RFQField = {
      section: parts[0]?.trim() || '',
      questionNumber: parts[1]?.trim() || '',
      question: parts[2]?.trim() || '',
      responseField: parts[3]?.trim() || '',
      notes: parts[4]?.trim() || undefined,
      instructions: parts[5]?.trim() || undefined
    }
    
    if (!field.section || !field.question) continue
    
    if (!sections.has(field.section)) {
      sections.set(field.section, [])
    }
    sections.get(field.section)!.push(field)
  }
  
  return Array.from(sections.entries()).map(([name, fields]) => ({
    name,
    fields
  }))
}

export const insuranceProducts = [
  { id: 'commercial_general_liability', name: 'Commercial General Liability', file: 'Commercial_General_Liability_RFQ.csv' },
  { id: 'cyber_liability', name: 'Cyber Liability Insurance', file: 'Cyber_Liability_Insurance_RFQ.csv' },
  { id: 'directors_officers', name: 'Directors & Officers Liability', file: 'Directors_Officers_Liability_Insurance_RFQ.csv' },
  { id: 'professional_indemnity', name: 'Professional Indemnity', file: 'Professional_Indemnity_RFQ.csv' },
  { id: 'workers_compensation', name: 'Workers Compensation', file: 'Workmen_s_Compensation_Insurance_RFQ.csv' },
  { id: 'group_health', name: 'Group Health Insurance', file: 'Group_Health_Insurance_RFQ.csv' },
  { id: 'fire_special_perils', name: 'Fire & Special Perils', file: 'Standard_Fire_Special_Perils_Insurance_RFQ.csv' },
  { id: 'marine_cargo', name: 'Marine Cargo Insurance', file: 'Marine_Cargo_Open_Cover_Insurance_RFQ.csv' },
  { id: 'product_liability', name: 'Product Liability', file: 'Product_Liability_Insurance_RFQ.csv' },
  { id: 'public_liability', name: 'Public Liability', file: 'Public_Liability_Industrial_Insurance_RFQ.csv' }
]