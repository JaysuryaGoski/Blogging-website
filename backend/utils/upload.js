import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

// Define storage engine
const storage = new GridFsStorage({
    url: `mongodb+srv://${username}:${password}@cluster0.a79b9.mongodb.net/?retryWrites=true&w=majority`,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            const allowedMimeTypes = ["image/png", "image/jpg", "image/jpeg"];
            
            if (!allowedMimeTypes.includes(file.mimetype)) {
                reject(new Error("Invalid file type. Only PNG, JPG, and JPEG are allowed."));
                return;
            }

            const filename = `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`;
            
            resolve({
                bucketName: "uploads", // Match your GridFS bucket name
                filename: filename,
                metadata: {
                    originalName: file.originalname,
                    uploadDate: new Date()
                }
            });
        });
    }
});

// Export Multer instance
const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
        files: 1 // Only allow 1 file per request
    },
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = ["image/png", "image/jpg", "image/jpeg"];
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Only PNG, JPG, and JPEG formats are allowed!"), false);
        }
    }
});

export default upload;
