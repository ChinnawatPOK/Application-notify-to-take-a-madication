import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Picker,
  TouchableOpacity,
  Alert,
  Image
} from "react-native";
import { Input, Icon } from "react-native-elements";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { TextInput } from "react-native-gesture-handler";
import { Card } from "react-native-elements";
import DatePicker from "react-native-datepicker";
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("Drug.db");

export default class EditDrug extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text_id: this.props.navigation.state.params.text_id,
      name_medication: this.props.navigation.state.params.name_medication,
      property_medication: this.props.navigation.state.params
        .property_medication,
      date_medication: this.props.navigation.state.params.date_medication,
      be_af: this.props.navigation.state.params.be_af,
      mor_bed: this.props.navigation.state.params.mor_bed,
      count_medication: this.props.navigation.state.params.count_medication,
      place_medication: this.props.navigation.state.params.place_medication,
      note_medication: this.props.navigation.state.params.note_medication
    };
    //console.log(this.state.count_medication);
  }
  //test() {
  //this.props.navigation.navigate("drugshow");
  //}
  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      backgroundColor: "#5f9b9e"
    },
    headerTitle: () => <Text style={styles.text_header}>แก้ไขรายการทานยา</Text>
  });
  TextChange = (text, field) => {
    const state = this.state;
    state[field] = text;
    this.setState(state);
    console.log(this.state.name_medication);
  };
  EditData = () => {
    console.log(this.state.count_medication);
    const {
      text_id,
      name_medication,
      property_medication,
      date_medication,
      be_af,
      mor_bed,
      count_medication,
      place_medication,
      note_medication
    } = this.state;
    db.transaction(tx => {
      tx.executeSql(
        "Update Drug set Name=?, Property =?, Date_Med=?, Eat=?, Eat_Time=?, Count=?, Place=?, Note_Med=? where Id=?",
        [
          name_medication,
          property_medication,
          date_medication,
          be_af,
          mor_bed,
          count_medication,
          place_medication,
          note_medication,
          text_id
        ],
        (tx, results) => {
          console.log(JSON.stringify(results));

          if (results.rowsAffected > 0) {
            Alert.alert("แก้ไขข้อมูลการทานยาสำเร็จ");
          }
        }
      );
    });
    //this.test;
    this.props.navigation.navigate("choice");
  };

  render() {
    return (
      <ScrollView>
        <View style={{ flex: 1, backgroundColor: "#d7a46f" }}>
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
              - ชื่อตัวยา
            </Text>

            <Input
              placeholder={"กรุณาใส่ชื่อยา"}
              value={this.state.name_medication}
              onChangeText={text => this.TextChange(text, "name_medication")}
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
              - สรรพคุณยา
            </Text>

            <Input
              placeholder={"กรุณาใส่สรรพคุณยา"}
              value={this.state.property_medication}
              onChangeText={text =>
                this.TextChange(text, "property_medication")
              }
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
              - วันที่ทานยา |
            </Text>
            <DatePicker
              style={{ width: 200 }}
              date={this.state.date_medication}
              mode="date"
              //formmat Date
              format="MMMM DD, YYYY"
              placeholder={this.state.date_medication}
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
                this.TextChange(date, "date_medication");
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
              - ช่วงเวลาที่ต้องทาน
            </Text>
            <Picker
              selectedValue={this.state.be_af} //เหมือน placeholder
              onValueChange={be_af => {
                this.TextChange(be_af, "be_af");
              }}
              style={{ width: 160 }}
              mode="dropdown"
            >
              <Picker.Item label="ก่อนอาหาร" value="ก่อนอาหาร" />
              <Picker.Item label="หลังอาหาร" value="หลังอาหาร" />
            </Picker>
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
              - ระยะเวลาที่ต้องทานยา
            </Text>
            <Picker
              style={{ backgroundColor: "black", borderColor: "black" }}
              selectedValue={this.state.mor_bed} //เหมือน placeholder
              onValueChange={mor_bed => {
                this.TextChange(mor_bed, "mor_bed");
              }}
              style={{ width: 160 }}
              mode="dropdown"
            >
              <Picker.Item label="เช้า" value="1" />
              <Picker.Item label="กลางวัน" value="2" />
              <Picker.Item label="เย็น" value="3" />
              <Picker.Item label="ก่อนนอน" value="4" />
            </Picker>
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
              - จำนวนเม็ดที่ต้องทาน
            </Text>
            <Picker
              style={{ backgroundColor: "black", borderColor: "black" }}
              selectedValue={this.state.count_medication} //เหมือน placeholder
              onValueChange={count_medication => {
                this.TextChange(count_medication, "count_medication");
              }}
              style={{ width: 160 }}
              mode="dropdown"
            >
              <Picker.Item label="-" value="-" />
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4" value="4" />
              <Picker.Item label="5" value="5" />
            </Picker>
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
              - ที่เก็บยา
            </Text>

            <Input
              placeholder={"กรุณาใส่ที่เก็บยา"}
              value={this.state.place_medication}
              onChangeText={text => this.TextChange(text, "place_medication")}
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
              - คำอธิบายเพิ่มเติม
            </Text>

            <Input
              placeholder={"กรุณาใส่คำอธิบายเพิ่มเติม"}
              value={this.state.note_medication}
              onChangeText={text => this.TextChange(text, "note_medication")}
            />
          </View>
          {/* <View style={{ marginTop: 15 }}>
            <Button large title="บันทึกการแก้ไข" onPress={this.EditData} />
          </View> */}
          <TouchableOpacity onPress={this.EditData}>
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
