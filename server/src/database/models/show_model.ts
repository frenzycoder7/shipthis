import { IShow } from "@interfaces";
import { SHOW_MODEL_NAME, USER_MODEL_NAME } from "@modelnames";
import { Model, Schema, model } from "mongoose";

export const show_structure =  {
    show_id: {
        type:String,
    },
    cast: {
        type:String,
    },
    country: {
        type:String,
    },
    date_added: {
        type:String,
    },
    description: {
        type:String,
    },
    director:{
        type:String,
    },
    duration: {
        type:String,
    },
    listed_in: {
        type:String,
    },
    rating: {
        type:String,
    },
    release_year: {
        type:String,
    },
    title: {
        type:String,
    },
    type:{
        type:String,
    },
}

const showSchema: Schema<IShow> = new Schema<IShow>(show_structure, {
    timestamps:true,
});

export const SHOW_MODEL: Model<IShow> = model(SHOW_MODEL_NAME, showSchema);