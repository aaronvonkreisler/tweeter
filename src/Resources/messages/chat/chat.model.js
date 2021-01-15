import mongoose from 'mongoose';

const ChatSchema = new mongoose.Schema(
   {
      chatName: {
         type: String,
         trim: true,
      },
      isGroupChat: {
         type: Boolean,
         default: false,
      },
      users: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
         },
      ],
      lastMessage: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'message',
      },
   },
   { timestamps: true }
);

export const Chat = mongoose.model('chat', ChatSchema);
