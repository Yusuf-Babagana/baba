import { Block, BlockData, Blockchain } from './types';
import { createHash } from 'crypto';

// Polyfill for crypto in browser environment
function sha256(data: string): string {
  if (typeof window !== 'undefined') {
    // Browser environment - use Web Crypto API
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    
    // For demo purposes, we'll use a simple hash function
    // In production, you'd use Web Crypto API properly
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      const char = data.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(16).padStart(8, '0');
  } else {
    // Node.js environment
    return createHash('sha256').update(data).digest('hex');
  }
}

class BlockchainImpl implements Blockchain {
  chain: Block[];
  private readonly storageKey = 'chainsphere_blockchain';

  constructor() {
    this.chain = this.loadFromStorage() || [this.createGenesisBlock()];
  }

  private createGenesisBlock(): Block {
    const block: Block = {
      index: 0,
      timestamp: new Date().toISOString(),
      sector: 'agriculture',
      data: { farmName: 'Genesis Farm', cropType: 'Genesis Crop', harvestDate: new Date().toISOString().split('T')[0], location: 'Blockchain Network' },
      previousHash: '0',
      hash: ''
    };
    block.hash = this.calculateHash(block);
    return block;
  }

  private calculateHash(block: Block): string {
    const data = JSON.stringify({
      index: block.index,
      timestamp: block.timestamp,
      sector: block.sector,
      data: block.data,
      previousHash: block.previousHash
    });
    return sha256(data);
  }

  getLatestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  addBlock(sector: Block['sector'], data: BlockData): Block {
    const previousBlock = this.getLatestBlock();
    const newBlock: Block = {
      index: previousBlock.index + 1,
      timestamp: new Date().toISOString(),
      sector,
      data,
      previousHash: previousBlock.hash,
      hash: ''
    };
    newBlock.hash = this.calculateHash(newBlock);
    
    this.chain.push(newBlock);
    this.saveToStorage();
    return newBlock;
  }

  isChainValid(): boolean {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== this.calculateHash(currentBlock)) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }

  findBlockByHash(hash: string): Block | undefined {
    return this.chain.find(block => block.hash === hash);
  }

  verifyData(sector: Block['sector'], data: BlockData): Block | null {
    // Create a temporary block to calculate hash
    const tempBlock: Block = {
      index: 0,
      timestamp: '',
      sector,
      data,
      previousHash: '',
      hash: ''
    };
    
    // Find matching block by comparing data
    for (const block of this.chain) {
      if (block.sector === sector && JSON.stringify(block.data) === JSON.stringify(data)) {
        return block;
      }
    }
    return null;
  }

  private saveToStorage(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.storageKey, JSON.stringify(this.chain));
    }
  }

  private loadFromStorage(): Block[] | null {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : null;
    }
    return null;
  }

  clearChain(): void {
    this.chain = [this.createGenesisBlock()];
    this.saveToStorage();
  }
}

export const blockchain = new BlockchainImpl();