
# LoyalT - Loyalty Rewards App

LoyalT is a modern loyalty rewards application that helps businesses retain customers and reward their loyalty, while giving customers an easy way to track and redeem rewards.

## Features

### For Customers
- Scan QR codes to earn points
- View and redeem rewards
- Find nearby participating shops
- Track loyalty status and points
- Manage personal profile

### For Businesses
- Create custom loyalty programs
- Generate QR codes for points
- View customer analytics
- Customize reward cards
- Track redemptions

## Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Supabase (Authentication, Database, Storage, Edge Functions)
- **Key Libraries**: 
  - shadcn/ui for UI components
  - react-router-dom for routing
  - tanstack/react-query for data fetching
  - qrcode.react for QR code generation
  - @zxing/browser for QR code scanning
  - recharts for analytics visualizations

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- npm or yarn
- Supabase account (for backend services)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/loyalt.git
cd loyalt
```

2. Install dependencies
```bash
npm install
# or
yarn
```

3. Connect to Supabase
- Create a Supabase project at https://supabase.com
- Apply the database migrations in `supabase/migrations/`
- Deploy the edge functions in `supabase/functions/`
- Set up environment variables (see below)

4. Start the development server
```bash
npm run dev
# or
yarn dev
```

### Environment Variables

Create a `.env` file in the root directory with the following variables:
```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Database Schema

The application uses the following database tables:
- `profiles` - User profiles with points and membership levels
- `shops` - Business details and location information
- `rewards` - Available rewards offered by businesses
- `user_rewards` - Rewards claimed by users
- `transactions` - Point earning and redemption history
- `qr_codes` - QR codes for earning points
- `loyalty_programs` - Business loyalty program configurations

## Deployment

The application can be deployed to any static hosting provider:

1. Build the application
```bash
npm run build
# or
yarn build
```

2. Deploy the contents of the `dist` directory

For Supabase deployment, use the Supabase CLI:
```bash
supabase functions deploy
```

## Mobile App

LoyalT can be built as a native mobile app using Capacitor:

```bash
npm run build
npx cap sync
npx cap open ios  # For iOS
npx cap open android  # For Android
```

## Demo Accounts

- **Customer**: 
  - Email: `emma@example.com`
  - Password: `password`
- **Business**: 
  - Email: `vendor@example.com` 
  - Password: `password`

## License

This project is licensed under the MIT License - see the LICENSE file for details.
