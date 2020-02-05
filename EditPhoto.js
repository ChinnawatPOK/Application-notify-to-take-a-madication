import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Button,
  Alert
} from "react-native";
import { ListItem, Card, Icon } from "react-native-elements";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("Image3.db");
export default class EditPhoto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text_id: this.props.navigation.state.params.text_id,
      name: "",
      relation: "",
      image: ""
    };
  }
  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      backgroundColor: "#267377"
    },
    headerTitle: () => (
      <Text style={styles.text_header}>แก้ไขข้อมูลภาพที่บันทึกไว้</Text>
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
  componentDidMount() {
    const { text_id, name, relation, image } = this.state;
    db.transaction(tx => {
      tx.executeSql(
        "select * from Image4 where Id=?",
        [text_id],
        (tx, results) => {
          console.log(JSON.stringify(results));
          var len = results.rows.length;
          console.log("lenght =", len);
          //setstate ต่างๆที่อ่านมาจาก Database
          console.log("do component");
          if (len > 0) {
            console.log("do if");
            this.setState({
              text_id: results.rows.item(0).Id
            });
            this.setState({
              name: results.rows.item(0).Nickname
            });
            this.setState({
              relation: results.rows.item(0).Relation
            });
            this.setState({
              image: results.rows.item(0).Image
            });
            console.log("id=" + image);
            console.log("name MED=" + relation);
          } else {
            alert("ไม่มีข้อมูล");
          }
        }
      );
    });
  }
  DeleteData = () => {
    const { text_id } = this.state;
    db.transaction(tx => {
      tx.executeSql(
        "Delete from Image4 where Id=?",
        [text_id],
        (tx, results) => {
          console.log(JSON.stringify(results));
          if (results.rowsAffected > 0) {
            Alert.alert("ลบข้อมูลแล้ว");
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
      <View
        style={{ flex: 1, alignItems: "center", backgroundColor: "#a4b3ac" }}
      >
        <Image
          style={{
            marginTop: 10,
            width: 350,
            height: 450,
            borderRadius: 10
          }}
          source={{ uri: this.state.image }}
        />
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 24 }}>ชื่อ : {this.state.name}</Text>
        </View>
        <View>
          <Text style={{ fontSize: 24 }}>
            ความสัมพันธ์กับผู้ป่วย : {this.state.relation}
          </Text>
        </View>
        {/* <View style={{ marginTop: 15 }}>
          <Button large title="ลบรายการ" onPress={this.DeleteData} />
        </View> */}
        <TouchableOpacity onPress={this.DeleteData}>
          <View
            style={{
              marginTop: 20,
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
