import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();

const PORT = 3000;

app.use(cors());

app.use(express.json());

/**
 * @route   GET /api/time
 * @desc    Returns the current server date and time.
 * @access  Public
 */
app.get('/api/time', (req: Request, res: Response) => {
  const now = new Date();

  res.json({
    message: "Current server time",
    time: {
      readable: now.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }),
      iso: now.toISOString(),
    },
  });
});


/**
 * @route   GET /api/greeting
 * @desc    Returns a random greeting: "Hello World" or "World Hello".
 * @access  Public
 */
app.get('/api/greeting', (req: Request, res: Response) => {
  const shouldSayHelloWorld = Math.random() > 0.5;

  const greeting = shouldSayHelloWorld ? "Hello World" : "World Hello";

  res.json({
    message: "Your random greeting",
    greeting: greeting,
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
