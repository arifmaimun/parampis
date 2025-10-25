'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Heart, Calendar, FileText, Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

const primaryTabs = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/patients', label: 'Patients', icon: Heart },
  { href: '/appointments', label: 'Appointments', icon: Calendar },
  { href: '/records', label: 'Records', icon: FileText },
]

const secondaryMenu = [
  { href: '/clients', label: 'Clients' },
  { href: '/invoices', label: 'Invoices' },
  { href: '/inventory', label: 'Inventory' },
  { href: '/files', label: 'Files' },
  { href: '/settings', label: 'Settings' },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <>
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 safe-area-bottom">
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
                <Icon className={cn(
                  "w-6 h-6 transition-colors",
                  isActive ? 'text-blue-600' : 'text-gray-600'
                )} />
                <span className={cn(
                  "text-xs mt-1 transition-colors",
                  isActive ? 'text-blue-600 font-semibold' : 'text-gray-600'
                )}>
                  {tab.label}
                </span>
              </Link>
            )
          })}
          
          {/* More Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="flex flex-col items-center justify-center flex-1 h-full">
                <Menu className="w-6 h-6 text-gray-600" />
                <span className="text-xs mt-1 text-gray-600">More</span>
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[400px]">
              <div className="py-6">
                <h3 className="text-lg font-semibold mb-4">Menu</h3>
                <div className="space-y-2">
                  {secondaryMenu.map((item) => {
                    const isActive = pathname.startsWith(item.href)
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "flex items-center px-4 py-3 rounded-lg transition-colors",
                          isActive
                            ? 'bg-blue-50 text-blue-700 font-medium'
                            : 'text-gray-700 hover:bg-gray-100'
                        )}
                      >
                        {item.label}
                      </Link>
                    )
                  })}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
      
      {/* Bottom padding for mobile content */}
      <div className="md:hidden h-16" />
    </>
  )
}
