import { UserType } from '../types/users.types';
import { 
    getUsersAsync as dbGetUsersAsync,
    getUserByIdAsync as dbGetUserByIdAsync,
    createUserAsync as dbCreateUserAsync,
 } from '../db/users.db';

const getUsersAsync = async (): Promise<UserType[]> => {
    const users = await dbGetUsersAsync();
    return users.map(u => u.toObject() as UserType);
};

const getUserByIdAsync = async (id: string): Promise<UserType | null> => {
    try {
        const user = await dbGetUserByIdAsync(id);
        return user?.toObject() as UserType;
    }
    catch {
        // error when provided id does not conform to ObjectId format
        return null;
    }
};

const createUserAsync = async (userToCreate: UserType): Promise<UserType | null> => {
    const user = await dbCreateUserAsync(userToCreate);
    return user?.toObject() as UserType;
};

export {
    getUsersAsync,
    getUserByIdAsync,
    createUserAsync,
}