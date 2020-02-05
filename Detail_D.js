import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ImageBackground,
  Image
} from "react-native";
import { Card, Icon } from "react-native-elements";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { ScrollView } from "react-native-gesture-handler";
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("Drug.db");
var status;

export default class Detail_D extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.navigation.state.params.text_id,
      text_id: this.props.navigation.state.params.text_id,
      name_medication: "",
      property_medication: "",
      date_medication: "",
      be_af: "",
      mor_bed: "",
      count_medication: "",
      place_medication: "",
      note_medication: ""
    };
  }

  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      backgroundColor: "#267377"
    },
    headerTitle: () => (
      <Text style={styles.text_header}>รายละเอียดการทานยา</Text>
    )
  });
  componentDidMount() {
    const { id } = this.state;
    db.transaction(tx => {
      tx.executeSql("select * from Drug where Id=?", [id], (tx, results) => {
        console.log(JSON.stringify(results));
        var len = results.rows.length;
        console.log("lenght =", len);
        //setstate ต่างๆที่อ่านมาจาก Database
        if (len > 0) {
          this.setState({
            text_id: results.rows.item(0).Id
          });
          this.setState({
            name_medication: results.rows.item(0).Name
          });
          this.setState({
            property_medication: results.rows.item(0).Property
          });
          this.setState({
            date_medication: results.rows.item(0).Date_Med
          });
          this.setState({
            be_af: results.rows.item(0).Eat
          });
          this.setState({
            mor_bed: results.rows.item(0).Eat_Time
          });
          this.setState({
            count_medication: results.rows.item(0).Count
          });
          this.setState({
            place_medication: results.rows.item(0).Place
          });
          this.setState({
            note_medication: results.rows.item(0).Note_Med
          });

          console.log("id=", this.state.name_medication);
          console.log("name MED=", results.rows.item(0).Name);
        } else {
          alert("ไม่พบข้อมูล");
        }
      });
    });
  }
  checkTime = () => {
    const { sta, mor_bed } = this.state;
    console.log("checktime is worked" + mor_bed);

    if (mor_bed == "1") {
      status = "ทานช่วงเช้า";
    } else if (mor_bed == "2") {
      status = "ทานช่วงกลางวัน";
    } else if (mor_bed == "3") {
      status = "ทานช่วงเย็น";
    } else {
      status = "ทานช่วงก่อนนอน";
    }
  };

  render() {
    this.checkTime();
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          style={{ flex: 1, width: undefined, height: undefined }}
          resizeMode="stretch"
          source={require("./img/back_detail_d.png")}
        >
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Text
                style={{
                  fontSize: 42,
                  fontWeight: "bold",
                  marginTop: 15,
                  marginBottom: 10
                }}
              >
                อย่าลืมทานยา!!!
              </Text>
            </View>

            {/* 1 */}
            <View
              style={{
                flexDirection: "column",
                backgroundColor: "#f2af7a",
                margin: 15,
                padding: 20,
                width: undefined,
                height: 105,
                borderRadius: 10,
                justifyContent: "center"
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{ fontSize: 29, color: "#1f3526", fontWeight: "bold" }}
                >
                  {" "}
                  ชื่อยา -{" "}
                </Text>
                <Text style={{ fontSize: 29, color: "black" }}>
                  {this.state.name_medication}
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{ fontSize: 29, color: "#1f3526", fontWeight: "bold" }}
                >
                  {" "}
                  สรรพคุณ -{" "}
                </Text>
                <Text style={{ fontSize: 29, color: "black" }}>
                  {this.state.property_medication}
                </Text>
              </View>
            </View>
            {/* 2 */}
            <View
              style={{
                flexDirection: "column",
                backgroundColor: "#f2af7a",
                margin: 15,
                padding: 20,
                width: undefined,
                height: 140,
                borderRadius: 10,
                justifyContent: "center",
                marginTop: 6
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{ fontSize: 29, color: "#1f3526", fontWeight: "bold" }}
                >
                  {" "}
                  ช่วงเวลาทาน -{" "}
                </Text>
                <Text style={{ fontSize: 29, color: "black" }}>
                  {this.state.be_af}
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{ fontSize: 29, color: "#1f3526", fontWeight: "bold" }}
                >
                  {" "}
                  เวลา -{" "}
                </Text>
                <Text style={{ fontSize: 29, color: "black" }}>{status}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{ fontSize: 29, color: "#1f3526", fontWeight: "bold" }}
                >
                  {" "}
                  จำนวนที่ต้องทาน -{" "}
                </Text>
                <Text style={{ fontSize: 29, color: "black" }}>
                  {this.state.count_medication} เม็ด
                </Text>
              </View>
            </View>
            {/* 3 */}
            <View
              style={{
                flexDirection: "column",
                backgroundColor: "#f2af7a",
                margin: 15,
                padding: 20,
                width: undefined,
                height: 105,
                borderRadius: 10,
                justifyContent: "center",
                marginTop: 6
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{ fontSize: 29, color: "#1f3526", fontWeight: "bold" }}
                >
                  {" "}
                  ที่เก็บยา -{" "}
                </Text>
                <Text style={{ fontSize: 29, color: "black" }}>
                  {this.state.place_medication}
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{ fontSize: 29, color: "#1f3526", fontWeight: "bold" }}
                >
                  {" "}
                  เพิ่มเติม -{" "}
                </Text>
                <Text style={{ fontSize: 29, color: "black" }}>
                  {this.state.note_medication}
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  text_header: {
    flex: 1,
    fontSize: 22,
    color: "white",
    textShadowColor: "blue",
    flexDirection: "row",
    alignItems: "center",
    fontWeight: "bold",
    justifyContent: "center",
    flexDirection: "row",
    marginLeft: 3
  }
});
