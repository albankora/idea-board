import { ifUndefinedUseSecondParam } from "./idea-util"
import { ConceptType, Props, ToDoType, BasicIdeaType, UpdateType } from "./types"

export abstract class Idea {
  protected _id: number
  protected _description: string
  protected _title: string
  protected _notifyOnUpdate: Array<string>
  constructor(idea: any, props?: Props) {
    this._id = Math.floor(Math.random() * (10000000 + 1));
    this._title = idea.title
    this._description = idea.description
    this._notifyOnUpdate = props?.notifyOnUpdate || []
  }

  public abstract update(idea: UpdateType): void;

  public get id() {
    return this._id;
  }

  public get title() {
    return this._title;
  }

  public set title(title: string) {
    this._title = title;
  }

  public get description() {
    return this._description;
  }

  public set description(description: string) {
    this._description = description;
  }

  public get notifyOnUpdate() {
    return this._notifyOnUpdate;
  }

  public get type() {
    return this.constructor.name
  }
}

export class BasicIdea extends Idea {
  public update(basicIdea: BasicIdeaType): BasicIdea {
    this._title = ifUndefinedUseSecondParam<string>(basicIdea.title, this._title)
    this._description = ifUndefinedUseSecondParam<string>(basicIdea.description, this._description)
    return this
  }
}

export class ToDo extends Idea {
  _done: boolean
  constructor(toDoType: ToDoType, props?: Props) {
    super(toDoType, props);
    this._done = toDoType.done || false
  }

  public update(toDoTypes: ToDoType): ToDo {
    this._title = ifUndefinedUseSecondParam<string>(toDoTypes.title, this._title)
    this._description = ifUndefinedUseSecondParam<string>(toDoTypes.description, this._description)
    this._done = ifUndefinedUseSecondParam(toDoTypes.done, this._done)
    return this
  }
}

export class Concept extends Idea {
  private _done?: boolean
  private _references: Array<string>
  constructor(conceptType: ConceptType, props?: Props) {
    super(conceptType, props);
    this._done = conceptType.done || false
    this._references = conceptType.references
  }

  public update(conceptType: ConceptType): Concept {
    this._title = ifUndefinedUseSecondParam<string>(conceptType.title, this._title)
    this._description = ifUndefinedUseSecondParam<string>(conceptType.description, this._description)
    this._done = ifUndefinedUseSecondParam<boolean | undefined>(this._done, conceptType.done)
    this._references = ifUndefinedUseSecondParam(conceptType.references, this._references)
    return this
  }
}

export class IdeaFactory {
  public static make(ideaType: any, props: Props) {
    switch (props.type) {
      case "BasicIdea":
        return new BasicIdea(ideaType, props)
      case "ToDo":
        return new ToDo(ideaType, props)
      case "Concept":
        return new Concept(ideaType, props)
      default:
        throw new Error("Not the right type provided!!!")
    }
  }
}
