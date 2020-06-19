describe("API tests from url", () => {
  it("should return 200", () => {
    cy.request("https://jsonplaceholder.typicode.com/todos/1").then(
      (response) => {
        expect(response.status).to.eq(200);
      }
    );
  });

  it("should return the title", () => {
    cy.request("https://jsonplaceholder.typicode.com/todos/1").then(
      (response) => {
        expect(response.body).to.have.property("title", "delectus aut autem");
      }
    );
  });

  it("should get and post in 1 test", () => {
    cy.request("https://jsonplaceholder.typicode.com/todos/1").then((resp) => {
      cy.request({
        method: "POST",
        url: "https://jsonplaceholder.typicode.com/posts",
        form: false,
        body: {
          title: "foo",
          body: "bar",
          userId: resp.body.userId,
        },
      }).then((response) => {
        expect(response.body).to.have.property("userId", 1);
        expect(response.body).to.have.property("body", "bar");
        expect(response.body).to.have.property("title", "foo");
        expect(response.body).to.have.property("id", 101);
        expect(response.status).to.eq(201);
      });
    });
  });
});
