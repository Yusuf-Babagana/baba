import { HealthForm } from '@/components/sectors/health-form';

export default function HealthPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-red-700 mb-4">
          🏥 Health Records
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Issue and verify patient health records on the blockchain. 
          Ensure medical data integrity with secure, immutable records.
        </p>
      </div>
      
      <HealthForm />
    </div>
  );
}