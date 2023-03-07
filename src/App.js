import Card from "./components/Card/Card";
import React, { useState, useEffect } from "react";


import { fetchCards } from "./util/api";
import Modal from "./components/Modal";
function App() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({visible:false, id:null, address:null})
  const [currentId, setCurrentId] = useState(null)
  
const openModal = (id, address)=>{
  console.log(id, address)
  setModal({visible:true, id, address})

}
  const getCards = async () => {
    setLoading(true);
    await fetchCards("0x1ffd639a6e26da0e8b2a1bd6cad1e910739e6ec7").then(
      (res) => {
        if (res.status === 200) {
          setCards(res.data.assets);
          console.log(res.data.assets);
        }
      }
    );
  };
  useEffect(async () => {
    await getCards();
  }, []);
  const hide = ()=> setModal({visible:false,id:null, address:null});
  return (
    <div className="App">
      <div style={{ color: "white", textAlign: "center" }}>
        {" "}
        <p>Input Owner Address</p>
      </div>
      <Modal visible={modal.visible} address={modal.address} id={modal.id}onClose={hide}/>
      <div className="container-flexbox">
        {cards?.map((details, i) => {
          return (
            <div
              onClick={() => openModal(details.token_id, details.asset_contract.address)}
              key={`${details?.name} ${i}`}
              className="item-col-3"
              style={{ padding: "6px" }}
            >
              <Card details={details} />{" "}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
