import { User } from './models/users.models';
import UserType from '../types/users.types';
import { createCatalogueForUserAsync } from './catalogues.db';

const getUsersAsync = async (): Promise<UserType[]> => {
    const users = await User.find().populate([{ path: 'catalogue' }]);
    return users.map(u => u.toObject() as UserType);
};

const getUserByIdAsync = async (id: string): Promise<UserType | null> => {
    try {
        const user = await User.findById(id);
        return user?.toObject() as UserType;
    }
    catch {
        return null;
    }
};

const createUserAsync = async (userToCreate: UserType): Promise<UserType | null> => {
    const user = new User({ ...userToCreate });
    const createdUser = await user.save();
    const createdCatalogue = await createCatalogueForUserAsync(user._id);
    await User.updateOne(
        { _id: { $eq: createdUser._id } },
        { $set: { catalogue: createdCatalogue?._id } }
    );
    const updatedUser = await User.findOne({ _id: { $eq: createdUser._id } });
    return updatedUser?.toObject() as UserType;
};

export {
    getUsersAsync,
    getUserByIdAsync,
    createUserAsync,
}