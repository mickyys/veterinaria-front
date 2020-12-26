import { Schedule } from "./schedule.model";

export class Company{
    _id : String | undefined;
    name : String;
    email : String;
    address : String;
    commune : String;
    photo : String;
    phone : String;
    color : String;
    schedule : Schedule;
}