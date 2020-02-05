import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ImageBackground
} from "react-native";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("Image3.db");
const { width: screenWidth } = Dimensions.get("window");

export default class PhotoDetail extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      backgroundColor: "#267377"
    },
    headerTitle: () => (
      <Text style={{ fontSize: 26, color: "#FFFFFF", fontWeight: "bold" }}>
        คนในครอบครัวของคุณ
      </Text>
    )
  });
  constructor(props) {
    super(props);
    this.state = { name: "", relation: "", image: "" };
  }
  componentWillMount() {
    const { name, relation, image } = this.state;

    db.transaction(tx => {
      tx.executeSql("select * from Image4", [], (tx, results) => {
        console.log(JSON.stringify(results));
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        this.setState({
          FlatListItems: temp
        });
      });
    });
  }

  _renderItem({ item, index }, parallaxProps) {
    return (
      <View>
        <View style={styles.item}>
          {/* <View style={{ marginBottom: 10 }}> */}
          <ParallaxImage
            source={{ uri: item.Image }}
            containerStyle={styles.imageContainer}
            style={styles.image}
            parallaxFactor={0}
            {...parallaxProps}
          />
          <View
            style={{
              backgroundColor: "#a4b3ac",
              borderRadius: 10,
              padding: 10,
              margin: 10,
              alignItems: "center"
            }}
          >
            <Text style={styles.title1}>{item.Nickname}</Text>
            <Text style={styles.title}>{item.Relation}</Text>
          </View>
        </View>
        {/* <Text style={{ color: "#FFFFFF", fontSize: 20 }}>เลื่อนเพื่อชมภาพ</Text> */}
      </View>
    );
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: "#2d4f56",
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {/* <Text style={{ color: "#be8a59", fontSize: 30,marginTop:25,fontWeight:"bold" }}> เลื่อนเพื่อชมภาพ </Text> */}
        <ImageBackground
          style={{ flex: 1 }}
          resizeMode="stretch"
          source={require("./img/back_pro1.png")}
        >
          <Carousel
            sliderWidth={screenWidth}
            sliderHeight={screenWidth}
            itemWidth={screenWidth - 60}
            data={this.state.FlatListItems}
            renderItem={this._renderItem}
            hasParallaxImages={true}
          />
          {/* <Text style={{ color: "#FFFFFF", fontSize: 30 }}>เลื่อนเพื่อชมภาพ</Text> */}
        </ImageBackground>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d7a46f",
    flexDirection: "column",
    marginBottom: 20
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: "white",
    borderRadius: 1
  },
  item: {
    // width: screenWidth - 60,
    width: undefined,
    height: 450,
    backgroundColor: "#be8a59",
    borderRadius: 20,
    padding: 10,
    marginTop: 20
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover"
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#000000",
    marginTop: -10
  },
  title1: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#000000"
  }
});
