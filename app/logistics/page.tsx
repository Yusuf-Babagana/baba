import { LogisticsForm } from '@/components/sectors/logistics-form';

export default function LogisticsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">
          🚚 Logistics Records
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Track and verify logistics shipments on the blockchain. 
          Ensure transparency in your supply chain with immutable tracking.
        </p>
      </div>
      
      <LogisticsForm />
    </div>
  );
}