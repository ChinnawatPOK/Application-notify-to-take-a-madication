import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  Alert,
  Image,
  TouchableOpacity
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Input, Icon } from "react-native-elements";
import DatePicker from "react-native-datepicker";
import * as SQLite from "expo-sqlite";
const dba = SQLite.openDatabase("Activity.db");

export default class EditActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text_id: this.props.navigation.state.params.text_id,
      name_activity: this.props.navigation.state.params.name_activity,
      property_activity: this.props.navigation.state.params.property_activity,
      date_activity: this.props.navigation.state.params.date_activity,
      time_activity: this.props.navigation.state.params.time_activity,
      place_activity: this.props.navigation.state.params.place_activity,
      placeeqi_activity: this.props.navigation.state.params.placeeqi_activity,
      note_activity: this.props.navigation.state.params.note_activity
    };
  }
  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      backgroundColor: "#5f9b9e"
    },
    headerTitle: () => (
      <Text style={styles.text_header}>แก้ไขข้อมูลกิจกรรม</Text>
    )
  });
  TextChange = (text, field) => {
    const state = this.state;
    state[field] = text;
    this.setState(state);
    console.log(this.state.time_activity);
    console.log(this.state.text_id);
  };

  EditAtv = () => {
    const {
      text_id,
      name_activity,
      property_activity,
      date_activity,
      time_activity,
      place_activity,
      placeeqi_activity,
      note_activity
    } = this.state;
    dba.transaction(tx => {
      tx.executeSql(
        "Update Activity set Name_A=?, Property_A =?, Date_A=?, Time_A=?, Place_A=?, Device_A=?, Note_A=? where Id_A=?",
        [
          name_activity,
          property_activity,
          date_activity,
          time_activity,
          place_activity,
          placeeqi_activity,
          note_activity,
          text_id
        ],
        (tx, results) => {
          console.log(JSON.stringify(results));

          if (results.rowsAffected > 0) {
            Alert.alert("แก้ไขข้อมูลกิจกรรมสำเร็จ");
          }
        }
      );
    });
    //this.test;
    this.props.navigation.navigate("choice");
  };
  //ยังไม่ได้rander++++++++++++++++++++++
  render() {
    return (
      <ScrollView>
        <View style={{ backgroundColor: "#d7a46f", flex: 1 }}>
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
              source={require("./img/pencil.png")}
            />
          </View>
          <View
            style={{
              backgroundColor: "#a4b3ac",
              borderRadius: 15,
              padding: 15,
              marginLeft: 15,
              marginRight: 15,
              marginBottom: 15
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 4 }}>
              ชื่อกิจกรรม
            </Text>

            <Input
              placeholder={"กรุณาใส่ชื่อกิจกรรม"}
              value={this.state.name_activity}
              onChangeText={text => this.TextChange(text, "name_activity")}
            />
          </View>
          <View
            style={{
              backgroundColor: "#a4b3ac",
              borderRadius: 15,
              padding: 15,
              marginLeft: 15,
              marginRight: 15,
              marginBottom: 15
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 4 }}>
              ลักษณะกิจกรรม
            </Text>

            <Input
              placeholder={"กรุณาใส่ลักษณะกิจกรรม"}
              value={this.state.property_activity}
              onChangeText={text => this.TextChange(text, "property_activity")}
            />
          </View>
          <View
            style={{
              backgroundColor: "#a4b3ac",
              borderRadius: 15,
              padding: 15,
              marginLeft: 15,
              marginRight: 15,
              marginBottom: 15,
              flexDirection: "row"
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 4 }}>
              วันที่ทำกิจกรรม
            </Text>
            <DatePicker
              style={{ width: 200 }}
              date={this.state.date_activity}
              mode="date"
              //formmat Date
              format="MMMM DD, YYYY"
              placeholder={this.state.date_activity}
              placeholderTextColor="black"
              minDate="2018-05-01"
              maxDate="2020-12-12"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: "relative",
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 3
                }
              }}
              onDateChange={date => {
                this.TextChange(date, "date_activity");
              }}
            />
          </View>
          <View
            style={{
              backgroundColor: "#a4b3ac",
              borderRadius: 15,
              padding: 15,
              marginLeft: 15,
              marginRight: 15,
              marginBottom: 15,
              flexDirection: "row"
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 4 }}>
              เวลาทานยา
            </Text>
            <DatePicker
              style={{ width: 200 }}
              date={this.state.time_activity}
              mode="time"
              //format="HH:MM"
              placeholder={this.state.time_activity}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: "relative",
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 3
                }
              }}
              onDateChange={date => {
                this.TextChange(date, "time_activity");
              }}
            />
          </View>

          <View
            style={{
              backgroundColor: "#a4b3ac",
              borderRadius: 15,
              padding: 15,
              marginLeft: 15,
              marginRight: 15,
              marginBottom: 15
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 4 }}>
              สถานที่ทำกิจกรรม
            </Text>

            <Input
              placeholder={"กรุณาใส่สถานที่ทำกิจกรม"}
              value={this.state.place_activity}
              onChangeText={text => this.TextChange(text, "place_activity")}
            />
          </View>

          <View
            style={{
              backgroundColor: "#a4b3ac",
              borderRadius: 15,
              padding: 15,
              marginLeft: 15,
              marginRight: 15,
              marginBottom: 15
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 4 }}>
              สถานที่เก็บอุปกรณ์
            </Text>

            <Input
              placeholder={"กรุณาใส่สถานที่เก็บอุปกรณ์"}
              value={this.state.placeeqi_activity}
              onChangeText={text => this.TextChange(text, "placeeqi_activity")}
            />
          </View>

          <View
            style={{
              backgroundColor: "#a4b3ac",
              borderRadius: 15,
              padding: 15,
              marginLeft: 15,
              marginRight: 15,
              marginBottom: 15
            }}
          >
            <Text>คำอธิบายเพิ่มเติม</Text>

            <Input
              placeholder={"กรุณาใส่คำอธิบายเพิ่มเติม"}
              value={this.state.note_activity}
              onChangeText={text => this.TextChange(text, "note_activity")}
            />
          </View>
          {/* <View style={{ marginTop: 15 }}>
            <Button large title="บันทึกการแก้ไข" onPress={this.EditAtv} />
          </View> */}
          <TouchableOpacity onPress={this.EditAtv}>
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
                <Icon name="plus" type="evilicon" color="#d7a46f" size={40} />
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 24,
                    color: "#FFFFFF"
                  }}
                >
                  บันทึกการแก้ไข
                </Text>
              </View>
            </View>
          </TouchableOpacity>
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
  },
  Card_css: {
    flex: 1,
    marginBottom: 7,
    padding: 5,
    borderBottomWidth: 2,
    borderBottomColor: "#CCCCCC"
  }
});
