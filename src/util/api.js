import axios from "axios"

export const fetchCards = async (address) =>
  axios.get(`https://opensea-data-query.p.rapidapi.com/api/v1/assets`, {
    params: { owner: address, order_direction: "desc", limit: "20" },
    headers: {
      "X-RapidAPI-Key": "336a852be3msh0d157228f88a9bbp193e5ejsn3948be70642b",
      "X-RapidAPI-Host": "opensea-data-query.p.rapidapi.com",
    },
  });

  export const fetchCard = async (address,id) =>
    axios.get(`https://opensea-data-query.p.rapidapi.com/api/v1/asset/${address}/${id}`, {
      headers: {
        "X-RapidAPI-Key": "336a852be3msh0d157228f88a9bbp193e5ejsn3948be70642b",
        "X-RapidAPI-Host": "opensea-data-query.p.rapidapi.com",
      },
    });

