import { User } from './models/users.models';
import { UserType } from '../types/users.types';
import { CatalogueType } from '../types/catalogues.types';
import { createCatalogueForUserAsync } from './catalogues.db';
import { Document } from 'mongoose';

const getUsersAsync = async (): Promise<Document[]> => await User.find().populate([{ path: 'catalogue' }]);

const getUserByIdAsync = async (id: string): Promise<Document | null> => await User.findById(id);

const createUserAsync = async (userToCreate: UserType): Promise<Document | null> => {
    const user = new User({ ...userToCreate });
    const createdUser = await user.save();
    const createdCatalogue = await createCatalogueForUserAsync(user._id);
    await User.updateOne(
        { _id: { $eq: createdUser._id } },
        { $set: { catalogue: createdCatalogue?._id } }
    );
    return await User.findOne({ _id: { $eq: createdUser._id } });
};

const updateUserAsync = async (userToUpdate: UserType): Promise<Document | null> => {
    await User.updateOne(
        { _id: { $eq: userToUpdate._id } },
        { $set: { 
            catalogue: (userToUpdate.catalogue as CatalogueType)._id,
        } }
    );
    return await User.findOne({ _id: { $eq: userToUpdate._id } });
};

export {
    getUsersAsync,
    getUserByIdAsync,
    createUserAsync,
    updateUserAsync
}