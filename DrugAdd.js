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
  ScrollView,
  TouchableOpacity
} from "react-native";
import { Input, Icon } from "react-native-elements";
import DatePicker from "react-native-datepicker";
// import Icon from "react-native-vector-icons/FontAwesome";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import * as SQLite from "expo-sqlite";

//const db = SQLite.openDatabase("Drug_Add.db");
const db = SQLite.openDatabase("Drug.db");

export default class DrugAdd extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      backgroundColor: "#267377"
    },
    headerTitle: () => (
      <Text style={{ fontSize: 20, color: "#FFFFFF", fontWeight: "bold" }}>
        เพิ่มการเตือนทานยา
      </Text>
    )
  });
  constructor(props) {
    super(props);
    this.state = {
      name_medication: "",
      property_medication: "",
      date_medication: "",
      be_af: "",
      mor_bed: "",
      count_medication: "",
      place_medication: "",
      note_medication: "",
      //เดี๋ยวต้องใช้เพื่อใช้กับ Notification
      timestamp: ""
    };
  }

  /*handleDate =(date) => {
        this.setState({date: date});
    }*/

  btnInsert = () => {
    //น่าใส่ if case เอาไว้ก่อนใส่ในฐานข้อมูล*************************************************
    const db = SQLite.openDatabase("Drug.db");
    const {
      name_medication,
      property_medication,
      date_medication,
      be_af,
      mor_bed,
      count_medication,
      place_medication,
      note_medication
    } = this.state;
    console.log("Status : " + mor_bed);
    if (
      name_medication == "" &&
      property_medication == "" &&
      date_medication == "" &&
      be_af == "" &&
      mor_bed == "" &&
      count_medication == "" &&
      place_medication == "" &&
      note_medication == ""
    ) {
      Alert.alert("กรุณากรอกข้อมูล");
    } else {
      // if เยอะแค่ตรวจสอบการกรอกข้อมูลเฉยๆ
      if (name_medication) {
        if (property_medication) {
          if (date_medication) {
            if (be_af) {
              if (mor_bed) {
                if (count_medication) {
                  if (place_medication) {
                    db.transaction(tx => {
                      tx.executeSql(
                        "insert into Drug(Name,Property,Date_Med,Eat,Eat_Time,Count,Place,Note_Med) values (?,?,?,?,?,?,?,?)",
                        [
                          name_medication,
                          property_medication,
                          date_medication,
                          be_af,
                          mor_bed,
                          count_medication,
                          place_medication,
                          note_medication
                        ],
                        (tx, results) => {
                          console.log(JSON.stringify(results));
                          if (results.rowsAffected > 0) {
                            Alert.alert("บันทึกข้อมูลการทานยาแล้ว");
                            this.props.navigation.navigate("choice");
                          }
                        }
                      );
                      //อย่าลืมลบออก แค่แสดงชั่วคราว
                      tx.executeSql(
                        "select * from Drug ",
                        [],
                        (tx, results) => {
                          console.log(JSON.stringify(results));
                        }
                      );
                    });
                  } else {
                    Alert.alert("กรุณาใส่สถานที่เก็บยา");
                  }
                } else {
                  Alert.alert("กรุณาใส่จำนวนเม็ดที่ต้องทาน");
                }
              } else {
                Alert.alert("กรุณาใส่ช่วงเวลาการทาน");
              }
            } else {
              Alert.alert("กรุณาใส่ลักษณะการทานยา");
            }
          } else {
            Alert.alert("กรุณาใส่วันที่การทานยา");
          }
        } else {
          Alert.alert("กรุณาใส่สรรพคุณยา");
        }
      } else {
        Alert.alert("กรุณาใส่ชื่อยา");
      }
      // this.props.navigation.navigate("choice");
    }
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View
            style={{
              backgroundColor: "#d7a46f",
              borderRadius: 15,
              padding: 15,
              margin: 15
            }}
          >
            <View style={{ alignItems: "center", marginBottom: 5 }}>
              <Image
                style={{
                  width: 100,
                  height: 100
                }}
                source={require("./img/true_6.png")}
              />
            </View>
            <Text
              style={{ fontSize: 20, fontWeight: "bold", color: "#000000" }}
            >
              กรุณาใส่ชื่อยา *
            </Text>
            <View style={{ marginBottom: 20 }}>
              <Input
                placeholder="กรุณาใส่ชื่อตัวยา"
                placeholderTextColor="#5f9b9e"
                leftIcon={<Icon name="add" size={24} color="#5f9b9e" />}
                value={this.state.name_medication.toString()}
                onChangeText={name_medication =>
                  this.setState({ name_medication })
                }
              />
            </View>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              กรุณาใส่สรรพคุณยา *
            </Text>
            <Input
              placeholder="กรุณาใส่สรรพคุณยา"
              placeholderTextColor="#5f9b9e"
              leftIcon={<Icon name="add" size={24} color="#5f9b9e" />}
              value={this.state.property_medication.toString()}
              onChangeText={property_medication =>
                this.setState({ property_medication })
              }
            />
          </View>
          <View
            style={{
              backgroundColor: "#d7a46f",
              borderRadius: 15,
              padding: 15,
              marginLeft: 15,
              marginRight: 15,
              marginBottom: 15
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              กรุณาใส่วันที่ทานยา *
            </Text>
            <DatePicker
              style={{ width: 200 }}
              date={this.state.date_medication}
              mode="date"
              format="MMMM DD, YYYY"
              //format="YYYY-M-DD"
              placeholder="กรุณาใส่วันที่ทานยา"
              placeholderTextColor="#000000"
              minDate="2018"
              maxDate="2023"
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
                this.setState({ date_medication: date });
              }}
            />
          </View>
          <View
            style={{
              backgroundColor: "#d7a46f",
              borderRadius: 15,
              padding: 15,
              marginLeft: 15,
              marginRight: 15,
              marginBottom: 15
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              กรุณาใส่ลักษณะการทาน *
            </Text>
            <Picker
              style={{ width: 200 }}
              selectedValue={this.state.be_af} //เหมือน placeholder
              onValueChange={be_af => this.setState({ be_af })}
              mode="dropdown"
            >
              <Picker.Item label="ก่อนอาหาร" value="ก่อนอาหาร" />
              <Picker.Item label="หลังอาหาร" value="หลังอาหาร" />
            </Picker>
          </View>
          <View
            style={{
              backgroundColor: "#d7a46f",
              borderRadius: 15,
              padding: 15,
              marginLeft: 15,
              marginRight: 15,
              marginBottom: 15
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              กรุณาใส่ช่วงเวลา *
            </Text>
            <Picker
              style={{ width: 200 }}
              selectedValue={this.state.mor_bed} //เหมือน placeholder
              onValueChange={mor_bed => this.setState({ mor_bed })}
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
              backgroundColor: "#d7a46f",
              borderRadius: 15,
              padding: 15,
              marginLeft: 15,
              marginRight: 15,
              marginBottom: 15
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              กรุณาใส่จำนวนเม็ดที่ต้องทาน *
            </Text>
            <Picker
              style={{ width: 200 }}
              selectedValue={this.state.count_medication} //เหมือน placeholder
              onValueChange={count_medication =>
                this.setState({ count_medication })
              }
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
              backgroundColor: "#d7a46f",
              borderRadius: 15,
              padding: 15,
              marginLeft: 15,
              marginRight: 15,
              marginBottom: 15
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              กรุณาใส่ที่เก็บยา *
            </Text>
            <Input
              placeholder=" กรุณาใส่ที่เก็บยา"
              placeholderTextColor="#5f9b9e"
              leftIcon={<Icon name="add" size={24} color="#5f9b9e" />}
              //leftIcon={<Icon name="gavel" size={24} color="black" />}
              value={this.state.place_medication.toString()}
              onChangeText={place_medication =>
                this.setState({ place_medication })
              }
            />
          </View>
          <View
            style={{
              backgroundColor: "#d7a46f",
              borderRadius: 15,
              padding: 15,
              marginLeft: 15,
              marginRight: 15,
              marginBottom: 15
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              อธิบายเพิ่มเติม
            </Text>
            <Input
              placeholder=" อธิบายเพิ่มเติม"
              placeholderTextColor="#5f9b9e"
              leftIcon={<Icon name="add" size={24} color="#5f9b9e" />}
              //leftIcon={<Icon name="gavel" size={24} color="black" />}
              value={this.state.note_medication.toString()}
              onChangeText={note_medication =>
                this.setState({ note_medication })
              }
            />
          </View>
          <TouchableOpacity onPress={this.btnInsert}>
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
  },
  card: {
    flex: 1,
    borderRadius: 15,
    backgroundColor: "#faf0e6",
    margin: 20,
    marginBottom: -11,
    marginTop: 7
  },
  header: {
    flex: 1,
    fontSize: 24,
    color: "black",
    textShadowColor: "blue",
    flexDirection: "row",
    alignItems: "center",
    fontWeight: "bold",
    justifyContent: "center",
    flexDirection: "row",
    marginLeft: 60
  },
  button: {
    marginLeft: 90,
    marginTop: 25,
    flexDirection: "row",
    alignItems: "center",
    width: 180,
    height: 55,
    borderRadius: 10,
    backgroundColor: "yellow"
  }
});
