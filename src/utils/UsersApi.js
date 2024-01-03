import { baseUrl } from "./constants";
export class UsersApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }
  checkServerResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  };

  updateUser(name, avatar, token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, avatar }),
    }).then((res) => {
      this.checkServerResponse(res);
    });
  }
}

export const usersApi = new UsersApi({ baseUrl });
