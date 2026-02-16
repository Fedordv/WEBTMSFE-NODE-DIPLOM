// src/bull-board.ts
import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter'; 
import { ExpressAdapter } from '@bull-board/express';
import { Queue } from 'bullmq';
import { INestApplication } from '@nestjs/common';

export function setupBullBoard(app: INestApplication, queues: Queue[]) {
  const serverAdapter = new ExpressAdapter();
  serverAdapter.setBasePath('/admin/queues');

  createBullBoard({
    queues: queues.map(queue => new BullMQAdapter(queue)), 
    serverAdapter,
  });

  app.use('/admin/queues', serverAdapter.getRouter());
}
