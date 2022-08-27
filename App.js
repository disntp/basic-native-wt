import React from "react";
import { StatusBar } from "react-native";
import HomeScreen from "./screens/home";

export default function App() {
  StatusBar.setBarStyle('light-content', true);
  return(
    <HomeScreen />
  )
}