import app from './app';
import dotenv from 'dotenv';
import colors from 'colors';

dotenv.config();
colors.enable();

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

app.listen(PORT, (): void => {
  console.log('Server Running here 👉 ' + `http://${HOST}:${PORT}`.green);
});
