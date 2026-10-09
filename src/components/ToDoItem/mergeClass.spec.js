import mergeClass from "./mergeClass";

describe("./mergeClass.js", () => {
  test.each([
    { input: false, expected: "todo-item" },
    { input: true, expected: "todo-item completed" },
  ])(
    "deveria retornar as classes $expected quando o item completo for $input",
    ({ input, expected }) => {
      expect(mergeClass(input)).toBe(expected);
    },
  );
});
