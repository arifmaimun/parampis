# Vet Home Visit Application - Implementation Plan

**Project**: Parampis - Aplikasi Management Pasien Dokter Hewan Home Visit  
**Last Updated**: 2025-10-25  
**Status**: 15% Complete (Infrastructure Only)

---

## Table of Contents

1. [Status Implementasi Saat Ini](#status-implementasi-saat-ini)
2. [Fitur yang Belum Diimplementasikan](#fitur-yang-belum-diimplementasikan)
3. [Gap Analysis](#gap-analysis)
4. [Development Roadmap](#development-roadmap)
5. [Phase 0: UI Layout Foundation](#phase-0-ui-layout-foundation)
6. [Phase 1-4: Core Features](#phase-1-4-core-features)
7. [Technical Decisions](#technical-decisions)
8. [Summary](#summary)

---

## Status Implementasi Saat Ini

### ✅ Fitur yang Sudah Diimplementasikan

#### 1. Infrastructure & Auth (90% Complete)

**Database Schema**
- Lengkap dengan 23 model (User, Client, Patient, MedicalRecord, Invoice, Inventory, dll)
- File: `prisma/schema.prisma` (448 lines)
- Dual schema: SQLite (dev) + PostgreSQL (production via Prisma Accelerate)

**Authentication**
- Supabase Auth dengan Google OAuth
- Email whitelist via Row Level Security (RLS)
- Files: `src/lib/supabase/*`, `middleware.ts`

**Google Drive Integration**
- Upload dan list files
- Files: `src/lib/google-drive.ts`, `src/app/actions/upload.ts`, `src/app/actions/files.ts`
- Folder structure: "Test Uploads" subfolder
- Features: file rename, folder navigation, lazy-loaded previews, private access via OAuth

#### 2. File Management (85% Complete)

**File Upload**
- Server action dengan Google Drive storage
- File: `src/app/test-upload/page.tsx`
- Auto-rename dengan timestamp prefix

**File Browser**
- List, preview (spoiler), rename, navigate folders
- File: `src/app/files/page.tsx` (429 lines)
- Breadcrumb navigation
- Image preview dengan lazy loading (64x64px thumbnails)
- Cache-busting untuk fresh preview

**API Routes**
- Private image proxy untuk Google Drive files
- File: `src/app/api/drive-image/[id]/route.ts`

#### 3. UI Foundation (40% Complete)

**Pages**
- Dashboard, file upload, file browser, auth pages
- Files: `src/app/dashboard/page.tsx`, `src/app/page.tsx`

**Styling**
- Tailwind CSS + Shadcn/ui components
- File: `src/app/globals.css`

---

## Fitur yang Belum Diimplementasikan

### ❌ Core Veterinary Features (Priority: HIGH) - 0% Complete

#### Client Management
- ❌ Tidak ada UI untuk CRUD clients
- ✅ Model ada: `Client` dengan company support
- **Perlu**: List, create, edit, detail, search, favorites

#### Patient Management
- ❌ Tidak ada UI untuk CRUD patients
- ✅ Model ada: `Patient` dengan species, breed, photos
- ✅ Relasi: Many-to-many dengan owners via `PatientOwnership`
- **Perlu**: List, create, edit, detail, photos, medical history

#### Medical Records
- ❌ Tidak ada UI untuk CRUD medical records
- ✅ Model ada: `MedicalRecord` dengan vital signs, diagnosis, treatment
- ✅ Fitur schema: photos, voice notes, follow-up
- **Perlu**: Form input, view history, template support

### ❌ Appointment & Scheduling (Priority: HIGH) - 0% Complete

#### Appointments
- ❌ Tidak ada UI untuk scheduling
- ✅ Model ada: `Appointment` dengan status tracking
- **Perlu**: Calendar view, create/edit, reminders, status management

#### Locations
- ❌ Tidak ada UI untuk location management
- ✅ Model ada: `Location` dengan type (home_visit/klinik)
- **Perlu**: List, create, edit, set default

### ❌ Financial Management (Priority: MEDIUM) - 0% Complete

#### Invoicing
- ❌ Tidak ada UI untuk invoices
- ✅ Model ada: `Invoice`, `InvoiceItem` dengan comprehensive fields
- ✅ Fitur schema: PDF generation, payment tracking
- **Perlu**: Create invoice, payment tracking, PDF export

#### Service Templates
- ❌ Tidak ada UI untuk service templates
- ✅ Model ada: `ServiceTemplate`
- **Perlu**: CRUD for pricing templates

### ❌ Inventory Management (Priority: MEDIUM) - 0% Complete

- ❌ Tidak ada UI untuk inventory
- ✅ Model ada: `Inventory`, `InventoryUsage`, `InventoryRestock`
- ✅ Fitur: Stock tracking, expiry alerts, usage history
- **Perlu**: Full CRUD, alerts, restock management

### ❌ Supporting Features (Priority: LOW) - 0% Complete

**Vaccination Tracking**
- ✅ Model ada: `Vaccination` dengan schedule tracking
- **Perlu**: Schedule, track, reminders

**Master Data**
- ✅ Models: `AnimalSpecies`, `CompanyType`, `MedicalTemplate`
- **Perlu**: Admin interface for master data

**Settings**
- ✅ Model ada: `Settings` untuk app configuration
- **Perlu**: Settings page

**Notifications**
- ✅ Model ada: `Notification`
- **Perlu**: Notification center, real-time alerts

**Activity Logs & Backups**
- ✅ Models: `ActivityLog`, `Backup`
- **Perlu**: Viewing interface, backup management

**Analytics/Reports**
- ❌ Tidak ada reporting system
- **Perlu**: Dashboard widgets, export reports

---

## Gap Analysis

### Critical Gaps

1. **No Core Functionality**
   - Aplikasi hanya memiliki auth + file management
   - Zero medical features implemented

2. **Zero Medical Features**
   - Tidak ada UI untuk pasien, rekam medis, appointment
   - Schema lengkap tapi implementasi 0%

3. **No Revenue Features**
   - Tidak ada invoicing yang berfungsi
   - Tidak bisa track pembayaran

4. **Schema vs Implementation Mismatch**
   - Schema lengkap (448 lines, 23 models)
   - Implementasi UI: 0%
   - Gap terlalu besar untuk production

### Technical Debt

1. **Database**
   - Masih SQLite (dev)
   - Perlu migration strategy ke PostgreSQL production

2. **File Storage**
   - Google Drive works untuk basic files
   - **Perlu**:
     - Folder organization per patient/record
     - Cleanup strategy untuk file lama
     - Backup strategy

3. **Authentication**
   - Supabase Auth works dengan email whitelist
   - **Perlu**: Role-based access control (belum ada User model yang terintegrasi dengan auth)

4. **UI Components**
   - Shadcn/ui tersedia di package.json
   - **Tapi**: Folder `src/components/ui/` masih kosong
   - Perlu install dan setup components

---

## Development Roadmap

### Phase 0: UI Layout Foundation (PRIORITY 1 - 2-3 days)

**Goal**: Setup responsive navigation system sebelum implement fitur core

#### Desktop: Sidebar Navigation

**Files to Create**
```
src/components/layout/
  ├── sidebar.tsx           # Main sidebar component
  ├── bottom-nav.tsx        # Mobile bottom navigation
  ├── header.tsx            # Top header with user info
  └── layout-wrapper.tsx    # Wrapper untuk page content

src/app/(dashboard)/
  └── layout.tsx            # Dashboard layout dengan sidebar + bottom nav
```

**Desktop Sidebar Structure** (≥768px)
- **Header**
  - Logo & App Name (Parampis) with icon
  - Collapsible toggle (optional)

- **Navigation Menu**
  - 📊 Dashboard (Home icon)
  - 👥 Clients (Users icon)
  - 🐾 Patients (Heart/Paw icon)
  - 📝 Medical Records (FileText icon)
  - 📅 Appointments (Calendar icon)
  - 💰 Invoices (Receipt icon)
  - 📦 Inventory (Package icon)
  - 📁 Files (Folder icon)
  - ⚙️ Settings (Settings icon)

- **Footer**
  - User Profile section
    - Avatar/Photo
    - Email
    - Sign out button

**Technical Specs**
- Fixed sidebar kiri (256px width)
- Always visible di desktop
- Active state dengan background highlight
- Hover effects
- Smooth transitions

#### Mobile: Bottom Navigation Bar

**Bottom Navigation Structure** (<768px)

**Primary Tabs** (Fixed bottom bar, 64px height):
1. **Dashboard** (Home icon)
2. **Patients** (Heart/Paw icon) - most frequently accessed
3. **Appointments** (Calendar icon) - critical for daily use
4. **Records** (FileText icon) - quick access to medical records
5. **More** (Menu/Grid icon) - opens bottom sheet

**Secondary Menu** (dalam "More" bottom sheet):
- Clients
- Invoices
- Inventory
- Files
- Settings
- Profile
- Sign Out

**Technical Specs**
- Fixed position bottom (64px height)
- Safe area insets untuk notch/home indicator
- Active state: icon color + label bold
- Ripple effect pada tap
- Bottom sheet menggunakan Shadcn Sheet component
- Backdrop blur saat sheet open

#### Shared Specifications

**Icons**: Lucide React (dari Shadcn/ui)
**Styling**: Tailwind CSS
**Active Route Detection**: `usePathname()` dari Next.js
**Transitions**: Smooth animations dengan Tailwind

**Responsive Breakpoints**:
- Mobile: < 768px (Bottom Nav)
- Desktop: ≥ 768px (Sidebar)

---

### Phase 1: Core Features (4-6 weeks)

**Priority**: Complete foundation untuk operasional dasar

#### 1. Client Management (1 week)

**Features**
- List clients dengan search & filter
- Create new client (personal/company)
- Edit client details
- View client detail dengan patient list
- Favorite clients

**Files to Create**
```
src/app/(dashboard)/clients/
  ├── page.tsx              # List view dengan table
  ├── new/page.tsx          # Create form
  ├── [id]/page.tsx         # Detail view
  └── [id]/edit/page.tsx    # Edit form

src/app/actions/
  └── clients.ts            # Server actions (CRUD)

src/components/clients/
  ├── client-table.tsx      # Table component
  ├── client-form.tsx       # Reusable form
  └── client-card.tsx       # Card untuk list view
```

**Schema Fields to Implement**
- name, type (personal/company)
- companyName, companyTypeId (if company)
- picName, picPhone (Person in Charge)
- taxId (NPWP), idCardNumber (KTP)
- phone, email, address
- isFavorite, notes

#### 2. Patient Management (1.5 weeks)

**Features**
- List patients dengan photo thumbnails
- Create new patient dengan photo upload
- Link patient to multiple owners (PatientOwnership)
- Edit patient details
- View medical history
- Favorite patients

**Files to Create**
```
src/app/(dashboard)/patients/
  ├── page.tsx                  # List view dengan cards
  ├── new/page.tsx              # Create form dengan photo upload
  ├── [id]/page.tsx             # Detail + medical history
  └── [id]/edit/page.tsx        # Edit form

src/app/actions/
  └── patients.ts               # Server actions (CRUD + photo upload)

src/components/patients/
  ├── patient-card.tsx          # Card dengan photo
  ├── patient-form.tsx          # Form dengan photo upload
  ├── patient-ownership.tsx     # Link owners
  └── medical-history-list.tsx  # History component
```

**Schema Fields to Implement**
- name, speciesId, breed, gender
- furColor, microchipNumber, insuranceInfo
- dateOfBirth, weight
- photoUrl, photoDriveId (Google Drive)
- locationId, isFavorite
- allergies, specialNotes

**Photo Upload Integration**
- Upload to Google Drive folder: `/Patients/{patientId}/`
- Store `photoUrl` and `photoDriveId`
- Thumbnail preview 200x200px
- Max size: 5MB

#### 3. Medical Records (2 weeks)

**Features**
- Create medical record dengan form lengkap
- Vital signs input (weight, temperature, heart rate, respiratory rate, blood pressure)
- Diagnosis & treatment
- Photo upload (multiple)
- Voice notes (optional)
- Follow-up scheduling
- Medical templates support
- View patient history timeline

**Files to Create**
```
src/app/(dashboard)/records/
  ├── page.tsx                  # List all records
  ├── new/page.tsx              # Create record form
  ├── [id]/page.tsx             # View record detail
  └── [id]/edit/page.tsx        # Edit record

src/app/(dashboard)/patients/[id]/records/
  └── page.tsx                  # Patient-specific records

src/app/actions/
  └── medical-records.ts        # Server actions

src/components/records/
  ├── record-form.tsx           # Main form
  ├── vital-signs.tsx           # Vital signs section
  ├── photo-upload.tsx          # Multiple photo upload
  ├── template-selector.tsx     # Medical templates
  └── record-timeline.tsx       # Timeline view
```

**Schema Fields to Implement**
- date, locationId
- broughtByClientId, patientId
- weight, temperature, heartRate, respiratoryRate, bloodPressure
- examinationType (rutin/emergency/follow-up)
- complaint, diagnosis, treatment
- prescription, followUpNotes, nextFollowUpDate
- photoUrls (JSON array), photoDriveIds (JSON array)
- voiceNotesUrl

**Photo Storage**
- Folder: `/MedicalRecords/{recordId}/`
- Support multiple photos
- Lazy-loaded thumbnails

#### 4. Appointments (1.5 weeks)

**Features**
- Calendar view (month/week/day)
- Create appointment dengan location selection
- Edit/cancel appointments
- Status tracking (scheduled/completed/cancelled)
- Reminder notifications
- Link to patient & client

**Files to Create**
```
src/app/(dashboard)/appointments/
  ├── page.tsx                  # Calendar view
  ├── new/page.tsx              # Create appointment
  ├── [id]/page.tsx             # View detail
  └── [id]/edit/page.tsx        # Edit appointment

src/app/actions/
  └── appointments.ts           # Server actions

src/components/appointments/
  ├── calendar.tsx              # React-Big-Calendar wrapper
  ├── appointment-form.tsx      # Form
  └── appointment-modal.tsx     # Quick view modal
```

**Library**: React-Big-Calendar
```bash
npm install react-big-calendar date-fns
```

**Schema Fields to Implement**
- date, time, locationId
- patientId, clientId
- status (scheduled/completed/cancelled)
- address (untuk home visit)
- notes, reminderSentAt

---

### Phase 2: Financial & Operational (3-4 weeks)

#### 5. Invoicing (2 weeks)

**Features**
- Create invoice dari medical record
- Manual invoice creation
- Add line items dengan service templates
- Calculate subtotal, discount, tax, total
- Generate PDF invoice
- Payment tracking
- Invoice history & status

**Files to Create**
```
src/app/(dashboard)/invoices/
  ├── page.tsx                  # List invoices
  ├── new/page.tsx              # Create invoice
  ├── [id]/page.tsx             # View & download PDF
  └── [id]/edit/page.tsx        # Edit invoice

src/app/actions/
  └── invoices.ts               # Server actions + PDF generation

src/components/invoices/
  ├── invoice-form.tsx          # Form dengan line items
  ├── invoice-items.tsx         # Line items manager
  ├── invoice-pdf.tsx           # PDF template
  └── payment-tracking.tsx      # Payment status
```

**Library**: @react-pdf/renderer
```bash
npm install @react-pdf/renderer
```

**PDF Storage**: Google Drive `/Invoices/{invoiceId}.pdf`

#### 6. Location Management (3 days)

**Features**
- CRUD locations
- Set default location
- Schedule management
- Active/inactive toggle

**Files to Create**
```
src/app/(dashboard)/locations/
  ├── page.tsx                  # List locations
  ├── new/page.tsx              # Create location
  └── [id]/edit/page.tsx        # Edit location

src/app/actions/
  └── locations.ts              # Server actions

src/components/locations/
  └── location-form.tsx         # Form
```

#### 7. Service Templates (2 days)

**Features**
- CRUD pricing templates
- Categorize services
- Use in invoice creation
- Active/inactive management

**Files to Create**
```
src/app/(dashboard)/services/
  ├── page.tsx                  # List services
  └── new/page.tsx              # Create/edit service

src/app/actions/
  └── services.ts               # Server actions
```

#### 8. Inventory Basic (1 week)

**Features**
- CRUD inventory items
- Stock tracking
- Expiry date alerts
- Usage history
- Restock management
- Link to medical records

**Files to Create**
```
src/app/(dashboard)/inventory/
  ├── page.tsx                  # List inventory
  ├── new/page.tsx              # Create item
  ├── [id]/page.tsx             # View detail + history
  ├── [id]/edit/page.tsx        # Edit item
  └── [id]/restock/page.tsx     # Add stock

src/app/actions/
  ├── inventory.ts              # CRUD actions
  └── inventory-usage.ts        # Usage tracking

src/components/inventory/
  ├── inventory-table.tsx       # Table dengan alerts
  ├── stock-badge.tsx           # Low stock indicator
  └── usage-history.tsx         # History list
```

---

### Phase 3: Enhanced Features (2-3 weeks)

#### 9. Master Data UI (3 days)

**Features**
- Animal species management
- Company types management
- Medical templates management

**Files to Create**
```
src/app/(dashboard)/settings/master-data/
  ├── species/page.tsx          # Animal species
  ├── company-types/page.tsx    # Company types
  └── templates/page.tsx        # Medical templates

src/app/actions/
  └── master-data.ts            # Server actions
```

#### 10. Notifications (1 week)

**Features**
- Notification center
- Vaccination reminders
- Low stock alerts
- Appointment reminders
- Follow-up reminders
- Mark as read/unread

**Files to Create**
```
src/app/(dashboard)/notifications/
  └── page.tsx                  # Notification center

src/components/layout/
  └── notification-bell.tsx     # Header notification bell

src/app/actions/
  └── notifications.ts          # Server actions
```

#### 11. Settings & User Profile (3 days)

**Features**
- App settings (invoice prefix, due days, etc)
- User profile (UserProfile model)
- Signature upload untuk resep
- Payment methods
- Invoice terms

**Files to Create**
```
src/app/(dashboard)/settings/
  ├── page.tsx                  # General settings
  ├── profile/page.tsx          # User profile
  └── invoice/page.tsx          # Invoice settings

src/app/actions/
  ├── settings.ts               # Settings actions
  └── profile.ts                # Profile actions
```

#### 12. Dashboard Analytics (1 week)

**Features**
- Revenue charts (Recharts)
- Patient statistics
- Upcoming appointments widget
- Inventory alerts widget
- Recent activity

**Files to Update**
```
src/app/(dashboard)/page.tsx   # Enhanced dashboard

src/components/dashboard/
  ├── revenue-chart.tsx         # Revenue over time
  ├── patient-stats.tsx         # Patient statistics
  ├── upcoming-appointments.tsx # Next appointments
  ├── inventory-alerts.tsx      # Low stock items
  └── recent-activity.tsx       # Recent records
```

**Library**: Recharts
```bash
npm install recharts
```

---

### Phase 4: Polish & Production (2 weeks)

#### 13. Reports (1 week)

**Features**
- Export medical records (PDF/Excel)
- Financial reports
- Patient visit history
- Inventory usage reports

**Files to Create**
```
src/app/(dashboard)/reports/
  ├── page.tsx                  # Reports dashboard
  ├── medical/page.tsx          # Medical reports
  ├── financial/page.tsx        # Financial reports
  └── inventory/page.tsx        # Inventory reports

src/app/actions/
  └── reports.ts                # Export actions
```

#### 14. Activity Logs (2 days)

**Features**
- View activity logs
- Filter by user/action/date
- Search logs

**Files to Create**
```
src/app/(dashboard)/logs/
  └── page.tsx                  # Activity logs viewer

src/app/actions/
  └── logs.ts                   # Log actions
```

#### 15. Backup Management (3 days)

**Features**
- Auto backup database to Google Drive
- Manual backup trigger
- Restore from backup
- Backup history

**Files to Create**
```
src/app/(dashboard)/settings/backup/
  └── page.tsx                  # Backup management

src/app/actions/
  └── backup.ts                 # Backup/restore actions

src/lib/
  └── backup-service.ts         # Backup utilities
```

#### 16. PWA & Mobile Optimization (4 days)

**Features**
- Progressive Web App setup
- Service worker untuk offline capability
- Mobile-optimized UI refinements
- Touch gestures
- Install prompt

**Files to Create/Update**
```
public/
  ├── manifest.json             # PWA manifest
  └── sw.js                     # Service worker

next.config.js                  # PWA config
```

**Library**: next-pwa
```bash
npm install next-pwa
```

---

## Phase 0: UI Layout Foundation

### Detailed Implementation Steps

#### Step 1: Install Shadcn/ui Components (30 mins)

```bash
# Initialize Shadcn/ui
npx shadcn-ui@latest init

# Install components yang akan dipakai
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
npx shadcn-ui@latest add select
npx shadcn-ui@latest add form
npx shadcn-ui@latest add table
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add card
npx shadcn-ui@latest add sheet
npx shadcn-ui@latest add avatar
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add badge
```

#### Step 2: Create Layout Components (4-5 hours)

**File: `src/components/layout/sidebar.tsx`**
```typescript
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Users, Heart, FileText, Calendar, Receipt, Package, Folder, Settings } from 'lucide-react'

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/clients', label: 'Clients', icon: Users },
  { href: '/patients', label: 'Patients', icon: Heart },
  { href: '/records', label: 'Medical Records', icon: FileText },
  { href: '/appointments', label: 'Appointments', icon: Calendar },
  { href: '/invoices', label: 'Invoices', icon: Receipt },
  { href: '/inventory', label: 'Inventory', icon: Package },
  { href: '/files', label: 'Files', icon: Folder },
  { href: '/settings', label: 'Settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex md:flex-col w-64 bg-white border-r border-gray-200 h-screen sticky top-0">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">🐾 Parampis</h1>
        <p className="text-xs text-gray-500 mt-1">Vet Home Visit</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname.startsWith(item.href)
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200">
        {/* User info component here */}
      </div>
    </aside>
  )
}
```

**File: `src/components/layout/bottom-nav.tsx`**
```typescript
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Heart, Calendar, FileText, Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

const primaryTabs = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/patients', label: 'Patients', icon: Heart },
  { href: '/appointments', label: 'Appointments', icon: Calendar },
  { href: '/records', label: 'Records', icon: FileText },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-bottom z-50">
      <div className="flex items-center justify-around h-16">
        {primaryTabs.map((tab) => {
          const Icon = tab.icon
          const isActive = pathname.startsWith(tab.href)
          
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="flex flex-col items-center justify-center flex-1 h-full"
            >
              <Icon className={`w-6 h-6 ${isActive ? 'text-blue-600' : 'text-gray-600'}`} />
              <span className={`text-xs mt-1 ${isActive ? 'text-blue-600 font-semibold' : 'text-gray-600'}`}>
                {tab.label}
              </span>
            </Link>
          )
        })}
        
        {/* More Menu */}
        <Sheet>
          <SheetTrigger className="flex flex-col items-center justify-center flex-1 h-full">
            <Menu className="w-6 h-6 text-gray-600" />
            <span className="text-xs mt-1 text-gray-600">More</span>
          </SheetTrigger>
          <SheetContent side="bottom">
            {/* Secondary menu items */}
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}
```

**File: `src/app/(dashboard)/layout.tsx`**
```typescript
import { Sidebar } from '@/components/layout/sidebar'
import { BottomNav } from '@/components/layout/bottom-nav'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-y-auto pb-16 md:pb-0">
        {children}
      </main>
      <BottomNav />
    </div>
  )
}
```

#### Step 3: Update Existing Pages (1 hour)

Move existing pages ke route group `(dashboard)`:
```
src/app/dashboard/page.tsx → src/app/(dashboard)/dashboard/page.tsx
src/app/files/page.tsx → src/app/(dashboard)/files/page.tsx
```

---

## Technical Decisions

### ✅ Confirmed

1. **UI Framework**: Shadcn/ui (sudah ada di package.json)
2. **Form Validation**: Zod + React Hook Form
3. **State Management**: Server state only (server actions + React state local)
4. **Icons**: Lucide React (dari Shadcn/ui)
5. **Calendar Library**: React-Big-Calendar
6. **PDF Generation**: @react-pdf/renderer
7. **Charts**: Recharts
8. **PWA**: next-pwa

### Dependencies to Install

```json
{
  "dependencies": {
    "@react-pdf/renderer": "^3.1.14",
    "react-big-calendar": "^1.8.5",
    "date-fns": "^2.30.0",
    "recharts": "^2.10.3",
    "zod": "^3.22.4",
    "react-hook-form": "^7.48.2",
    "@hookform/resolvers": "^3.3.2"
  },
  "devDependencies": {
    "next-pwa": "^5.6.0"
  }
}
```

---

## Summary

### Current State
- **15% Complete** (infrastructure only)
- Database schema: ✅ 100%
- Auth: ✅ 90%
- File management: ✅ 85%
- Core features: ❌ 0%

### Immediate Priority
1. **Phase 0**: UI Layout (Sidebar + Bottom Nav) - 2-3 days
2. **Phase 1**: Client + Patient Management - 2.5 weeks
3. **Phase 1**: Medical Records - 2 weeks
4. **Phase 1**: Appointments - 1.5 weeks

### Estimated Timeline
- **Phase 0**: 2-3 days
- **Phase 1**: 4-6 weeks
- **Phase 2**: 3-4 weeks
- **Phase 3**: 2-3 weeks
- **Phase 4**: 2 weeks
- **Total**: 12-16 weeks untuk aplikasi fungsional lengkap

### Biggest Risks
1. **Large schema tapi zero implementation** - perlu sprint intensif
2. **Google Drive integration** - perlu testing dengan volume file besar
3. **Mobile UX** - Bottom nav perlu extensive testing
4. **Performance** - Lazy loading dan pagination critical untuk large datasets

### Success Criteria
- [ ] Semua CRUD operations berfungsi untuk Client, Patient, Medical Records
- [ ] Appointment scheduling dengan calendar view
- [ ] Invoice generation dengan PDF export
- [ ] Mobile responsive dengan Bottom Navigation
- [ ] File management terintegrasi dengan Medical Records
- [ ] Basic reporting dan analytics
- [ ] Production deployment di Vercel

---

**Next Steps**: Start with Phase 0 - UI Layout Foundation

**Contact**: [Your contact info]
**Repository**: [GitHub URL]

