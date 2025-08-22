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

function resHtml(res, data) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.end(data);
}

function getAcceptedTypes(req) {
    const acceptHeaderVal = req.headers.accept || "*/*";
    const acceptList = acceptHeaderVal.split(",");
    const acceptedTypes = acceptList.map((a) => a.split(";")[0]);

    const json = acceptedTypes.includes("application/json");
    const textPlain = acceptedTypes.includes("text/plain");
    const text = acceptedTypes.includes("text/*");
    const textHtml = acceptedTypes.includes("text/html");
    const any = acceptedTypes.includes("*/*");

    return { json, textPlain, text, textHtml, any };
}

module.exports = { resJson, resText, resHtml, getAcceptedTypes };