import React, { Component, } from 'react'
import { View, Text, TouchableOpacity, Image, Dimensions, TouchableWithoutFeedback, FlatList, Platform, NativeModules } from 'react-native'

import CommonStyle from '../component/CommonStyle'
let ImagePicker = NativeModules.PickerModule
import BaseContainer from '../component/BaseContainer'
@BaseContainer("上传图片")
class Photos extends Component {

  constructor(props) {
    super(props)
    this.state = {
      images: ['22']
    }
    this.navigate = this.props.navigation.navigate;

    this.addPotos = this.addPotos.bind(this)
    this.renderHeader = this.renderHeader.bind(this)
    this.renderImages = this.renderImages.bind(this)
    this.renderImageList = this.renderImageList.bind(this)
  }

  getData(res) {
    let data = JSON.parse(res);
    data.unshift('22')
    this.setState({
      images: [...data]
    }, () => console.log('this.state.images', this.state.images))
  }

  addPotos() {
    if (Platform.OS === 'android') {
      // alert('打开安卓原生相册')
      let json = JSON.stringify(this.state.images)
      ImagePicker.openPicker(json).then((res) =>
        this.getData(res))
    } else {
      this.navigate('PhotosSelect')
    }
  }

  renderHeader() {
    return (
      <View
        style={{ backgroundColor: '#55393A3F', padding: 10, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{color:'#fff'}}>点击添加图标添加图片</Text>
      </View>
    )
  }

  goToBigImage(index) {
    if (index == 0) {
      this.addPotos()
    } else {
      let json = JSON.stringify(this.state.images)
      ImagePicker.goToBigImage(json, index)
    }
  }

  deleteImgs(index) {
    let listData = this.state.images
    listData.splice(index, 1)
    this.setState({
      images: listData
    })
  }

  renderImages({ item, index }) {
    return (<TouchableOpacity
      activeOpacity={1.0}
      style={{ marginTop: 5, marginBottom: 5, marginLeft: 3, marginRight: 3, }}
      onPress={() => this.goToBigImage(index)}>
      {index == 0 ? <Image source={require('../res/images/addImage.png')} style={{ width: CommonStyle.screen_width / 3 - 10, height: CommonStyle.screen_width / 3 - 10 }} /> : <Image source={{ uri: 'file:' + item }} style={{ width: CommonStyle.screen_width / 3 - 10, height: CommonStyle.screen_width / 3 - 10 }} />}
      {index !== 0 &&
        <TouchableOpacity
          onPress={() => this.deleteImgs(index)}
          style={{ position: 'absolute', right: 2, top: 2 }}>
          <Image source={require('../res/images/deleteImage.png')} style={{ width: 20, height: 20 }} />
        </TouchableOpacity>}
    </TouchableOpacity>)
  }

  keyExtractor(item, index) {
    return index
  }

  renderImageList() {
    return (
      <View style={{ padding: 3, flex: 1 }}>
        <FlatList
          extraData={this.state}
          numColumns={3}
          data={this.state.images}
          renderItem={this.renderImages}
          keyExtractor={this.keyExtractor}
        />
      </View>
    )
  }

  render() {
    return (
      <View style={{ padding: 0, flex: 1, backgroundColor: '#0ff' }}>
        <View style={{ padding: 5 }}>
          {this.renderHeader()}
        </View>
        {this.renderImageList()}
      </View>
    )
  }
}

export default Photos