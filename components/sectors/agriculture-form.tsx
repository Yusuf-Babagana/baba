'use client';

import { useState } from 'react';
import { blockchain } from '@/lib/blockchain';
import { Block } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SuccessModal } from '@/components/ui/success-modal';
import { Loader2, Sprout } from 'lucide-react';

export function AgricultureForm() {
  const [formData, setFormData] = useState({
    farmName: '',
    cropType: '',
    harvestDate: '',
    location: ''
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
      const block = blockchain.addBlock('agriculture', formData);
      setNewBlock(block);
      setShowModal(true);
      
      // Reset form
      setFormData({
        farmName: '',
        cropType: '',
        harvestDate: '',
        location: ''
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

  return (
    <>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Sprout className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <CardTitle className="text-green-700">Agriculture Record</CardTitle>
              <CardDescription>
                Record and verify agricultural produce traceability on the blockchain
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="farmName">Farm Name</Label>
                <Input
                  id="farmName"
                  name="farmName"
                  value={formData.farmName}
                  onChange={handleChange}
                  placeholder="e.g., Sunny Valley Farm"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cropType">Crop Type</Label>
                <Input
                  id="cropType"
                  name="cropType"
                  value={formData.cropType}
                  onChange={handleChange}
                  placeholder="e.g., Organic Tomatoes"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="harvestDate">Harvest Date</Label>
                <Input
                  id="harvestDate"
                  name="harvestDate"
                  type="date"
                  value={formData.harvestDate}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g., California, USA"
                  required
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-green-600 hover:bg-green-700"
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