import mongoose from 'mongoose';
import grid from 'gridfs-stream';

// Create a connection to the database
const conn = mongoose.connection;

// Initialize GridFS
let gfs, gridfsBucket;

conn.once('open', () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, { bucketName: 'fs' });
    gfs = grid(conn.db, mongoose.mongo);
});

// Upload image handler
export const uploadImage = (request, response) => {
    if (!request.file) {
        return response.status(400).json({ message: "File not found" }); // 400 for bad request
    }

    const imageUrl = `${request.protocol}://${request.get('host')}/file/${request.file.filename}`;
    return response.status(200).json({ imageUrl }); // Return the image URL as JSON
};

// Get image handler
export const getImage = async (request, response) => {
    try {
        const file = await gfs.files.findOne({ filename: request.params.filename });

        if (!file) {
            return response.status(404).json({ message: "File not found" }); // Return 404 if file not found
        }

        const readStream = gridfsBucket.openDownloadStream(file._id);
        readStream.on('error', () => {
            response.status(500).json({ message: "Error retrieving file" });
        });

        readStream.pipe(response); // Stream the file to the response
    } catch (error) {
        return response.status(500).json({ message: error.message }); // Handle any server errors
    }
};
