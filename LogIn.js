import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Fragment,
  ImageBackground
} from "react-native";
import { Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import * as SQLite from "expo-sqlite";
const dbu = SQLite.openDatabase("Register1.db");
var length;

export default class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text_user: "",
      text_password: ""
    };
  }
  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      backgroundColor: "#267377"
    },

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
    ),
    headerTitle: () => <Text style={styles.text_header}>ลงชื่อเข้าใช้</Text>
  });
  CheckLogin = () => {
    const { text_user, text_password } = this.state;
    dbu.transaction(txu => {
      txu.executeSql(
        "select * from Register1 where User_U=? and Pass_U=?",
        [text_user, text_password],
        (txu, results) => {
          console.log(JSON.stringify(results));
          //ดูจำนวนที่ query ออกมาได้
          var len = results.rows.length;
          console.log("len:" + len);
          if (results.rows.length > 0) {
            this.props.navigation.navigate("choice");
          }
        }
      );
    });
  };
  checkRegister = () => {
    if (length >= "1") {
      Alert.alert("ลงทะเบียนคนดูแลไปแล้ว");
    } else if (length == "0") {
      this.props.navigation.navigate("register");
    }
  };
  componentDidMount() {
    dbu.transaction(txu => {
      //   //อย่าลืมลบออก แค่แสดงชั่วคราว
      txu.executeSql("select * from Register1 ", [], (txu, results) => {
        console.log(JSON.stringify(results));
        length = results.rows.length;
        console.log(">>>" + length);
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.user_icon}
          resizeMode="stretch"
          source={require("./img/elder4.jpg")}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 200
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 55,
                color: "white",
                marginBottom: 35
              }}
            >
              ล็อกอิน
            </Text>
            <Input
              style={{ marginTop: 50 }}
              placeholder="  กรุณากรอกชื่อผู้ใช้..."
              placeholderTextColor="#a4b3ac" //เปลี่ยนสี placeholder
              leftIcon={<Icon name="user" size={25} color="#60bc71" />}
              onChangeText={text_user => this.setState({ text_user })}
            />
            <View style={{ margin: 10 }}></View>
            <Input
              // style={{color:"white",font}}
              placeholder="  กรุณาใส่รหัสผ่าน..."
              placeholderTextColor="#a4b3ac"
              secureTextEntry={true}
              leftIcon={<Icon name="lock" size={25} color="#60bc71" />}
              onChangeText={text_password => this.setState({ text_password })}
            />
            <TouchableOpacity onPress={this.checkRegister}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  alignContent: "flex-start",
                  marginLeft: 260
                }}
              >
                <Text style={{ color: "white", fontSize: 15, marginTop: 14 }}>
                  ลงทะเบียนคนดูแล
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.CheckLogin}>
              <View
                style={{
                  width: 180,
                  height: 50,
                  borderRadius: 20,
                  backgroundColor: "#d7a46f",
                  marginTop: 14,
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Text
                  style={{ fontSize: 24, fontWeight: "bold", color: "#FFFFFF" }}
                >
                  ตกลง
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
// {this.state.text_user} เวลาเรียกใช้ state
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  user_icon: {
    flex: 1,
    width: undefined,
    height: undefined
  },
  text_header: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 20,
    flexDirection: "row",
    alignItems: "center",
    fontWeight: "bold",
    justifyContent: "center",
    marginLeft: 20
  },
  view_card: {
    flex: 1,
    width: 150,
    height: 500,
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    margin: 20,
    alignItems: "center"
  },
  title: {
    color: "#000000",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20
  },
  login_btn: {
    width: 200,
    height: 50,
    borderRadius: 50,
    backgroundColor: "#60bc71",
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center"
  },
  register: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-between"
  }
});
