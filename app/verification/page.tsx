'use client';

import { useState } from 'react';
import { blockchain } from '@/lib/blockchain';
import { sectorConfigs } from '@/lib/sector-config';
import { Block } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle, Search, Shield } from 'lucide-react';

export default function VerificationPage() {
  const [hash, setHash] = useState('');
  const [verificationResult, setVerificationResult] = useState<{
    success: boolean;
    block?: Block;
    message: string;
  } | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleHashVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    
    // Simulate verification delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const block = blockchain.findBlockByHash(hash.trim());
    
    if (block) {
      setVerificationResult({
        success: true,
        block,
        message: 'Record verified successfully! This record exists on the blockchain.'
      });
    } else {
      setVerificationResult({
        success: false,
        message: 'No matching record found. The hash may be incorrect or the record may have been tampered with.'
      });
    }
    
    setIsVerifying(false);
  };

  const renderBlockDetails = (block: Block) => {
    const sectorConfig = sectorConfigs[block.sector];
    
    return (
      <Card className={`border-2 ${sectorConfig.borderColor}`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">{sectorConfig.icon}</span>
              <div>
                <CardTitle className="text-lg">Verified Record</CardTitle>
                <Badge variant="secondary" className={sectorConfig.color}>
                  {sectorConfig.name}
                </Badge>
              </div>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Block Index:</span>
              <span className="ml-2">#{block.index}</span>
            </div>
            <div>
              <span className="font-medium">Timestamp:</span>
              <span className="ml-2">{new Date(block.timestamp).toLocaleString()}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <span className="font-medium">Record Data:</span>
            <div className={`p-3 rounded-lg ${sectorConfig.bgColor} space-y-1 text-sm`}>
              {Object.entries(block.data).map(([key, value]) => (
                <div key={key}>
                  <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                  <span className="ml-2">{value}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <span className="font-medium">Hash:</span>
            <code className="block bg-muted p-2 rounded text-xs break-all">
              {block.hash}
            </code>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4">
          <Shield className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Record Verification
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Verify the authenticity of any record by entering its blockchain hash. 
          Our system will check if the record exists and hasn't been tampered with.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Verify by Hash</CardTitle>
            <CardDescription>
              Enter the hash of the record you want to verify
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleHashVerification} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hash">Record Hash</Label>
                <Input
                  id="hash"
                  value={hash}
                  onChange={(e) => setHash(e.target.value)}
                  placeholder="Enter the blockchain hash..."
                  required
                />
              </div>
              
              <Button type="submit" disabled={isVerifying} className="w-full">
                {isVerifying ? (
                  <>
                    <Search className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Verify Record
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {verificationResult && (
          <div className="mt-6">
            <Alert className={verificationResult.success ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
              <div className="flex items-center space-x-2">
                {verificationResult.success ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-600" />
                )}
                <AlertDescription className={verificationResult.success ? 'text-green-700' : 'text-red-700'}>
                  {verificationResult.message}
                </AlertDescription>
              </div>
            </Alert>
            
            {verificationResult.success && verificationResult.block && (
              <div className="mt-4">
                {renderBlockDetails(verificationResult.block)}
              </div>
            )}
          </div>
        )}

        {/* Help Section */}
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-700">How Verification Works</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-blue-700">
            <p>• Each record on the blockchain has a unique hash (fingerprint)</p>
            <p>• The hash is generated from the record's data and cannot be forged</p>
            <p>• If any data is changed, the hash will completely change</p>
            <p>• Our system recalculates hashes and compares them to detect tampering</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}