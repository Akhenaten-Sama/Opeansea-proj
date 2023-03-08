import axios from "axios"


//used a Free rapidapi key, so I did't border to hide it..
export const fetchCards = async (address) =>
  axios.get(`https://opensea-data-query.p.rapidapi.com/api/v1/assets`, {
    params: { owner: address, order_direction: "desc", limit: "20" },
    headers: {
      "X-RapidAPI-Key": "d7bf24f506msh399c4d4120e53eap147792jsnc5957239c834",
      "X-RapidAPI-Host": "opensea-data-query.p.rapidapi.com",
    },
  });

  export const fetchCard = async (address, id) =>
    axios.get(
      `https://opensea-data-query.p.rapidapi.com/api/v1/asset/${address}/${id}`,
      {
        headers: {
          "X-RapidAPI-Key":
            "d7bf24f506msh399c4d4120e53eap147792jsnc5957239c834",
          "X-RapidAPI-Host": "opensea-data-query.p.rapidapi.com",
        },
      }
    );

