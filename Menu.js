import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
export default class Menu extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      backgroundColor: "#267377"
    },
    headerTitle: () => (
      <Text style={styles.text_header}>เลือกรายการที่ต้องการ</Text>
    )
  });
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("detail_p");
          }}
        >
          <View style={{ marginTop: 10 }}>
            <Image
              resizeMode="stretch"
              style={styles.picture}
              source={require("./img/myprofile2.jpg")}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("drugdetail");
          }}
        >
          <View style={{ marginTop: 10 }}>
            <Image
              resizeMode="stretch"
              style={styles.picture}
              source={require("./img/medication2.jpg")}
            />
          </View>
        </TouchableOpacity>

        {/* <View style={{ marginTop: 10 }}>
          <Image
            resizeMode="stretch"
            style={styles.picture}
            source={require("./img/photo2.jpg")}
          />
        </View> */}

        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("activitydetail");
          }}
        >
          <View style={{ marginTop: 10 }}>
            <Image
              resizeMode="stretch"
              style={styles.picture}
              source={require("./img/activity2.jpg")}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("photodetail");
          }}
        >
          <View style={{ marginTop: 10 }}>
            <Image
              resizeMode="stretch"
              style={styles.picture}
              source={require("./img/game2.jpg")}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#4ab3ac"
  },
  picture: {
    width: undefined,
    height: 127,
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10
  },
  text_header: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 20,
    flexDirection: "column",
    alignItems: "center",
    fontWeight: "bold",
    justifyContent: "center",
    marginLeft: 30
  }
});
