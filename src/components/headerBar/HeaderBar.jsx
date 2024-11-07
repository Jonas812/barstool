// In HeaderBar.js

import React from "react";
import styles from "./HeaderBar.module.css";
import FilterDropdown from "../dropdowns/filterDropdown.jsx";
import SortDropdown from "../dropdowns/sortDropdown.jsx";

function HeaderBar({
  type,
  filterValues,
  setFilterValues,
  uniqueTypes,
  uniqueTags,
  sortValues,
  setSortValues,
}) {
  return (
    <div className={styles.headerBarContainer}>
      <img src="./logo.svg" alt="logo" className={styles.logo} />
      {type === "cardPreviewGrid" && (
        <div className={styles.dropDownsContainer}>
          <SortDropdown sortValues={sortValues} setSortValues={setSortValues} />
          <FilterDropdown
            filterValues={filterValues}
            setFilterValues={setFilterValues}
            uniqueTypes={uniqueTypes}
            uniqueTags={uniqueTags}
          />
        </div>
      )}
    </div>
  );
}

export default HeaderBar;
