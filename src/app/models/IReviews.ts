import { IUser } from "./iuser";

export interface IReviews {
    id:Number,
    message:String,
    client: IUser
}