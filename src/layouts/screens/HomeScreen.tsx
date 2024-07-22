import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, TextInput, StyleSheet, PermissionsAndroid, Image, ActivityIndicator, Dimensions, ScrollView, ImageBackground, Switch } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import LinearGradient from 'react-native-linear-gradient';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import axios from 'axios';


const API_KEY = 'd51f99851158ded3942f86866396ec40';
const API_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric&q=`;


const { width, height } = Dimensions.get('window');


const formatDate = (dateString) => {
  const options = { day: 'numeric', weekday: 'long', month: 'long', };
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', options).format(date);
};

const HomeScreen = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // =================CODE FOR DARK MODE

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // =================CODE FOR DARK MODE


  // ================= CODE FOR WEATHER FORECAST API CALL 

  const fetchWeatherData = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL + city);
      const api = await response.json();
      if (api.cod === 200) {
        setWeatherData(api);
        setCityId(api.id);
        setError('');
        console.log(api);
      } else {
        setError('Location not found');
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Error fetching weather data');
    }
    setLoading(false);
  };

  // ================= CODE FOR WEATHER API CALL ENDED



  // =================  BACKGORUND IMAGES FUNCTION

  const getWeatherBackground = (weather) => {
    switch (weather) {
      case 'Clouds':
        return require('../../images/cloudBg.jpg');
      case 'Clear':
        return require('../../images/clearBg.jpg');
      case 'Rain':
        return require('../../images/rainyBg.jpg');
      case 'Haze':
        return require('../../images/hazeBg.jpg');
      default:
        return require('../../images/default.jpg');
    }
  };

  // ============ BACKGORUND IMAGES FUNCTION ENDED


  // ================= ICONS CALLING FUNCTION 

  const getWeatherIcon = (weather) => {
    switch (weather) {
      case 'Clouds':
        return <Fontisto name='day-cloudy' size={26} color={'white'} />;
      case 'Clear':
        return <Ionicons name='sunny' size={26} color={'white'} />;
      case 'Rain':
        return <Ionicons name='rainy-sharp' size={26} color={'white'} />;
      case 'Haze':
        return <Fontisto name='day-haze' size={26} color={'white'} />;
      default:
        return <Ionicons name='sunny' size={26} color={'white'} />;
    }
  };

  // ================= ICONS CALLING FUNCTION ENDED


  // Get today's date
  const today = new Date();
  const formattedDate = formatDate(today);

  return (
    <View style={[styles.container, darkMode ? styles.darkContainer : styles.lightContainer]}>
      <ScrollView>
        <View style={styles.bgView}>

          <ImageBackground
            source={weatherData ? getWeatherBackground(weatherData.weather[0].main) : require('../../images/default.jpg')}
            style={styles.bg}
          >
            {/* =============TEXTINPUT */}
            <View style={styles.searchBox}>
              <TextInput
                style={styles.input}
                placeholder="Enter city name"
                value={city}
                onChangeText={setCity}
              />
              <TouchableOpacity style={styles.searchIcon} onPress={fetchWeatherData}>
                <AntDesign name='search1' color={'black'} size={22} />
              </TouchableOpacity>
            </View>
            {/* =============TEXTINPUT */}

            <Text style={styles.date}>{formattedDate}</Text>
            <View style={styles.temp}>{weatherData ? <Text style={styles.tempText}>{weatherData.main.temp}°C</Text> : <Text> </Text>}</View>
          </ImageBackground>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="blue" />
        ) : weatherData ? (
          <View style={styles.weatherContainer}>
            <Text style={styles.toggleButton}>Dark mode</Text>
            <TouchableOpacity onPress={toggleDarkMode} style={styles.modeBtn}>
              <Text style={styles.toggleText}>{darkMode ? 'On' : 'Off'}</Text>
            </TouchableOpacity>
            <Text style={styles.weathercityText}>{weatherData.name}</Text>
            <ScrollView horizontal>
              <View style={styles.weatherdetailContainer}>

                {/* ======================Weather */}
                <View style={styles.gradientView}>
                  <LinearGradient
                    colors={darkMode ? ['gray', 'grey'] : ['lightblue', 'skyblue']}
                    style={styles.details}>
                    {getWeatherIcon(weatherData.weather[0].main)}
                    <Text style={styles.weatherdetail}>{weatherData.weather[0].description}</Text>
                    <Text style={styles.weatherText}>Weather</Text>
                  </LinearGradient>
                </View>
                {/* ======================Weather */}

                {/* ======================Temperature */}
                <View style={styles.gradientView} >
                  <LinearGradient
                    colors={darkMode ? ['gray', 'grey'] : ['lightblue', 'skyblue']}
                    style={styles.details}>
                    <FontAwesome6 name='temperature-high' size={26} color={'white'} />
                    <Text style={styles.weatherdetail}>{weatherData.main.temp}°C</Text>
                    <Text style={styles.weatherText}>Temperature</Text>
                  </LinearGradient>
                </View>
                {/* ======================Temperature */}

                {/* ======================HUMIDITY */}
                <View style={styles.gradientView} >
                  <LinearGradient
                    colors={darkMode ? ['gray', 'grey'] : ['lightblue', 'skyblue']}
                    style={styles.details}>
                    <SimpleLineIcons name='drop' size={26} color={'white'} />
                    <Text style={styles.weatherdetail}>{weatherData.main.humidity}%</Text>
                    <Text style={styles.weatherText}>Humidity</Text>
                  </LinearGradient>
                </View>
                {/* ======================HUMIDITY */}

                {/* ======================Pressure */}
                <View style={styles.gradientView}>
                  <LinearGradient
                    colors={darkMode ? ['gray', 'grey'] : ['lightblue', 'skyblue']}
                    style={styles.details}>
                    <FontAwesome5 name='wind' size={26} color={'white'} />
                    <Text style={styles.weatherdetail}>{weatherData.main.pressure}</Text>
                    <Text style={styles.weatherText}>Pressure</Text>
                  </LinearGradient>
                </View>
                {/* ======================Pressure */}

                {/* ======================Wind Speed */}
                <View style={styles.gradientView}>
                  <LinearGradient
                    colors={darkMode ? ['gray', 'grey'] : ['lightblue', 'skyblue']}
                    style={styles.details}>
                    <MaterialIcons name='wind-power' size={26} color={'white'} />
                    <Text style={styles.weatherdetail}>{weatherData.wind.speed}m/s</Text>
                    <Text style={styles.weatherText}>Wind Speed</Text>
                  </LinearGradient>
                </View>
                {/* ======================Wind Speed */}
              </View>
            </ScrollView>
          </View>
        ) : null}
        
      </ScrollView>
    </View >
  );
};




export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.8,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  bgView: {
    width: width * 1,
    height: height * 0.5,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    overflow: 'hidden',
  },
  bg: {
    width: width * 1,
    height: width * 1,
    resizeMode: 'contain',
    position: 'relative',
  },
  input: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#e6f5fb',
    fontSize: 18,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderTopLeftRadius: 40,
    borderBottomLeftRadius: 40,
    height: 50,
    color: 'black',
  },
  searchIcon: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e6f5fb',
    borderTopRightRadius: 40,
    borderBottomRightRadius: 40,
  },
  weathercityText: {
    fontSize: 28,
    color: 'white',
    marginVertical: 20,
    alignSelf: 'center',
  },
  weatherContainer: {
  },
  weatherText: {
    fontSize: 14,
    color: 'white',
    fontWeight: '400',
  },
  weatherdetailContainer: {
    flexDirection: 'row',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginTop: 10,
  },
  details: {
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginHorizontal: 10,
    height: width * 0.4,
  },
  weatherDescription: {
    alignItems: 'center',
    borderRadius: 10,
    color: 'white'
  },
  weatherDescriptionText: {
    color: 'white',
  },
  weatherdetail: {
    color: 'white',
    fontSize: 16,
    marginTop: 4,
  },
  gradientView: {
    width: width * 0.4,
    marginBottom: 10,
    borderColor: 'none',
  },
  temp: {
    marginTop: 50,
    position: 'absolute',
    right: 20,
    top: 60,
  },
  tempText: {
    fontSize: width * 0.17,
    color: 'white'
  },
  date: {
    fontSize: width * 0.061,
    marginTop: 20,
    marginLeft: 20,
    color: 'white'
  },
  lightContainer: {
    backgroundColor: 'skyblue',
  },
  darkContainer: {
    backgroundColor: 'black',
  },
  toggleText: {
    fontSize: 18,
    color: 'gray',
  },
  modeBtn: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: '#e6f5fb',
    textAlign: 'center',
    borderRadius: 20,
    paddingVertical: 5,
    alignSelf: 'flex-start',
    marginTop: 5,
    paddingHorizontal: 20,
    marginLeft: '5%',

  },
  darkGradient: {
    backgroundColor: 'black',
  },
  lightGradient: {
    backgroundColor: 'gray',
  },
  day: {
    flexDirection: 'row',
    marginVertical: 10,
    width: width * 0.88,
    justifyContent: 'space-between',
    alignSelf: 'center',
    borderBottomColor: 'darkgray',
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
  },
  forecastContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
  forecastItem: {
  },
  outerView: {
    borderRadius: 10,
    backgroundColor: 'yellow',
    width: width * 0.93,
    alignSelf: 'center',
  },
  forcastDetails: {
    flexDirection: 'row',
  },
  text: {
    color: 'white',
  },
  text0: {
    color: 'white',
    width: width * 0.33,
  },
  toggleButton: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: '5%',
    fontSize: 20,
    color: 'white',
  }
})