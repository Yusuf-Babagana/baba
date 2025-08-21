'use client';

import { useEffect, useState } from 'react';
import { blockchain } from '@/lib/blockchain';
import { sectorConfigs } from '@/lib/sector-config';
import { Block } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, ArrowDown, Trash2, RefreshCw } from 'lucide-react';

export default function ExplorerPage() {
  const [chain, setChain] = useState<Block[]>([]);
  const [isValid, setIsValid] = useState(true);

  const loadBlockchain = () => {
    setChain([...blockchain.chain]);
    setIsValid(blockchain.isChainValid());
  };

  const clearBlockchain = () => {
    blockchain.clearChain();
    loadBlockchain();
  };

  useEffect(() => {
    loadBlockchain();
    
    // Listen for storage changes to update when new blocks are added
    const handleStorageChange = () => {
      loadBlockchain();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Also check periodically for updates
    const interval = setInterval(loadBlockchain, 1000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const renderBlock = (block: Block, index: number) => {
    const sectorConfig = sectorConfigs[block.sector];
    const isGenesis = block.index === 0;
    
    return (
      <div key={block.hash} className="relative">
        <Card className={`border-2 ${sectorConfig.borderColor} ${isGenesis ? 'border-purple-300 bg-purple-50' : ''}`}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className={`w-10 h-10 ${isGenesis ? 'bg-purple-100' : sectorConfig.bgColor} rounded-lg flex items-center justify-center`}>
                  <span className="text-xl">{isGenesis ? '⛓️' : sectorConfig.icon}</span>
                </div>
                <div>
                  <CardTitle className="text-lg">
                    {isGenesis ? 'Genesis Block' : `Block #${block.index}`}
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge variant={isGenesis ? 'default' : 'secondary'} className={isGenesis ? '' : sectorConfig.color}>
                      {isGenesis ? 'Genesis' : sectorConfig.name}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(block.timestamp).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <span className="font-medium text-sm">Record Data:</span>
              <div className={`p-3 rounded-lg ${isGenesis ? 'bg-purple-100' : sectorConfig.bgColor} space-y-1 text-sm`}>
                {Object.entries(block.data).map(([key, value]) => (
                  <div key={key}>
                    <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                    <span className="ml-2">{value}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2 text-xs">
              <div>
                <span className="font-medium">Hash:</span>
                <code className="block bg-muted p-2 rounded mt-1 break-all">
                  {block.hash}
                </code>
              </div>
              {!isGenesis && (
                <div>
                  <span className="font-medium">Previous Hash:</span>
                  <code className="block bg-muted p-2 rounded mt-1 break-all">
                    {block.previousHash}
                  </code>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* Arrow connector */}
        {index < chain.length - 1 && (
          <div className="flex justify-center py-4">
            <ArrowDown className="w-6 h-6 text-gray-400" />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-2xl mb-4">
          <Eye className="w-8 h-8 text-purple-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Blockchain Explorer
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore the complete blockchain and see how blocks are linked together. 
          Each block contains a hash that connects it to the previous block, creating an immutable chain.
        </p>
      </div>

      {/* Stats and Actions */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 bg-white rounded-lg border">
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{chain.length}</div>
              <div className="text-sm text-gray-500">Total Blocks</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${isValid ? 'text-green-600' : 'text-red-600'}`}>
                {isValid ? '✓' : '✗'}
              </div>
              <div className="text-sm text-gray-500">Chain Valid</div>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={loadBlockchain}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" size="sm" onClick={clearBlockchain} className="text-red-600">
              <Trash2 className="w-4 h-4 mr-2" />
              Clear Chain
            </Button>
          </div>
        </div>
      </div>

      {/* Blockchain Visualization */}
      <div className="max-w-2xl mx-auto">
        {chain.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-gray-500">No blocks found. Start by adding some records!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-0">
            {chain.map((block, index) => renderBlock(block, index))}
          </div>
        )}
      </div>

      {/* Info Section */}
      <Card className="max-w-2xl mx-auto mt-8 bg-gray-50 border-gray-200">
        <CardHeader>
          <CardTitle className="text-gray-700">Understanding the Blockchain</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-gray-700">
          <p>• Each block contains a unique hash (fingerprint) based on its data</p>
          <p>• Every block references the hash of the previous block</p>
          <p>• This creates an immutable chain - changing any data would break the links</p>
          <p>• The Genesis Block is the first block that starts the chain</p>
          <p>• Blocks are color-coded by sector: 🌾 Agriculture, 🏥 Health, 🚚 Logistics</p>
        </CardContent>
      </Card>
    </div>
  );
}