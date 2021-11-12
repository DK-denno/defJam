import { IUser } from "./iuser";

export interface IAppointments {
    id:number,
    day:number,
    month:number,
    year:number,
    reason:String,
    patient:IUser,
    doctor:IUser,
}