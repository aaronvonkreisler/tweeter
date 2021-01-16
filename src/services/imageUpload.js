import aws from 'aws-sdk';

import keys from '../config/keys';
import { generateUniqueFileName } from '../utils/images';

aws.config.update({
   secretAccessKey: keys.awsSecretAccessKey,
   accessKeyId: keys.awsAccessKey,
   region: 'us-east-2',
});

const s3 = new aws.S3({ params: { Bucket: 'tweeter-dev' } });

export const uploadPhoto = async (files) => {
   if (files === undefined) {
      return null;
   }
   const upload = new aws.S3.ManagedUpload({
      params: {
         Body: files.image.data,
         Key: generateUniqueFileName(files.image.name),
         ACL: 'public-read',
         ContentType: 'image/jpeg',
      },
      service: s3,
   });

   return await upload.promise();
};

export const uploadBufferPhoto = async (buffer) => {
   // if (files === undefined) {
   //    return null;
   // }
   const upload = new aws.S3.ManagedUpload({
      params: {
         Body: buffer,
         Key: generateUniqueFileName('test'),
         ACL: 'public-read',
         ContentType: 'image/jpeg',
      },
      service: s3,
   });

   return await upload.promise();
};
