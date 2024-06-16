import { User } from './models/users.models';
import UserType from '../types/users.types';

const getUsersAsync = async (): Promise<UserType[]> => {
    const users = await User.find();
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
    return createdUser.toObject() as UserType;
};

export {
    getUsersAsync,
    getUserByIdAsync,
    createUserAsync,
}