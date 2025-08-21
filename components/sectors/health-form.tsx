'use client';

import { useState } from 'react';
import { blockchain } from '@/lib/blockchain';
import { Block } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SuccessModal } from '@/components/ui/success-modal';
import { Loader2, Heart } from 'lucide-react';

export function HealthForm() {
  const [formData, setFormData] = useState({
    patientName: '',
    hospital: '',
    diagnosis: '',
    visitDate: ''
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
      const block = blockchain.addBlock('health', formData);
      setNewBlock(block);
      setShowModal(true);
      
      // Reset form
      setFormData({
        patientName: '',
        hospital: '',
        diagnosis: '',
        visitDate: ''
      });
    } catch (error) {
      console.error('Error adding block:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <CardTitle className="text-red-700">Health Record</CardTitle>
              <CardDescription>
                Issue and verify patient health records on the blockchain
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="patientName">Patient Name</Label>
                <Input
                  id="patientName"
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleChange}
                  placeholder="e.g., John Doe"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="hospital">Hospital/Clinic</Label>
                <Input
                  id="hospital"
                  name="hospital"
                  value={formData.hospital}
                  onChange={handleChange}
                  placeholder="e.g., City General Hospital"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="diagnosis">Diagnosis / Treatment Summary</Label>
              <Textarea
                id="diagnosis"
                name="diagnosis"
                value={formData.diagnosis}
                onChange={handleChange}
                placeholder="e.g., Routine checkup - blood pressure normal, cholesterol levels within range"
                rows={3}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="visitDate">Date of Visit</Label>
              <Input
                id="visitDate"
                name="visitDate"
                type="date"
                value={formData.visitDate}
                onChange={handleChange}
                required
              />
            </div>
            
            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-red-600 hover:bg-red-700"
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