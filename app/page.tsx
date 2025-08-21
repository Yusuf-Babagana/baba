import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Shield, Eye, CheckCircle } from 'lucide-react';
import { sectorConfigs } from '@/lib/sector-config';

export default function Home() {
  const sectors = Object.entries(sectorConfigs);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4">
          <span className="text-white font-bold text-2xl">CS</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          ChainSphere Demo
        </h1>
        <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
          A self-contained blockchain simulation demonstrating how blockchain technology ensures 
          trust, transparency, and authenticity across Agriculture, Health, and Logistics sectors.
        </p>
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <Badge variant="secondary" className="px-3 py-1">No Smart Contracts</Badge>
          <Badge variant="secondary" className="px-3 py-1">No External APIs</Badge>
          <Badge variant="secondary" className="px-3 py-1">Self-Contained</Badge>
          <Badge variant="secondary" className="px-3 py-1">Educational</Badge>
        </div>
      </div>

      {/* Sector Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {sectors.map(([key, config]) => (
          <Card key={key} className={`border-2 ${config.borderColor} hover:shadow-lg transition-shadow`}>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 ${config.bgColor} rounded-xl flex items-center justify-center`}>
                  <span className="text-2xl">{config.icon}</span>
                </div>
                <div>
                  <CardTitle className={config.color}>{config.name}</CardTitle>
                  <CardDescription className="mt-1">
                    {key === 'agriculture' && 'Track produce from farm to table'}
                    {key === 'health' && 'Secure patient record management'}
                    {key === 'logistics' && 'End-to-end shipment tracking'}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href={`/${key}`}>
                  Create Record <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Shield className="w-6 h-6 text-blue-600" />
              <CardTitle>Verification System</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Verify the authenticity of any record by entering its hash or details. 
              Our blockchain ensures data integrity and prevents tampering.
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link href="/verification">
                Verify Records <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Eye className="w-6 h-6 text-purple-600" />
              <CardTitle>Blockchain Explorer</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Explore the complete blockchain with our interactive explorer. 
              See how blocks are linked together and view all recorded transactions.
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link href="/explorer">
                Explore Blockchain <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Demo Flow */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-center">Demo Flow</CardTitle>
          <CardDescription className="text-center">
            Follow these steps to experience the full blockchain workflow
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center space-y-2">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-green-600 font-bold">1</span>
              </div>
              <p className="font-medium">Create Records</p>
              <p className="text-sm text-gray-600">Add agriculture, health, or logistics records</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-blue-600 font-bold">2</span>
              </div>
              <p className="font-medium">Generate Hash</p>
              <p className="text-sm text-gray-600">System creates unique blockchain hash</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-purple-600 font-bold">3</span>
              </div>
              <p className="font-medium">Explore Chain</p>
              <p className="text-sm text-gray-600">View all blocks in the explorer</p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-orange-600 font-bold">4</span>
              </div>
              <p className="font-medium">Verify Records</p>
              <p className="text-sm text-gray-600">Confirm authenticity using hash</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}