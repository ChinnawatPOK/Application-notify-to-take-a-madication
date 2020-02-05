import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Button,
  Alert
} from "react-native";
import { createAppContainer } from "react-navigation";
import { Icon } from "react-native-elements";
import { createStackNavigator } from "react-navigation-stack";
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("Drug.db");
var status;

export default class DetailDrug extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      backgroundColor: "#5f9b9e"
    },
    headerTitle: () => <Text style={styles.text_header}>รายละเอียดยา</Text>,
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
  componentDidMount() {
    const { text_id } = this.state;
    db.transaction(tx => {
      tx.executeSql(
        "select * from Drug where Id=?",
        [text_id],
        (tx, results) => {
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
        }
      );
    });
  }

  DeleteData = () => {
    const { goBack } = this.props.navigation;
    const { text_id } = this.state;
    db.transaction(tx => {
      tx.executeSql("Delete from Drug where Id=?", [text_id], (tx, results) => {
        console.log(JSON.stringify(results));
        if (results.rowsAffected > 0) {
          Alert.alert("ลบข้อมูลสำเร็จ");
        }
      });
    });
    {
      this.props.navigation.navigate("choice");
    }
  };
  checkTime = () => {
    const { mor_bed } = this.state;
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
      <ScrollView>
        <View style={{ flex: 1, backgroundColor: "#be8a59" }}>
          {/* <Text> {this.state.text_id} </Text> */}
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              marginTop: 5,
              marginBottom: 20
            }}
          >
            <Image
              //resizeMode="stretch"
              style={{
                width: 150,
                height: 150,
                borderRadius: 75,
                alignItems: "center"
              }}
              source={require("./img/med.png")}
            />
          </View>
          <View
            style={{
              backgroundColor: "#FFFFFF",
              padding: 20,
              borderRadius: 10,
              marginBottom: 6
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{ fontSize: 24, color: "#267377", fontWeight: "bold" }}
              >
                ชื่อยา :
              </Text>
              <Text style={{ fontSize: 20, marginBottom: 10 }}>
                {this.state.name_medication}
              </Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text
                style={{ fontSize: 24, color: "#267377", fontWeight: "bold" }}
              >
                สรรพคุณยา :
              </Text>
              <Text style={{ fontSize: 20, marginBottom: 10 }}>
                {this.state.property_medication}
              </Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text
                style={{ fontSize: 24, color: "#267377", fontWeight: "bold" }}
              >
                วันที่ต้องทานยา :
              </Text>
              <Text style={{ fontSize: 20, marginBottom: 10 }}>
                {this.state.date_medication}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{ fontSize: 24, color: "#267377", fontWeight: "bold" }}
              >
                ช่วงเวลาที่ต้องทาน :
              </Text>

              <Text style={{ fontSize: 20, marginBottom: 10 }}>
                {this.state.be_af}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{ fontSize: 24, color: "#267377", fontWeight: "bold" }}
              >
                ระยะเวลาที่ต้องทาน :
              </Text>

              <Text style={{ fontSize: 20, marginBottom: 10 }}> {status}</Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text
                style={{ fontSize: 24, color: "#267377", fontWeight: "bold" }}
              >
                จำนวนเม็ดที่ต้องทาน :
              </Text>

              <Text style={{ fontSize: 20, marginBottom: 10 }}>
                {this.state.count_medication}
              </Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text
                style={{ fontSize: 24, color: "#267377", fontWeight: "bold" }}
              >
                ที่เก็บตัวยา :
              </Text>
              <Text style={{ fontSize: 20, marginBottom: 10 }}>
                {this.state.place_medication}
              </Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text
                style={{ fontSize: 24, color: "#267377", fontWeight: "bold" }}
              >
                คำอธิบายเพิ่มเติม :
              </Text>
              <Text style={{ fontSize: 20, marginBottom: 20 }}>
                {this.state.note_medication}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("editdrug", {
                  text_id: this.state.text_id,
                  name_medication: this.state.name_medication,
                  property_medication: this.state.property_medication,
                  date_medication: this.state.date_medication,
                  be_af: this.state.be_af,
                  mor_bed: this.state.mor_bed,
                  count_medication: this.state.count_medication,
                  place_medication: this.state.place_medication,
                  note_medication: this.state.note_medication
                });
              }}
            >
              <View
                style={{
                  marginTop: 10,
                  borderRadius: 30,
                  width: 50,
                  backgroundColor: "#be8a59"
                }}
              />

              <View style={{ alignItems: "center" }}>
                <View
                  style={{
                    backgroundColor: "#267377",
                    width: 300,
                    height: 60,
                    borderRadius: 20,
                    padding: 15,
                    marginLeft: 15,
                    marginRight: 15,
                    marginBottom: 15,
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "center"
                  }}
                >
                  <Icon
                    name="pencil"
                    type="evilicon"
                    color="#d7a46f"
                    size={50}
                  />
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 24,
                      color: "#FFFFFF"
                    }}
                  >
                    แก้ไขรายการ
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.DeleteData}>
              <View
                style={{
                  marginTop: 5,
                  borderRadius: 30,
                  width: 50,
                  backgroundColor: "#be8a59"
                }}
              />

              <View style={{ alignItems: "center" }}>
                <View
                  style={{
                    backgroundColor: "#267377",
                    width: 300,
                    height: 60,
                    borderRadius: 20,
                    padding: 15,
                    marginLeft: 15,
                    marginRight: 15,
                    marginBottom: 15,
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "center"
                  }}
                >
                  <Icon
                    name="trash"
                    type="evilicon"
                    color="#d7a46f"
                    size={50}
                  />
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 24,
                      color: "#FFFFFF"
                    }}
                  >
                    ลบรายการ
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
