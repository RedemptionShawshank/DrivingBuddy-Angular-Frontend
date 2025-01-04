import { Time } from "@angular/common"
import { Timestamp } from "rxjs"

export class CustomerReviews {
    author_name!:string;
    author_url!:string;
    language!:string;
    original_language!:string;
    profile_photo_url!:string;
    rating!:string;
    relative_time_description!:string;
    text!:string;
    time!:EpochTimeStamp;
    translated!:boolean;
}
