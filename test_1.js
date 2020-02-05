import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView
} from "react-native";
import { Card } from "react-native-elements";
export default class test_1 extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      backgroundColor: "#267377"
    },
    headerTitle: () => (
      <Text style={{ fontSize: 24, fontWeight: "bold", color: "#FFFFFF" }}>
        ข้อตกลงในการใช้ซอฟต์แวร์
      </Text>
    ),
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

  render() {
    return (
      <View style={{ backgroundColor: "#5f9b9e", flex: 1, margin: 5 }}>
        <Card>
          <ScrollView>
            <View>
              <View style={{ flexDirection: "row" }}>
                <Image
                  resizeMode="stretch"
                  style={{
                    width: 35,
                    height: 35
                  }}
                  source={require("./img/copy.png")}
                />
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    margin: 10,
                    color: "#000000"
                  }}
                >
                  ข้อตกลงในการใช้ซอฟต์แวร์
                </Text>
              </View>
              <Text style={{ fontSize: 20 }}>
                ซอฟต์แวร์นี้เป็นผลงานที่พัฒนาขึ้นโดย …..นาย ชินนวัตร แก้วฉิม,
                นายศุภวุฒิ อารักษ์ และ นาย ชินนวุฒิ แก้วฉิม ….. จาก
                …..มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขต กำแพงแสน….. ภายใต้การดูแลของ
                ….. อาจารย์ ดร.วรัทภพ ธภัทรสุวรรณ….. ภายใต้โครงการ
                …..แอปพลิเคชันสำหรับช่วยเหลือผู้ป่วยอัลไซเมอร์ระยะเบื้องต้น
                ด้วยการแจ้งเตือน และจดจำใบหน้าบุคคลในครอบครัวด้วย
                การรู้จำใบหน้า….. ซึ่งสนันสนุนโดย
                สำนักงานพัฒนาวิทยาศาสตร์และเทคโนโลยีแห่งชาติ
                โดยมีวัตถุประสงค์เพื่อส่งเสริมให้นักเรียนและ
                นักศึกษาได้เรียนรู้และฝึกทักษะในการพัฒนาซอฟต์แวร์
                ลิขสิทธิ์ของซอฟต์แวร์นี้จึงเป็นของผู้พัฒนา
                ซึ่งผู้พัฒนาได้อนุญาติให้สำนักงาน
                พัฒนาวิทยาศาสตร์และเทคโนโลยีแห่งชาติ เผยแพร่ซอฟต์แวร์นี้ตาม
                “ต้นฉบับ” โดยไม่มีการแก้ไขดัดแปลงใดๆ ทั้งสิ้น ให้แก่บุคคลทั่ว
                ไปได้ใช้เพื่อประโยชน์ส่วนบุคคลหรือประโยชน์ทางการศึกษาที่ไม่มีวัตถุประสงค์ในเชิงพาณิชย์
                โดยไม่มีคิดค่าตอบแทนการใช้ซอฟต์แวร์ ดังนั้น
                สำนักงานพัฒนาวิทยาศาสตร์และเทคโนโลยีแห่งชาติ
                จึงไม่มีหน้าที่ในการดูแล บำรุงรักษา จัดการอบรมการใช้งาน
                หรือพัฒนา ประสิทธิภาพซอฟต์แวร์
                รวมทั้งไม่รับรองความถูกต้องหรือประสิทธิภาพการทำงานของซอฟต์แวร์
                ตลอดจนไม่รับประกันความเสียหายต่างๆ
                อันเกิดจากการใช้ซอฟต์แวร์นี้ทั้งสิ้น
              </Text>
            </View>
          </ScrollView>
        </Card>
      </View>
    );
  }
}
