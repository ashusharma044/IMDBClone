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
import { FlatList } from 'react-native-gesture-handler';
export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      isLoading: false,
      dataSource: [],
      error: null,
      refreshing: false
    };
  }
  makeRemoteRequest() {
    this.setState({
      isLoading: false
    });
    let url =
      'https://api.themoviedb.org/3/movie/popular?api_key=8f7fe35951982ef3b6237168e6231580&language=en-US&page=' +
      this.state.page;
    this.setState({ isLoading: true });
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
            dataSource:
              this.state.page == 1
                ? resp.results
                : [...this.state.dataSource, ...resp.results],
            error: resp.error || null,
            isLoading: false,
            refreshing: false
          });
        }
      })

      .catch(error => {
        console.warn(error);
        this.setState({
          error,
          isLoading: false
        });
      });
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }
  _renderItem = ({ item, index }) => (
    <Listing
      imageUri={item.poster_path}
      popularity={item.popularity}
      vote_average={item.vote_average}
      title={item.title}
      overview={item.overview}
      release_date={item.release_date}
      key={item.id}
    />
  );
  // handleReferesh = () => {
  //   this.setState({ page: 1, refreshing: true }, () => {
  //     this.makeRemoteRequest();
  //   });
  // };
  handleLoadMore = () => {
    this.setState({ page: this.state.page + 1 }, () => {
      this.makeRemoteRequest();
    });
  };
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
                <FlatList
                  data={this.state.dataSource}
                  renderItem={this._renderItem}
                  keyExtractor={(item, index) => item.title}
                  refreshing={this.state.refreshing}
                  onRefresh={this.handleReferesh}
                  onEndReached={this.handleLoadMore}
                  onEndReachedThreshold={0}
                />
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
