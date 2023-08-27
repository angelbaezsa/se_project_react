//const baseUrl ="https://my-json-server.typicode.com/angelbaezsa/se_project_react";
//const baseUrl = 'http://localhost:3001';


const baseUrl = "http://localhost:3001";


const checkResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Error ${response.status}`);
};

const getClothes = () => {
  return fetch(`${baseUrl}/items`).then((response) => checkResponse(response));
};

const deleteClothing = (cardId) => {
  return fetch(`${baseUrl}/items/${cardId}`, { method: "DELETE" }).then(
    (response) => checkResponse(response)
  );
};

const addNewClothes = (newItem) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: newItem.name,
      weather: newItem.weather,
      imageUrl: newItem.imageUrl,
    }),
  }).then((response) => {
    checkResponse(response);
  });
};

export { addNewClothes, getClothes, deleteClothing };

// addNewCard({ cardTitle, cardLink }) {
//   return fetch(`${this._url}/cards`, {
//     method: "POST",
//     headers: this._headers,
//     body: JSON.stringify({
//       name: cardTitle,
//       link: cardLink,
//     }),
//   }).then(this._checkResponse);
// }

// deleteCard(cardId) {
//   console.log(cardId);
//   return fetch(`${this._url}/cards/${cardId}`, {
//     method: "DELETE",
//     headers: this._headers,
//   }).then(this._checkResponse);
// }
