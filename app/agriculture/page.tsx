import { AgricultureForm } from '@/components/sectors/agriculture-form';

export default function AgriculturePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-green-700 mb-4">
          🌾 Agriculture Records
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Record and verify agricultural produce traceability on the blockchain. 
          Track your crops from farm to table with immutable records.
        </p>
      </div>
      
      <AgricultureForm />
    </div>
  );
}