import React, { useState, useEffect } from "react";
import styles from "./CardPreviewGrid.module.css";
import CardPreview from "../cardPreview/CardPreview";
import OpenHoursService from "../../services/OpenHoursService.jsx";
import locations from "../../data.json";

function CardPreviewGrid({
  onCardClick,
  filterValues,
  setUniqueTypes,
  setUniqueTags,
  sortValues,
}) {
  const [activeLocations, setActiveLocations] = useState([]);

  useEffect(() => {
    const filteredLocations = locations.filter((location) => {
      // Filter based on distance
      if (
        filterValues.useDistance &&
        location.distance > filterValues.distance
      ) {
        return false;
      }

      // Filter based on types
      if (
        filterValues.activeTypes.length > 0 &&
        !filterValues.activeTypes.includes(location.type)
      ) {
        return false;
      }

      // Filter based on tags (all tags must be included)
      if (filterValues.activeTags.length > 0) {
        const locationHasAllTags = filterValues.activeTags.every((tag) =>
          location.tags.includes(tag)
        );
        if (!locationHasAllTags) {
          return false;
        }
      }

      // If filterValues.showOpen is true, only show open locations
      if (filterValues.showOpen) {
        const isOpen = OpenHoursService.isLocationOpen(
          OpenHoursService.parseOpenHours(location.openhours),
          "Europe/Berlin" // Replace with the actual timezone value
        );
        if (!isOpen) {
          return false;
        }
      }

      return true;
    });

    filteredLocations.sort((a, b) => {
      const criteria = sortValues.criteria;
      const order = sortValues.order;

      // Comparison function for sorting
      const compareValues = (a, b) => {
        if (typeof a === "string" && typeof b === "string") {
          return a.localeCompare(b);
        }
        return a - b;
      };

      let comparison = 0;
      if (criteria === "name") {
        comparison = compareValues(a.name, b.name);
      } else if (criteria === "rating") {
        comparison = compareValues(a.rating, b.rating);
      } else if (criteria === "distance") {
        comparison = compareValues(a.distance, b.distance);
      }

      // Reverse the comparison for descending order
      if (order === "descending") {
        comparison *= -1;
      }

      return comparison;
    });

    // Update active locations
    setActiveLocations(filteredLocations);
  }, [filterValues, sortValues]);

  useEffect(() => {
    const tags = new Set();
    const types = new Set();

    activeLocations.forEach((location) => {
      if (location.tags) {
        location.tags.forEach((tag) => tags.add(tag));
      }
      if (location.type) {
        types.add(location.type);
      }
    });

    setUniqueTags([...tags]);
    setUniqueTypes([...types]);
  }, [activeLocations, setUniqueTypes, setUniqueTags]);

  const colors = ["#20a6df15", "#C1D56615", "#E7348B15", "#F7A82315"];

  // Function to generate a random index
  const getRandomIndex = () => Math.floor(Math.random() * colors.length);

  // Function to generate a random color
  const generateCardBackgroundColor = () => colors[getRandomIndex()];

  const openDetailCardView = (cardItem) => {
    if (onCardClick) {
      onCardClick(cardItem);
    }
  };

  return (
    <div className={styles.cardsBox}>
      <div className={styles.cardsGrid}>
        {activeLocations.map((location) => (
          <div key={location.id} onClick={() => openDetailCardView(location)}>
            <CardPreview
              cardItem={location}
              backgroundColor={generateCardBackgroundColor()}
              timezone="Europe/Berlin" // Replace with the actual timezone value
              className={styles.cardGridItem}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardPreviewGrid;
