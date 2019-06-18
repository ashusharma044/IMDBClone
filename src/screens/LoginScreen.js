import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  TextInputProps,
  StyleSheet,
  Dimensions,
  ImageBackground,
  ActivityIndicator
} from 'react-native';
import * as images from '../assets/images';
const { width, height } = Dimensions.get('window');
import Listing from '../component/Explore/Listing';
import ListHeader from '../component/Explore/ListHeader';
export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
      isLoading: true,
      dataSource: [],
      error: null,
      hasMore: true
    };
  }
  componentDidMount() {
    this.setState({
      isLoading: false
    });
    let url =
      'https://api.themoviedb.org/3/movie/popular?api_key=8f7fe35951982ef3b6237168e6231580&language=en-US&page=' +
      this.state.count;
    return fetch(url)
      .then(response => response.text()) // Convert to text instead of res.json()
      .then(text => {
        return text;
      })
      .then(response => JSON.parse(response)) // Parse the text.
      .then(resp => {
        if (resp.total_results != '0') {
          this.setState({
            isLoading: false,
            dataSource: resp.results
          });
        }
      })

      .catch(error => {
        console.warn(error);
      });
  }
  render() {
    if (this.state.isLoading) {
      return (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <ActivityIndicator />
        </View>
      );
    } else {
      let ourData = this.state.dataSource.map((val, key) => {
        let Image_URL = {
          uri: 'https://image.tmdb.org/t/p/w500/' + val.poster_path
        };
        let popularity = val.popularity;
        let vote_average = val.vote_average;
        let title = val.title;
        let release_date = val.release_date;
        return (
          <Listing
            imageUri={Image_URL}
            popularity={popularity}
            vote_average={vote_average}
            title={title}
            release_date={release_date}
            key={key}
          />
        );
      });

      return (
        <View style={styles.container}>
          <ImageBackground
            source={images.img.background}
            style={{
              width: '100%',
              height: '100%'
            }}
          >
            <ScrollView
              style={styles.mainWrapper}
              showsHorizontalScrollIndicator={false}
            >
              <View
                style={{
                  marginTop: 20
                }}
              >
                {/* <ListHeader name='My List' /> */}
                <ScrollView
                  scrollEventThrottle={16}
                  contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: 'space-around'
                  }}
                >
                  {ourData}
                </ScrollView>
              </View>
            </ScrollView>
            <View style={styles.secondWrapper} />
          </ImageBackground>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
    //padding: 20
  },
  mainWrapper: {},
  secondWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  sliderImg: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover'
  }
});
