# Sanctuari - Insurance Aggregation Platform

## Overview
Sanctuari is a comprehensive insurance aggregation and placement platform for businesses in India. The platform simplifies the insurance procurement process by allowing businesses to create RFQs (Request for Quotes), distribute them to multiple insurers and brokers, and compare quotes side-by-side.

## Features Implemented

### Authentication & Onboarding
- **Magic Link Authentication**: Secure passwordless login using Supabase
- **Business Onboarding**: Multi-step onboarding flow capturing business details
- **User Management**: Role-based access control (Admin, User, Viewer)

### RFQ Management
- **Dynamic RFQ Creation**: Forms generated from CSV templates for various insurance products
- **Product Coverage**: 40+ insurance products including:
  - Commercial General Liability
  - Cyber Liability Insurance
  - Directors & Officers Liability
  - Professional Indemnity
  - Workers Compensation
  - Group Health Insurance
  - And many more...

### Distribution System
- **Dual Distribution Channels**:
  - Custom email addresses for existing broker/insurer relationships
  - Sanctuari Network of verified insurers and partner brokers
- **Unique Link Generation**: Each recipient gets a unique link to view and respond to RFQs

### Business Model
- **Free First RFQ**: First insurance placement is free for new businesses
- **Subscription Model**: Rs. 1,599 per RFQ placement for subsequent requests
- **Payment Integration**: Razorpay integration for seamless payments

## Tech Stack

- **Frontend**: React 19, Next.js 15, TypeScript
- **Styling**: Custom CSS with glassmorphism design
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Magic Link
- **Payment Gateway**: Razorpay
- **File Storage**: UploadThing
- **Document Parsing**: Llama Parse (configured)
- **AI Integration**: Claude API (Anthropic)
- **State Management**: Zustand
- **Deployment**: Vercel-ready

## Project Structure

```
sanctuari-app/
├── app/
│   ├── auth/
│   │   ├── login/        # Login page
│   │   ├── signup/       # Sign-up page
│   │   └── callback/     # Auth callback handler
│   ├── dashboard/        # Main dashboard
│   ├── onboarding/       # Business onboarding flow
│   ├── rfq/
│   │   ├── create/       # RFQ creation interface
│   │   └── distribution/ # RFQ distribution system
│   └── layout.tsx        # Root layout with AuthProvider
├── components/           # Reusable components
├── lib/
│   ├── supabase.ts      # Supabase client configuration
│   └── auth-context.tsx # Authentication context
├── types/
│   └── database.ts      # TypeScript database types
├── utils/
│   └── rfq-parser.ts    # RFQ CSV parsing utilities
├── styles/
│   └── globals.css      # Global styles with glassmorphism
└── Resources/           # CSV data and company profiles
```

## Database Schema

The platform uses the following main tables:
- **companies**: Business profiles and details
- **users**: User accounts with role management
- **rfqs**: RFQ records with status tracking
- **rfq_distributions**: Distribution tracking with unique links
- **quotes**: Quote submissions from insurers/brokers
- **communications**: In-platform messaging system
- **insurers**: Insurer profiles
- **brokers**: Broker profiles

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account
- Razorpay account
- UploadThing account
- Anthropic API key

### Environment Variables
Create a `.env.local` file with the following:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# UploadThing
UPLOADTHING_APP_ID=your_uploadthing_app_id
UPLOADTHING_SECRET=your_uploadthing_secret

# Claude API
ANTHROPIC_API_KEY=your_anthropic_api_key

# Llama Parse
LLAMA_PARSE_API_KEY=your_llama_parse_api_key

# Razorpay
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Sanctuari
```

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Design Philosophy

- **Clean & Minimalist**: Focus on user experience with clean interfaces
- **Glassmorphism**: Modern iOS-like design with glass effects
- **Typography**: Outfit for headings, Inter for body text
- **Color Palette**: Purple accent with light greys and white
- **No Emojis**: Professional interface without emoji decorations

## Key Features to Complete

1. **Quote Submission Interface**: Allow brokers/insurers to submit quotes
2. **Quote Comparison Dashboard**: Side-by-side quote comparison
3. **Document Parsing**: Integrate Llama Parse for automatic quote extraction
4. **Payment Processing**: Complete Razorpay integration
5. **Email Notifications**: Set up email service for RFQ distribution
6. **Analytics Dashboard**: Business intelligence and metrics
7. **Team Management**: Invite and manage team members
8. **API Integration**: REST API for external integrations

## Deployment

The application is configured for deployment on Vercel:

```bash
# Deploy to Vercel
vercel deploy
```

## Security Considerations

- All sensitive operations use Supabase Row Level Security (RLS)
- API keys stored securely in environment variables
- Magic link authentication prevents password-related vulnerabilities
- Unique links for RFQ access with expiration
- Payment processing through secure Razorpay APIs

## Support

For support or questions about the Sanctuari platform, please contact the development team.

## License

Proprietary - All rights reserved

---

Built with precision for the Indian insurance market.