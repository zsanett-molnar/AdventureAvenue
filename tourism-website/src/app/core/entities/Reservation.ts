import { Destination } from "./Destination";

export interface Reservation {
    destination: number,
    startDate: Date,
    endDate: Date,
    numberOfPeople: number,
    totalCost: number,
    reservedBy: string;
}