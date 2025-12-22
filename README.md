# Bluesky Trending Topics
<div align="center">
    <div style="font-size: 14px; font-weight: bold;">
        🌐 Other languages:
    </div>
    <a href="https://github.com/Rafael-BD/Bsky-Trends/blob/main/assets/README-PT.MD">• Português</a>
</div>

## Description

This project now provides a **Python/Jupyter Notebook** implementation for extracting real-time post trends. The notebook mirrors the original TypeScript pipeline: it preprocesses text, filters stopwords/blacklisted terms, extracts n-grams (words, short phrases, hashtags), and ranks trends inside a rolling time window. Use it as a starting point for experimentation or as the basis for a lightweight API.

## Technologies Used

- **Python 3 + Jupyter**: Interactive environment for experimenting with trend extraction.
- **Standard library** only in the notebook (no external dependencies required to run the demo).
- **Existing TypeScript assets** are still present for reference.

## Features

- **N-grams Extraction**: Extraction of words, phrases, and hashtags from posts.
- **Content Filtering**: Filtering of stopwords, blacklist words, and irrelevant content.
- **Text Classification**: Topic classification using a text classifier.
- **Trend Storage**: Storage of trends in Supabase.
<!-- - **Parallel Processing**: Using a pool of workers for parallel processing of posts. -->

## Requirements

- **Python 3.10+**
- **Jupyter Notebook** (`pip install notebook`)

The notebook demo relies only on the Python standard library and reuses the project’s existing stopword/blacklist assets for filtering.

## Installation & Usage (Python Notebook)

1. Clone the repository:

    ```sh
    git clone https://github.com/Rafael-BD/Bsky-Trends
    cd Bsky-Trends
    ```

2. Install Jupyter (if you don’t have it):

    ```sh
    pip install notebook
    ```

3. Start Jupyter and open the notebook:

    ```sh
    jupyter notebook bsky_trends.ipynb
    ```

4. Run the cells to see a demo of the in-memory trend tracker that processes sample Portuguese/English posts. Replace the `sample_posts` list in the notebook with your own Bluesky feed to experiment.

> The original TypeScript server remains in the repository for reference but is no longer required for the Python notebook workflow.

## Feature Explanation

### N-grams Extraction

The project extracts words, phrases, and hashtags from posts using NLP techniques. The extraction is done through the `extractWords`, `extractSentences`, and `extractHashtags` functions.

### Content Filtering

The extracted content is filtered to remove stopwords, blacklist words, and irrelevant content. The filtering is done through the `filterWords` and `filterSentences` functions.

### Text Classification

The extracted topics are classified using Google Gemini AI. The classification is done through the `classifyText` function.

### Trend Storage

The trends are stored in Supabase. The storage is done through the `services/saveTrends.ts` file.

<!-- ### Parallel Processing

The project uses a pool of workers to process posts efficiently. The worker pool is implemented in the `workerPool.ts` file. -->

## Public API

The project also has a public API to get the trends. The API documentation is available at https://github.com/Rafael-BD/Bsky-Trends-API.

## Contribution

Contributions are welcome! Feel free to open issues and pull requests.

