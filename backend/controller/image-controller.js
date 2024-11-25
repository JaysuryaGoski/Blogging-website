import mongoose from 'mongoose';
import grid from 'gridfs-stream';

let gfs, gridfsBucket;

// Initialize GridFS and GridFSBucket when the database connection opens
const conn = mongoose.connection;

conn.once('open', () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, { bucketName: 'uploads' });
    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection('uploads'); // Set the collection name
    console.log("GridFS initialized successfully");
});

// **Upload Image**
export const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ 
                success: false, 
                message: "No file uploaded" 
            });
        }

        const fileDetails = req.file;

        // Ensure the file metadata contains the expected properties
        if (!fileDetails.id || !fileDetails.filename) {
            return res.status(500).json({
                success: false,
                message: "File metadata is missing required properties"
            });
        }

        const imageUrl = `${req.protocol}://${req.get('host')}/api/file/${fileDetails.filename}`;
        
        return res.status(200).json({
            success: true,
            imageUrl,
            message: "File uploaded successfully",
            fileDetails: {
                id: fileDetails.id, // The MongoDB ObjectId of the file
                filename: fileDetails.filename,
                contentType: fileDetails.contentType,
                size: fileDetails.size
            }
        });
    } catch (error) {
        console.error('Upload error:', error);
        return res.status(500).json({
            success: false,
            message: "Error uploading file",
            error: error.message
        });
    }
};

// **Get Image**
export const getImage = async (req, res) => {
    try {
        const filename = req.params.filename;
        
        const file = await gfs.files.findOne({ filename });
        if (!file) {
            return res.status(404).json({
                success: false,
                message: "File not found"
            });
        }

        // Validate file type
        if (!file.contentType.startsWith('image/')) {
            return res.status(400).json({
                success: false,
                message: "File is not an image"
            });
        }

        // Set appropriate headers
        res.setHeader('Content-Type', file.contentType);
        res.setHeader('Cache-Control', 'public, max-age=31557600'); // Cache for 1 year

        // Stream the file
        const readStream = gridfsBucket.openDownloadStream(file._id);
        readStream.on('error', (error) => {
            console.error('Streaming error:', error);
            res.status(500).json({
                success: false,
                message: "Error streaming file"
            });
        });

        readStream.pipe(res);
    } catch (error) {
        console.error('Get image error:', error);
        return res.status(500).json({
            success: false,
            message: "Error retrieving image",
            error: error.message
        });
    }
};
