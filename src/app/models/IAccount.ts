import { IUser } from "./iuser";

export interface IAccount {
    id: number,
    account: IUser,
    cashedOut: number,
    amount:number
}

