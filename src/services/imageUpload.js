import aws from 'aws-sdk';

import keys from '../config/keys';
import { generateUniqueFileName } from '../utils/images';

aws.config.update({
   secretAccessKey: keys.awsSecretAccessKey,
   accessKeyId: keys.awsAccessKey,
   region: 'us-east-2',
});

const s3 = new aws.S3({ params: { Bucket: 'tweeter-dev' } });

export const uploadProfilePhoto = async (files) => {
   const upload = new aws.S3.ManagedUpload({
      params: {
         Body: files.profile.data,
         Key: generateUniqueFileName(files.profile.name),
         ACL: 'public-read',
         ContentType: 'image/jpeg',
      },
      service: s3,
   });

   return await upload.promise();
};

export const uploadBackgroundPhoto = async (files) => {
   const upload = new aws.S3.ManagedUpload({
      params: {
         Body: files.background.data,
         Key: generateUniqueFileName(files.background.name),
         ACL: 'public-read',
         ContentType: 'image/jpeg',
      },
      service: s3,
   });

   return await upload.promise();
};
