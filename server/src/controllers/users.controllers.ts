import { Request, Response } from 'express';
import {
    getUsersAsync as serviceGetUsersAsync,
    getUserByIdAsync as serviceGetUserByIdAsync,
    createUserAsync as serviceCreateUserAsync,
} from '../services/users.services';
import UserType from '../types/users.types';
import { CreateUserDto } from '../dtos/users.dtos';

const getUsersController = async (req: Request, res: Response) => {
    const users: UserType[] = await serviceGetUsersAsync();
    return res.status(200).json(users);
};

const getUserByIdController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user: UserType | null = await serviceGetUserByIdAsync(id);

    if (user) {
        return res.status(200).json(user);
    }
    else {
        return res.status(404).json({ message: 'User not found' });
    }
};

const createUserController = async (req: Request, res: Response) => {
    const user: CreateUserDto = req.body;
    const createdUser = await serviceCreateUserAsync(user);

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