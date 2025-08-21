'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { sectorConfigs } from '@/lib/sector-config';
import { Button } from '@/components/ui/button';
import { Shield, Search, Eye, Home } from 'lucide-react';

const navigationItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/agriculture', label: 'Agriculture', icon: '🌾' },
  { href: '/health', label: 'Health', icon: '🏥' },
  { href: '/logistics', label: 'Logistics', icon: '🚚' },
  { href: '/verification', label: 'Verification', icon: Shield },
  { href: '/explorer', label: 'Explorer', icon: Eye },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CS</span>
            </div>
            <span className="font-bold text-xl">ChainSphere</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;
              const IconComponent = typeof item.icon === 'string' ? null : item.icon;
              
              return (
                <Button
                  key={item.href}
                  asChild
                  variant={isActive ? 'default' : 'ghost'}
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <Link href={item.href}>
                    {typeof item.icon === 'string' ? (
                      <span className="text-lg">{item.icon}</span>
                    ) : (
                      <IconComponent className="w-4 h-4" />
                    )}
                    <span>{item.label}</span>
                  </Link>
                </Button>
              );
            })}
          </div>

          {/* Mobile menu - simplified for demo */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm">
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}