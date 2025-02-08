import { Reader } from './Reader';
import { osuDbStruct, collectionStruct } from './Struct';

type BufferType = 'osudb' | 'collection';

type OsuDBData = any; // Replace with actual type

type CollectionData = any; // Replace with actual type

class OsuDBParser {
    private reader: Reader;
    private osuDBData?: OsuDBData;
    private collectionData?: CollectionData;

    private canGetDBData: boolean;
    private canGetCollectionData: boolean;

    private dbFile?: Buffer;
    private collectionDB?: Buffer;

    constructor(osuDbBuffer: Buffer | null = null, osuCollectionBuffer: Buffer | null = null) {
        this.reader = new Reader();
        this.canGetDBData = osuDbBuffer !== null;
        this.canGetCollectionData = osuCollectionBuffer !== null;

        if (this.canGetDBData && osuDbBuffer) {
            this.dbFile = osuDbBuffer;
            const dbosuData = this.reader.UnmarshalPacket<any>(this.dbFile, osuDbStruct);
            dbosuData.isLocked = !dbosuData.isLocked;
            this.osuDBData = dbosuData;
        }
        
        if (this.canGetCollectionData && osuCollectionBuffer) {
            this.collectionDB = osuCollectionBuffer;
            this.collectionData = this.reader.UnmarshalPacket(this.collectionDB, collectionStruct);
        }
    }

    /**
     * Set a buffer and parse it
     * @param {BufferType} type - The type of buffer ('osudb' or 'collection')
     * @param {Buffer} buffer - The buffer to parse
     * @returns {boolean}
     */
    setBuffer(type: BufferType, buffer: Buffer): boolean {
        try {
            if (type === 'osudb') {
                this.dbFile = buffer;
                const dbosuData = this.reader.UnmarshalPacket<any>(this.dbFile, osuDbStruct);
                dbosuData.isLocked = !dbosuData.isLocked;
                this.osuDBData = dbosuData;
                this.canGetDBData = true;
            } else if (type === 'collection') {
                this.collectionDB = buffer;
                this.collectionData = this.reader.UnmarshalPacket(this.collectionDB, collectionStruct);
                this.canGetCollectionData = true;
            }
        } catch (error) {
            console.error(`Error while parsing ${type}.db:`, error);
            return false;
        }
        return true;
    }

    /**
     * Get osu DB data if present
     * @returns {OsuDBData | null}
     */
    getOsuDBData(): OsuDBData | null {
        return this.canGetDBData ? this.osuDBData ?? null : null;
    }

    /**
     * Get collection DB data if present
     * @returns {CollectionData | null}
     */
    getCollectionData(): CollectionData | null {
        return this.canGetCollectionData ? this.collectionData ?? null : null;
    }
}

export default OsuDBParser;