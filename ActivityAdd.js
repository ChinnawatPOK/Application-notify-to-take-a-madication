import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  Image,
  Picker,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity
} from "react-native";
import { Input, Icon } from "react-native-elements";
import DatePicker from "react-native-datepicker";
// import Icon from "react-native-vector-icons/FontAwesome";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import * as SQLite from "expo-sqlite";
import { ScrollView } from "react-native-gesture-handler";
const dba = SQLite.openDatabase("Activity.db");

export default class ActivityAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timee: "",
      datee: "",
      hand: "",
      handd: "",
      name_activity: "",
      property_activity: "",
      date_activity: "",
      time_activity: "",
      place_activity: "",
      placeeqi_activity: "",
      note_activity: ""
    };
  }

  /*handleDate =(date) => {
        this.setState({date: date});
    }*/

  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      backgroundColor: "#60bc71"
    },
    headerTitle: () => (
      <Text style={{ fontSize: 20, color: "#FFFFFF", fontWeight: "bold" }}>
        เพิ่มกิจกรรมที่ต้องทำ
      </Text>
    )
  });
  //btnInsert_Atv = () => {
  //this.props.navigation.goBack();
  //};
  btnInsert_Atv = () => {
    //const { goBack } = this.props.navigation;
    const dba = SQLite.openDatabase("Activity.db");
    const {
      name_activity,
      property_activity,
      date_activity,
      time_activity,
      place_activity,
      placeeqi_activity,
      note_activity
    } = this.state;
    if (
      name_activity == "" &&
      property_activity == "" &&
      date_activity == "" &&
      time_activity == "" &&
      place_activity == "" &&
      placeeqi_activity == "" &&
      note_activity == ""
    ) {
      Alert.alert("กรุณากรอกข้อมูล");
    } else {
      if (name_activity) {
        if (property_activity) {
          if (date_activity) {
            if (time_activity) {
              if (place_activity) {
                dba.transaction(tx => {
                  tx.executeSql(
                    "insert into Activity(Name_A,Property_A,Date_A,Time_A,Place_A,Device_A,Note_A) values (?,?,?,?,?,?,?)",
                    [
                      name_activity,
                      property_activity,
                      date_activity,
                      time_activity,
                      place_activity,
                      placeeqi_activity,
                      note_activity
                    ],
                    (tx, results) => {
                      console.log(JSON.stringify(results));
                      if (results.rowsAffected > 0) {
                        Alert.alert("เพิ่มข้อมูลการทำกิจกรรมสำเร็จ");
                        this.props.navigation.navigate("choice");
                      }
                    }
                  );
                  //อย่าลืมลบออก แค่แสดงชั่วคราว
                  tx.executeSql(
                    "select * from Activity ",
                    [],
                    (tx, results) => {
                      console.log(JSON.stringify(results));
                    }
                  );
                });
              } else {
                Alert.alert("กรุณาใส่สถานที่ทำกิจกรรม");
              }
            } else {
              Alert.alert("กรุณาใส่เวลาทำกิจกรรม");
            }
          } else {
            Alert.alert("กรุณาใส่วันที่ทำกิจกรรม");
          }
        } else {
          Alert.alert("กรุณาใส่ลักษณะกิจกรรม");
        }
      } else {
        Alert.alert("กรุณาใส่ชื่อกิจกรรม");
      }
    }
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View
            style={{
              backgroundColor: "#a4b3ac",
              borderRadius: 15,
              padding: 15,
              margin: 15
            }}
          >
            <View style={{ alignItems: "center", marginBottom: 5 }}>
              <Image
                style={{
                  width: 150,
                  height: 150
                }}
                source={require("./img/true_8.png")}
              />
            </View>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              ชื่อกิจกรรม *
            </Text>

            <Input
              placeholder="    กรุณาใส่ชื่อกิจกรรม"
              placeholderTextColor="#5f9b9e"
              leftIcon={<Icon name="add" size={24} color="#5f9b9e" />}
              value={this.state.name_activity.toString()}
              onChangeText={name_activity => this.setState({ name_activity })}
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
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              ลักษณะกิจกรรมที่ทำ *
            </Text>
            <Input
              placeholder="    กรุณาลักษณะกิจกรรมที่ทำ"
              placeholderTextColor="#5f9b9e"
              leftIcon={<Icon name="add" size={24} color="#5f9b9e" />}
              value={this.state.property_activity.toString()}
              onChangeText={property_activity =>
                this.setState({ property_activity })
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
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              วันที่ทำกิจกรรม *
            </Text>
            <DatePicker
              style={{ width: 200 }}
              date={this.state.date_activity}
              mode="date"
              format="MMMM DD, YYYY"
              placeholder="กรุณาใส่วันที่ทำกิจกรรม"
              placeholderTextColor="black"
              minDate="2019"
              maxDate="2025"
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
                  marginLeft: 36
                }
              }}
              onDateChange={date => {
                this.setState({ date_activity: date });
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
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              เวลาที่ทำกิจกรรม *
            </Text>
            <DatePicker
              style={{ width: 200 }}
              date={this.state.time_activity}
              mode="time"
              //format="HH:MM"
              placeholder="กรุณาใส่เวลาที่ทำกิจกรรม"
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
                  marginLeft: 36
                }
              }} //จำเป็นต้องใช้date เพราะน่าจะเป็น datePicker
              onDateChange={date => {
                this.setState({ time_activity: date + ":00" });
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
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              สถานที่ทำกิจกรรม *
            </Text>
            <Input
              placeholder="    กรุณาสถานที่ทำกิจกรรม"
              placeholderTextColor="#5f9b9e"
              leftIcon={<Icon name="add" size={24} color="#5f9b9e" />}
              value={this.state.place_activity.toString()}
              onChangeText={place_activity => this.setState({ place_activity })}
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
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              สถานที่เก็บอุปกรณ์
            </Text>
            <Input
              placeholder="    กรุณาสถานที่เก็บอุปกรณ์"
              placeholderTextColor="#5f9b9e"
              leftIcon={<Icon name="add" size={24} color="#5f9b9e" />}
              value={this.state.placeeqi_activity.toString()}
              onChangeText={placeeqi_activity =>
                this.setState({ placeeqi_activity })
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
              marginBottom: 15
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              คำอธิบายเพิ่มเติม
            </Text>
            <Input
              placeholder="    คำอธิบายเพิ่มเติม"
              multiline
              numberOfLines={3}
              placeholderTextColor="#5f9b9e"
              leftIcon={<Icon name="add" size={24} color="#5f9b9e" />}
              value={this.state.note_activity.toString()}
              onChangeText={note_activity => this.setState({ note_activity })}
            />
          </View>
          <TouchableOpacity onPress={this.btnInsert_Atv}>
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
                  width: 200,
                  height: 60,
                  borderRadius: 20,
                  padding: 15,
                  marginLeft: 15,
                  marginRight: 15,
                  marginBottom: 15,
                  alignItems: "center"
                }}
              >
                <Text
                  style={{ fontWeight: "bold", fontSize: 24, color: "#FFFFFF" }}
                >
                  บันทึก
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
  container: {
    flex: 1,
    backgroundColor: "#5f9b9e",
    flexDirection: "column"
  }
});
