import React from "react";
import styles from "./CardPreview.module.css";
import OpenHoursService from "../../services/OpenHoursService.jsx";

function CardPreview(props) {
  const cardData = props.cardItem;
  const openHoursSummary = OpenHoursService.summarizeOpenHours(
    cardData.openhours
  );

  const isOpenNow = OpenHoursService.isLocationOpen(
    OpenHoursService.parseOpenHours(cardData.openhours),
    props.timezone
  );

  const colors = ["#20a6df", "#C1D566", "#E7348B", "#F7A823"];

  return (
    <div
      className={styles.cardContainer}
      style={{ backgroundColor: props.backgroundColor }}
    >
      <img src={cardData.imageurls[0]} alt="" className={styles.previewImage} />
      <div className={styles.textContainer}>
        <div className={styles.textBox}>
          <p className={styles.titleText}>{cardData.name}</p>
          <p className={styles.regularText}>
            {cardData.address} - {cardData.distance}km
          </p>
          <div className={styles.ratingStatusContainer}>
            <div className={styles.ratingStatus}>
              <img src="./starIcon.svg" alt="" className={styles.icon} />
              <p className={styles.regularText}>
                {cardData.rating}
                <span className={styles.regularBoldText}>/10</span>
              </p>
            </div>
            <div className={styles.ratingStatus}>
              <img
                src={isOpenNow ? "./openIcon.svg" : "./closedIcon.svg"}
                alt=""
                className={styles.icon}
              />
              <p className={styles.regularText}>
                {isOpenNow ? "geöffnet" : "geschlossen"}
              </p>
            </div>
          </div>
          <p className={`${styles.regularBoldText}  ${styles.regularText}`}>
            Öffnungszeiten:
          </p>
          {openHoursSummary.map((item, index) => (
            <div key={index} className={styles.ratingStatusContainer}>
              <p className={styles.regularText}>{item[0]}</p>
              <p className={styles.regularText}>{item[1]}</p>
            </div>
          ))}
          <div className={styles.tagContainer}>
            {cardData.tags.map((tag, index) => (
              <div key={index} className={styles.tagBox}>
                <p
                  className={styles.smallText}
                  style={{ color: colors[index] }}
                >
                  {tag}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardPreview;
