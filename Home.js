import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button
} from "react-native";
import { Icon } from "react-native-elements";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import * as SQLite from "expo-sqlite";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
// const db = SQLite.openDatabase("Drug_Add.db");
const dbp = SQLite.openDatabase("Profile.db");
const dbd = SQLite.openDatabase("Drug.db");
const dbu = SQLite.openDatabase("Register1.db");
const dba = SQLite.openDatabase("Activity.db");
const dbs = SQLite.openDatabase("SetTime.db");
const moment = require("moment");
var temp = [];
const SLASH_DMY = "MMMM DD, YYYY";
export default class Home extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: null //ทำให้ header หาย
  });

  componentDidMount() {
    this.registerForPushNotificationsAsync();
  }
  constructor(props) {
    super(props);
    this.state = {
      time: "",
      select_morning: "",
      select_lanuch: "",
      select_dinner: "",
      select_goodnight: ""
    };
    this.handleClickStartStop = this.handleClickStartStop.bind(this);
  }

  async registerForPushNotificationsAsync() {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        console.log("Failed to get push token for push notification!");
        return;
      }
    }
  }

  handleClickStartStop(round) {
    // console.log("test");
    // console.log(round);
    const { start, countdown, time, format_date, request_time } = this.state;
    const {
      select_morning,
      select_lanuch,
      select_dinner,
      select_goodnight
    } = this.state;
    if (!start) {
      const stampNow = moment().format(SLASH_DMY);
      let expiredDate = "";
      //let todayDate = "January 19, 2020";

      for (let i = 0; i < round; i++) {
        if (temp[i] == "1") {
          expiredDate = new Date(stampNow + " " + select_morning);
          console.log("morning");
          this.sendLocalNotification({ time: expiredDate });
        } else if (temp[i] == "2") {
          expiredDate = new Date(stampNow + " " + select_lanuch);
          console.log("lanuch");
          this.sendLocalNotification({ time: expiredDate });
        } else if (temp[i] == "3") {
          expiredDate = new Date(stampNow + " " + select_dinner);
          console.log("dinner");
          this.sendLocalNotification({ time: expiredDate });
        } else if (temp[i] == "4") {
          expiredDate = new Date(stampNow + " " + select_goodnight);
          console.log("goodnight");
          this.sendLocalNotification({ time: expiredDate });
        }
      }
    }
  }

  async sendLocalNotification({ time }) {
    const localNotification = {
      title: "ถึงเวลาทานยาแล้ว",
      body: "กรุณาเข้าแอปพลิเคชันเพื่อทานยา",
      sound: "default",
      color: "yellow",
      sound: "true"
    };

    const schedulingOptions = {
      repeat: "year",
      time
    };
    await Notifications.scheduleLocalNotificationAsync(
      localNotification,
      schedulingOptions
    );
  }
  componentDidMount() {
    const stampNow = moment().format(SLASH_DMY);
    // db.transaction(tx => {
    //   tx.executeSql(
    //     "create table if not exists Drug_Add (Id integer primary key AUTOINCREMENT,Name text,Property text,Date_Med numeric,Time_Med numeric,Eat text,Eat_Time text,Count integer,Place text,Note_Med text);"
    //   );
    // });
    dbu.transaction(txu => {
      txu.executeSql(
        "create table if not exists Register1 (Id_U integer primary key AUTOINCREMENT,Name_U text,Sur_U text,Tel_U text,Relation text,User_U text,Pass_U text);"
      );
    });
    dbp.transaction(txp => {
      txp.executeSql(
        "create table if not exists Profile (Name_P text,Sur_P text,Nick_P text,Age_P text,Tel_P text,Disease_P text,Img_P text);"
      );
    });
    dba.transaction(txt => {
      txt.executeSql(
        "create table if not exists Activity (Id_A integer primary key AUTOINCREMENT,Name_A text,Property_A text,Date_A text,Time_A text,Place_A text,Device_A text,Note_A text);"
      );
    });
    dbd.transaction(tx => {
      tx.executeSql(
        "create table if not exists Drug (Id integer primary key AUTOINCREMENT,Name text,Property text,Date_Med numeric,Eat text,Eat_Time text,Count integer,Place text,Note_Med text);"
      );
    }); //148-187
    dbs.transaction(tx => {
      tx.executeSql(
        "select * from SetTime where number_no=?",
        ["1"],
        (tx, results) => {
          this.setState({ select_morning: results.rows.item(0).time_morning });
          this.setState({ select_lanuch: results.rows.item(0).time_lanuch });
          this.setState({ select_dinner: results.rows.item(0).time_dinner });
          this.setState({
            select_goodnight: results.rows.item(0).time_goodnight
          });
          console.log(this.state.select_morning);
          console.log(this.state.select_lanuch);
          console.log(this.state.select_dinner);
          console.log(this.state.select_goodnight);
          console.log("555");
        }
      );
    });
    dbd.transaction(tx => {
      tx.executeSql(
        "select Eat_Time from Drug where Date_Med=?",
        [stampNow],
        (tx, results) => {
          console.log(JSON.stringify(results));
          console.log(">>>" + results.rows.length);
          for (let i = 0; i < results.rows.length; i++) {
            temp.push(results.rows.item(i).Eat_Time);
            {
              console.log("temp is" + i + temp[i]);
              i == results.rows.length - 1
                ? this.handleClickStartStop(results.rows.length)
                : null;
            }
          }
          // console.log("temp is " + temp[0]);
          // console.log("temp is " + temp[1]);
        }
      );
    });
    //ไม่เกี่ยว
    // dbd.transaction(tx => {
    //   tx.executeSql(
    //     "select * from Drug ",
    //     [],
    //     (tx, results) => {
    //       console.log(JSON.stringify(results));
    //      // console.log(">>>" + results.rows.length);
    //     }
    //   );
    // });
  }

  render() {
    // this.refresh();
    return (
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 50,
            color: "#fcba99",
            fontWeight: "bold"
          }}
        >
          ดูแลคนที่คุณรัก
        </Text>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("test");
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              marginLeft: 300
            }}
          >
            <Image
              //resizeMode="stretch"
              style={{
                width: 40,
                height: 40,
                borderRadius: 75
              }}
              source={require("./img/copy.png")}
            />
          </View>
        </TouchableOpacity>
        <View>
          <Image
            resizeMode="stretch"
            style={{ width: 300, height: 300 }}
            source={require("./img/true_2.png")}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("Menuu");
          }}
        >
          <View
            style={{
              borderRadius: 30,
              width: 400,
              height: 50,
              backgroundColor: "#d7a46f",
              marginBottom: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Icon name="pointer" type="evilicon" color="#517fa4" size={50} />
            <Text
              style={{
                marginTop: 5,
                fontSize: 30,
                fontWeight: "bold",
                color: "#000000"
              }}
            >
              ผู้ป่วย
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("login");
          }}
        >
          <View
            style={{
              borderRadius: 30,
              width: 400,
              height: 50,
              backgroundColor: "#d7a46f",
              marginBottom: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Icon name="lock" type="evilicon" color="#517fa4" size={50} />
            <Text
              style={{
                marginTop: 5,
                fontSize: 30,
                fontWeight: "bold",
                color: "#000000"
              }}
            >
              ผู้ดูแล
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#267377",
    justifyContent: "flex-end",
    flexDirection: "column",
    alignItems: "center"
  }
});
