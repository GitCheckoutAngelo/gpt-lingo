import { CatalogueType } from "./catalogues.types";

type UserType = {
    _id?: string,
    name: string,
    email: string,
    password: string,
    catalogue?: CatalogueType | string,
};

export { UserType }