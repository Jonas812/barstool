import React, { useState } from "react";
import styles from "./dropdown.module.css";

function FilterDropdown({
  filterValues,
  setFilterValues,
  uniqueTypes,
  uniqueTags,
}) {
  const handleDistanceChange = (event) => {
    setFilterValues({ ...filterValues, distance: event.target.value });
  };

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    setFilterValues({ ...filterValues, useDistance: event.target.checked });
  };

  const handleTypeClick = (type) => {
    let updatedTypes = [...filterValues.activeTypes];
    if (updatedTypes.includes(type)) {
      updatedTypes = updatedTypes.filter((t) => t !== type);
    } else {
      updatedTypes.push(type);
    }
    setFilterValues({ ...filterValues, activeTypes: updatedTypes });
  };

  const handleTagClick = (tag) => {
    let updatedTags = [...filterValues.activeTags];
    if (updatedTags.includes(tag)) {
      updatedTags = updatedTags.filter((t) => t !== tag);
    } else {
      updatedTags.push(tag);
    }
    setFilterValues({ ...filterValues, activeTags: updatedTags });
  };

  const toggleShowOpen = () => {
    setFilterValues({ ...filterValues, showOpen: !filterValues.showOpen });
  };

  return (
    <div className={styles.dropdown}>
      <button className={styles.dropbtn}>Filter</button>
      <div className={styles.dropdownContent}>
        <p className={styles.filterType} id={styles.orange}>
          Distanz von HTW
        </p>
        <div className={styles.sliderContainer}>
          <input
            className={styles.slider}
            type="range"
            min="0"
            max="20"
            value={filterValues.distance}
            onChange={handleDistanceChange}
          />
        </div>
        <p className={styles.filterText}>
          max {filterValues.distance}km
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
        </p>

        <p className={styles.filterType} id={styles.blue}>
          Typ
        </p>
        {uniqueTypes.map((type) => (
          <a
            key={type}
            className={
              filterValues.activeTypes.includes(type) ? styles.activeType : ""
            }
            onClick={() => handleTypeClick(type)}
          >
            {type}
          </a>
        ))}
        <p className={styles.filterType} id={styles.pink}>
          Ausstattung
        </p>
        {uniqueTags.map((tag) => (
          <a
            key={tag}
            className={
              filterValues.activeTags.includes(tag) ? styles.activeTag : ""
            }
            onClick={() => handleTagClick(tag)}
          >
            {tag}
          </a>
        ))}
        <p className={styles.filterType} id={styles.green}>
          Öffnungsstatus
        </p>
        <a onClick={toggleShowOpen}>
          {filterValues.showOpen ? "Alle anzeigen" : "Nur offene anzeigen"}
        </a>
      </div>
    </div>
  );
}

export default FilterDropdown;
