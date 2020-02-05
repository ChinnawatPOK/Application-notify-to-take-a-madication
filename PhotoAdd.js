import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Picker,
  ScrollView,
  TextInput,
  Button,
  Alert,
  FlatList,
  Dimensions,
  TouchableOpacity
} from "react-native";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import { Icon, Card, ListItem } from "react-native-elements";
import * as Permissions from "expo-permissions";
import { Input } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import Swiper from "react-native-swiper";
import DatePicker from "react-native-datepicker";
import * as SQLite from "expo-sqlite";
const dbi = SQLite.openDatabase("Image3.db");
const { width: screenWidth } = Dimensions.get("window");

export default class PhotoAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nick_name: "",
      image: "",
      relation: ""
    };
  }
  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      backgroundColor: "#267377"
    },
    headerTitle: () => (
      <Text style={{ fontSize: 20, color: "#FFFFFF", fontWeight: "bold" }}>
        เพิ่มรูปภาพ
      </Text>
    )
  });

  componentWillMount() {
    dbi.transaction(tx => {
      tx.executeSql(
        "create table if not exists Image4 (Id integer primary key AUTOINCREMENT,Nickname text,Relation text,Image text);"
      );
    });
    dbi.transaction(tx => {
      tx.executeSql("select * from Image4 ", [], (tx, results) => {
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
  insert = () => {
    console.log("do insert");
    const { image, nick_name, relation } = this.state;
    if (image == "" && nick_name == "" && relation == "") {
      Alert.alert("กรุณากรอกข้อมูล");
    } else {
      if (image) {
        if (nick_name) {
          if (relation) {
            dbi.transaction(tx => {
              tx.executeSql(
                "insert into Image4(Nickname,Relation,Image) values (?,?,?)",
                [nick_name, relation, image],
                (tx, results) => {
                  console.log(JSON.stringify(results));
                  if (results.rowsAffected > 0) {
                    Alert.alert("บันทึกข้อมูลสำเร็จ");
                    this.props.navigation.navigate("choice");
                  }
                }
              );
              // //อย่าลืมลบออก แค่แสดงชั่วคราว
              // tx.executeSql("select * from Activity ", [], (tx, results) => {
              //   console.log(JSON.stringify(results));
              // });
            });
          } else {
            Alert.alert("กรุณาใส่ความสัมพันธ์กับผู้ป่วย");
          }
        } else {
          Alert.alert("กรุณาใส่ชื่อ");
        }
      } else {
        Alert.alert("กรุณาถ่ายรูป");
      }
    }
  };
  //อนุญาติให้ใช้อัลบั้ม
  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  //อนุญาติให้ใช้กล้อง
  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasPermission: status === "granted" });
  }

  _getPhotoLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });
    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  takePicture = async () => {
    const { cancelled, uri } = await ImagePicker.launchCameraAsync({
      allowsEditing: false
    });
    // let photo = await this.camera.takePictureAsync();
    console.log(uri);
    this.setState({ image: uri });
  };

  _renderItem({ item, index }, parallaxProps) {
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={{ uri: item.Image }}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0}
          {...parallaxProps}
        />
        <Text style={styles.title}>{item.Nickname}</Text>
        <Text style={styles.title}>{item.Relation}</Text>
      </View>
    );
  }

  render() {
    const { hasPermission, image } = this.state;
    if (hasPermission === null) {
      return <View />;
    } else if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <ScrollView>
          <View style={{ flex: 1, backgroundColor: "#a4b3ac" }}>
            <View style={{ alignItems: "center" }}>
              <Image
                style={{
                  marginTop: 10,
                  width: 250,
                  height: 250,
                  borderRadius: 30
                }}
                source={{ uri: this.state.image }}
              />
            </View>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <TouchableOpacity onPress={this.takePicture}>
                <Image
                  style={{
                    width: 60,
                    height: 60
                  }}
                  source={require("./img/camera1.png")}
                />
              </TouchableOpacity>
              <View style={{ flexDirection: "column" }}>
                <Text> | </Text>
                <Text> | </Text>
                <Text> | </Text>
              </View>
              <TouchableOpacity onPress={this._getPhotoLibrary}>
                <Image
                  style={{
                    width: 60,
                    height: 60
                  }}
                  source={require("./img/gal1.png")}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                backgroundColor: "#d7a46f",
                borderRadius: 20,
                margin: 10,
                padding: 20
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                กรุณาใส่ชื่อ *
              </Text>

              <Input
                placeholder="   กรุณาใส่ชื่อ"
                placeholderTextColor="#267377"
                leftIcon={<Icon name="add" size={24} color="#267377" />}
                value={this.state.nick_name.toString()}
                onChangeText={nick_name => this.setState({ nick_name })}
              />
              <View style={{ marginBottom: 20 }} />
            </View>
            <View
              style={{
                backgroundColor: "#d7a46f",
                borderRadius: 20,
                margin: 10,
                padding: 20
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                กรุณาใส่ความสัมพันธ์กับผู้ป่วย *
              </Text>
              <Picker
                style={{ width: 200 }}
                selectedValue={this.state.relation} //เหมือน placeholder
                onValueChange={relation => this.setState({ relation })}
                mode="dropdown"
              >
                <Picker.Item label="ลูกชาย" value="ลูกชาย" />
                <Picker.Item label="ลูกสาว" value="ลูกสาว" />
                <Picker.Item label="น้อง" value="น้อง" />
                <Picker.Item label="พี่" value="พี่" />
                <Picker.Item label="หลาน" value="หลาน" />
                <Picker.Item label="ลูกเขย" value="ลูกเขย" />
                <Picker.Item label="ลูกสะใภ้" value="ลูกสะใภ้" />
                <Picker.Item label="ญาติ" value="ญาติ" />
                <Picker.Item label="เพื่อนบ้าน" value="เพื่อนบ้าน" />
              </Picker>
            </View>

            <TouchableOpacity onPress={this.insert}>
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
                    style={{
                      fontWeight: "bold",
                      fontSize: 24,
                      color: "#FFFFFF"
                    }}
                  >
                    บันทึก
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            {/* <Carousel
              sliderWidth={screenWidth}
              sliderHeight={screenWidth}
              itemWidth={screenWidth - 60}
              data={this.state.FlatListItems}
              renderItem={this._renderItem}
              hasParallaxImages={true}
            /> */}
          </View>
        </ScrollView>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d7a46f",
    flexDirection: "column",
    marginBottom: 20
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: "white",
    borderRadius: 1
  },
  item: {
    // width: screenWidth - 60,
    width: undefined,
    height: 500,
    backgroundColor: "#5f9b9e"
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover"
  }
});
