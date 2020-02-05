import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Button,
  TouchableOpacity,
  Alert
} from "react-native";
import * as SQLite from "expo-sqlite";
import { Icon } from "react-native-elements";

const dba = SQLite.openDatabase("Activity.db");

export default class DetailActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text_id: this.props.navigation.state.params.text_id,
      name_activity: "",
      property_activity: "",
      date_activity: "",
      time_activity: "",
      place_activity: "",
      placeeqi_activity: "",
      note_activity: ""
    };
  }
  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      backgroundColor: "#5f9b9e"
    },
    headerTitle: () => (
      <Text style={styles.text_header}>รายละเอียดกิจกรรม</Text>
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
  componentWillMount() {
    const { text_id } = this.state;
    dba.transaction(tx => {
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

            // console.log("id=", this.state.name_medication);
            //console.log("name MED=", results.rows.item(0).Name);
          } else {
            alert("ไม่พบข้อมูล");
          }
        }
      );
    });
  }

  DeleteActivity = () => {
    const { goBack } = this.props.navigation;
    const { text_id } = this.state;
    dba.transaction(tx => {
      tx.executeSql(
        "Delete from Activity where Id_A=?",
        [text_id],
        (tx, results) => {
          console.log(JSON.stringify(results));
          if (results.rowsAffected > 0) {
            Alert.alert("ลบข้อมูลสำเร็จ");
          }
        }
      );
    });
    {
      this.props.navigation.navigate("choice");
    }
  };
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#be8a59" }}>
        {/* <Text> {this.state.text_id} </Text> */}
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            margin: 10
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
            source={require("./img/true_5.png")}
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
              ชื่อกิจกรรม :
            </Text>

            <Text style={{ fontSize: 20, color: "#000000", marginBottom: 10 }}>
              {this.state.name_activity}
            </Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <Text
              style={{ fontSize: 24, color: "#267377", fontWeight: "bold" }}
            >
              ลักษณะกิจกรรม :
            </Text>
            <Text style={{ fontSize: 20, color: "#000000", marginBottom: 10 }}>
              {this.state.property_activity}
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{ fontSize: 24, color: "#267377", fontWeight: "bold" }}
            >
              วันที่ทำกิจกรรม :
            </Text>
            <Text style={{ fontSize: 20, color: "#000000", marginBottom: 10 }}>
              {this.state.date_activity}
            </Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <Text
              style={{ fontSize: 24, color: "#267377", fontWeight: "bold" }}
            >
              เวลาทำกิจกรรม :
            </Text>
            <Text style={{ fontSize: 20, color: "#000000", marginBottom: 10 }}>
              {this.state.time_activity}
            </Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <Text
              style={{ fontSize: 24, color: "#267377", fontWeight: "bold" }}
            >
              สถานที่ทำกิจกรรม :
            </Text>
            <Text style={{ fontSize: 20, color: "#000000", marginBottom: 10 }}>
              {this.state.place_activity}
            </Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <Text
              style={{ fontSize: 24, color: "#267377", fontWeight: "bold" }}
            >
              สถานที่เก็บอุปกรณ์ :
            </Text>
            <Text style={{ fontSize: 20, color: "#000000", marginBottom: 10 }}>
              {this.state.placeeqi_activity}
            </Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <Text
              style={{ fontSize: 24, color: "#267377", fontWeight: "bold" }}
            >
              คำอธิบายกิจกรรม :
            </Text>
            <Text style={{ fontSize: 20, color: "#000000", marginBottom: 30 }}>
              {this.state.note_activity}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("editactivity", {
                text_id: this.state.text_id,
                name_activity: this.state.name_activity,
                property_activity: this.state.property_activity,
                date_activity: this.state.date_activity,
                time_activity: this.state.time_activity,
                place_activity: this.state.place_activity,
                placeeqi_activity: this.state.placeeqi_activity,
                note_activity: this.state.note_activity
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
                <Icon name="pencil" type="evilicon" color="#d7a46f" size={50} />
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

          <TouchableOpacity onPress={this.DeleteActivity}>
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
                <Icon name="trash" type="evilicon" color="#d7a46f" size={50} />
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
