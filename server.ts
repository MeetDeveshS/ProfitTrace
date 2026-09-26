import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { demoWorkspaces, demoFuelNetwork } from './src/data/demoData.ts';
import { runProfitTrace, simulateScenario } from './src/services/profitEngine.ts';
import { askProfitTrace } from './src/services/aiQueryService.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// API Routes
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    product: 'ProfitTrace',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/workspaces', (_req: Request, res: Response) => {
  const summaries = Object.values(demoWorkspaces).map((w) => ({
    id: w.id,
    name: w.name,
    scale: w.scale,
    type: w.type,
    currency: w.currency,
    currencySymbol: w.currencySymbol,
    revenue: w.revenue,
    grossProfit: w.grossProfit,
    marginPercent: w.profitMarginPercent,
    locationCount: w.locations.length,
    productCount: w.products.length,
  }));
  res.json({ workspaces: summaries });
});

app.get('/api/workspaces/:id', (req: Request, res: Response) => {
  const ws = demoWorkspaces[req.params.id] || demoFuelNetwork;
  res.json({ workspace: ws });
});

app.post('/api/trace', (req: Request, res: Response) => {
  const { workspaceId, targetId, targetType } = req.body;
  const ws = demoWorkspaces[workspaceId] || demoFuelNetwork;
  const result = runProfitTrace(ws, targetId || ws.products[0].id, targetType || 'product');
  res.json({ result });
});

app.post('/api/what-if', (req: Request, res: Response) => {
  const { baseline, proposed } = req.body;
  if (!baseline || !proposed) {
    return res.status(400).json({ error: 'Missing baseline or proposed inputs' });
  }
  const result = simulateScenario(baseline, proposed);
  res.json({ result });
});

app.post('/api/ask', async (req: Request, res: Response) => {
  const { query, workspaceId } = req.body;
  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }
  const ws = demoWorkspaces[workspaceId] || demoFuelNetwork;
  const analysis = await askProfitTrace(query, ws);
  res.json({ analysis });
});

app.post('/api/contact', (req: Request, res: Response) => {
  const { name, email, company, businessScale, message } = req.body;
  if (!email || !name) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  // Log message safely in backend
  console.log(`[Contact Form Received] Name: ${name}, Email: ${email}, Company: ${company}, Scale: ${businessScale}`);
  res.json({
    success: true,
    message: 'Thank you for contacting ProfitTrace. A decision intelligence specialist will reach out shortly.',
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`ProfitTrace server running on port ${PORT}`);
  });
}

// When run directly
if (process.env.RUN_SERVER === 'true') {
  startServer().catch((err) => {
    console.error('Failed to start server:', err);
  });
}

export default app;
