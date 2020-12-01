import aws from 'aws-sdk';

import keys from '../config/keys';
import { generateUniqueFileName } from '../utils/images';

aws.config.update({
   secretAccessKey: keys.secrets.awsSecretAccessKey,
   accessKeyId: keys.secrets.awsAccessKey,
   region: 'us-east-2',
});

const s3 = new aws.S3({ params: { Bucket: 'tweeter-dev' } });

export const uploadPhoto = async (files) => {
   const upload = new aws.S3.ManagedUpload({
      params: {
         Body: files.image.data,
         Key: generateUniqueFileName(files.image.name),
         ACL: 'public-read',
      },
      service: s3,
   });

   return await upload.promise();
};
