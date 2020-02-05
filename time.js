import React, { Component } from "react";
import { View, Text, Picker, ScrollView, Button, Alert,Image,TouchableOpacity } from "react-native";
import * as SQLite from "expo-sqlite";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
const dbs = SQLite.openDatabase("SetTime.db");
const dbd = SQLite.openDatabase("Drug.db");
var temp = [];
var temp2 = [];
var length;
const SLASH_DMY = "MMMM DD, YYYY";
const moment = require("moment");
class time extends Component {

  


  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      backgroundColor: "#267377"
    },
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
    ),
    headerTitle: () => <Text style={{color: "#FFFFFF",
    fontSize: 20,fontWeight: "bold"}}>ตั้งค่าเวลาการเตือนทานยา</Text>
  });
  constructor(props) {
    super(props);
    this.state = {
      select_morning: "",
      select_lanuch: "",
      select_dinner: "",
      select_goodnight: "",
      select_morning_old: "",
      select_lanuch_old: [],
      select_dinner_old: "",
      select_goodnight_old: ""
    };
    this.update_morning = this.update_morning.bind(this);
    this.update_lanuch = this.update_lanuch.bind(this);
    this.update_dinner = this.update_dinner.bind(this);
    this.update_goodnight = this.update_goodnight.bind(this);
    // this.select1=this.select1.bind(this)
    // this.insertt=this.insertt.bind(this)
    this.handleClickStartStop = this.handleClickStartStop.bind(this);
    this.confirm = this.confirm.bind(this);
    // this.time_old=this.time_old.bind(this)
    // this.await_setstate_time=this.await_setstate_time.bind(this)
  }

  componentDidMount() {
    this.registerForPushNotificationsAsync();
    dbs.transaction(tx => {
      tx.executeSql(
        // "select * from SetTime where number_no=?",
        // ["1"],
        "select * from SetTime ",
        [],
        (tx, results) => {
          length = results.rows.length;
        console.log(">>>" + length);
        if (length >= "1") {
      
          this.setState({
                select_morning_old: results.rows.item(0).time_morning
              });
              this.setState({
                select_lanuch_old: results.rows.item(0).time_lanuch
              });
              this.setState({
                select_dinner_old: results.rows.item(0).time_dinner
              });
              this.setState({
                select_goodnight_old: results.rows.item(0).time_goodnight
              });
        } else if (length == "0") {
          
          dbs.transaction(tx => {
            tx.executeSql(
              "insert into SetTime(number_no ,time_morning ,time_lanuch ,time_dinner ,time_goodnight ) values (?,?,?,?,?)",
              ["1","08:00:00","12:00:00","17:00:00","20:00:00"],
              (tx, results) => {
                console.log(JSON.stringify(results));
              }
            );
            //อย่าลืมลบออก แค่แสดงชั่วคราว
            tx.executeSql(
              "select * from SetTime",
              [],
              (tx, results) => {
                console.log(JSON.stringify(results));
              }
            );
          });
        }
          
          // this.setState({
          //   select_morning_old: results.rows.item(0).time_morning
          // });
          // this.setState({
          //   select_lanuch_old: results.rows.item(0).time_lanuch
          // });
          // this.setState({
          //   select_dinner_old: results.rows.item(0).time_dinner
          // });
          // this.setState({
          //   select_goodnight_old: results.rows.item(0).time_goodnight
          // });
          
        }
      );
    });
    
  
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

  componentWillUnmount() {
    dbs.transaction(tx => {
      tx.executeSql(
        "create table if not exists SetTime (number_no text,time_morning text,time_lanuch text,time_dinner text,time_goodnight text);"
      );
    });
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

  handleClickStartStop() {
    const {
      select_morning,
      select_lanuch,
      select_dinner,
      select_goodnight
    } = this.state;
    const stampNow = moment().format(SLASH_DMY);
    let expiredDate = "";

    for (let i = 0; i < 10; i++) {
      if (temp[i] == "1") {
        expiredDate = new Date(stampNow + " " + select_morning);
        this.sendLocalNotification({ time: expiredDate });
      } else if (temp[i] == "2") {
        expiredDate = new Date(stampNow + " " + select_lanuch);
        this.sendLocalNotification({ time: expiredDate });
      } else if (temp[i] == "3") {
        expiredDate = new Date(stampNow + " " + select_dinner);
        this.sendLocalNotification({ time: expiredDate });
      } else if (temp[i] == "4") {
        expiredDate = new Date(stampNow + " " + select_goodnight);
        console.log(expiredDate);
        this.sendLocalNotification({ time: expiredDate });
      }
    }
  }

  // select1(){
  //   dbs.transaction(tx => {
  //       tx.executeSql(
  //           "select * from SetTime ",[],(tx,results) => {
  //               console.log(JSON.stringify(results));
  //           }
  //       )
  //   })
  // }
  select1() {
    dbd.transaction(tx => {
      tx.executeSql("select * from Drug ", [], (tx, results) => {
        console.log(JSON.stringify(results));
      });
    });
  }

  update_morning() {
    const { select_morning } = this.state;
    dbs.transaction(tx => {
      tx.executeSql(
        "Update SetTime SET time_morning =? where number_no=?",
        [select_morning, "1"],
        (tx, results) => {
          console.log(JSON.stringify(results));
          console.log(">>>" + results.rows.length);
        }
      );
    });
    dbs.transaction(tx => {
      tx.executeSql(
        "select * from SetTime where number_no=?",
        ["1"],
        (tx, results) => {
          console.log(results.rows.item(0).time_morning);
          this.setState({ select_morning: results.rows.item(0).time_morning });
          this.setState({
            select_morning_old: results.rows.item(0).time_morning
          });
        }
      );
    });
    this.confirm()
  }
  update_lanuch() {
    const { select_lanuch } = this.state;
    dbs.transaction(tx => {
      tx.executeSql(
        "Update SetTime SET time_lanuch =? where number_no=?",
        [select_lanuch, "1"],
        (tx, results) => {
          console.log(JSON.stringify(results));
          console.log(">>>" + results.rows.length);
        }
      );
    });
    dbs.transaction(tx => {
      tx.executeSql(
        "select * from SetTime where number_no=?",
        ["1"],
        (tx, results) => {
          console.log(results.rows.item(0).time_lanuch);
          this.setState({ select_lanuch: results.rows.item(0).time_lanuch });
          this.setState({
            select_lanuch_old: results.rows.item(0).time_lanuch
          });
        }
      );
    });
    this.confirm()
  }
  update_dinner() {
    const { select_dinner } = this.state;
    dbs.transaction(tx => {
      tx.executeSql(
        "Update SetTime SET time_dinner =? where number_no=?",
        [select_dinner, "1"],
        (tx, results) => {
          console.log(JSON.stringify(results));
          console.log(">>>" + results.rows.length);
        }
      );
    });
    dbs.transaction(tx => {
      tx.executeSql(
        "select * from SetTime where number_no=?",
        ["1"],
        (tx, results) => {
          console.log(results.rows.item(0).time_dinner);
          this.setState({ select_dinner: results.rows.item(0).time_dinner });
          this.setState({
            select_dinner_old: results.rows.item(0).time_dinner
          });
        }
      );
    });
    this.confirm()
  }
  update_goodnight() {
    const { select_goodnight } = this.state;
    dbs.transaction(tx => {
      tx.executeSql(
        "Update SetTime SET time_goodnight =? where number_no=?",
        [select_goodnight, "1"],
        (tx, results) => {
          console.log(JSON.stringify(results));
          console.log(">>>" + results.rows.length);
        }
      );
    });
    dbs.transaction(tx => {
      tx.executeSql(
        "select * from SetTime where number_no=?",
        ["1"],
        (tx, results) => {
          console.log(results.rows.item(0).time_goodnight);
          this.setState({
            select_goodnight: results.rows.item(0).time_goodnight
          });
          this.setState({
            select_goodnight_old: results.rows.item(0).time_goodnight
          });
        }
      );
    });
    this.confirm()
  }

  confirm() {
    console.log("confirm");
    const stampNow = moment().format(SLASH_DMY);
    dbd.transaction(tx => {
      tx.executeSql(
        "select Eat_Time from Drug where Date_Med=?",
        [stampNow],
        (tx, results) => {
          console.log(JSON.stringify(results));
          console.log(">>>" + results.rows.length);
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i).Eat_Time);
            {
              i == results.rows.length - 1 ? this.handleClickStartStop() : null;
            }
          }
          console.log("temp is " + temp[0]);
          console.log("temp is " + temp[1]);
        }
      );
    });
  }

  render() {
    const {select_morning,select_lanuch,select_dinner,select_goodnight}=this.state;
    const { select_morning_old,select_lanuch_old,select_dinner_old,select_goodnight_old }=this.state
  return (
      <ScrollView>
    <View style={{flex:1,backgroundColor:"#d7a46f"}}>
      
{/* เช้า */}
        <View style={{backgroundColor:"#a4b3ac",width:null,height:320,margin:20,marginTop:27,borderRadius:30}}>
        
          <View style={{flexDirection:"row",justifyContent:"space-between",backgroundColor:"#fb821f",height:60}}>
            <View style={{flexDirection:"row"}}>
            <Image
        style={{ width: 40, height: 40,marginTop:9,marginLeft:8,marginRight:-5}}
        source={require("./img/clock1.png")}
      />
            <Text style={{fontSize:28,marginLeft:20,marginTop:10,fontWeight:"bold",marginLeft:15}}>ตอนเช้า    </Text>
            </View>
            <Text style={{fontSize:22,marginRight:20,marginTop:18}}>{select_morning_old}</Text>
          </View>
        
       <View style={{marginTop:6,flexDirection:"row",justifyContent:"center",marginBottom:-30}}>
         {/* <Text style={{fontSize:15}}>  *กรุณาใส่เวลาถ้าต้องการแก้ไข</Text> */}
         <Image
        style={{ width: 100, height: 100}}
        source={require("./img/sun1.png")}
      />
       </View>
       <View style={{flex:1,flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
         <View>
      <Picker
               selectedValue={this.state.select_morning} //เหมือน placeholder
               onValueChange={select_morning => this.setState({ select_morning})}
              style={{ width: 100}}
              mode="dropdown"
            >
              <Picker.Item label="5.00" value="05:00:00" />
              <Picker.Item label="6.00" value="06:00:00" />
              <Picker.Item label="7.00" value="07:00:00" />
              <Picker.Item label="8.00" value="08:00:00" />
              <Picker.Item label="9.00" value="09:00:00" />
              <Picker.Item label="10.00" value="10:00:00" />
            </Picker>
            </View>
            <View>
            <Text style={{fontSize:25,fontWeight:"bold"}}>{select_morning}</Text>
            </View>
            <TouchableOpacity onPress={this.update_morning}>
            <View style={{width:130,height:50,backgroundColor:"#5f9b9e",borderRadius:10,flexDirection:"row",justifyContent:"center",alignItems:"center",marginRight:10}}>
            <Text style={{fontSize:25,fontWeight:"bold",color:"#1f3526"}}>ยืนยัน</Text>
            </View>
            </TouchableOpacity>
            </View>
            </View>
{/* จบเช้า */}
{/* กลางวัน */}
<View style={{backgroundColor:"#a4b3ac",width:null,height:320,margin:20,marginTop:15,borderRadius:30}}>
        
        <View style={{flexDirection:"row",justifyContent:"space-between",backgroundColor:"#fb821f",height:60}}>
          <View style={{flexDirection:"row"}}>
          <Image
      style={{ width: 40, height: 40,marginTop:9,marginLeft:8,marginRight:-5}}
      source={require("./img/clock1.png")}
    />
          <Text style={{fontSize:28,marginLeft:20,marginTop:10,fontWeight:"bold",marginLeft:15}}>ตอนกลางวัน    </Text>
          </View>
          <Text style={{fontSize:22,marginRight:20,marginTop:18}}>{select_lanuch_old}</Text>
        </View>
      
     <View style={{marginTop:6,flexDirection:"row",justifyContent:"center",marginBottom:-30}}>
       {/* <Text style={{fontSize:15}}>  *กรุณาใส่เวลาถ้าต้องการแก้ไข</Text> */}
       <Image
      style={{ width: 100, height: 100}}
      source={require("./img/sun2.png")}
    />
     </View>
     <View style={{flex:1,flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
       <View>
    <Picker
             selectedValue={this.state.select_lanuch} //เหมือน placeholder
             onValueChange={select_lanuch => this.setState({ select_lanuch})}
            style={{ width: 100}}
            mode="dropdown"
          >
            <Picker.Item label="11.00" value="11:00:00" />
            <Picker.Item label="12.00" value="12:00:00" />
            <Picker.Item label="13.00" value="13:00:00" />
            <Picker.Item label="14.00" value="14:00:00" />
          </Picker>
          </View>
          <View>
          <Text style={{fontSize:25,fontWeight:"bold"}}>{select_lanuch}</Text>
          </View>
          <TouchableOpacity onPress={this.update_lanuch}>
          <View style={{width:130,height:50,backgroundColor:"#5f9b9e",borderRadius:10,flexDirection:"row",justifyContent:"center",alignItems:"center",marginRight:10}}>
          <Text style={{fontSize:25,fontWeight:"bold",color:"#1f3526"}}>ยืนยัน</Text>
          </View>
          </TouchableOpacity>
          </View>
          </View>
{/* จบกลางวัน */}
            {/* <View style={{backgroundColor:"#5f9b9e",margin:10}}>
            <Button title="lanuch" onPress={this.update_lanuch}></Button>
            <View style={{flex:1,flexDirection:"row",alignItems:"flex-end",justifyContent:"space-around"}}>
        <Text style={{fontSize:15}}>{select_lanuch}</Text>
       <Text>{select_lanuch_old}</Text>
       </View>
            <Picker
               selectedValue={this.state.select_lanuch} //เหมือน placeholder
               onValueChange={select_lanuch => this.setState({ select_lanuch})}
              style={{ width: 100 }}
              mode="dropdown"
            >
              <Picker.Item label="11.00" value="11:00:00" />
              <Picker.Item label="12.00" value="12:00:00" />
              <Picker.Item label="13.00" value="13:00:00" />
            </Picker>
            </View> */}
{/* เย็น */}
    <View style={{backgroundColor:"#a4b3ac",width:null,height:320,margin:20,marginTop:15,borderRadius:30}}>
        
        <View style={{flexDirection:"row",justifyContent:"space-between",backgroundColor:"#fb821f",height:60}}>
          <View style={{flexDirection:"row"}}>
          <Image
      style={{ width: 40, height: 40,marginTop:9,marginLeft:8,marginRight:-5}}
      source={require("./img/clock1.png")}
    />
          <Text style={{fontSize:28,marginLeft:20,marginTop:10,fontWeight:"bold",marginLeft:15}}>ตอนเย็น    </Text>
          </View>
          <Text style={{fontSize:22,marginRight:20,marginTop:18}}>{select_dinner_old}</Text>
        </View>
      
     <View style={{marginTop:6,flexDirection:"row",justifyContent:"center",marginBottom:-30}}>
       {/* <Text style={{fontSize:15}}>  *กรุณาใส่เวลาถ้าต้องการแก้ไข</Text> */}
       <Image
      style={{ width: 100, height: 100}}
      source={require("./img/moon1.png")}
    />
     </View>
     <View style={{flex:1,flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
       <View>
    <Picker
             selectedValue={this.state.select_dinner} //เหมือน placeholder
             onValueChange={select_dinner => this.setState({ select_dinner})}
            style={{ width: 100}}
            mode="dropdown"
          >
            <Picker.Item label="16.00" value="16:00:00" />
            <Picker.Item label="17.00" value="17:00:00" />
            <Picker.Item label="18.00" value="18:00:00" />
            <Picker.Item label="19.00" value="19:00:00" />
            
          </Picker>
          </View>
          <View>
          <Text style={{fontSize:25,fontWeight:"bold"}}>{select_dinner}</Text>
          </View>
          <TouchableOpacity onPress={this.update_dinner}>
          <View style={{width:130,height:50,backgroundColor:"#5f9b9e",borderRadius:10,flexDirection:"row",justifyContent:"center",alignItems:"center",marginRight:10}}>
          <Text style={{fontSize:25,fontWeight:"bold",color:"#1f3526"}}>ยืนยัน</Text>
          </View>
          </TouchableOpacity>
          </View>
          </View>
{/* จบเย็น */}
            {/* <View style={{backgroundColor:"#5f9b9e",margin:10}}>
            <Button title="dinner" onPress={this.update_dinner}></Button>
            <View style={{flex:1,flexDirection:"row",alignItems:"flex-end",justifyContent:"space-around"}}>
        <Text style={{fontSize:15}}>{select_dinner}</Text>
       <Text>{select_dinner_old}</Text>
       </View>
            <Picker
               selectedValue={this.state.select_dinner} //เหมือน placeholder
               onValueChange={select_dinner => this.setState({ select_dinner})}
              style={{ width: 100 }}
              mode="dropdown"
            >
              <Picker.Item label="17.00" value="17:00:00" />
              <Picker.Item label="18.00" value="18:00:00" />
            </Picker>
            </View> */}
{/* ก่อนนอน */}
<View style={{backgroundColor:"#a4b3ac",width:null,height:320,margin:20,marginTop:15,borderRadius:30}}>
        
        <View style={{flexDirection:"row",justifyContent:"space-between",backgroundColor:"#fb821f",height:60}}>
          <View style={{flexDirection:"row"}}>
          <Image
      style={{ width: 40, height: 40,marginTop:9,marginLeft:8,marginRight:-5}}
      source={require("./img/clock1.png")}
    />
          <Text style={{fontSize:28,marginLeft:20,marginTop:10,fontWeight:"bold",marginLeft:15}}>ก่อนนอน    </Text>
          </View>
          <Text style={{fontSize:22,marginRight:20,marginTop:18}}>{select_goodnight_old}</Text>
        </View>
      
     <View style={{marginTop:6,flexDirection:"row",justifyContent:"center",marginBottom:-30}}>
       {/* <Text style={{fontSize:15}}>  *กรุณาใส่เวลาถ้าต้องการแก้ไข</Text> */}
       <Image
      style={{ width: 100, height: 100}}
      source={require("./img/moon2.png")}
    />
     </View>
     <View style={{flex:1,flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
       <View>
    <Picker
             selectedValue={this.state.select_goodnight} //เหมือน placeholder
             onValueChange={select_goodnight => this.setState({ select_goodnight})}
            style={{ width: 100}}
            mode="dropdown"
          >
             <Picker.Item label="20.00" value="20:00:00" />
              <Picker.Item label="21.00" value="21:00:00" />
              <Picker.Item label="22.00" value="22:00:00" />
              
          </Picker>
          </View>
          <View>
          <Text style={{fontSize:25,fontWeight:"bold"}}>{select_goodnight}</Text>
          </View>
          <TouchableOpacity onPress={this.update_goodnight}>
          <View style={{width:130,height:50,backgroundColor:"#5f9b9e",borderRadius:10,flexDirection:"row",justifyContent:"center",alignItems:"center",marginRight:10}}>
          <Text style={{fontSize:25,fontWeight:"bold",color:"#1f3526"}}>ยืนยัน</Text>
          </View>
          </TouchableOpacity>
          </View>
          </View>
{/* จบก่อนนอน */}
            {/* <View style={{backgroundColor:"#5f9b9e",margin:10}}>
            <Button title="goodnight" onPress={this.update_goodnight}></Button>
            <View style={{flex:1,flexDirection:"row",alignItems:"flex-end",justifyContent:"space-around"}}>
        <Text style={{fontSize:15}}>{select_goodnight}</Text>
       <Text>{select_goodnight_old}</Text>
       </View>
            <Picker
               selectedValue={this.state.select_goodnight} //เหมือน placeholder
               onValueChange={select_goodnight => this.setState({ select_goodnight})}
              style={{ width: 100 }}
              mode="dropdown"
            >
              <Picker.Item label="17.00" value="17:00:00" />
              <Picker.Item label="18.00" value="18:00:00" />
              <Picker.Item label="19.00" value="19:00:00" />
              <Picker.Item label="20.00" value="20:00:00" />
              <Picker.Item label="00.00" value="11:35:20" />
            </Picker>
            </View> */}
            {/* เอาไว้ดูข้อมูล <Button title="select" onPress={this.select1}></Button> */}
    </View>
    </ScrollView>
  );
}
}

export default time;
