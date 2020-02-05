import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  ImageBackground,
  Image
} from "react-native";
import { Card } from "react-native-elements";
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("Activity.db");

export default class Detail_A extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text_id: this.props.navigation.state.params.text_id,
      name_activity: " ",
      property_activity: " ",
      date_activity: "",
      time_activity: "",
      place_activity: " ",
      placeeqi_activity: " ",
      note_activity: " "
    };
  }
  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      backgroundColor: "#267377"
    },
    headerTitle: () => (
      <Text style={styles.text_header}>รายละเอียดการทำกิจกรรม</Text>
    )
  });
  componentWillMount() {
    const { text_id } = this.state;
    db.transaction(tx => {
      tx.executeSql(
        "select * from Activity where Id_A=?",
        [text_id],
        (tx, results) => {
          console.log(JSON.stringify(results));
          var len = results.rows.length;
          console.log("lenght =", len);
          //setstate ต่างๆที่อ่านมาจาก Database
          if (len > 0) {
            this.setState({
              text_id: results.rows.item(0).Id_A
            });
            this.setState({
              name_activity: results.rows.item(0).Name_A
            });
            this.setState({
              property_activity: results.rows.item(0).Property_A
            });
            this.setState({
              date_activity: results.rows.item(0).Date_A
            });
            this.setState({
              time_activity: results.rows.item(0).Time_A
            });
            this.setState({
              place_activity: results.rows.item(0).Place_A
            });
            this.setState({
              placeeqi_activity: results.rows.item(0).Device_A
            });
            this.setState({
              note_activity: results.rows.item(0).Note_A
            });
            console.log("id=", this.state.name_activity);
            console.log("name MED=", results.rows.item(0).Name_A);
          } else {
            alert("No user found");
          }
        }
      );
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          style={{ flex: 1, width: undefined, height: undefined }}
          resizeMode="stretch"
          source={require("./img/back_a.png")}
        >
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Text
                style={{
                  fontSize: 38,
                  fontWeight: "bold",
                  marginTop: 15,
                  marginBottom: 10,
                  color: "#f2af7a"
                }}
              >
                อย่าลืมทำกิจกรรม!!!
              </Text>
            </View>

            {/* 1 */}
            <View
              style={{
                flexDirection: "column",
                backgroundColor: "#a4b3ac",
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
                  ชื่อกิจกรรม -{" "}
                </Text>
                <Text style={{ fontSize: 29, color: "black" }}>
                  {this.state.name_activity}
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{ fontSize: 29, color: "#1f3526", fontWeight: "bold" }}
                >
                  {" "}
                  ลักษณะ -{" "}
                </Text>
                <Text style={{ fontSize: 29, color: "black" }}>
                  {this.state.property_activity}
                </Text>
              </View>
            </View>
            {/* 2 */}
            <View
              style={{
                flexDirection: "column",
                backgroundColor: "#a4b3ac",
                margin: 15,
                padding: 20,
                width: undefined,
                height: 105,
                borderRadius: 10,
                justifyContent: "center",
                marginTop: -1
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{ fontSize: 29, color: "#1f3526", fontWeight: "bold" }}
                >
                  {" "}
                  เวลาที่ทำ -{" "}
                </Text>
                <Text style={{ fontSize: 29, color: "black" }}>
                  {this.state.time_activity}
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{ fontSize: 29, color: "#1f3526", fontWeight: "bold" }}
                >
                  {" "}
                  สถานที่ทำ -{" "}
                </Text>
                <Text style={{ fontSize: 29, color: "black" }}>
                  {this.state.place_activity}
                </Text>
              </View>
            </View>
            {/* 3 */}
            <View
              style={{
                flexDirection: "column",
                backgroundColor: "#a4b3ac",
                margin: 15,
                padding: 11,
                width: undefined,
                height: 105,
                borderRadius: 10,
                justifyContent: "center",
                marginTop: -1
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{ fontSize: 29, color: "#1f3526", fontWeight: "bold" }}
                >
                  {" "}
                  ที่เก็บอุปกรณ์ -{" "}
                </Text>
                <Text style={{ fontSize: 29, color: "black" }}>
                  {this.state.placeeqi_activity}
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
                  {this.state.note_activity}
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>

      // <ScrollView>
      //   {/* <Text> {this.state.text_id} </Text> */}
      //   <View style={{ flex: 1, flexDirection: "column" }}>
      //     <View style={{ backgroundColor: "yellow" }}>
      //       <Text style={{ fontSize: 24, fontWeight: "bold" }}> ชื่อยา : </Text>
      //       <Card>
      //         <Text style={{ fontSize: 28, fontWeight: "normal" }}>
      //           {this.state.name_medication}
      //         </Text>
      //       </Card>
      //     </View>
      //   </View>

      //   <View style={{ backgroundColor: "#60bc71" }}>
      //     <Text style={{ fontSize: 24, fontWeight: "bold" }}>สรรพคุณยา :</Text>
      //     <Card>
      //       <Text style={{ fontSize: 28, fontWeight: "normal" }}>
      //         {this.state.property_medication}
      //       </Text>
      //     </Card>
      //   </View>
      //   <View style={{ backgroundColor: "#60bc71" }}>
      //     <Text style={{ fontSize: 24, fontWeight: "bold" }}>
      //       วันที่ต้องทานยา :
      //     </Text>
      //     <Card>
      //       <Text style={{ fontSize: 28, fontWeight: "normal" }}>
      //         {this.state.date_medication}
      //       </Text>
      //     </Card>
      //   </View>
      //   <View style={{ backgroundColor: "#60bc71" }}>
      //     <Text style={{ fontSize: 24, fontWeight: "bold" }}>
      //       ช่วงเวลาทาน :
      //     </Text>
      //     <Card>
      //       <Text style={{ fontSize: 28, fontWeight: "normal" }}>
      //         {this.state.be_af}
      //       </Text>
      //     </Card>
      //   </View>

      //   <View style={{ backgroundColor: "#60bc71" }}>
      //     <Text style={{ fontSize: 24, fontWeight: "bold" }}>
      //       ระยะเวลาที่ต้องทานยา :
      //     </Text>
      //     <Card>
      //       <Text style={{ fontSize: 28, fontWeight: "normal" }}>{status}</Text>
      //     </Card>
      //   </View>
      //   <View style={{ backgroundColor: "#60bc71" }}>
      //     <Text style={{ fontSize: 24, fontWeight: "bold" }}>
      //       จำนวนเม็ดที่ต้องทาน :
      //     </Text>
      //     <Card>
      //       <Text style={{ fontSize: 28, fontWeight: "normal" }}>
      //         {this.state.count_medication}
      //       </Text>
      //     </Card>
      //   </View>
      //   <View style={{ backgroundColor: "#60bc71" }}>
      //     <Text style={{ fontSize: 24, fontWeight: "bold" }}>
      //       ที่เก็บตัวยา :
      //     </Text>
      //     <Card>
      //       <Text style={{ fontSize: 28, fontWeight: "normal" }}>
      //         {this.state.place_medication}
      //       </Text>
      //     </Card>
      //   </View>
      //   <View style={{ backgroundColor: "#60bc71" }}>
      //     <Text style={{ fontSize: 24, fontWeight: "bold" }}>
      //       คำอธิบายเพิ่มเติม :
      //     </Text>
      //     <Card>
      //       <Text style={{ fontSize: 28, fontWeight: "normal" }}>
      //         {this.state.note_medication}
      //       </Text>
      //     </Card>
      //   </View>
      // </ScrollView>
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
