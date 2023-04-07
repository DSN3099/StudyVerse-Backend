import mongoose, { model} from "mongoose";
import { Schema } from "mongoose";

const RatingSchema = new Schema({
    star1 : {type : Number, default:0},
    star2 : {type : Number, default:0},
    star3 : {type : Number, default:0},
    star4 : {type : Number, default:0},
    star5 : {type : Number, default:0}
})

export default model('Ratings',RatingSchema)