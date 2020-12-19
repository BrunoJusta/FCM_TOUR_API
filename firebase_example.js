
const googleStorage = require('@google-cloud/storage');
const storage = new googleStorage.Storage({
    projectId: CONFIG.id,
    keyFilename: CONFIG.keyFilename
});

const bucket = storage.bucket(CONFIG.bucket);

let file_name = id + "." + extension;
let blob = bucket.file(file_name);
const blobStream = blob.createWriteStream({
    metadata: {
        contentType: file.document.mimetype
    }
});

blobStream.on('error', function (error) {
    if (error) throw error;
    return response.status(MESSAGES.error.e3.http).send(MESSAGES.error.e3);
});


blobStream.on('finish', function () {
    var publicUrl = "https://firebasestorage.googleapis.com/v0/b/" + bucket.name + "/o/" + blob.name + "?alt=media";

    let data = {
        id: id + "." + extension,
        name: name,
        uploaded_by_id: user_id,
        path_to_document: publicUrl,
        meetingId: meeting_id
    }

    FUNCTIONS.uploadDocument(data, (result) => {
        if (!result) {
            return response.status(MESSAGES.error.e3.http).send(MESSAGES.error.e3);
        } else {

            let message = MESSAGES.success.s0;
            message.body = result
            return response.status(message.http).send(message);
        }
    });

});

blobStream.end(file.document.data);