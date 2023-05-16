function add(a, b) {
  return a + b;
}

test("add numbers", () => {
  //* Arrange. -> setup the call
  const x = 6;
  const y = 4;
  //* Act -> call the function
  const result = add(x, y);
  //* Assert -> check the result
  expect(result).toBe(10);
});

test("add string", () => {
  //* Arrange. -> setup the call
  const x = "hi";
  const y = "who";
  //* Act -> call the function
  const result = add(x, y);
  //* Assert -> check the result
  expect(result).toBe("hiwho");
});
