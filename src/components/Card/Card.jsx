import React from "react";
import { EthereumIcom, ClockIcon, ViewIcon } from "../../assets/svg";
import { BoxShadow, Card as StyledCard } from "./StyledCard";
import image from "../../assets/img/image-avatar.png";
import { Flex } from "../../assets/style/variables";
import {truncate} from "../../util/helpers"

//card is memoized before export
function Card({ details }) {
  return (
    <BoxShadow size="20px" color="#0c182a">
      <BoxShadow color="#0C1729">
        <StyledCard>
          <div
            style={{ backgroundImage: `url(${details?.image_url})` }}
            className="card__img"
          >
            <div className="card__visible">
              <div className="card__visible-icon">
                <ViewIcon />
              </div>
            </div>
          </div>
          <div className="card__text-cont">
            <h3>{details.name}</h3>
            <p style={{ textOverflow: "ellipsis" }}>
              {" "}
              {details.description ? truncate(details?.description) : ""}
            </p>
          </div>
          <Flex className="card__info-row">
            <Flex>
              <span className="card__info-box-left">
                Token Id {details?.token_id}
              </span>
            </Flex>
            <Flex>
              <span className="card__info-box-right">
                {details?.num_sales} sold
              </span>
            </Flex>
          </Flex>
          <div className="card__footer">
            <Flex gap="15px" justify="flex-start">
              <div className="avatar"></div>
              <span style={{ color: "white" }}>Olalekan </span>
            </Flex>
          </div>
        </StyledCard>
      </BoxShadow>
    </BoxShadow>
  );
}
//memoized to cache and prevent unecessary re-renders
export default React.memo(Card);
