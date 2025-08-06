import api from "./api";

interface AuthPayload {
  username: string;
  passwordHash: string;
}

export async function login(payload: AuthPayload) {
  try {
    const res = await api.post("/auth/login", payload);
    return res.data; 
  } catch (err: any) {
    console.error("Erro no login:", err);
    return {
      status: "error",
      message: err.response?.data?.message || "Erro ao fazer login",
      data: null,
    };
  }
}

export async function register(payload: AuthPayload) {
  try {
    const res = await api.post("/auth/register", payload);
    return res.data;
  } catch (err: any) {
    console.error("Erro no registro:", err);
    return {
      status: "error",
      message: err.response?.data?.message || "Erro ao registrar usuário",
      data: null,
    };
  }
}
