import React from "react";
import styles from "./DetailCardView.module.css";
import ImageSlider from "../imageSlider/ImageSlider";
import MapComponent from "../mapComponent/MapComponent";
import OpenHoursService from "../../services/OpenHoursService";

function DetailCardView(props) {
  const closeDetailCardView = () => {
    if (props.closeDetailCardView) {
      props.closeDetailCardView();
    }
  };

  const colors = ["#20a6df", "#C1D566", "#E7348B", "#F7A823"];

  // Function to generate a random index
  const getRandomIndex = () => {
    return Math.floor(Math.random() * colors.length);
  };

  // Function to generate a random color
  const generateCardBackgroundColor = () => {
    const randomIndex = getRandomIndex();
    return colors[randomIndex] + 15;
  };

  // Use the generator function to get the current color
  const color = generateCardBackgroundColor(); // Invoke the function to get the color

  const cardData = props.cardItem;
  const openHoursSummary = OpenHoursService.summarizeOpenHours(
    cardData.openhours
  );

  const isOpenNow = OpenHoursService.isLocationOpen(
    OpenHoursService.parseOpenHours(cardData.openhours),
    props.timezone
  );

  const images = cardData.imageurls;
  return (
    <div className={styles.detailCardViewContainer}>
      <div className={styles.detailCardViewBox}>
        <div className={styles.viewBoxItem}>
          <ImageSlider images={images} />
        </div>
        <div
          style={{ backgroundColor: color }}
          className={`${styles.viewBoxItem} ${styles.generalInformation}`}
        >
          <div className={styles.closeBtn} onClick={closeDetailCardView}>
            <p>x</p>
          </div>
          <p className={styles.titleText}>{cardData.name}</p>
          <p className={styles.regularText}>
            {cardData.address} - {cardData.distance}km
          </p>
          <div className={styles.statusContainer}>
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
            <div key={index} className={styles.openingHours}>
              <p className={styles.regularText}>{item[0]}</p>
              <p className={styles.regularText}>{item[1]}</p>
            </div>
          ))}
          <div className={styles.tagContainer}>
            {cardData.tags.map((tag, index) => (
              <div key={index} className={styles.tagBox}>
                <p
                  className={styles.regularText}
                  style={{ color: colors[index] }}
                >
                  {tag}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className={`${styles.viewBoxItem} ${styles.mapsView}`}>
          <MapComponent
            longitude={cardData.longitude}
            latitude={cardData.latitude}
          />
        </div>
        <div className={styles.viewBoxItem}>
          <div
            style={{ backgroundColor: color }}
            className={styles.outerReviewContainer}
          >
            <div className={styles.ratingContainer}>
              <p className={`${styles.regularBoldText}  ${styles.regularText}`}>
                Reviews:
              </p>
              <br />
              {cardData.allRatings.map((ratingItem, index) => (
                <div key={index}>
                  <div className={styles.reviewBox}>
                    <img
                      src="./starIcon.svg"
                      alt=""
                      className={styles.smallIcon}
                    />
                    <p className={styles.smallText}>
                      {ratingItem.rating}
                      <span className={styles.smallBoldText}>/10</span>
                    </p>
                    <p className={styles.smallText}>{ratingItem.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailCardView;
