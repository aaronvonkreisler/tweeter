import path from 'path';

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
