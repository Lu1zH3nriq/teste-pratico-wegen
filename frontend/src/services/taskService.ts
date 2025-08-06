import api from "./api";

export interface TaskPayload {
  title: string;
  description?: string;
  category: string;
  isCompleted: boolean;
}

export async function getAllTasks() {
  const res = await api.get("/tasks");
  return res.data;
}

export async function getTaskById(id: number) {
  const res = await api.get(`/tasks/${id}`);
  return res.data;
}

export async function getTasksByCategory(category: string) {
  const res = await api.get(`/tasks/categoria/${category}`);
  return res.data;
}

export async function createTask(payload: TaskPayload) {
  const res = await api.post("/tasks", payload);
  return res.data;
}

export async function updateTask(id: number, payload: TaskPayload) {
  const res = await api.put(`/tasks/${id}`, payload);
  return res.data;
}

export async function deleteTask(id: number) {
  const res = await api.delete(`/tasks/${id}`);
  return res.data;
}
