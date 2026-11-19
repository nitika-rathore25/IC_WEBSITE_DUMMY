// import { LoginPayload } from "@/interface/interface";
// import { apiRequest } from "@/sevices/apiRequest";
// import { setApiToken, setToken } from "@/utils/storage";
// import { useMutation } from "@tanstack/react-query";

// export const useLoginApi = () => {
//   return useMutation({
//     mutationFn: async ({username, password}: LoginPayload) => {
//      const formData = new URLSearchParams();

//       formData.append("grant_type", "password");
//       formData.append("username", username);
//       formData.append("password", password);
//       formData.append("scope", "");
//       formData.append("client_id", "string");
//       formData.append("client_secret", "string");
     
//       const response = await apiRequest(
//         "post",
//         "/auth/login",
//         formData.toString(),
//       );

//       const data = response.data;
//       if (response.headers?.["authorization"]) {
//         setToken(response.headers["authorization"]);
//       }
//       if (data?.response?.token) {
//         setApiToken(data?.response.token);
//       }
//       return data;
//     },
//   });
// };


export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!

export interface LoginResponse {
  access_token?: string
  token_type?: string
  theme?: unknown
  detail?: string
  message?: string
  [key: string]: unknown
}

export interface LoginResult {
  ok: boolean
  data: LoginResponse
}

/**
 * Calls the /auth/login endpoint with the given credentials.
 * Returns { ok, data } where `ok` mirrors response.ok and `data`
 * is the parsed JSON body (token fields on success, error fields on failure).
 * Throws only on network-level failures (e.g. no connection).
 */
export async function loginUser(username: string, password: string): Promise<LoginResult> {
  const formData = new URLSearchParams()
  formData.append("grant_type", "password")
  formData.append("username", username)
  formData.append("password", password)
  formData.append("scope", "")
  formData.append("client_id", "string")
  formData.append("client_secret", "string")

  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData.toString(),
  })

  const data = await response.json()

  return { ok: response.ok, data }
}

/**
 * Persists auth data returned from a successful login into localStorage.
 */
export function persistAuthData(data: LoginResponse) {
  localStorage.setItem("isAuthenticated", "true")
  localStorage.setItem("mode", "live")

  if (data.access_token) {
    localStorage.setItem("access_token", data.access_token)
  }
  if (data.token_type) {
    localStorage.setItem("token_type", data.token_type)
  }
  if (data.theme) {
    localStorage.setItem("theme", JSON.stringify(data.theme))
  }
}

