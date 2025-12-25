import { app } from '@/app.ts';

const startServer = async () => {
  try {
    await app.listen({ port: 4001, host: '0.0.0.0' });
    console.log('Server running on http://localhost:4001');
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

app.get('/health', (_, res) => {
  res.status(200).send({
    status: 'OK', 
    message: 'Gym API is running!',
    timestamp: new Date().toISOString()
  });
});

startServer();