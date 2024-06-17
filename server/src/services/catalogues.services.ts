import { 
    getCataloguesAsync as dbGetCataloguesAsync,
    getCatalogueByIdAsync as dbGetCatalogueByIdAsync,
 } from '../db/catalogues.db';
import CatalogueType from '../types/catalogues.types';

const getCataloguesAsync = async (): Promise<CatalogueType[]> => {
    const catalogues = await dbGetCataloguesAsync();
    return catalogues.map(u => u.toObject() as CatalogueType);
};

const getCatalogueByIdAsync = async (id: string): Promise<CatalogueType | null> => {
    try {
        const catalogue = await dbGetCatalogueByIdAsync(id);
        return catalogue?.toObject() as CatalogueType;
    }
    catch {
        // error when provided id does not conform to ObjectId format
        return null;
    }
};

export {
    getCataloguesAsync,
    getCatalogueByIdAsync,
}