'use client';

import { cn } from '@/lib/utils';
import { Block } from '@/lib/types';
import { sectorConfigs } from '@/lib/sector-config';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Copy, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  block: Block | null;
}

export function SuccessModal({ isOpen, onClose, block }: SuccessModalProps) {
  const [copied, setCopied] = useState(false);

  if (!block) return null;

  const sectorConfig = sectorConfigs[block.sector];

  const copyHash = async () => {
    try {
      await navigator.clipboard.writeText(block.hash);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy hash:', err);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center space-x-2 mb-2">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <div>
              <DialogTitle className="text-xl">Record Added Successfully!</DialogTitle>
              <DialogDescription>
                Your record has been securely added to the blockchain
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Block Summary */}
          <div className={cn("p-4 rounded-lg border-2", sectorConfig.borderColor, sectorConfig.bgColor)}>
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-2xl">{sectorConfig.icon}</span>
              <div>
                <h3 className="font-semibold">Block #{block.index}</h3>
                <Badge variant="secondary" className={sectorConfig.color}>
                  {sectorConfig.name}
                </Badge>
              </div>
            </div>
            
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium">Timestamp:</span>
                <span className="ml-2">{new Date(block.timestamp).toLocaleString()}</span>
              </div>
              
              <div className="space-y-1">
                <span className="font-medium">Record Data:</span>
                <div className="bg-white/50 p-2 rounded text-xs space-y-1">
                  {Object.entries(block.data).map(([key, value]) => (
                    <div key={key}>
                      <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                      <span className="ml-2">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Hash Display */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Blockchain Hash (Record ID):</label>
            <div className="flex items-center space-x-2">
              <code className="flex-1 bg-muted p-3 rounded text-xs break-all">
                {block.hash}
              </code>
              <Button
                variant="outline"
                size="sm"
                onClick={copyHash}
                className="shrink-0"
              >
                <Copy className="w-4 h-4" />
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Save this hash to verify your record later
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild className="flex-1">
              <Link href="/explorer">
                <ExternalLink className="w-4 h-4 mr-2" />
                View in Explorer
              </Link>
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <Link href="/verification">
                Verify Record
              </Link>
            </Button>
            <Button variant="secondary" onClick={onClose} className="flex-1">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}