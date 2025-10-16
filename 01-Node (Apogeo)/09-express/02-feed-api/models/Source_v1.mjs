import moogose, { Schema } from "mongoose";
const { Shema } = moogose;

const sourceSchema = new Schema({
    url: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                try {
                    const url = new URL(v);
                    if (!url.protocol.startsWith("http")) {
                        return false;
                    }
                } catch {
                    return false;
                }
                return true;
            },
            message: (props) => `${props.value} is not a valid URL`,
        },
    },
});

sourceSchema.static("getErrorReason", (e) => {
    if (e.name === "ValidationError") {
        return "Source validatiion failed";
    } else if (e.code === 11000) {
        return "Feed alredy exists";
    } else {
        return null;
    }
});

const Source = moogose.model("Source", sourceSchema);

export { Source };