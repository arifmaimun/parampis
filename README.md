# Vet Patient Management App

Aplikasi management pasien untuk dokter hewan yang dibangun dengan Next.js, Supabase, dan Google Drive integration.

## Features

- 🏥 Patient management
- 📋 Medical records
- 📅 Appointment scheduling
- 💰 Invoice management
- 📁 File storage with Google Drive
- 🔐 Secure authentication with Supabase
- 📱 Responsive design

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **File Storage**: Google Drive API
- **Database**: Prisma ORM
- **Authentication**: Supabase Auth with Google OAuth

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- Google Cloud Console project
- Google Drive API enabled

### Installation

1. Clone the repository:
```bash
git clone https://github.com/arifmaimun/vet-patient-management.git
cd vet-patient-management
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure your environment variables in `.env.local`:
   - Supabase URL and keys
   - Google Drive folder ID
   - Database connection string

5. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

6. Run the development server:
```bash
npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Google Drive Configuration
GOOGLE_DRIVE_FOLDER_ID=your-google-drive-folder-id

# Database Configuration
DATABASE_URL=file:./dev.db
PROD_DATABASE_URL=postgresql://postgres:[password]@db.your-project.supabase.co:5432/postgres

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Setup Guides

- [Supabase Setup](docs/supabase-setup.md)
- [Google Drive Integration](docs/google-drive-setup-guide.md)
- [Authentication Setup](docs/test-auth-instructions.md)

## Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── (dashboard)/       # Dashboard pages
│   ├── auth/              # Authentication pages
│   ├── actions/           # Server actions
│   └── api/               # API routes
├── components/            # React components
│   ├── ui/                # UI components
│   └── layout/            # Layout components
└── lib/                   # Utilities and configurations
    ├── supabase/          # Supabase client setup
    ├── google-drive.ts    # Google Drive functions
    └── prisma.ts          # Prisma client
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test your changes
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue on GitHub.