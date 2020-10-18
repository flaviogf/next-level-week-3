import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import mapMarker from "../images/map-marker.png";
import { RectButton } from "react-native-gesture-handler";
import api from "../services/api";

export default function OrphanagesMap() {
  const navigation = useNavigation();

  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useFocusEffect(() => {
    api.get("/orphanages").then((response) => {
      setOrphanages(response.data);
    });
  });

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -20.5434353,
          longitude: -47.4196327,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
      >
        {orphanages.map((it) => (
          <Marker
            key={it.id}
            icon={mapMarker}
            calloutAnchor={{
              x: 2.7,
              y: 0.8,
            }}
            coordinate={{
              latitude: it.latitude,
              longitude: it.longitude,
            }}
          >
            <Callout
              tooltip
              onPress={() =>
                navigation.navigate("OrphanageDetails", { id: it.id })
              }
            >
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutText}>{it.name}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {orphanages.length} orfanatos encontrados
        </Text>

        <RectButton
          style={styles.createOrphanageButton}
          onPress={() => navigation.navigate("SelectMapPosition")}
        >
          <Feather name="plus" size={20} color="#fff" />
        </RectButton>
      </View>
    </View>
  );
}

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
  },
  calloutContainer: {
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 16,
    height: 46,
    justifyContent: "center",
    paddingHorizontal: 16,
    width: 160,
  },
  calloutText: {
    color: "#0089a5",
    fontFamily: "Nunito_700Bold",
    fontSize: 14,
  },
  footer: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    bottom: 32,
    elevation: 3,
    flexDirection: "row",
    height: 56,
    justifyContent: "space-between",
    left: 24,
    paddingLeft: 24,
    position: "absolute",
    right: 24,
  },
  footerText: {
    color: "#8fa7b3",
    fontFamily: "Nunito_700Bold",
  },
  createOrphanageButton: {
    alignItems: "center",
    backgroundColor: "#15c3d6",
    borderRadius: 20,
    height: 56,
    justifyContent: "center",
    width: 56,
  },
});
