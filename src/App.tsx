import { FC } from "react";
import "./App.css";
import GoogleMapComponent from "./components/maps/GoogleMap";

const App: FC = () => {
  const defaultCenter = {
    lat: 24.7136,
    lng: 46.6753,
  };

  const markers = [
    {
      id: "1",
      position: defaultCenter,
      title: "الرياض، المملكة العربية السعودية",
    },
  ];

  return (
    <div className="App">
      <h1>React Google Maps POC</h1>
      <GoogleMapComponent
        center={defaultCenter}
        zoom={13}
        markers={markers}
      />
    </div>
  );
};

export default App;
