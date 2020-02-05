import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  Button
} from "react-native";
import { ListItem, Card, Icon, Avatar } from "react-native-elements";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("Drug.db");
const dbp = SQLite.openDatabase("Profile.db");
export default class DrugShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text_user: "",
      count: "",
      image: ""
    };
  }
  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      backgroundColor: "#267377"
    },
    headerTitle: () => <Text style={styles.header}>ยาที่บันทึกไว้</Text>,
    headerRight: () => (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("timee");
        }}
      >
        <Image
          //resizeMode
          style={{ width: 35, height: 35, marginRight: 8 }}
          source={require("./img/change.png")}
        />
      </TouchableOpacity>
    )
  });
  componentWillMount() {
    db.transaction(tx => {
      tx.executeSql("select * from Drug ", [], (tx, results) => {
        console.log(JSON.stringify(results));
        var temp = [];
        this.setState({
          count: results.rows.length
        });
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        this.setState({
          FlatListItems: temp
        });
      });
    });
  }
  ListViewItemSeparator = () => {
    return (
      <View
        style={{ height: 0.2, width: "100%", backgroundColor: "#808080" }}
      />
    );
  };
  renderItem = ({ item }) => (
    <Card>
      <View style={{ backgroundColor: "#d7a46f" }}>
        <ListItem
          titleStyle={{ fontSize: 22, fontWeight: "bold" }}
          title={item.Name}
          subtitleStyle={{ fontSize: 17 }}
          subtitle={"ช่วงเวลา : " + item.Eat}
          // leftAvatar={{ source: require("./img/med.png") }}
          leftAvatar={
            <Avatar
              size="medium"
              rounded
              overlayContainerStyle={{ backgroundColor: "#FFFFFF" }}
              source={require("./img/med.png")}
            />
          }
          onPress={() => {
            this.props.navigation.navigate("detaildrug", { text_id: item.Id });
          }}
        />
        <Button
          buttonStyle={styles.button}
          icon={<Icon name="click" color="#ffffff" />}
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0
          }}
          title="รายละเอียด >"
          color="#267377"
          onPress={() => {
            this.props.navigation.navigate("detaildrug", {
              text_id: item.Id
            });
          }}
        />
      </View>
    </Card>
  );
  // console.log(item.Name);
  //readValue = ({ item }) => {
  //console.log(">>>>>is");
  //};
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "5f9b9e" }}>
        <View style={{ flex: 1, backgroundColor: "#5f9b9e" }}>
          {/* <Text>{this.state.count}</Text> */}
          <FlatList
            data={this.state.FlatListItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this.renderItem}
          />
        </View>
        <TouchableOpacity
          activeOpacity={3.0}
          onPress={() => {
            this.props.navigation.navigate("drugadd");
          }}
          style={styles.TouchableOpacityStyle}
        >
          <Image
            source={require("./img/btn_add.png")}
            style={styles.FloatingButtonStyle}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  header: {
    flex: 1,
    fontSize: 22,
    color: "white",
    textShadowColor: "blue",
    flexDirection: "row",
    alignItems: "center",
    fontWeight: "bold",
    justifyContent: "center",
    flexDirection: "row",
    marginLeft: 30
  },
  TouchableOpacityStyle: {
    position: "absolute",
    width: 70,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    right: 30,
    bottom: 30
  },

  FloatingButtonStyle: {
    resizeMode: "contain",
    width: 70,
    height: 70
    //backgroundColor:'black'
  }
});
