import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert
} from "react-native";
import { Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import * as SQLite from "expo-sqlite";
const dbu = SQLite.openDatabase("Register1.db");
export default class Register extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      backgroundColor: "#415b89"
    }
  });
  constructor(props) {
    super(props);
    this.state = {
      id_u: "",
      name_u: "",
      sur_u: "",
      tel_u: "",
      relation: "",
      user_u: "",
      pass_u: ""
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
    headerTitle: () => <Text style={styles.text_header}>ลงทะเบียนผู้ดูแล</Text>
  });
  addRegister = () => {
    const { name_u, sur_u, tel_u, relation, user_u, pass_u } = this.state;
    if (
      name_u == "" &&
      sur_u == "" &&
      tel_u == "" &&
      relation == "" &&
      user_u == "" &&
      pass_u == ""
    ) {
      Alert.alert("กรุณากรอกข้อมูล");
    } else {
      if (name_u) {
        if (sur_u) {
          if (tel_u) {
            if (relation) {
              if (user_u) {
                if (pass_u) {
                  dbu.transaction(txu => {
                    txu.executeSql(
                      "insert into Register1(Name_U ,Sur_U ,Tel_U ,Relation ,User_U ,Pass_U ) values (?,?,?,?,?,?)",
                      [name_u, sur_u, tel_u, relation, user_u, pass_u],
                      (txu, results) => {
                        console.log(JSON.stringify(results));
                        // console.log("length " + results.rowsAffected);
                        if (results.rowsAffected > 0) {
                          Alert.alert("Success Register");
                          this.props.navigation.navigate("choice");
                        }
                      }
                    );
                    // อย่าลืมลบออก แค่แสดงชั่วคราว
                    //   txu.executeSql("select * from Register1 ", [], (txu, results) => {
                    //     console.log(JSON.stringify(results));
                    //     //ดูจำนวนที่ query ออกมาได้
                    //     //var len = results.rows.length;
                    //     //console.log("len:" + len);
                    //   });
                    // });
                    // ทดลองลบข้อมูล
                    // txu.executeSql(
                    //   "delete from Register1 where User_U=? ",
                    //   ["pokas"],
                    //   (txu, results) => {
                    //     console.log(JSON.stringify(results));
                    //   }
                    // );
                  });
                } else {
                  Alert.alert("กรุณาตั้งรหัสผ่าน (Password)");
                }
              } else {
                Alert.alert("กรุณาตั้งบัญชีผู้ใช้ (User))");
              }
            } else {
              Alert.alert("กรุณาใส่เบอร์โทรศัพท์");
            }
          } else {
            Alert.alert("กรุณาใส่ความสัมพันธ์ของท่านกับผู้ป่วย");
          }
        } else {
          Alert.alert("กรุณาใส่นามสกุลผู้ดูแล");
        }
      } else {
        Alert.alert("กรุณาใส่ชื่อผู้ดูแล");
      }
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.user_icon}
          resizeMode="stretch"
          source={require("./img/elder7.png")}
        />
        <Text style={styles.titlere}>ลงทะเบียนผู้ดูแล</Text>
        {/* <Text style={styles.title}>กรูณากรอกข้อมูลผู้ดูแล</Text> */}
        <Input
          placeholder="    กรุณากรอกชื่อผู้ดูแล"
          leftIcon={<Icon name="user-plus" size={26} color="#60bc71" />}
          placeholderTextColor="#a4b3ac"
          editable
          maxLength={20}
          onChangeText={name_u => this.setState({ name_u })}
        />
        <View style={{ marginBottom: 5 }}></View>
        <Input
          placeholder="    กรุณากรอกนามสกุลผู้ดูแล."
          leftIcon={<Icon name="user-plus" size={26} color="#60bc71" />}
          placeholderTextColor="#a4b3ac"
          editable
          maxLength={20}
          onChangeText={sur_u => this.setState({ sur_u })}
        />
        <View style={{ marginBottom: 5 }}></View>
        <Input
          placeholder="    กรุณากรอกเบอร์ติดต่อ"
          leftIcon={<Icon name="phone" size={25} color="#60bc71" />}
          placeholderTextColor="#a4b3ac"
          keyboardType={"numeric"}
          editable
          maxLength={10}
          onChangeText={tel_u => this.setState({ tel_u })}
        />
        <View style={{ marginBottom: 5 }}></View>
        <Input
          placeholder="    ความสัมพันธ์กับผู้ป่วย"
          leftIcon={<Icon name="heart" size={25} color="#60bc71" />}
          placeholderTextColor="#a4b3ac"
          onChangeText={relation => this.setState({ relation })}
        />
        <View style={{ marginBottom: 5 }}></View>
        <Input
          placeholder="    ตั้งชื่อผู้ใช้ (User)"
          leftIcon={<Icon name="user" size={25} color="#60bc71" />}
          placeholderTextColor="#a4b3ac"
          editable
          maxLength={20}
          onChangeText={user_u => this.setState({ user_u })}
        />
        <View style={{ marginBottom: 5 }}></View>
        <Input
          placeholder="    ตั้งรหัสผ่าน (Password)"
          leftIcon={<Icon name="lock" size={25} color="#60bc71" />}
          placeholderTextColor="#a4b3ac"
          editable
          maxLength={30}
          onChangeText={pass_u => this.setState({ pass_u })}
        />
        <TouchableOpacity onPress={this.addRegister}>
          <View style={styles.login_btn}>
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 21,
                fontWeight: "bold",
                fontWeight: "bold"
              }}
            >
              ยืนยันข้อมูล
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2d4f56",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  view_card: {
    flex: 1,
    backgroundColor: "#2d4f56",
    borderRadius: 40,
    margin: 20,
    alignItems: "center"
  },
  user_icon: {
    width: 250,
    height: 250,
    marginTop: -13
    // marginBottom: 20
    //backgroundColor: "#415b89"
  },
  text_header: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 20,
    flexDirection: "row",
    alignItems: "center",
    fontWeight: "bold",
    justifyContent: "center"
    //marginLeft: 120
  },
  title: {
    color: "#be8a59",
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 10
  },
  titlere: {
    color: "#FFFFFF",
    fontSize: 45,
    fontWeight: "bold",
    marginTop: -12,
    marginBottom: 15
  },
  login_btn: {
    width: 196,
    height: 55,
    borderRadius: 50,
    backgroundColor: "#d7a46f",
    marginTop: 25,
    alignItems: "center",
    justifyContent: "center"
  }
});
