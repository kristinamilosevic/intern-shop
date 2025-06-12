const BASE_URL = process.env.REACT_APP_API_BASE_URL 

interface LoginResponse {
  token: string;
  user: {
    username: string;
  };
}

export const login = async (username: string, password: string): Promise<LoginResponse> => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Login failed");
  }

  const data: LoginResponse = await response.json();
  return data;
};
