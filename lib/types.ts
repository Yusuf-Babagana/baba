export interface BlockData {
  // Agriculture data
  farmName?: string;
  cropType?: string;
  harvestDate?: string;
  location?: string;
  
  // Health data
  patientName?: string;
  hospital?: string;
  diagnosis?: string;
  visitDate?: string;
  
  // Logistics data
  shipmentId?: string;
  origin?: string;
  destination?: string;
  status?: string;
}

export interface Block {
  index: number;
  timestamp: string;
  sector: 'agriculture' | 'health' | 'logistics';
  data: BlockData;
  previousHash: string;
  hash: string;
}

export interface Blockchain {
  chain: Block[];
  addBlock: (sector: Block['sector'], data: BlockData) => Block;
  getLatestBlock: () => Block;
  isChainValid: () => boolean;
  findBlockByHash: (hash: string) => Block | undefined;
  verifyData: (sector: Block['sector'], data: BlockData) => Block | null;
}

export interface SectorConfig {
  name: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
}