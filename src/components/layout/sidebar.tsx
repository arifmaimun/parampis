'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home, 
  Users, 
  Heart, 
  FileText, 
  Calendar, 
  Receipt, 
  Package, 
  Folder, 
  Settings 
} from 'lucide-react'
import { cn } from '@/lib/utils'

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
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                isActive
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* User Profile Section */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
            U
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">User</p>
            <p className="text-xs text-gray-500 truncate">user@example.com</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
