function resJson(res, data) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(data);
}

function resText(res, data) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end(data);
}

function getAcceptedTypes(req) {
    const acceptHeaderVal = req.headers.accept || "*/*";
    const acceptList = acceptHeaderVal.split(",");
    const acceptedTypes = acceptList.map((a) => a.split(";")[0]);

    const json = acceptedTypes.includes("application/json");
    const textPlain = acceptedTypes.includes("text/plain");
    const text = acceptedTypes.includes("text/*");
    const any = acceptedTypes.includes("*/*");

    return { json, textPlain, text, any };
}

module.exports = { resJson, resText, getAcceptedTypes };