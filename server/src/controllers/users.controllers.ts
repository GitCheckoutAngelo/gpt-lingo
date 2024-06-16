import { Request, Response } from 'express';
import {
    getUsersAsync,
    getUserByIdAsync,
    createUserAsync,
} from '../db/users.db';
import UserType from '../types/users.types';
import { CreateUserDto } from '../dtos/users.dtos';

const getUsersController = async (req: Request, res: Response) => {
    const users: UserType[] = await getUsersAsync();
    return res.status(200).json(users);
};

const getUserByIdController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user: UserType | null = await getUserByIdAsync(id);

    if (user) {
        return res.status(200).json(user);
    }
    else {
        return res.status(404).json({ message: 'User not found' });
    }
};

const createUserController = async (req: Request, res: Response) => {
    const user: CreateUserDto = req.body;
    const createdUser = await createUserAsync(user);

    if (createdUser) {
        return res.status(201).json(createdUser);
    }
    else {
        return res.status(500).json({ message: 'Could not created user' });
    }
};

export {
    getUsersController,
    getUserByIdController,
    createUserController,
}