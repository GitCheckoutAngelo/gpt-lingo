import mongoose from "mongoose";
import CatalogueType from "../types/catalogues.types";
import { Catalogue } from "./models/catalogues.models";

const createCatalogueForUserAsync = async (userId: mongoose.Types.ObjectId): Promise<CatalogueType | null> => {
    const catalogue = new Catalogue({ user: userId });
    const createdCatalogue = await catalogue.save();
    return createdCatalogue.toObject() as CatalogueType;
};

export {
    createCatalogueForUserAsync,
}