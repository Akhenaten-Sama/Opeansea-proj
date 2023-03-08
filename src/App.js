import Card from "./components/Card/Card";
import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

import { fetchCards } from "./util/api";
import Modal from "./components/Modal";
import Spinner from "./components/Spinner";
import { Input, Button, message } from "antd";
function App() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({
    visible: false,
    id: null,
    address: null,
  });
  const [address, setAddress] = useState("");
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 8;
  


  //pagination offset
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = cards.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(cards.length / itemsPerPage);

  // handle pagination
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % cards.length;
    setItemOffset(newOffset);
  };
  const openModal = (id, address) => {
    console.log(id, address);
    setModal({ visible: true, id, address });
  };

  //get all assets  with owner address
  const getCards = async (address) => {
    setLoading(true);
    await fetchCards(address)
      .then((res) => {
        if (res.status === 200) {
          setCards(res.data.assets);
          console.log(res.data.assets);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        message.error("Network Error");
      });
  };

  //handler for getting nfts
  const handleFind = () => {
    if (!address) return message.info("Please enter owner's address!");
    const add = address.replace(/"/g, "");
    console.log(add);
    message.loading("Loading");
    getCards(add.trim());
  };


  //hiding modal
  const hide = () => setModal({ visible: false, id: null, address: null });
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: "100vh",
        alignItems: "center",
      }}
    >



      <div style={{ color: "white", textAlign: "center" }}>
        {" "}
        <p style={{ margin: "20px  10px" }}>Input Owner Address</p>
        <div>
          <Input
            value={address}
            onChange={(e) => {
              e.stopPropagation();
              setAddress(e.target.value);
            }}
            style={{ width: "250px", marginRight: "10px" }}
            type="text"
          />
          <Button disable={!address} onClick={handleFind}>
            Find Nfts!
          </Button>
          <p style={{ margin: "20px  10px" }}>
            e.g 0x1ffd639a6e26da0e8b2a1bd6cad1e910739e6ec7
          </p>
        </div>
      </div>


      <Modal
        visible={modal.visible}
        address={modal.address}
        id={modal.id}
        onClose={hide}
      />

      {loading ? (
        <Spinner />
      ) : (
        <div className="container-flexbox">
          {currentItems?.map((details, i) => {
            return (
              <div
                onClick={() =>
                  openModal(details.token_id, details.asset_contract.address)
                }
                key={`${details?.name} ${i}`}
                className="item-col-3"
                style={{ padding: "6px" }}
              >
                <Card details={details} />{" "}
              </div>
            );
          })}
        </div>
      )}

      
      <div style={{ position: "fixed", bottom: "0" }}>
        <ReactPaginate
          previousLabel="Previous"
          nextLabel="Next"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
}

export default App;
