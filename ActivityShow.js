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
import { ListItem, Card, Icon } from "react-native-elements";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import * as SQLite from "expo-sqlite";
const dba = SQLite.openDatabase("Activity.db");

export default class ActivityShow extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      backgroundColor: "#267377"
    },
    headerTitle: () => <Text style={styles.header}>กิจกรรมที่บันทึกไว้</Text>,

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
    dba.transaction(tx => {
      tx.executeSql("select * from Activity ", [], (tx, results) => {
        console.log(JSON.stringify(results));
        var temp = [];
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
          title={item.Name_A}
          titleStyle={{ fontSize: 22, fontWeight: "bold" }}
          subtitleStyle={{ fontSize: 17 }}
          //rightTitle="รายละเอียด"
          subtitle={"สถานที่ : " + item.Place_A}
          leftAvatar={{ source: require("./img/true_5.png") }}

          // chevron
          //bottomDivider
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
            this.props.navigation.navigate("detailactivity", {
              text_id: item.Id_A
            });
          }}
        />
      </View>
    </Card>
  );

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#5f9b9e" }}>
        <View style={{ flex: 1, backgroundColor: "#5f9b9e" }}>
          <FlatList
            data={this.state.FlatListItems}
            keyExtractor={(item, index) => index.toString()}
            //readValue={this.readValue}
            //onContentSizeChange={() => {
            //this.readValue;
            //}}
            renderItem={this.renderItem}
          />
        </View>
        <TouchableOpacity
          activeOpacity={3.0}
          onPress={() => {
            this.props.navigation.navigate("activity");
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
    fontSize: 18,
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
