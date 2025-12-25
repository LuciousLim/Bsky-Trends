import express from 'express';
import cors from 'cors';
import { createWebSocketClient } from './src/postsListening';
import { getTrendingTopics } from './src/utils/getTrends';
import {
    getHeatScore,
    getLatestHeatPredictions,
    initializeHeatModel,
    trainHeatModelFromDataset,
} from './src/services/heatModelService';
import 'dotenv/config';

const isDev = process.env.DEV === 'true';
const app = express();

app.use(cors());
app.use(express.json());

app.get('/trending', async (req, res) => {
    const limit = req.query.limit as string;
    const lang = req.query.lang as string;
    const minCount = req.query.minCount as string;
    const trends = await getTrendingTopics(parseInt(limit ?? '10'), lang ?? 'pt', parseInt(minCount ?? '5'));
    res.json(trends);
});

app.post('/heat/predict', (req, res) => {
    const text = typeof req.body?.text === 'string' ? req.body.text.trim() : '';
    if (!text) {
        res.status(400).json({ error: 'text is required' });
        return;
    }

    const score = getHeatScore(text);
    if (score === null) {
        res.status(503).json({ error: 'heat model is not ready' });
        return;
    }

    res.json({ score });
});

app.get('/heat/latest', (req, res) => {
    const limit = parseInt((req.query.limit as string) ?? '50');
    res.json(getLatestHeatPredictions(Number.isNaN(limit) ? 50 : limit));
});

app.post('/heat/train', async (req, res) => {
    try {
        const datasetPath = typeof req.body?.datasetPath === 'string' ? req.body.datasetPath : undefined;
        const model = await trainHeatModelFromDataset(datasetPath);
        res.json({
            status: 'trained',
            featureCount: model.featureNames.length,
        });
    } catch (error) {
        console.error('Failed to train heat model:', error);
        res.status(500).json({ error: 'failed to train heat model' });
    }
});

async function startHttpServer() {
    if(isDev) {
        app.listen(8003, () => {
            console.log('Server is running on port 8003');
        });
    }
}

async function startServices() {
    try {
        await initializeHeatModel();
    } catch (error) {
        console.error('Failed to initialize heat model:', error);
    }

    await Promise.all([createWebSocketClient(), startHttpServer()]);
}

startServices();
