import React from "react";
import styles from "./dropdown.module.css";

function SortDropdown({
  sortValues = { criteria: "rating", order: "ascending" },
  setSortValues,
}) {
  const handleSortChange = (criteria) => {
    if (sortValues.criteria === criteria) {
      const newOrder =
        sortValues.order === "ascending" ? "descending" : "ascending";
      setSortValues({
        criteria,
        order: newOrder,
      });
    } else {
      setSortValues({ criteria, order: "ascending" });
    }
  };

  const getOrderDisplay = (criteria) => {
    if (sortValues.criteria === criteria) {
      return sortValues.order === "ascending"
        ? "aufsteigend"
        : sortValues.order === "descending"
        ? "absteigend"
        : "";
    }
    return "";
  };

  return (
    <div className={styles.dropdown}>
      <button className={styles.dropbtn}>Sortierung</button>
      <div className={styles.dropdownContent}>
        <p className={styles.filterType} id={styles.orange}>
          Bewertung
        </p>
        <a
          onClick={() => handleSortChange("rating")}
          style={{
            fontWeight: sortValues.criteria === "rating" ? 600 : 400,
          }}
        >
          {getOrderDisplay("rating") || "aufsteigend"}
        </a>

        <p className={styles.filterType} id={styles.blue}>
          Name
        </p>
        <a
          onClick={() => handleSortChange("name")}
          style={{
            fontWeight: sortValues.criteria === "name" ? 600 : 400,
          }}
        >
          {getOrderDisplay("name") || "aufsteigend"}
        </a>

        <p className={styles.filterType} id={styles.pink}>
          Entfernung
        </p>
        <a
          onClick={() => handleSortChange("distance")}
          style={{
            fontWeight: sortValues.criteria === "distance" ? 600 : 400,
          }}
        >
          {getOrderDisplay("distance") || "aufsteigend"}
        </a>
      </div>
    </div>
  );
}

export default SortDropdown;
