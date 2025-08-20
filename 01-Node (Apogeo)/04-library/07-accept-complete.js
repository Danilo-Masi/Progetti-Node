const http = require("http");

const host = "127.0.0.1";
const port = "3000";

function resJson(res) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "Benvenuto nella biblioteca HTTP" }));
}

function resText(res) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Benvento nella biblioteca HTTP");
}

const server = http.createServer((req, res) => {
    const acceptList = req.headers.accept.split(",");
    const acceptTypes = acceptList.map((a) => a.split(";")[0]);

    const acceptJson = acceptTypes.includes("application/json");
    const acceptText = acceptTypes.includes("text/plain");
    const acceptAnyText = acceptTypes.includes("text/*");
    const acceptAnyType = acceptTypes.includes("*/*");

    if (acceptJson) {
        resJson(res);
    } else if (acceptText || acceptAnyText || acceptAnyType) {
        resText(res);
    } else {
        res.statusCode = 406;
        res.end();
    }
});

server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`);
});