import React, { Component } from "react";
import { Card } from "react-native-elements";
import InteractiveCard, {
  Content,
  Header
} from "react-native-interactive-card";
import { View, Text, StyleSheet } from "react-native";
const cardOptions = { overlayOpacity: 1 };

const contentOptions = { enterFrom: "right" };
export default class Tesrcard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <InteractiveCard {...cardOptions}>
        <Header>
          <View style={styles.headerStyle}>
            <Text style={styles.text}>Header</Text>
          </View>
        </Header>
        <Content {...contentOptions}>
          <View style={styles.contentStyle}>
            <Text style={styles.textStyle}>Content</Text>
          </View>
          <View style={styles.contentStyle}>
            <Text style={styles.textStyle}>Content</Text>
          </View>
        </Content>
      </InteractiveCard>
    );
  }
}
const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: "#68E9FF",
    padding: 30,
    marginBottom: 10,
    borderRadius: 5
  },
  textStyle: {
    fontSize: 40,
    opacity: 0.6,
    textAlign: "center",
    fontWeight: "bold"
  },
  contentStyle: {
    width: "90%",
    padding: 50,
    backgroundColor: "#E85F53"
  }
});
