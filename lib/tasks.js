import fetch from "node-fetch";

export async function getAllTasksData() {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-task/`)
  );
  const tasks = await res.json();
  const staticfilterdTasks = tasks.sort(
    // 日付が新しい順にソーティング
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );
  return staticfilterdTasks;
}

export async function getAllTaskIds() {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-task/`)
  );
  const tasks = await res.json();
  // idの要素だけを取り出す
  return tasks.map((task) => {
    return {
      params: {
        id: String(task.id),
      },
    };
  });
}

export async function getTaskData(id) {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/detail-task/${id}/`)
  );
  const task = await res.json();
  return {
    task,
  };
}
