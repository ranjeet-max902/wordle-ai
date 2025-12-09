import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data');

// Ensure data dir exists
try {
    if (!fs.existsSync(DB_PATH)) {
        fs.mkdirSync(DB_PATH, { recursive: true });
    }
} catch (e) {
    console.error('Failed to create data directory', e);
}

const HISTORY_FILE = path.join(DB_PATH, 'history.json');
const CLAIMS_FILE = path.join(DB_PATH, 'claims.json');

export interface UserHistory {
    address: string;
    wordId: string;
    result: 'won' | 'lost';
    score: number;
    timestamp: number;
}

export interface ClaimRecord {
    address: string;
    lastClaimAt: number;
}

function readJson<T>(file: string): T[] {
    try {
        if (!fs.existsSync(file)) return [];
        const content = fs.readFileSync(file, 'utf-8');
        return JSON.parse(content) || [];
    } catch (e) {
        console.error(`Error reading ${file}`, e);
        return [];
    }
}

function writeJson(file: string, data: any) {
    try {
        fs.writeFileSync(file, JSON.stringify(data, null, 2));
    } catch (e) {
        console.error(`Error writing ${file}`, e);
    }
}

export const db = {
    getHistory: (address: string): UserHistory[] => {
        const data = readJson<UserHistory>(HISTORY_FILE);
        return data.filter(h => h.address.toLowerCase() === address.toLowerCase());
    },
    addHistory: (record: UserHistory) => {
        const data = readJson<UserHistory>(HISTORY_FILE);
        data.push(record);
        writeJson(HISTORY_FILE, data);
    },
    getClaim: (address: string): ClaimRecord | undefined => {
        const data = readJson<ClaimRecord>(CLAIMS_FILE);
        return data.find(c => c.address.toLowerCase() === address.toLowerCase());
    },
    updateClaim: (address: string) => {
        const data = readJson<ClaimRecord>(CLAIMS_FILE);
        const existingIndex = data.findIndex(c => c.address.toLowerCase() === address.toLowerCase());
        const record = { address, lastClaimAt: Date.now() };

        if (existingIndex > -1) {
            data[existingIndex] = record;
        } else {
            data.push(record);
        }
        writeJson(CLAIMS_FILE, data);
    }
};
