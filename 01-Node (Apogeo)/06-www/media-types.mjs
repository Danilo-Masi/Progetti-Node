const types = {
    "text/html": ["html", "htm"],
    "text/plan": ["txt", "text"],
    "text/css": ["css"],
    "application/javascript": ["js", "mjs"],
    "application/json": ["json"],
    "image/jpeg": ["jpeg", "jpg"],
    "image/x-icon": ["ico"],
    "audio/mpeg": ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"],
    "video/mp4": ["mp4", "mp4v", "mpg4"],
    "video/mpeg": ["mpeg", "mpg", "mpe", "m1v", "m2v"],
    "video/x-matroska": ["mkv", "mk3d", "mks"],
    "video/x-msvideo": ["avi",]
};

const extMap = new Map();

// Esegue un ciclo for su ogni tipo presente dell'oggetto types
// al cui interno viene eseguito un altro ciclo for sulle estensioni associate a questo tipo
for (let [type, extensions] of Object.entries(types)) {
    for (let extension of extensions) {
        extMap.set(`.${extension}`, type);
    }
}

export default extMap;