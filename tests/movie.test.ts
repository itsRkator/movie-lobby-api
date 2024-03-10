import request from "supertest";
import app from "../src/index";

describe("Movie API", () => {
  it("should get all movies", async () => {
    const response = await request(app).get("/movies");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.any(Array));
  });

  it('should get movies with "Action" genre', async () => {
    const response = await request(app).get("/movies?genre=Action");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.any(Array));
    expect(
      response.body.every((movie: any) => movie.genre.includes("Action"))
    ).toBe(true);
  });

  it("should get movies with pagination", async () => {
    const response = await request(app).get("/movies?page=2&limit=5");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.any(Array));
    // Add assertions for pagination if applicable
  });

  it("should get a single movie by ID", async () => {
    // Make a request to create a movie and get its ID
    const createResponse = await request(app)
      .post("/movies")
      .send({ title: "Test Movie", genre: "Drama" });

    const movieId = createResponse.body.id;

    // Make a request to get the movie by ID
    const getByIdResponse = await request(app).get(`/movies/${movieId}`);
    expect(getByIdResponse.status).toBe(200);
    expect(getByIdResponse.body.title).toBe("Test Movie");
  });

  it("should create a new movie", async () => {
    const response = await request(app)
      .post("/movies")
      .send({ title: "New Movie", genre: "Comedy" });

    expect(response.status).toBe(201);
    expect(response.body.title).toBe("New Movie");
    expect(response.body.genre).toBe("Comedy");
  });

  it("should update a movie by ID", async () => {
    // Make a request to create a movie and get its ID
    const createResponse = await request(app)
      .post("/movies")
      .send({ title: "Movie to Update", genre: "Action" });

    const movieId = createResponse.body.id;

    // Make a request to update the movie by ID
    const updateResponse = await request(app)
      .put(`/movies/${movieId}`)
      .send({ title: "Updated Movie", genre: "Drama" });

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.title).toBe("Updated Movie");
    expect(updateResponse.body.genre).toBe("Drama");
  });

  it("should delete a movie by ID", async () => {
    // Make a request to create a movie and get its ID
    const createResponse = await request(app)
      .post("/movies")
      .send({ title: "Movie to Delete", genre: "Thriller" });

    const movieId = createResponse.body.id;

    // Make a request to delete the movie by ID
    const deleteResponse = await request(app).delete(`/movies/${movieId}`);
    expect(deleteResponse.status).toBe(204);

    // Make a request to ensure the movie is deleted
    const getByIdResponse = await request(app).get(`/movies/${movieId}`);
    expect(getByIdResponse.status).toBe(404);
  });
});
