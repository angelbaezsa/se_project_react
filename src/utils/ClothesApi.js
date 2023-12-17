export class ClothesApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }
  processServerResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  };

  getClothes = (token) => {
    return fetch(`${this._baseUrl}/items`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this.processServerResponse);
  };
  addNewClothes(item) {
    const token = localStorage.getItem("token");
    return fetch(`${this._baseUrl}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: item.name,
        weather: item.weather,
        imageUrl: item.imageUrl,
        owner: item.owner,
      }),
    }).then(this.processServerResponse);
  }
  deleteClothes(item, token) {
    return fetch(`${this._baseUrl}/items/${item}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this.processServerResponse);
  }
  likeItem(_id, token) {
    return fetch(`${this._baseUrl}/items/${_id}/likes`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this.processServerResponse);
  }
  diskikeItem(_id, token) {
    return fetch(`${this._baseUrl}/items/${_id}/likes`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this.processServerResponse);
  }
}

// import { checkResponse } from "./weatherAPI";
//const baseUrl ="https://my-json-server.typicode.com/angelbaezsa/se_project_react";
//const baseUrl = 'http://localhost:3001';

// const baseUrl = "http://localhost:3001";

// const getClothes = () => {
//   return fetch(`${baseUrl}/items`).then((response) => checkResponse(response));
// };

// const deleteClothing = (cardId) => {
//   return fetch(`${baseUrl}/items/${cardId}`, { method: "DELETE" }).then(
//     (response) => checkResponse(response)
//   );
// };

// const addNewClothes = (newItem) => {
//   return fetch(`${baseUrl}/items`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       name: newItem.name,
//       weather: newItem.weather,
//       imageUrl: newItem.imageUrl,
//     }),
//   }).then((response) => {
//     checkResponse(response);
//   });
// };

// const likeItem = ({ cardId }) => {};

// export { addNewClothes, getClothes, deleteClothing };

// addNewCard({ cardTitle, cardLink }) {
