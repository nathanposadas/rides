
import {Text, View } from "react-native";
import MapView, {PROVIDER_DEFAULT } from "react-native-maps";

const directionsAPI = process.env.EXPO_PUBLIC_DIRECTIONS_API_KEY;

const Map = () => {
  return(
    <MapView provider={PROVIDER_DEFAULT}  className="w-full h-full rounded-2xl"
    tintColor="black"
      mapType="mutedStandard"
      showsPointsOfInterest={false}
      //initialRegion={region}
      showsUserLocation={true}
      userInterfaceStyle="light"
    >

    </MapView>
  );
};

export default Map;