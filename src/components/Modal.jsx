import React, { useState, useEffect } from "react";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import { fetchCard } from "../util/api";
import Spinner from "./Spinner";
import { Button, message } from "antd";
import { EthereumIcom } from "../assets/svg";

const Modal = ({ visible, onClose, id, address }) => {
  const [loading, setLoading] = useState(false);
  const [card, setCard] = useState({});
console.log(card)
  const price = Object.keys(card).length>0?Object.values(card?.collection?.fees?.seller_fees)[0]:0
  console.log(price)
  const getCard = async () => {
    setLoading(true);
    await fetchCard(address, id)
      .then((res) => {
        if (res.status === 200) {
          setCard(res.data);
          console.log(res.data);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        message.error("Network Error");
      });
  };
  useEffect(async () => {
    if (address) {
      await getCard();
    }
  }, [id, address]);
  return (
    <Rodal
      customStyle={{ overflow: "scroll" }}
      width={500}
      height={600}
      animation="zoom"
      visible={visible}
      onClose={onClose}
    >
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <img
              style={{ height: "400px", width: "450px", borderRadius: "8px" }}
              src={card?.image_url}
            />
            <div
              style={{
                fontFamily: "Nunito",
                fontSize: "22px",
                margin: "10px 0 0px",
              }}
            >
              {card?.name}{" "}
            </div>
            <div
              style={{
                margin: "0px 0 5px",
                fontFamily: "Nunito",
                fontSize: "14px",
              }}
            >
              {card?.description}
            </div>
            <div style={{ fontFamily: "Nunito", fontSize: "14px" }}>
              <span style={{ fontSize: "16px" }}>
                <b>contract address:</b>
              </span>{" "}
              {card?.asset_contract?.address}
            </div>

            <div style={{ fontFamily: "Nunito", fontSize: "14px" }}>
              <span style={{ fontSize: "16px" }}>
                {" "}
                <b>contract type:</b>
              </span>{" "}
              {card?.asset_contract?.asset_contract_type}
            </div>
          </div>

          <div>
            <Button
              style={{ marginTop: "20px", background: "#011f3c" }}
              type="primary"
              icon={
                <i
                  style={{ margin: "0 3px" }}
                  class="fa fa-shopping-cart"
                  aria-hidden="true"
                ></i>
              }
              href={card?.permalink}
              target="_blank"
            >
              <span className="card__info-box-left">
                <span> {"Purchase"}</span> <EthereumIcom />
              </span>
            </Button>

            <Button
            onClick={onClose}
              style={{ marginLeft:"50px",marginTop: "20px", background: "#011f3c" }}
              type="primary"
            >
              Close Modal
            </Button>
          </div>
        </div>
      )}
    </Rodal>
  );
};

//memoized to cache and prevent unecessary re-renders
export default React.memo(Modal);
