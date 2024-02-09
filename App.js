import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Avatar, Appbar, Card, IconButton } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import axios from "axios";

export default function App() {
  const [data, setData] = useState([]);

  const getParkingSlots = async () => {
    const response = await axios.get(
      "http://192.168.126.76:3000/api/parking-slot"
    );
    setData(response.data);
  };

  useEffect(() => {
    getParkingSlots();

    const updateInfo = setInterval(() => {
      getParkingSlots();
    }, 5000); 

    return () => clearInterval(updateInfo);
  }, []);

  return (
    <View style={styles.container}>
        {data.map((item) => (
          <Card.Title
            key={item.id}
            title={item.sensorId}
            subtitle={`Distancia del objeto: ${item.distance} cm`}
            left={(props) => (
              <Avatar.Icon
                {...props}
                style={{
                  backgroundColor: item.distance <= 10 ? "gray" : "green",
                }}
                icon="car"
                color="#fff"
              />
            )}
            right={(props) => (
              <IconButton {...props} icon="dots-vertical" onPress={() => {}} />
            )}
          />
        ))}

        <StatusBar style="auto" />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
