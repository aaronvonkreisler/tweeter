import path from 'path';
import sharp from 'sharp';

export const generateUniqueFileName = (filename) => {
   const extension = path.extname(filename);
   const date = Date.now();
   let randomHash = '';
   const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

   new Array(25).fill(null).map((_) => {
      randomHash += characters.charAt(
         Math.floor(Math.random() * characters.length)
      );
   });

   return `${randomHash}-${date}${extension}`;
};

export const resizeImage = async (width, height, buffer) => {
   const resizedBuffer = await sharp(buffer)
      .resize(width, height)
      .webp()
      .toBuffer();
   return resizedBuffer;
};
