import { FC } from "react";
import { StandaloneSearchBox } from "@react-google-maps/api";

interface SearchBoxProps {
  onPlacesChanged: (places: google.maps.places.PlaceResult[]) => void;
}

const SearchBox: FC<SearchBoxProps> = ({ onPlacesChanged }) => {
  const onLoad = (ref: google.maps.places.SearchBox) => {
    ref.addListener("places_changed", () => {
      const places = ref.getPlaces();
      if (places && places.length > 0) {
        onPlacesChanged(places);
      }
    });
  };

  return (
    <StandaloneSearchBox onLoad={onLoad}>
      <input
        type="text"
        placeholder="Search locations"
        style={{
          boxSizing: "border-box",
          border: "1px solid transparent",
          width: "240px",
          height: "32px",
          padding: "0 12px",
          borderRadius: "3px",
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
          fontSize: "14px",
          outline: "none",
          textOverflow: "ellipses",
          marginBottom: "10px",
        }}
      />
    </StandaloneSearchBox>
  );
};

export default SearchBox;