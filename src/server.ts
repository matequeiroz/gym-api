import 'dotenv/config';
import { app } from '@/app.ts';
import { env } from '@/config/schemas/env.schema.ts';

const startServer = async () => {
  try {
    await app.listen({ port: env.PORT, host: '0.0.0.0' });
    console.log(
      `Server running on http://localhost:${env.PORT} in ${env.NODE_ENV} mode`
    );
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

app.get('/health', (_, res) => {
  res.status(200).send({
    status: 'OK',
    message: 'Gym API is running!',
    timestamp: new Date().toISOString(),
    environment: env.NODE_ENV,
    port: env.PORT,
  });
});

startServer();
