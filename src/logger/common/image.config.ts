import { diskStorage } from 'multer';
import { extname } from 'path';

export const imageStorage = diskStorage({
  destination: './uploads/profile-images',

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      '-' +
      Math.round(Math.random() * 1e9) +
      extname(file.originalname);

    cb(null, uniqueName);
  },
});