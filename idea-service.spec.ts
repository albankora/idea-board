import { IdeaService } from "./idea-service"
import { BasicIdea, ToDo, Concept } from "./idea"
import { NotificationServiceConsole } from "./notification-service";
import { BasicIdeaType, ConceptType, ToDoType } from "./types";

test('idea create', () => {
    const ideaService = new IdeaService(new NotificationServiceConsole())
    const basicIdea = ideaService.create<BasicIdeaType>({
        description: "BasicIdea description",
        title: "BasicIdea title",
    }, { type: "BasicIdea", notifyOnUpdate: ['title'] })
    expect(basicIdea).toBeInstanceOf(BasicIdea)

    const todo = ideaService.create<ToDoType>({
        description: "ToDo description",
        title: "ToDo title",
        done: true
    }, { type: "ToDo", notifyOnUpdate: ['done'] })
    expect(todo).toBeInstanceOf(ToDo)

    const concept = ideaService.create<ConceptType>({
        description: "ToDo description",
        title: "ToDo title",
        references: ["foo"]
    }, { type: "Concept", notifyOnUpdate: ['done'] })
    expect(concept).toBeInstanceOf(Concept)
});

test('wrong type to throw error', () => {
    const ideaService = new IdeaService(new NotificationServiceConsole())
    expect(() => {
        ideaService.create({
            description: "ToDo description",
            title: "ToDo title",
            references: ["foo"]
        }, { type: "foo", notifyOnUpdate: ['references'] })
    }).toThrowError()
});

test('get all by type', () => {
    const ideaService = new IdeaService(new NotificationServiceConsole())
    const concept = ideaService.create({
        type: "Concept",
        description: "ToDo description",
        title: "ToDo title",
        references: ["foo"]
    }, { type: "Concept", notifyOnUpdate: ['references'] })

    const storeConcept = ideaService.getAllByType<Concept, string>("Concept")
    expect(concept).toEqual(storeConcept.shift())
});

test('idea got update', () => {
    const ideaService = new IdeaService(new NotificationServiceConsole())
    const concept = ideaService.create({
        description: "Concept description",
        title: "Concept title",
        references: ["foo"]
    }, { type: "Concept", notifyOnUpdate: ['references'] })
    concept.title = "ToDo new title"
    ideaService.update(concept)

    const updatedConcept = ideaService.getAllByType<Concept, string>("Concept")
    const item = updatedConcept.shift()
    expect(item?.title).toEqual("ToDo new title")
});


test('idea got update and notified', () => {
    const notificationService = new NotificationServiceConsole()
    notificationService.notify = jest.fn();

    const ideaService = new IdeaService(notificationService)
    const basicIdea = ideaService.create({
        description: "BasicIdea description",
        title: "BasicIdea title",
    }, { type: "BasicIdea", notifyOnUpdate: ['title', 'description'] })

    var basicIdeaClone = Object.create(basicIdea);

    basicIdeaClone.title = "BasicIdea new title"
    basicIdeaClone.description = "BasicIdea new description"
    ideaService.update(basicIdeaClone)

    const updatedConcept = ideaService.getAllByType<Concept, string>("BasicIdea")
    const item = updatedConcept.shift()

    expect(notificationService.notify).toHaveBeenCalledTimes(2);
    expect(item?.title).toEqual("BasicIdea new title")
    expect(item?.description).toEqual("BasicIdea new description")
});
