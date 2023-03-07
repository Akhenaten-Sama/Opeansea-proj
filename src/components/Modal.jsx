import React, { useState, useEffect } from "react";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import { fetchCard } from "../util/api";

const Modal = ({ visible, onClose, id, address }) => {
  const [loading, setLoading] = useState(false);
  const [card, setCard] = useState({});

  const getCard = async () => {
    setLoading(true);
    await fetchCard(address, id).then((res) => {
      if (res.status === 200) {
        setCard(res.data);
        console.log(res.data);
      }
    });
  };
  useEffect(async () => {
    await getCard();
  }, [id, address]);
  return (
    <div>
      <Rodal
        width={800}
        height={580}
        animation="zoom"
        visible={visible}
        onClose={onClose}
      >
        <img src={card?.image_url} />
        <div>Name: {card?.name}</div>
        <div>
          Link:{" "}
          <a target="_blank" href={card?.permalink}>
            Here
          </a>
        </div>
      </Rodal>
    </div>
  );
};

//memoized to cache and prevent unecessary re-renders
export default React.memo(Modal);
