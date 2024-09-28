import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

// Define storage engine
const storage = new GridFsStorage({
    url: `mongodb+srv://${username}:${password}@cluster0.a79b9.mongodb.net/`,
    options: { useNewUrlParser: true, useUnifiedTopology: true }, // Use unified topology for better connection management
    file: (request, file) => {
        const allowedMimeTypes = ["image/png", "image/jpg", "image/jpeg"];
        
        // Check if the file mimetype is valid
        if (allowedMimeTypes.includes(file.mimetype)) {
            return {
                bucketName: "fs", // Store in 'fs' bucket
                filename: `${Date.now()}-${file.originalname}` // Unique filename
            };
        }
        
        // Reject files with unsupported mimetypes
        return null;
    }
});

// Export the multer instance configured with GridFS storage
export default multer({ storage });
