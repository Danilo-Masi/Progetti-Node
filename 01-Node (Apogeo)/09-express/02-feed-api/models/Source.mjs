import moogose, { Schema } from "mongoose";
const { Shema } = moogose;

const sourceSchema = new Schema({
    url: { type: String, required: true },
});

const Source = moogose.model("Source", sourceSchema);

export { Source };