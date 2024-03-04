const request = require("supertest");
const { app } = require("../app");

describe("User Authentication APIs", function () {
  it(" It should register a new user", async () => {
    const res = await request(app).post("/user/register").send({
      username: process.env.USERNAME,
      email: process.env.EMAIL,
      password: process.env.PASSWORD,
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "User registered successfully");
    data = res.body;
  });

  it(" It should login with the registered user", async () => {
    const res = await request(app).post("/user/login").send({
      email: process.env.EMAIL,
      password: process.env.PASSWORD,
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Login successful");
    expect(res.body).toHaveProperty("authToken");
    authToken = res.body.authToken;
  });
});

const authToken = process.env.authToken;

describe("Notification APIs", () => {
  let testNotificationId = 13;

  it(" It should retrieve all notifications", async () => {
    const response = await request(app)
      .get("/notification/getAllNotifications")
      .set("Authorization", `Bearer ${authToken}`);
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("data");
  });

  it(" It should mark a notification as read", async () => {
    const response = await request(app)
      .put(`/notification/mark-read/${testNotificationId}`)
      .set("Authorization", `Bearer ${authToken}`)
      .send({ read: true });
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty(
      "message",
      "Notification marked as read!"
    );
  });

  it(" It should delete a notification", async () => {
    const response = await request(app)
      .delete(`/notification/deleteNotification/${testNotificationId}`)
      .set("Authorization", `Bearer ${authToken}`);
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty(
      "message",
      "Notification deleted successfully!"
    );
  });
});

describe("Upload APIs", () => {
  let testImageId = 1;
  let imageName = "aloo.jpeg";

  it("It should upload an image", async () => {
    const response = await request(app)
      .post("/uploads/uploadImage")
      .attach("upload", "aloo.jpeg")
      .set("Authorization", `Bearer ${authToken}`);
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("message", "Successfully uploaded!");
    testImageId = response.body.data.id;
  });

  it("It should retrieve an image by filename", async () => {
    const response = await request(app)
      .get(`/uploads/getAllImages/${imageName}`)
      .set("Authorization", `Bearer ${authToken}`);
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty(
      "message",
      "Successfully fetched image!"
    );
    expect(response.body.data).toBeDefined();
  });

  it("It should retrieve an image by ID", async () => {
    const response = await request(app)
      .get(`/uploads/getImageById/${testImageId}`)
      .set("Authorization", `Bearer ${authToken}`);
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty(
      "message",
      "Successfully fetched image!"
    );
    expect(response.body.data).toBeDefined();
  });
});

describe("Recipe APIs", () => {
  let testRecipeId = 9;
  it("It should retrieve all recipes", async () => {
    const response = await request(app)
      .get("/recipe/getRecipe")
      .set("Authorization", `Bearer ${authToken}`);
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("data");
  });

  it("It should retrieve a recipe by ID", async () => {
    const response = await request(app)
      .get(`/recipe/getRecipe/${testRecipeId}`)
      .set("Authorization", `Bearer ${authToken}`);
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("data");
  });

  it("It should create a new recipe", async () => {
    const newRecipe = {
      title: "Aaloo Sabji",
      description: "Dry",
      ingredients: "Potato,Salt,Red Chilly paste",
      instructions: "Potato should be bolied first",
    };
    const response = await request(app)
      .post("/recipe/createRecipe")
      .send(newRecipe)
      .set("Authorization", `Bearer ${authToken}`);
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("data");
  });

  it("It should update a recipe by ID", async () => {
    const updatedRecipe = {
      title: "Brinjal Sabji",
      description: "Gravy",
    };
    const response = await request(app)
      .put(`/recipe/updateRecipe/${testRecipeId}`)
      .send(updatedRecipe)
      .set("Authorization", `Bearer ${authToken}`);
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("data");
  });

  it("It should delete a recipe by ID", async () => {
    const response = await request(app)
      .delete(`/recipe/deleteRecipe/${testRecipeId}`)
      .set("Authorization", `Bearer ${authToken}`);
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty(
      "message",
      "Recipe deleted successfully!"
    );
  });
});
