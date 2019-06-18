import React, { Component } from 'react';
import { Text, View, Image, Dimensions } from 'react-native';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
import Moment from 'moment';
import ProgressCircle from 'react-native-progress-circle';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
export default class category extends Component {
  kFormatter = num => {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + 'k'
      : Math.sign(num) * Math.abs(num);
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          marginHorizontal: 10,
          width: screenWidth - 20,
          height: screenHeight - 620,
          justifyContent: 'flex-start',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          marginVertical: 10,
          shadowColor: '#000',
          alignItems: 'flex-start',
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          overflow: 'hidden',
          shadowOffset: {
            width: 1,
            height: 3
          },
          shadowOpacity: 0.6,
          shadowRadius: 5,

          elevation: 17
        }}
      >
        <View
          style={{
            width: screenWidth - 250,
            height: screenHeight - 640,
            maxHeight: screenHeight - 640,
            maxWidth: screenWidth - 250,
            borderWidth: 1,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            marginLeft: 10,
            marginTop: 10,
            marginRight: 10,
            marginBottom: 10,
            borderColor: '#bfbfbf',
            overflow: 'hidden'
          }}
        >
          <Image
            source={this.props.imageUri}
            style={{
              flex: 1,
              width: null,
              height: null,
              resizeMode: 'cover'
            }}
          />
        </View>
        <View
          style={{
            paddingVertical: 10,
            paddingHorizontal: 5,
            flex: 1,
            flexDirection: 'column'
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start'
            }}
          >
            <ProgressCircle
              percent={Math.floor(this.props.vote_average * 10)}
              radius={20}
              borderWidth={4}
              color='#f00'
              shadowColor='#999'
              bgColor='#fff'
            >
              <Text
                style={{
                  fontSize: 8,
                  fontWeight: 'bold'
                }}
              >
                {Math.floor(this.props.vote_average * 10)}%
              </Text>
            </ProgressCircle>

            <Text
              style={{
                color: '#fff',
                width: screenWidth / 2 - 30,
                paddingLeft: 5,
                paddingRight: 5,
                fontSize: 14,
                fontWeight: 'bold'
              }}
              numberOfLines={4}
            >
              {this.props.title}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-end'
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'flex-end',
                color: '#fff'
              }}
            >
              <Text
                style={{
                  justifyContent: 'flex-start',
                  color: '#f00',
                  marginVertical: 5,
                  fontWeight: 'bold'
                }}
              >
                Release Date
              </Text>
              <Text
                style={{
                  justifyContent: 'flex-start',
                  color: '#fff',
                  fontWeight: 'bold'
                }}
              >
                {Moment(this.props.release_date).format('MMM d, YYYY')}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'center',
                color: '#fff'
              }}
            >
              <Text
                style={{
                  justifyContent: 'flex-start',
                  color: '#fff',
                  marginVertical: 5
                }}
              >
                <Icon name='thumbs-up' size={24} color='#66ff33' />
              </Text>
              <Text
                style={{
                  justifyContent: 'flex-start',
                  color: '#fff',
                  fontWeight: 'bold'
                }}
              >
                {this.kFormatter(this.props.popularity * 1000)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
