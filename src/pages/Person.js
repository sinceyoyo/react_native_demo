import React, { Component, } from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import CommonStyle from '../component/CommonStyle'
import Icon from 'react-native-vector-icons/Ionicons'
class Person extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: '我的',
      tabBarLabel: '我的',
      headerStyle: {
        backgroundColor: '#0f0'
      },
      headerTitleStyle: {
        fontSize: 16
      },

      headerLeft: (<View></View>),
      tabBarVisible: true,
      headerTintColor: '#00f',
      tabBarIcon: ({ tintColor, focused }) => (<Icon name="md-contact" size={24} color={focused ? tintColor : '#9c9c9c'} />)
    }
  };

  constructor(props) {
    super(props)
    this.state = {
      data: []
    }

    this.navigate = this.props.navigation.navigate;
    this.goToTestPage = this.goToTestPage.bind(this)
  }

  goToTestPage(routers) {
    this.navigate(routers)
  }

  renderItems(routers, title) {
    return (
      <TouchableOpacity
        onPress={() => this.goToTestPage(routers)}
        style={styles.btn}>
        <Text style={styles.btnText}>{title}</Text>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderItems('BaiduMap', '百度地图')}
        {this.renderItems('Photos', '图片展示')}
        {this.renderItems('Search', '搜索')}
        {this.renderItems('TextInputTest', '多个TextInput')}
        {this.renderItems('ReceiveData', 'RN与原生数据传递')}
        {this.renderItems('VideoPlayer', '视频播放')}
        {this.renderItems('VideoPlayer', '音乐播放')}
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    paddingVertical: 10,
    // paddingRight: 10,
    // paddingLeft: 10,
  },
  btn: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    // alignItems: 'center',
    padding: 10,
    // borderRadius: 5,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  btnText: {
    color: '#333'
  }
})
export default Person