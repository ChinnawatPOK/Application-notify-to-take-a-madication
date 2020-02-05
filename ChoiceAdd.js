import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Button,
  TouchableOpacity,
  StyleSheet,
  Alert
} from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import * as SQLite from "expo-sqlite";
const dbu = SQLite.openDatabase("Profile.db");
var length;

export default class ChoiceAdd extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      backgroundColor: "#267377"
    },
    headerTitle: () => (
      <Text style={styles.text_header}>รายละเอียดการแจ้งเตือน</Text>
    ),
    headerRight: () => (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("homee");
        }}
      >
        <Image
          style={{ width: 30, height: 30, marginRight: 8 }}
          source={require("./img/home.png")}
        />
      </TouchableOpacity>
    )
  });
  check = () => {
    dbu.transaction(txu => {
      //   //อย่าลืมลบออก แค่แสดงชั่วคราว
      txu.executeSql("select * from Profile ", [], (txu, results) => {
        console.log(JSON.stringify(results));
        length = results.rows.length;
        console.log(">>>" + length);
      });
    });

    if (length >= "1") {
      //this.props.navigation.navigate("choice");
      Alert.alert("ท่านกรอกข้อมูลไปแล้ว");
    } else if (length == "0") {
      this.props.navigation.navigate("profileadd");
    }
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <TouchableOpacity onPress={this.check}>
            <View style={{ marginTop: 20 }}>
              <Image
                resizeMode="stretch"
                style={styles.image}
                source={require("./img/btn_1.jpg")}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("activityshow");
            }}
          >
            <View style={{ marginTop: 15 }}>
              <Image
                resizeMode="stretch"
                style={styles.image}
                source={require("./img/btn_3.jpg")}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("drugshow");
            }}
          >
            <View style={{ marginTop: 15 }}>
              <Image
                resizeMode="stretch"
                style={styles.image}
                source={require("./img/btn_2.jpg")}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("photoshow");
            }}
          >
            <View style={{ marginTop: 15 }}>
              <Image
                resizeMode="stretch"
                style={styles.image}
                source={require("./img/picc_3.jpg")}
              />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#5f9b9e"
  },
  image: {
    width: undefined,
    height: 180,
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10
  },
  text_header: {
    flex: 1,
    fontSize: 22,
    color: "#FFFFFF",
    textShadowColor: "blue",
    flexDirection: "row",
    alignItems: "center",
    fontWeight: "bold",
    justifyContent: "center",
    flexDirection: "row",
    marginLeft: 3
  }
});
