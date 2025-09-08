export interface Database {
  public: {
    Tables: {
      companies: {
        Row: {
          id: string
          created_at: string
          name: string
          industry: string
          company_size: string
          annual_revenue: number | null
          gst_number: string | null
          pan_number: string | null
          address: string
          city: string
          state: string
          pincode: string
          website: string | null
          description: string | null
        }
        Insert: Omit<Database['public']['Tables']['companies']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['companies']['Insert']>
      }
      users: {
        Row: {
          id: string
          created_at: string
          email: string
          full_name: string
          phone: string | null
          role: 'admin' | 'user' | 'viewer'
          company_id: string
          designation: string | null
          is_active: boolean
          last_login: string | null
        }
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['users']['Insert']>
      }
      rfqs: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          company_id: string
          created_by: string
          product_type: string
          rfq_number: string
          status: 'draft' | 'published' | 'closed' | 'awarded'
          data: any
          deadline: string
          is_free: boolean
        }
        Insert: Omit<Database['public']['Tables']['rfqs']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['rfqs']['Insert']>
      }
      rfq_distributions: {
        Row: {
          id: string
          created_at: string
          rfq_id: string
          recipient_email: string
          recipient_name: string
          recipient_type: 'broker' | 'insurer'
          recipient_company: string | null
          unique_link: string
          viewed_at: string | null
          status: 'pending' | 'viewed' | 'quoted' | 'declined'
        }
        Insert: Omit<Database['public']['Tables']['rfq_distributions']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['rfq_distributions']['Insert']>
      }
      quotes: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          rfq_id: string
          distribution_id: string
          submitted_by: string
          insurer_name: string
          premium_amount: number
          coverage_details: any
          document_url: string | null
          parsed_data: any | null
          status: 'draft' | 'submitted' | 'revised' | 'accepted' | 'rejected'
        }
        Insert: Omit<Database['public']['Tables']['quotes']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['quotes']['Insert']>
      }
      communications: {
        Row: {
          id: string
          created_at: string
          rfq_id: string
          sender_type: 'client' | 'bidder'
          sender_id: string
          recipient_id: string | null
          message: string
          is_broadcast: boolean
          attachments: string[] | null
        }
        Insert: Omit<Database['public']['Tables']['communications']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['communications']['Insert']>
      }
      insurers: {
        Row: {
          id: string
          created_at: string
          name: string
          type: 'general' | 'health' | 'life'
          logo_url: string | null
          contact_email: string | null
          contact_phone: string | null
          address: string | null
          is_active: boolean
        }
        Insert: Omit<Database['public']['Tables']['insurers']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['insurers']['Insert']>
      }
      brokers: {
        Row: {
          id: string
          created_at: string
          name: string
          license_number: string | null
          logo_url: string | null
          contact_email: string | null
          contact_phone: string | null
          address: string | null
          is_partner: boolean
          is_active: boolean
        }
        Insert: Omit<Database['public']['Tables']['brokers']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['brokers']['Insert']>
      }
    }
  }
}