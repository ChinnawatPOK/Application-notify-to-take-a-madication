import * as React from "react";
import { View, Text } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Home from "./Home";
import Menu from "./Menu";
import LogIn from "./LogIn";
import ChoiceAdd from "./ChoiceAdd";
import Register from "./Register";
import DrugAdd from "./DrugAdd";
import ActivityAdd from "./ActivityAdd";
import DrugShow from "./DrugShow";
import DetailDrug from "./DetailDrug";
import EditDrug from "./EditDrug";
import DrugDetail from "./DrugDetail";
import Detail_D from "./Detail_D";
import ActivityShow from "./ActivityShow";
import ActivityDetail from "./ActivityDetail";
import DetailActivity from "./DetailActivity";
import EditActivity from "./EditActivity";
import Detail_A from "./Detail_A";
import ProfileAdd from "./ProfileAdd";
import Detail_P from "./Detail_P";
import test_1 from "./test_1";
import PhotoAdd from "./PhotoAdd";
import Tesrcard from "./Tesrcard";
import PhotoShow from "./PhotoShow";
import PhotoDetail from "./PhotoDetail";
import EditPhoto from "./EditPhoto";
import time from "./time";

const RootStack = createStackNavigator(
  {
    homee: Home,
    Menuu: Menu,
    login: LogIn,
    choice: ChoiceAdd,
    register: Register,
    drugadd: DrugAdd,
    activity: ActivityAdd,
    drugshow: DrugShow,
    detaildrug: DetailDrug,
    editdrug: EditDrug,
    drugdetail: DrugDetail,
    detail_d: Detail_D,
    activityshow: ActivityShow,
    activitydetail: ActivityDetail,
    detailactivity: DetailActivity,
    editactivity: EditActivity,
    detail_a: Detail_A,
    profileadd: ProfileAdd,
    detail_p: Detail_P,
    test: test_1,
    photoadd: PhotoAdd,
    photoshow: PhotoShow,
    photodetail: PhotoDetail,
    editphoto: EditPhoto,
    timee: time
  },
  {
    initialRouteName: "homee"
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
