-- Sanctuari Database Setup
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Companies table
CREATE TABLE IF NOT EXISTS companies (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    name VARCHAR(255) NOT NULL,
    industry VARCHAR(100),
    company_size VARCHAR(50),
    annual_revenue DECIMAL(15, 2),
    gst_number VARCHAR(50),
    pan_number VARCHAR(50),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    pincode VARCHAR(10),
    website VARCHAR(255),
    description TEXT
);

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    role VARCHAR(20) CHECK (role IN ('admin', 'user', 'viewer')) DEFAULT 'user',
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    designation VARCHAR(100),
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMP WITH TIME ZONE
);

-- RFQs table
CREATE TABLE IF NOT EXISTS rfqs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    created_by UUID REFERENCES users(id),
    product_type VARCHAR(100) NOT NULL,
    rfq_number VARCHAR(50) UNIQUE NOT NULL,
    status VARCHAR(20) CHECK (status IN ('draft', 'published', 'closed', 'awarded')) DEFAULT 'draft',
    data JSONB,
    deadline DATE,
    is_free BOOLEAN DEFAULT false
);

-- RFQ Distributions table
CREATE TABLE IF NOT EXISTS rfq_distributions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    rfq_id UUID REFERENCES rfqs(id) ON DELETE CASCADE,
    recipient_email VARCHAR(255) NOT NULL,
    recipient_name VARCHAR(255),
    recipient_type VARCHAR(20) CHECK (recipient_type IN ('broker', 'insurer')),
    recipient_company VARCHAR(255),
    unique_link VARCHAR(255) UNIQUE NOT NULL,
    viewed_at TIMESTAMP WITH TIME ZONE,
    status VARCHAR(20) CHECK (status IN ('pending', 'viewed', 'quoted', 'declined')) DEFAULT 'pending'
);

-- Quotes table
CREATE TABLE IF NOT EXISTS quotes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    rfq_id UUID REFERENCES rfqs(id) ON DELETE CASCADE,
    distribution_id UUID REFERENCES rfq_distributions(id),
    submitted_by VARCHAR(255),
    insurer_name VARCHAR(255) NOT NULL,
    premium_amount DECIMAL(15, 2),
    coverage_details JSONB,
    document_url TEXT,
    parsed_data JSONB,
    status VARCHAR(20) CHECK (status IN ('draft', 'submitted', 'revised', 'accepted', 'rejected')) DEFAULT 'draft'
);

-- Communications table
CREATE TABLE IF NOT EXISTS communications (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    rfq_id UUID REFERENCES rfqs(id) ON DELETE CASCADE,
    sender_type VARCHAR(20) CHECK (sender_type IN ('client', 'bidder')),
    sender_id VARCHAR(255),
    recipient_id VARCHAR(255),
    message TEXT NOT NULL,
    is_broadcast BOOLEAN DEFAULT false,
    attachments TEXT[]
);

-- Insurers table
CREATE TABLE IF NOT EXISTS insurers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(20) CHECK (type IN ('general', 'health', 'life')),
    logo_url TEXT,
    contact_email VARCHAR(255),
    contact_phone VARCHAR(20),
    address TEXT,
    is_active BOOLEAN DEFAULT true
);

-- Brokers table
CREATE TABLE IF NOT EXISTS brokers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    name VARCHAR(255) NOT NULL,
    license_number VARCHAR(100),
    logo_url TEXT,
    contact_email VARCHAR(255),
    contact_phone VARCHAR(20),
    address TEXT,
    is_partner BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true
);

-- Payments table
CREATE TABLE IF NOT EXISTS payments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    rfq_id UUID REFERENCES rfqs(id),
    company_id UUID REFERENCES companies(id),
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'INR',
    razorpay_payment_id VARCHAR(255),
    razorpay_order_id VARCHAR(255),
    status VARCHAR(20) CHECK (status IN ('pending', 'completed', 'failed', 'refunded')) DEFAULT 'pending',
    payment_method VARCHAR(50),
    paid_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes for better performance
CREATE INDEX idx_rfqs_company_id ON rfqs(company_id);
CREATE INDEX idx_rfqs_status ON rfqs(status);
CREATE INDEX idx_rfq_distributions_rfq_id ON rfq_distributions(rfq_id);
CREATE INDEX idx_quotes_rfq_id ON quotes(rfq_id);
CREATE INDEX idx_communications_rfq_id ON communications(rfq_id);
CREATE INDEX idx_users_company_id ON users(company_id);
CREATE INDEX idx_users_email ON users(email);

-- Insert sample data for insurers
INSERT INTO insurers (name, type, contact_email, is_active) VALUES
    ('HDFC ERGO General Insurance', 'general', 'contact@hdfcergo.com', true),
    ('ICICI Lombard', 'general', 'contact@icicilombard.com', true),
    ('Bajaj Allianz', 'general', 'contact@bajajallianz.com', true),
    ('Tata AIG', 'general', 'contact@tataaig.com', true),
    ('New India Assurance', 'general', 'contact@newindia.co.in', true),
    ('Star Health Insurance', 'health', 'contact@starhealth.in', true),
    ('Max Bupa Health', 'health', 'contact@maxbupa.com', true),
    ('LIC', 'life', 'contact@licindia.in', true);

-- Insert sample data for brokers
INSERT INTO brokers (name, contact_email, is_partner, is_active) VALUES
    ('Marsh India', 'contact@marsh.com', true, true),
    ('Willis Towers Watson', 'contact@willistowerswatson.com', true, true),
    ('Aon India', 'contact@aon.com', true, true),
    ('JB Boda', 'contact@jbboda.com', true, true),
    ('Prudent Insurance Brokers', 'contact@prudentbrokers.com', false, true);

-- Enable Row Level Security (RLS)
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE rfqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE rfq_distributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE communications ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Create policies for RLS (adjust based on your auth setup)
-- These are basic policies - adjust based on your security requirements

-- Companies: Users can only see their own company
CREATE POLICY "Users can view own company" ON companies
    FOR SELECT USING (auth.uid()::text IN (
        SELECT id::text FROM users WHERE company_id = companies.id
    ));

-- Users: Can view users from same company
CREATE POLICY "Users can view same company users" ON users
    FOR SELECT USING (company_id IN (
        SELECT company_id FROM users WHERE id = auth.uid()
    ));

-- RFQs: Can view own company's RFQs
CREATE POLICY "View own company RFQs" ON rfqs
    FOR SELECT USING (company_id IN (
        SELECT company_id FROM users WHERE id = auth.uid()
    ));

-- Note: You'll need to create additional policies for INSERT, UPDATE, DELETE operations
-- based on your specific business logic

COMMENT ON TABLE companies IS 'Stores company/business information';
COMMENT ON TABLE users IS 'Stores user accounts and their roles';
COMMENT ON TABLE rfqs IS 'Stores insurance RFQ requests';
COMMENT ON TABLE rfq_distributions IS 'Tracks RFQ distribution to brokers/insurers';
COMMENT ON TABLE quotes IS 'Stores quotes received for RFQs';
COMMENT ON TABLE communications IS 'In-platform messaging between clients and bidders';
COMMENT ON TABLE insurers IS 'Insurance company profiles';
COMMENT ON TABLE brokers IS 'Insurance broker profiles';
COMMENT ON TABLE payments IS 'Payment transactions for RFQ placements';