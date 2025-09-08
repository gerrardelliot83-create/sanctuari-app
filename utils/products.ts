export const insuranceProducts = [
  { id: 'baggage', name: 'Baggage Insurance', file: 'Baggage_Insurance_RFQ.csv' },
  { id: 'boiler_pressure', name: 'Boiler & Pressure Plant Insurance', file: 'Boiler_Pressure_Plant_Insurance_RFQ.csv' },
  { id: 'burglary', name: 'Burglary Insurance', file: 'Burglary_Insurance_RFQ.csv' },
  { id: 'business_interruption', name: 'Business Interruption Insurance', file: 'Business_Interruption_Insurance_RFQ.csv' },
  { id: 'business_package', name: 'Business Package Insurance', file: 'Business_Package_Insurance_RFQ.csv' },
  { id: 'carriers_legal', name: 'Carriers Legal Liability Insurance', file: 'Carriers_Legal_Liability_Insurance_RFQ.csv' },
  { id: 'commercial_general_liability', name: 'Commercial General Liability', file: 'Commercial_General_Liability_RFQ.csv' },
  { id: 'contractors_all_risk', name: 'Contractors All Risk', file: 'Contractors_All_Risk_RFQ.csv' },
  { id: 'contractors_plant', name: 'Contractors Plant & Machinery Insurance', file: 'Contractors_Plant_Machinery_Insurance_RFQ.csv' },
  { id: 'cyber_liability', name: 'Cyber Liability Insurance', file: 'Cyber_Liability_Insurance_RFQ.csv' },
  { id: 'delay_startup', name: 'Delay in Start Up Insurance', file: 'Delay_in_Start_Up_Insurance_RFQ.csv' },
  { id: 'directors_officers', name: 'Directors & Officers Liability', file: 'Directors_Officers_Liability_Insurance_RFQ.csv' },
  { id: 'electronic_equipment', name: 'Electronic Equipment Insurance', file: 'Electronic_Equipment_Insurance_RFQ.csv' },
  { id: 'employees_compensation', name: 'Employees Compensation Insurance', file: 'Employees_Compensation_Insurance_RFQ.csv' },
  { id: 'erection_all_risk', name: 'Erection All Risk Insurance', file: 'Erection_All_Risk_Insurance_RFQ.csv' },
  { id: 'fidelity_guarantee', name: 'Fidelity Guarantee Insurance', file: 'Fidelity_Guarantee_Insurance_RFQ.csv' },
  { id: 'fire_loss_profit', name: 'Fire Loss of Profit Insurance', file: 'Fire_Loss_of_Profit_Insurance_RFQ.csv' },
  { id: 'freight', name: 'Freight Insurance', file: 'Freight_Insurance_RFQ.csv' },
  { id: 'group_health', name: 'Group Health Insurance', file: 'Group_Health_Insurance_RFQ.csv' },
  { id: 'group_personal_accident', name: 'Group Personal Accident Insurance', file: 'Group_Personal_Accident_Insurance_RFQ.csv' },
  { id: 'group_term_life', name: 'Group Term Life Insurance', file: 'Group_Term_Life_Insurance_RFQ.csv' },
  { id: 'hull_machinery', name: 'Hull and Machinery Insurance', file: 'Hull_and_Machinery_Insurance_RFQ.csv' },
  { id: 'industrial_all_risk', name: 'Industrial All Risk Insurance', file: 'Industrial_All_Risk_Insurance_RFQ.csv' },
  { id: 'livestock', name: 'Livestock/Cattle/Animal Insurance', file: 'Livestock_Cattle_Animal_Insurance_RFQ.csv' },
  { id: 'machinery_breakdown', name: 'Machinery Breakdown Policy', file: 'Machinery_Breakdown_Policy_RFQ.csv' },
  { id: 'machinery_loss_profit', name: 'Machinery Loss of Profit Insurance', file: 'Machinery_Loss_of_Profit_Insurance_RFQ.csv' },
  { id: 'marine_cargo_open', name: 'Marine Cargo Open Cover Insurance', file: 'Marine_Cargo_Open_Cover_Insurance_RFQ.csv' },
  { id: 'marine_transit', name: 'Marine Transit Insurance', file: 'Marine_Transit_Insurance_RFQ.csv' },
  { id: 'money', name: 'Money Insurance Policy', file: 'Money_Insurance_Policy_RFQ.csv' },
  { id: 'plate_glass', name: 'Plate Glass Insurance', file: 'Plate_Glass_Insurance_RFQ.csv' },
  { id: 'pollution_legal', name: 'Pollution Legal Liability Insurance', file: 'Pollution_Legal_Liability_Insurance_RFQ.csv' },
  { id: 'product_liability', name: 'Product Liability Insurance', file: 'Product_Liability_Insurance_RFQ.csv' },
  { id: 'professional_indemnity_it', name: 'Professional Indemnity IT Insurance', file: 'Professional_Indemnity_IT_Insurance_RFQ.csv' },
  { id: 'professional_indemnity', name: 'Professional Indemnity', file: 'Professional_Indemnity_RFQ.csv' },
  { id: 'public_liability_industrial', name: 'Public Liability Industrial Insurance', file: 'Public_Liability_Industrial_Insurance_RFQ.csv' },
  { id: 'public_liability_non_industrial', name: 'Public Liability Non-Industrial Insurance', file: 'Public_Liability_Non_Industrial_Insurance_RFQ.csv' },
  { id: 'public_offering_securities', name: 'Public Offering Securities Insurance', file: 'Public_Offering_Securities_Insurance_RFQ.csv' },
  { id: 'stop_concise', name: 'STOP Insurance (Concise)', file: 'STOP_Insurance_RFQ_Concise_With_Instructions.csv' },
  { id: 'stop_sales', name: 'STOP Insurance Sales Turnover', file: 'STOP_Insurance_Sales_Turnover_RFQ.csv' },
  { id: 'shopkeeper_marine', name: 'Shopkeeper Marine', file: 'Shopkeeper_Marine_RFQ.csv' },
  { id: 'shopkeepers', name: 'Shopkeepers Insurance', file: 'Shopkeepers_Insurance_RFQ.csv' },
  { id: 'signage', name: 'Signage Insurance Policy', file: 'Signage_Insurance_Policy_RFQ.csv' },
  { id: 'fire_special_perils', name: 'Standard Fire & Special Perils Insurance', file: 'Standard_Fire_Special_Perils_Insurance_RFQ.csv' },
  { id: 'surety', name: 'Surety Insurance', file: 'Surety_Insurance_RFQ_Questionnaire.csv' },
  { id: 'title_commercial', name: 'Title Insurance Commercial', file: 'Title_Insurance_Commercial_RFQ.csv' },
  { id: 'trade_credit', name: 'Trade Credit Insurance', file: 'Trade_Credit_Insurance_RFQ.csv' },
  { id: 'workmen_compensation', name: "Workmen's Compensation Insurance", file: 'Workmen_s_Compensation_Insurance_RFQ.csv' }
]

export interface RFQField {
  section: string
  questionNumber: string
  question: string
  responseField: string
  notes?: string
  instructions?: string
  required?: boolean
}

export interface RFQSection {
  name: string
  fields: RFQField[]
}

export async function loadRFQData(productId: string): Promise<RFQSection[]> {
  const product = insuranceProducts.find(p => p.id === productId)
  if (!product) {
    throw new Error('Product not found')
  }

  try {
    const response = await fetch(`/rfq-data/${product.file}`)
    const csvText = await response.text()
    return parseCSVToSections(csvText)
  } catch (error) {
    console.error('Error loading RFQ data:', error)
    return []
  }
}

function parseCSVToSections(csvText: string): RFQSection[] {
  const lines = csvText.split('\n').filter(line => line.trim())
  const sections: Map<string, RFQField[]> = new Map()
  
  // Skip header row
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i]
    const parts = parseCSVLine(line)
    
    if (parts.length < 4) continue
    
    const section = parts[0]?.trim() || 'General Information'
    const field: RFQField = {
      section,
      questionNumber: parts[1]?.trim() || '',
      question: parts[2]?.trim() || '',
      responseField: parts[3]?.trim() || '',
      notes: parts[4]?.trim() || undefined,
      instructions: parts[5]?.trim() || undefined,
      required: parts[3]?.includes('*') || parts[2]?.includes('*')
    }
    
    if (!field.question) continue
    
    if (!sections.has(section)) {
      sections.set(section, [])
    }
    sections.get(section)!.push(field)
  }
  
  return Array.from(sections.entries()).map(([name, fields]) => ({
    name,
    fields
  }))
}

function parseCSVLine(line: string): string[] {
  const result: string[] = []
  let current = ''
  let inQuotes = false
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    const nextChar = line[i + 1]
    
    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        current += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current)
      current = ''
    } else {
      current += char
    }
  }
  
  result.push(current)
  return result.map(s => s.trim().replace(/^"|"$/g, ''))
}