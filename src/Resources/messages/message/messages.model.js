import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema(
   {
      sender: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'user',
      },
      content: {
         type: String,
         trim: true,
      },
      image: String,
      chat: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'chat',
      },
      readBy: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
         },
      ],
   },
   { timestamps: true }
);

export const Message = mongoose.model('message', MessageSchema);
