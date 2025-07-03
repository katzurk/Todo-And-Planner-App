const oneListNoTasks = [
  {
    list_id: 1,
    title: "test",
    date_created: new Date(2025, 6, 1),
    tasks: [null],
  },
];

const multipleListsNoTasks = [
  {
    list_id: 1,
    title: "test",
    date_created: new Date(2025, 6, 1),
    tasks: [null],
  },
  {
    list_id: 2,
    title: "test2",
    date_created: new Date(2025, 7, 1),
    tasks: [null],
  },
];

const oneListWithOneTask = [
  {
    list_id: 1,
    title: "test",
    date_created: new Date(2025, 6, 1),
    tasks: [{ task_id: 1, text: "task", position_order: 1, is_done: false }],
  },
];

const oneListWithMultipleTasks = [
  {
    list_id: 1,
    title: "test",
    date_created: new Date(2025, 6, 1),
    tasks: [
      { task_id: 1, text: "task_second", position_order: 1, is_done: false },
      { task_id: 2, text: "task_first", position_order: 2, is_done: true },
    ],
  },
];

export default {
  oneListNoTasks,
  multipleListsNoTasks,
  oneListWithOneTask,
  oneListWithMultipleTasks,
};
