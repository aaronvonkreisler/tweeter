import express from 'express';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import keys from './config/keys';
import { connectDB } from './utils/db';
import { protect } from './utils/auth';
import userRouter from './Resources/user/user.router';
import authRouter from './Resources/auth/auth.router';
import tweetRouter from './Resources/tweets/tweet.router';
import profileRouter from './Resources/profile/profile.router';
import bookmarksRouter from './Resources/bookmarks/bookmarks.router';
import chatsRouter from './Resources/messages/chat/chat.router';
import messagesRouter from './Resources/messages/message/messages.router';
// eslint-disable-next-line no-undef
const socketio = require('socket.io');

const app = express();
app.disable('x-powered-by');

//Middleware
app.use(cors());
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));
app.use(
   fileUpload({
      limits: { fileSize: 50 * 1024 * 1024 },
      abortOnLimit: true,
   })
);

// Define Routes
app.get('/', (req, res) => {
   try {
      res.status(200).send('Server Running');
   } catch (err) {
      console.error(err.message);
      res.status(400).end();
   }
});
app.use('/auth', authRouter);
app.use('/api', protect);
app.use('/api/user', userRouter);
app.use('/api/tweets', tweetRouter);
app.use('/api/profile', profileRouter);
app.use('/api/bookmarks', bookmarksRouter);
app.use('/api/chats', chatsRouter);
app.use('/api/messages', messagesRouter);

(async function () {
   try {
      await connectDB();
   } catch (err) {
      console.error(err.message);
   }
})();

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000;

const clientOrigin =
   // eslint-disable-next-line no-undef
   process.env.NODE_ENV === 'production'
      ? keys.clientHost
      : 'http://localhost:3000';

const expressServer = app.listen(PORT, () =>
   console.log(`Server started on port ${PORT}`)
);

const io = socketio(expressServer, {
   pingTimeout: 60000,
   cors: {
      origin: clientOrigin,
      methods: ['GET', 'POST'],
   },
});
app.set('socketio', io);

io.on('connection', (socket) => {
   socket.on('setup', (userId) => {
      socket.join(userId);
      socket.emit('successful setup');
      console.log('socket ', socket.id, 'connected to user ', userId);
   });

   socket.on('join room', (chatId) => {
      socket.join(chatId);
      console.log('joined room', chatId);
   });
   socket.on('typing', (chatId) => {
      socket.in(chatId).emit('typing');
   });
   socket.on('stop typing', (chatId) => {
      socket.in(chatId).emit('stop typing');
   });
});
