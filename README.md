# Movie Lobby API

This is a simple Movie Lobby API built with Node.js, Express, and TypeScript.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node Package Manager)

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/itsRkator/movie-lobby-api.git
cd movie-lobby-api
```

### Install Dependencies

```bash
npm install
```

### Start the Server

```bash
npm start
```

The API server will be running at `http://localhost:3000` (or the specified port).

## API Endpoints

### GET /movies

Retrieve a list of movies.

Example Request:

```bash
curl http://localhost:3000/movies
```

Example Response:

```json
[
  {
    "title": "Movie 1",
    "genre": ["Action", "Adventure"],
    "releaseDate": "2022-01-01"
  },
  {
    "title": "Movie 2",
    "genre": ["Comedy", "Drama"],
    "releaseDate": "2022-02-01"
  }
  // ...
]
```
