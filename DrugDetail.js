import React, { Component } from "react";
import { View, Text, Image, StyleSheet, FlatList, Alert } from "react-native";
import { Card, Button, Icon, ListItem, Avatar } from "react-native-elements";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import * as SQLite from "expo-sqlite";
import { ScrollView } from "react-native-gesture-handler";
const db = SQLite.openDatabase("Drug.db");

export default class DrugDetail extends Component {
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
      name_medication: " ",
      property_medication: " ",
      date_medication: "",
      be_af: " ",
      mor_bed: " ",
      count_medication: " ",
      place_medication: " ",
      note_medication: " ",
      current_Date: year + "-" + month + "-" + date,
      timestamp: x + " " + date + ", " + year
    };
  }
  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      backgroundColor: "#267377"
    },
    headerTitle: () => (
      <Text style={styles.text_header}>รายการยาที่ต้องทาน</Text>
    )
  });
  componentWillMount() {
    const { current_Date, timestamp } = this.state;
    console.log("dateeee>>" + timestamp);
    db.transaction(tx => {
      tx.executeSql(
        "select * from Drug where Date_Med=?",
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
      <View
        style={{ height: 0.2, width: "100%", backgroundColor: "#be8a59" }}
      />
    );
  };
  renderItem = ({ item }) => (
    <View style={{ backgroundColor: "#4ab3ac" }}>
      <Card title={"ชื่อยา : " + item.Name} titleStyle={{ fontSize: 30 }}>
        <ListItem
          title={"ช่วงเวลาทานยา : " + item.Eat}
          titleStyle={{ fontSize: 20 }}
          //leftAvatar={{ source: require("./img/med.png") }}
          leftAvatar={
            <Avatar
              size="large"
              rounded
              overlayContainerStyle={{ backgroundColor: "#FFFFFF" }}
              source={require("./img/med3.png")}
            />
          }
          // subtitle={item.Eat_Time}
          chevron
          bottomDivider
        />
        <Button
          buttonStyle={styles.button}
          icon={<Icon name="like" type="evilicon" color="#d7a46f" size={45} />}
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
            backgroundColor: "#267377"
          }}
          title="ทานเลย"
          titleStyle={{ fontSize: 22 }}
          onPress={() => {
            this.props.navigation.navigate("detail_d", { text_id: item.Id });
          }}
        />
      </Card>
    </View>
  );
  //showDate = () => {
  //var date = new Date().getDate();
  //var month = new Date().getMonth() + 1;
  //var year = new Date().getFullYear();
  //Alert.alert(year + "-" + month + "-" + date);
  //this.setState({ current_Date: year + "-" + month + "-" + date });
  //console.log("pok " + {this.state.current_Date});
  // };

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          backgroundColor: "#4ab3ac"
        }}
      >
        <View
          style={{
            alignItems: "center",
            backgroundColor: "#d7a46f",
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
            ยาที่ต้องทานในวันนี้
          </Text>
        </View>
        <ScrollView>
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
    color: "#FFFFFF",
    textShadowColor: "blue",
    flexDirection: "row",
    alignItems: "center",
    fontWeight: "bold",
    justifyContent: "center",
    flexDirection: "row",
    marginLeft: 3
  },
  button: {
    backgroundColor: "#be8a59",
    borderColor: "red",
    borderWidth: 5,
    borderRadius: 15
  }
});
