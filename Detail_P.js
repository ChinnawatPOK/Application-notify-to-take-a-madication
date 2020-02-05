import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { Icon } from "react-native-elements";
import * as SQLite from "expo-sqlite";
const { width: screenWidth } = Dimensions.get("window");

const dbu = SQLite.openDatabase("Profile.db");

export default class Detail_P extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      surname: "",
      age: "",
      tel: "",
      disease: "",
      image: "",
      nickname: ""
    };
  }
  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      backgroundColor: "#267377"
    },
    headerTitle: () => <Text style={styles.text_header}>ข้อมูลผู้ป่วย</Text>,
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
    const { name, surname, nickname, age, tel, disease, image } = this.state;
    dbu.transaction(txu => {
      txu.executeSql("select * from Profile ", [], (txu, results) => {
        console.log(JSON.stringify(results));
        if (results.rows.length > 0) {
          this.setState({
            name: results.rows.item(0).Name_P
          });
          this.setState({
            surname: results.rows.item(0).Sur_P
          });
          this.setState({
            nickname: results.rows.item(0).Nick_P
          });
          this.setState({
            age: results.rows.item(0).Age_P
          });
          this.setState({
            tel: results.rows.item(0).Tel_P
          });
          this.setState({
            disease: results.rows.item(0).Disease_P
          });
          this.setState({
            image: results.rows.item(0).Img_P
          });
        }
      });
    });
    // console.log("test is : " + tel); แสดงค่าไม่ทันว่างควรลองใช้ async
  }
  //const pic = this.state.image;
  render() {
    return (
      <ScrollView>
        <View>
          <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
            <View
              style={{ alignItems: "center", marginTop: 5, marginBottom: 15 }}
            >
              <Image
                style={{
                  marginTop: 10,
                  width: screenWidth - 50,
                  height: 400,
                  borderRadius: 90
                }}
                source={{ uri: this.state.image }}
              />
            </View>
          </View>

          <View style={{ flex: 1, backgroundColor: "#d7a46f" }}>
            <View
              style={{
                borderRadius: 10,

                flexDirection: "row",
                padding: 10
              }}
            >
              <Text style={{ fontSize: 34, fontWeight: "bold" }}>
                {this.state.name + "   "}
              </Text>
              <Text style={{ fontSize: 34, fontWeight: "bold" }}>
                {this.state.surname}
              </Text>
            </View>

            <View
              style={{
                backgroundColor: "#be8a59",
                borderRadius: 10,
                margin: 5,
                flexDirection: "column",
                padding: 10
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                  ชื่อเล่น :
                </Text>
                <Text style={{ fontSize: 20 }}>{this.state.nickname}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                  อายุ :{" "}
                </Text>

                <Text style={{ fontSize: 20 }}>{this.state.age} ปี</Text>
              </View>
              {/* <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                  เบอร์ติดต่อญาติ
                </Text>
                <Text style={{ fontSize: 20 }}>{this.state.tel}</Text>
              </View> */}
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                  โรคประจำตัว :
                </Text>
                <Text style={{ fontSize: 20 }}>{this.state.disease}</Text>
              </View>
              <View
                style={{
                  backgroundColor: "#d7a46f",
                  width: undefined,
                  height: 50,
                  marginTop: 5,
                  padding: 10,
                  alignItems: "center",
                  flexDirection: "column"
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Icon name="phone" size={30} color="#267377" />
                  <Text style={{ fontSize: 18 }}>* เบอร์ติดต่อญาติ : </Text>
                  <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                    {this.state.tel}
                  </Text>
                </View>
              </View>
            </View>
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
