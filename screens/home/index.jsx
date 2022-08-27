import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ImageBackground } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import styles from "./styles";
import CITY_LIST from "../../utils/data.json";
import { COLORS, SIZES } from "../../constants/theme";
import Icon from "react-native-vector-icons/Ionicons";
import Forecast from "../../components/Forecast";

const HomeScreen = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(CITY_LIST);
  const [info, setInfo] = useState([{
    main: "-",
    icon: "-",
    desc: "-",
    name: '-'
  }])

  const [lat, setLat] = useState();
  const [lng, setLng] = useState();

  const [data, setData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    setData();
    const cityData = items.filter((val) => val.city === value);
    if (cityData.length > 0) {
      setLat(cityData[0].lat);
      setLng(cityData[0].lng);
    }
  }, [items, value]);

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=9aebc24f65604b3bafc6612917507d59&units=metric`
        );
        const json = await res.json();
        setData([json.main]);
        setInfo({
            ...info,
            main: json.weather[0].main,
            icon: json.weather[0].icon,
            desc: json.weather[0].description,
            name: json.name
        })
        setError(null);
      } catch (err) {
        setError(err);
      }
    };
    if (lat && lng) {
      fetchAPI(lat, lng);
    }
  }, [lat, lng]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.appName}>Global Weather</Text>
        <View
          style={{
            minHeight: open && Platform.OS === "android" ? 250 : 0,
          }}
        >
          <DropDownPicker
            open={open}
            searchable
            searchPlaceholder="Type to get the city"
            searchTextInputStyle={{
              borderWidth: 0,
              fontWeight: "700",
            }}
            searchContainerStyle={{
              paddingVertical: 15,
              borderBottomColor: COLORS.accent,
            }}
            placeholder="Select a city"
            placeholderStyle={{
              color: COLORS.darkGrey,
            }}
            containerStyle={{
              margin: 15,
              width: SIZES.width - 30,
            }}
            labelStyle={{
              color: COLORS.primary,
              fontWeight: "bold",
              fontSize: SIZES.h3,
            }}
            listItemLabelStyle={{
              color: COLORS.primary,
              fontWeight: "700",
            }}
            showTickIcon={false}
            dropDownContainerStyle={{
              borderColor: COLORS.primary,
            }}
            ArrowUpIconComponent={() => (
              <Icon name="chevron-up-sharp" size={20} color={COLORS.accent} />
            )}
            ArrowDownIconComponent={() => (
              <Icon name="chevron-down-sharp" size={20} color={COLORS.accent} />
            )}
            value={value}
            items={items.map(({ city }) => ({
              label: city,
              value: city,
            }))}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
          />
        </View>
      </View>

      {data ? (
        <FlatList
          data={data}
          renderItem={( {item} ) => (
              <Forecast data={item} info={info} />
          )}
        />
      ) : (
        <View style={styles.noData}>
          <Text style={styles.noDataTxt}>
            {!value ? " - No Data - " : "Data loading..."}
          </Text>
        </View>
      )}
    </View>
  );
};

export default HomeScreen;
