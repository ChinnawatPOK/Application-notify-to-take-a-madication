import * as React from "react";
import {
  Button,
  View,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  Keyboard
} from "react-native";
import { Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
//import {Dimensions} from 'react-native';
import { createAppContainer, SafeAreaView } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
//import { Camera } from 'expo-camera';
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import * as SQLite from "expo-sqlite";
import { ScrollView } from "react-native-gesture-handler";
const dbu = SQLite.openDatabase("Profile.db");

export default class ProfileAdd extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      backgroundColor: "#415b89"
    }
  });
  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      backgroundColor: "#267377"
    },
    headerTitle: () => (
      <Text style={{ fontSize: 26, color: "white", fontWeight: "bold" }}>
        {" "}
        กรุณากรอกข้อมูลส่วนตัว
      </Text>
    )
  });

  constructor(props) {
    super(props);
    this.state = {
      hasPermission: null,
      hasCameraPermission: null,
      image: "",
      name: "",
      surname: "",
      age: "",
      tel: "",
      disease: "",
      nickname: ""
    };
  }
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
  test = () => {
    console.log("Name is " + this.state.tel);
  };

  InsertToDb = () => {
    const { name, surname, nickname, age, tel, disease, image } = this.state;
    if (
      name == "" &&
      surname == "" &&
      nickname == "" &&
      age == "" &&
      tel == "" &&
      disease == "" &&
      image == ""
    ) {
      Alert.alert("กรุณากรอกข้อมูล");
    } else {
      if (image) {
        if (name) {
          if (surname) {
            if (nickname) {
              if (age) {
                if (disease) {
                  if (tel) {
                    dbu.transaction(txu => {
                      txu.executeSql(
                        "insert into Profile(Name_P,Sur_P,Nick_P,Age_P,Tel_P,Disease_P,Img_P ) values (?,?,?,?,?,?,?)",
                        [name, surname, nickname, age, tel, disease, image],
                        (txu, results) => {
                          console.log(JSON.stringify(results));
                          // console.log("length " + results.rowsAffected);
                          if (results.rowsAffected > 0) {
                            Alert.alert("บันทึกประวัติผู้ป่วยแล้ว");
                            this.props.navigation.navigate("choice");
                          }
                        }
                      );
                      //อย่าลืมลบออก แค่แสดงชั่วคราว
                      txu.executeSql(
                        "select * from Profile ",
                        [],
                        (txu, results) => {
                          console.log(JSON.stringify(results));
                        }
                      );
                    });
                  } else {
                    Alert.alert("กรุณาใส่เบอร์ติดต่อญาติ");
                  }
                } else {
                  Alert.alert("กรุณาใส่โรคประจำตัว");
                }
              } else {
                Alert.alert("กรุณาใส่อายุผู้ป่วย");
              }
            } else {
              Alert.alert("กรุณาใส่ชื่อเล่นผู้ป่วย");
            }
          } else {
            Alert.alert("กรุณาใส่นามสกุลผู้ป่วย");
          }
        } else {
          Alert.alert("กรุณาใส่ชื่อผู้ป่วย");
        }
      } else {
        Alert.alert("กรุณาใส่ภาพผู้ป่วย");
      }
    }
    // ทดลองลบข้อมูล
    //   txu.executeSql(
    //     "delete from Profile where Age_P=? ",
    //     ["32"],
    //     (txu, results) => {
    //       console.log(JSON.stringify(results));
    //     }
    //   );
    // });
  };

  render() {
    const { hasPermission, image } = this.state;
    if (hasPermission === null) {
      return <View />;
    } else if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <ScrollView>
          <View
            style={{
              backgroundColor: "#2d4f56",
              flex: 1,
              flexDirection: "column"
            }}
          >
            <View
              style={{
                backgroundColor: "#5f9b9e",
                margin: 10,
                borderRadius: 12
              }}
            >
              <View style={{ alignItems: "center" }}>
                <Image
                  style={{
                    marginTop: 10,
                    width: 220,
                    height: 220,
                    borderRadius: 40
                  }}
                  source={{ uri: this.state.image }}
                />
                <View style={{ flexDirection: "row", marginBottom: 8 }}>
                  <TouchableOpacity onPress={this.takePicture}>
                    <Image
                      style={{ width: 60, height: 60 }}
                      source={require("./img/cam1.png")}
                    />
                  </TouchableOpacity>
                  <View
                    style={{
                      flexDirection: "column",
                      justifyContent: "center"
                    }}
                  >
                    <Text style={{ color: "white", fontSize: 35 }}> | </Text>
                  </View>
                  <TouchableOpacity onPress={this._getPhotoLibrary}>
                    <Image
                      style={{ width: 56, height: 56, marginTop: 6 }}
                      source={require("./img/album1.png")}
                    />
                  </TouchableOpacity>
                  {/* <Button title="camera" onPress={this.takePicture} />
              <Button title="gallery" onPress={this._getPhotoLibrary} /> */}
                </View>
              </View>
            </View>
            <View style={{ marginTop: -10 }}>
              <View style={{ marginTop: 4 }}>
                <Input
                  placeholder="    กรุณาใส่ชื่อผู้ป่วย"
                  leftIcon={<Icon name="plus" size={25} color="#d7a46f" />}
                  placeholderTextColor="#be8a59"
                  value={this.state.name.toString()}
                  editable
                  maxLength={20}
                  onChangeText={name => this.setState({ name })}
                />
                {/* <Input
            placeholder="    ตั้งชื่อผู้ใช้ (User)"
            leftIcon={<Icon name="user" size={25} color="#60bc71" />}
            placeholderTextColor="#a4b3ac"
            editable
            maxLength={20}
            onChangeText={user_u => this.setState({ user_u })}
          /> */}
              </View>
              <View style={{ marginTop: 10 }}>
                <Input
                  placeholder="    กรุณาใส่นามสกุลผู้ป่วย"
                  leftIcon={<Icon name="plus" size={25} color="#d7a46f" />}
                  placeholderTextColor="#be8a59"
                  value={this.state.surname.toString()}
                  editable
                  maxLength={20}
                  onChangeText={surname => this.setState({ surname })}
                />
              </View>
              <View style={{ marginTop: 10 }}>
                <Input
                  placeholder="    กรุณาใส่ชื่อเล่นผู้ป่วย"
                  leftIcon={<Icon name="plus" size={25} color="#d7a46f" />}
                  placeholderTextColor="#be8a59"
                  value={this.state.nickname.toString()}
                  editable
                  maxLength={20}
                  onChangeText={nickname => this.setState({ nickname })}
                />
              </View>
              <View style={{ marginTop: 10 }}>
                <Input
                  placeholder="    กรุณาใส่อายุผู้ป่วย"
                  leftIcon={<Icon name="plus" size={25} color="#d7a46f" />}
                  placeholderTextColor="#be8a59"
                  value={this.state.age.toString()}
                  editable
                  maxLength={3}
                  keyboardType={"numeric"}
                  onChangeText={age => this.setState({ age })}
                />
              </View>
              <View style={{ marginTop: 10 }}>
                <Input
                  placeholder="    กรุณาใส่โรคผู้ป่วย"
                  leftIcon={<Icon name="plus" size={25} color="#d7a46f" />}
                  placeholderTextColor="#be8a59"
                  value={this.state.disease.toString()}
                  editable
                  maxLength={20}
                  onChangeText={disease => this.setState({ disease })}
                />
              </View>
              <View style={{ marginTop: 10 }}>
                <Input
                  placeholder="    กรุณาใส่เบอร์ติดต่อญาติ"
                  leftIcon={<Icon name="plus" size={25} color="#d7a46f" />}
                  placeholderTextColor="#be8a59"
                  value={this.state.tel.toString()}
                  editable
                  maxLength={10}
                  keyboardType={"numeric"}
                  onChangeText={tel => this.setState({ tel })}
                />
              </View>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "center"
              }}
            >
              <TouchableOpacity onPress={this.InsertToDb}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#be8a59",
                    marginTop: 9,
                    width: 135,
                    height: 49,
                    borderRadius: 10
                  }}
                >
                  <Text
                    style={{ fontSize: 22, color: "black", fontWeight: "bold" }}
                  >
                    บันทึก
                  </Text>
                </View>
              </TouchableOpacity>
              {/* <Button
            title="บันทึก"
            onPress={this.InsertToDb}
          /> */}
            </View>
          </View>
        </ScrollView>
      );
    }
  }
}
const styles = StyleSheet.create({
  button_1: {
    width: 200,
    height: 160,
    resizeMode: "stretch",
    marginLeft: 10
  }
});
