import React, { useState } from "react";
import "./App.css";
import CardPreviewGrid from "./components/cardPreviewGrid/CardPreviewGrid";
import HeaderBar from "./components/headerBar/HeaderBar";
import DetailCardView from "./components/cardDetailView/DetailCardView";

function App() {
  const [cardDetailViewStatus, setCardDetailViewStatus] = useState(false);
  const [currentCardItem, setCurrentCardItem] = useState(null);
  const [headerBarType, setHeaderBarType] = useState("cardPreviewGrid");

  // State for filter values
  const [filterValues, setFilterValues] = useState({
    distance: 20,
    useDistance: false,
    activeTypes: [],
    activeTags: [],
  });
  const [uniqueTypes, setUniqueTypes] = useState([]);
  const [uniqueTags, setUniqueTags] = useState([]);
  const [sortValues, setSortValues] = useState({
    criteria: "name",
    order: "ascending",
  });

  const closeDetailCardView = () => {
    setCardDetailViewStatus(false);
    setCurrentCardItem(null);
    setHeaderBarType("cardPreviewGrid");
  };

  const openDetailCardView = (cardItem) => {
    setCardDetailViewStatus(true);
    setCurrentCardItem(cardItem);
    setHeaderBarType("detailCardView");
  };

  return (
    <div className="display">
      <HeaderBar
        className="header"
        type={headerBarType}
        filterValues={filterValues}
        setFilterValues={setFilterValues}
        uniqueTypes={uniqueTypes}
        uniqueTags={uniqueTags}
        sortValues={sortValues}
        setSortValues={setSortValues}
      />
      {!cardDetailViewStatus && (
        <CardPreviewGrid
          className="cardGrid"
          onCardClick={openDetailCardView}
          filterValues={filterValues}
          setUniqueTypes={setUniqueTypes}
          setUniqueTags={setUniqueTags}
          sortValues={sortValues}
        />
      )}
      {cardDetailViewStatus && (
        <DetailCardView
          className="detailView"
          cardItem={currentCardItem}
          closeDetailCardView={closeDetailCardView}
        />
      )}
    </div>
  );
}

export default App;
