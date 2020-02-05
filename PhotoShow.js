import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  Button,
  ScrollView
} from "react-native";
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("Image3.db");

import { ListItem, Card, Icon } from "react-native-elements";

export default class PhotoShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text_id: "",
      name: "",
      relation: ""
    };
  }
  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      backgroundColor: "#267377"
    },
    headerTitle: () => <Text style={styles.header}>ข้อมูลบุคคลในครอบครัว</Text>,
    headerRight: () => (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("photoadd");
        }}
      >
        <Image
          style={{ width: 35, height: 35, marginRight: 8 }}
          source={require("./img/add.png")}
        />
      </TouchableOpacity>
    )
  });
  componentWillMount() {
    db.transaction(tx => {
      tx.executeSql("select * from Image4 ", [], (tx, results) => {
        console.log(JSON.stringify(results));
        var temp = [];
        this.setState({
          count: results.rows.length
        });
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
          // this.setState({

          // });
          // console.log("temp :" + temp.Id);
        }
        this.setState({
          FlatListItems: temp
        });
      });
    });
  }
  renderItem = ({ item }) => (
    <View style={{ backgroundColor: "#a4b3ac", margin: 10, borderRadius: 10 }}>
      <View style={{ alignItems: "center" }}>
        <Image
          style={{
            marginTop: 10,
            width: 150,
            height: 150,
            borderRadius: 10
          }}
          source={{ uri: item.Image }}
        />
      </View>
      <View style={{ margin: 7, alignItems: "center" }}>
        <Text style={{ fontSize: 30, fontWeight: "bold", color: "#267377" }}>
          {item.Nickname}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate("editphoto", {
            text_id: item.Id
          });
        }}
      >
        <View style={{ backgroundColor: "#be8a59", alignItems: "center" }}>
          <Button
            // buttonStyle={styles.button}
            icon={<Icon name="click" color="#ffffff" />}
            buttonStyle={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0
            }}
            title="ดูข้อมูล"
            color="#267377"
            onPress={() => {
              this.props.navigation.navigate("editphoto", {
                text_id: item.Id
              });
            }}
          />
        </View>
      </TouchableOpacity>
    </View>
  );

  render() {
    return (
      <ScrollView>
        <View style={{ backgroundColor: "#5f9b9e", flex: 1 }}>
          <FlatList
            data={this.state.FlatListItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this.renderItem}
          />
        </View>
      </ScrollView>
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
  }
});
