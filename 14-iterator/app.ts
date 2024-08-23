interface Task {
  id: number;
  date: string;
  title: string;
}

class TaskList {
  private tasks: Task[] = [];

  public addTask(task: Task) {
    this.tasks.push(task);
  }

  public getTasks() {
    return this.tasks;
  }

  public count() {
    return this.tasks.length;
  }

  public getIterator(type: "id" | "date", order: "asc" | "desc") {
    return new TaskIterator(this, type, order);
  }

  public sortById(order: "asc" | "desc") {
    this.tasks = this.tasks.sort((a, b) => {
      return order === "asc" ? a.id - b.id : b.id - a.id;
    });
  }

  public sortByDate(order: "asc" | "desc") {
    this.tasks = this.tasks.sort((a, b) => {
      const dateA = new Date(a.date.split("-").reverse().join("-"));
      const dateB = new Date(b.date.split("-").reverse().join("-"));
      return order === "asc"
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime();
    });
  }
}

interface IIterator<T> {
  current(): T | undefined;
  next(): T | undefined;
  prev(): T | undefined;
  index(): number;
}

class TaskIterator implements IIterator<Task> {
  private position: number = 0;
  private taskList: TaskList;
  private type: "id" | "date";
  private order: "asc" | "desc";

  constructor(taskList: TaskList, type: "id" | "date", order: "asc" | "desc") {
    this.taskList = taskList;
    this.type = type;
    this.order = order;

    if (this.type === "id") {
      this.taskList.sortById(this.order);
    } else {
      this.taskList.sortByDate(this.order);
    }
  }

  current(): Task | undefined {
    return this.taskList.getTasks()[this.position];
  }

  next(): Task | undefined {
    this.position += 1;
    return this.taskList.getTasks()[this.position];
  }

  prev(): Task | undefined {
    this.position -= 1;
    return this.taskList.getTasks()[this.position];
  }

  index(): number {
    return this.position;
  }
}

const taskList = new TaskList();
taskList.addTask({ id: 2, date: "02-09-2024", title: "Task 1" });
taskList.addTask({ id: 1, date: "01-09-2024", title: "Task 2" });
taskList.addTask({ id: 3, date: "03-09-2024", title: "Task 3" });

const idIterator = taskList.getIterator("id", "asc");
console.log(idIterator.current());
console.log(idIterator.next());
console.log(idIterator.next());
console.log(idIterator.prev());
console.log(idIterator.index());

const dateIterator = taskList.getIterator("date", "desc");
console.log(dateIterator.current());
console.log(dateIterator.next());
console.log(dateIterator.next());
console.log(dateIterator.prev());
console.log(dateIterator.index());
