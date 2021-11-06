import { IUser } from "./iuser";

export interface ITransaction {
    complete:boolean,
    merchantRequestID: String,
    checkoutRequestID: String,
    amount: number,
    mpesaReceiptNumber: String,
    transactionDate: String,
    phoneNumber: String,
    client: IUser
}