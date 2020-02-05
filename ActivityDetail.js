import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Alert,
  ScrollView
} from "react-native";
import { Card, Button, Icon, ListItem, Avatar } from "react-native-elements";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("Activity.db");

export default class ActivityDetail extends Component {
  constructor(props) {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var x;
    if (month == 1) {
      x = "January";
    } else if (month == 2) {
      x = "February";
    } else if (month == 3) {
      x = "March";
    } else if (month == 4) {
      x = "April";
    } else if (month == 5) {
      x = "May";
    } else if (month == 6) {
      x = "June";
    } else if (month == 7) {
      x = "July";
    } else if (month == 8) {
      x = "August";
    } else if (month == 9) {
      x = "September";
    } else if (month == 10) {
      x = "October";
    } else if (month == 11) {
      x = "November";
    } else if (month == 12) {
      x = "December";
    }
    var year = new Date().getFullYear();
    //console.log(">>>>" + year);
    super(props);
    this.state = {
      text_id: "",
      name_activity: " ",
      property_activity: " ",
      date_activity: "",
      time_activity: "",
      place_activity: " ",
      placeeqi_activity: " ",
      note_activity: " ",
      current_Date: year + "-" + month + "-" + date,
      timestamp: x + " " + date + ", " + year
    };
  }
  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      backgroundColor: "#267377"
    },
    headerTitle: () => <Text style={styles.text_header}>กิจกรรมที่ต้องทำ</Text>
  });
  componentWillMount() {
    const { current_Date, timestamp } = this.state;
    //console.log("dateeee>>" + timestamp);
    db.transaction(tx => {
      tx.executeSql(
        "select * from Activity where Date_A=?",
        [timestamp],
        (tx, results) => {
          console.log(JSON.stringify(results));
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
          }
          this.setState({
            FlatListItems: temp
          });
        }
      );
    });
  }
  ListViewItemSeparator = () => {
    return (
      <View style={{ height: 0.2, width: "100%", backgroundColor: "blue" }} />
    );
  };
  renderItem = ({ item }) => (
    <View style={{ backgroundColor: "#be8a59" }}>
      <Card title={item.Name_A} titleStyle={{ fontSize: 30 }}>
        <ListItem
          title={"สถานที่ทำกิจกรรม : " + item.Place_A}
          titleStyle={{ fontSize: 20 }}
          leftAvatar={
            <Avatar
              size="large"
              rounded
              overlayContainerStyle={{ backgroundColor: "#FFFFFF" }}
              source={require("./img/true_5.png")}
            />
          }
          chevron
          bottomDivider
        />
        <Button
          icon={<Icon name="like" type="evilicon" color="#d7a46f" size={55} />}
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
            backgroundColor: "#267377"
          }}
          title="ทำเดี๋ยวนี้"
          titleStyle={{ fontSize: 22 }}
          onPress={() => {
            this.props.navigation.navigate("detail_a", { text_id: item.Id_A });
          }}
        />
      </Card>
    </View>
  );
  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          backgroundColor: "#be8a59"
        }}
      >
        <View
          style={{
            alignItems: "center",
            backgroundColor: "#a4b3ac",
            padding: 20,
            margin: 10,
            borderRadius: 10,
            flexDirection: "row"
          }}
        >
          <Icon name="exclamation" type="evilicon" color="red" size={55} />
          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
              color: "#000000"
            }}
          >
            {/* {this.state.timestamp} */}
            กิจกรรมที่ต้องทำวันนี้
          </Text>
        </View>
        <ScrollView>
          {/* <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 30, fontWeight: "bold" }}>
              {this.state.timestamp}
            </Text>
          </View> */}
          <View style={{ flex: 1, backgroundColor: "#A2EBDE" }}>
            <FlatList
              data={this.state.FlatListItems}
              keyExtractor={(item, index) => index.toString()}
              renderItem={this.renderItem}
            />
          </View>
        </ScrollView>
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
