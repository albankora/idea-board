import {
  BasicIdea,
  ToDo,
  Concept,
} from "./idea"

test('instance builds correctly', () => {
  const basicIdea = new BasicIdea({
    description: "BasicIdea description",
    title: "BasicIdea title",
  })
  expect(basicIdea).toBeInstanceOf(BasicIdea)
  expect(basicIdea.type).toEqual("BasicIdea")

  const toDo = new ToDo({
    description: "ToDo description",
    title: "ToDo title",
    done: true,
  })
  expect(toDo).toBeInstanceOf(ToDo)
  expect(toDo.type).toEqual("ToDo")

  const concept = new Concept({
    description: "ToDo description",
    title: "ToDo title",
    references: ["references url"],
  })

  expect(concept).toBeInstanceOf(Concept)
  expect(concept.type).toEqual("Concept")
});

test('update basic idea', () => {
  const basicIdea = new BasicIdea({
    description: "BasicIdea description",
    title: "BasicIdea title",
  })

  basicIdea.update({
    description: "description",
    title: "BasicIdea",
  })

  expect(basicIdea.title).toEqual("BasicIdea")
});

test('update todo idea', () => {
  const toDo = new ToDo({
    description: "ToDo description",
    title: "ToDo title",
    done: true,
  }, {
    type: "ToDo",
    notifyOnUpdate: ['done']
  })

  toDo.update({
    description: "ToDo description",
    title: "ToDo new",
    done: true,
  })

  expect(toDo.title).toEqual("ToDo new")
});

test('Concept updated correctly but nothing for notification', () => {
  const concept = new Concept({
    description: "ToDo description",
    title: "ToDo title",
    references: ["references url"],
  }, {
    type: "Concept",
    notifyOnUpdate: ['references']
  })

  concept.update({
    description: "Concept updated",
    title: "Concept updated",
    references: ["references url"],
  })
  expect(concept.title).toEqual("Concept updated")
});
