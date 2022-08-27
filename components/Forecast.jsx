import React from "react";
import { View, Text, StyleSheet, ImageBackground, Image } from "react-native";

const Forecast = ({ data, info }) => {
  const { humidity, pressure, temp, temp_max, temp_min } = data;
  const img = `http://openweathermap.org/img/wn/${info.icon}@2x.png`;
  return (
    <ImageBackground
    style={styles.backdrop}
    source={temp > 23 ? require("../assets/summer.jpg") : require("../assets/cold.jpg")}
    >
      <View>
        <View style={{ flexDirection: "row", paddingTop: 10 }}>
          <Image source={{ uri: img }} style={styles.icon} />
          <Text
            style={{
              marginTop: 20,
              paddingLeft: 50,
              fontSize: 40,
              fontWeight: "bold",
            }}
          >
            {temp} °C
          </Text>
        </View>

          <Text style={styles.content}>{info.main}, {info.desc}</Text>
        <View style={styles.item}>
          <Text style={styles.content}>Humidity: {humidity}</Text>
          <Text style={styles.content}>Pressure: {pressure}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.content}>Temp MAX: {temp_max}</Text>
          <Text style={styles.content}>Temp MIN: {temp_min}</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  content: {
    fontSize: 17,
    color: "black",
    textAlign: "center",
    fontWeight:'800'
  },
  icon: {
    width: 96,
    height: 96,
  },
  item: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 30,
  },
  backdrop: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    // justifyContent: "center",
  },
});
export default Forecast;
