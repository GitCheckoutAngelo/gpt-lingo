import mongoose from "mongoose";
import { CatalogueType } from "../types/catalogues.types";
import { Catalogue } from "./models/catalogues.models";
import { Document } from 'mongoose';

const getCataloguesAsync = async (): Promise<Document[]> => await Catalogue.find().populate([{ path: 'user' }]);

const getCatalogueByIdAsync = async (id: string): Promise<Document | null> => await Catalogue.findById(id);

const createCatalogueForUserAsync = async (userId: mongoose.Types.ObjectId): Promise<CatalogueType | null> => {
    const catalogue = new Catalogue({ user: userId });
    const createdCatalogue = await catalogue.save();
    return createdCatalogue.toObject() as CatalogueType;
};

export {
    getCataloguesAsync,
    getCatalogueByIdAsync,
    createCatalogueForUserAsync,
}