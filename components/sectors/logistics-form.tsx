'use client';

import { useState } from 'react';
import { blockchain } from '@/lib/blockchain';
import { Block } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SuccessModal } from '@/components/ui/success-modal';
import { Loader2, Truck } from 'lucide-react';

export function LogisticsForm() {
  const [formData, setFormData] = useState({
    shipmentId: '',
    origin: '',
    destination: '',
    status: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [newBlock, setNewBlock] = useState<Block | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      const block = blockchain.addBlock('logistics', formData);
      setNewBlock(block);
      setShowModal(true);
      
      // Reset form
      setFormData({
        shipmentId: '',
        origin: '',
        destination: '',
        status: ''
      });
    } catch (error) {
      console.error('Error adding block:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleStatusChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      status: value
    }));
  };

  return (
    <>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Truck className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-blue-700">Logistics Record</CardTitle>
              <CardDescription>
                Track and verify logistics shipments on the blockchain
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="shipmentId">Shipment ID</Label>
              <Input
                id="shipmentId"
                name="shipmentId"
                value={formData.shipmentId}
                onChange={handleChange}
                placeholder="e.g., SHP-2024-001"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="origin">Origin</Label>
                <Input
                  id="origin"
                  name="origin"
                  value={formData.origin}
                  onChange={handleChange}
                  placeholder="e.g., New York, NY"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="destination">Destination</Label>
                <Input
                  id="destination"
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  placeholder="e.g., Los Angeles, CA"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={handleStatusChange} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select shipment status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-transit">In Transit</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="delayed">Delayed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding to Blockchain...
                </>
              ) : (
                'Add to Blockchain'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <SuccessModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        block={newBlock}
      />
    </>
  );
}