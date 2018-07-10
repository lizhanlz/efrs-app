// 首页页面


import React, { Component } from 'react';

import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    Image,
    AsyncStorage,
    TouchableOpacity,
    ImageBackground,
    Modal,
    DeviceInfo,
    NativeModules,
    Platform
} from 'react-native';
import CommonSudoku from '../../../Common/CommonSudoku';
import Swiper from '../../../Utils/Swiper';
import { HomeSudokuData } from "../../../Res/Data/HomeSudoku";
import {setSpText,scaleSize} from '../../../Utils/Resolution';
let Dimensions = require('Dimensions');
import SafeAreaView from 'react-native-safe-area-view';
let {width,height} = Dimensions.get('window');
let sudokuitem ;
//判断是否iphonex

// See https://mydevice.io/devices/ for device dimensions
const X_WIDTH = 375;
const X_HEIGHT = 812;

const { height: D_HEIGHT, width: D_WIDTH } = Dimensions.get('window');

const { PlatformConstants = {} } = NativeModules;
const { minor = 0 } = PlatformConstants.reactNativeVersion || {};

const isIPhoneX = (() => {
    if (Platform.OS === 'web') return false;

    if (minor >= 50) {
        return DeviceInfo.isIPhoneX_deprecated;
    }

    return (
        Platform.OS === 'ios' &&
        ((D_HEIGHT === X_HEIGHT && D_WIDTH === X_WIDTH) ||
            (D_HEIGHT === X_WIDTH && D_WIDTH === X_HEIGHT))
    );
})();

/*const isPad = (() => {

  // if portrait and width is smaller than iPad width
  if (D_HEIGHT > D_WIDTH && D_WIDTH < PAD_WIDTH) {
    return false;
  }

  // if landscape and height is smaller that iPad height
  if (D_WIDTH > D_HEIGHT && D_HEIGHT < PAD_WIDTH) {
    return false;
  }

  return true;
})();*/

if (isIPhoneX) {
    sudokuitem = 100;

}
/*else if(isPad){
    sudokuitem = (height-scaleSize(110)-scaleSize(399)-scaleSize(41)-scaleSize(246))/3;
    bgpicwidth = width;
    swipewidth = width;
}*/
else{
    sudokuitem = (height-scaleSize(110)-scaleSize(399)-scaleSize(41)-scaleSize(246))/3;
}

export default class HomePage extends Component {
    constructor(props){
        super(props);
        thiz=this;
        this.state = {
            data:[],//存储列表数据
            type:[], //存储九宫格跳转类型
            splash:false,
            swiperShow:false,
        };
    }
    componentWillMount() {

    }
    componentDidMount () {
        //获取data数据
        this.setState({
            data:HomeSudokuData[0],
            type:HomeSudokuData[1],
        })
        AsyncStorage.setItem('token','');
        this.timer = setTimeout(() => {
            this.setState({
                splash:false,
                swiperShow:true,
            })
        },2000)

    }
    componentWillUnmount(){
        this.timer && clearTimeout(this.timer)
    }


    render() {

   /*     let sliderdata = [
            { img: require('../../../Res/Images/轮播图1.png'), id: 1 },
            { img: require('../../../Res/Images/轮播图2.png'), id: 2 },
            { img: require('../../../Res/Images/轮播图3.png'), id: 3 },
            { img: require('../../../Res/Images/轮播图4.png'), id: 4 },
        ];*/
        return (
            <SafeAreaView style={{flex:1}}>
                <ScrollView>
                    <Modal visible={this.state.splash}
                                    onRequestClose = {() => {}}
                                    animationType = 'fade'
                                    transparent = {true}>
                    <Image source={require('../../../Res/Images/启动.png')} style={styles.splash}/>
                </Modal>

                    <View style={styles.body}>
                        <ImageBackground source={require('../../../Res/Images/bgpic.png')} style={styles.bgpic} resizeMode="contain">
                            <View style={styles.header}>

                                <Image source={require('../../../Res/Images/logo.png')} style={styles.logo}/>
                                <Image source={require('../../../Res/Images/line.png')} style={styles.line}/>
                                <Image source={require('../../../Res/Images/title.png')} style={styles.title}/>
                            </View>
                            <TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('Search',{info:''})}>
                                <View style={styles.searchBox}>
                                    <Image source={require('../../../Res/Images/search.png')} style={styles.searchIcon}/>
                                    <Text style={styles.textInput}>请输入企业名称</Text>

                                    <Image source={require('../../../Res/Images/mic.png')} style={styles.voiceIcon}/>
                                </View>
                            </TouchableOpacity>
                        </ImageBackground>

                        <View style={styles.carousel}>
                            {/*<Slider
                                data={sliderdata}
                                duration={3000}
                                loop={true}
                                autoPlay={true}
                                style={styles.slider}
                                pagination={true}
                                itemHeight={246*width/750}
                                activeOpacity={1}
                            />*/}
                            {this.renderSwiper()}
                        </View>
                        <View style={styles.sodoku}>
                            <CommonSudoku
                                ref={'Sudoku'}
                                data={this.state.data}
                                type={this.state.type}
                                onPressFn={this._onPressFn.bind(this)}
                                onPressFnMore={this._onPressFnMore.bind(this)}
                                headerName={null}
                                height={sudokuitem}
                            />
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
    //跳转到搜索页
    _onPressFn () {
        this.props.navigation.navigate('Search',{info:this.refs.Sudoku.state.name})
    };
    itemClick (){

    };
    renderSwiper=()=>{
        if(this.state.swiperShow){
            return(
                <Swiper
                    style={styles.slider}
                    height={scaleSize(246)}
                    loop={true}
                    autoplay={true}
                    autoplayTimeout={2}
                    horizontal={true}
                    paginationStyle={{bottom:scaleSize(10)}}
                    showButton={false}
                    showsPagination={true}
                    dotStyle={{marginLeft:scaleSize(10)}}
                    activeDotStyle={{marginLeft:scaleSize(10)}}
                    dotColor={'white'}
                >
                    <Image source={require('../../../Res/Images/轮播图1.png')} style={styles.img}/>
                    <Image source={require('../../../Res/Images/轮播图2.png')} style={styles.img}/>
                    <Image source={require('../../../Res/Images/轮播图3.png')} style={styles.img}/>
                    <Image source={require('../../../Res/Images/轮播图4.png')} style={styles.img}/>
                </Swiper>
            )
        }else{
            return(
                <View style={{height:scaleSize(246)}}>
                    <Image source={require('../../../Res/Images/轮播图4.png')} style={styles.img}/>
                </View>
            )
        }

    };
    //跳转到全部九宫格
    _onPressFnMore= ()=>this.props.navigation.navigate('AllSudoku');
}


const styles = StyleSheet.create({
    body:{
        flex:1,
    },
    bgpic:{

        flexDirection:"column",
        justifyContent:'center',
        alignItems:'center',

        width:width,
        height:scaleSize(399),
    },
    header:{
        flexDirection:"row",
        justifyContent:'center',
        alignItems:'center',

    },
    logo:{
        width:scaleSize(255),
        height:scaleSize(56),

    },
    line:{
        width:1,
        height:scaleSize(52),
        marginLeft:scaleSize(10),
    },
    title:{
        width:scaleSize(262),
        height:scaleSize(73),
        marginLeft:scaleSize(10),
    },
    searchBox:{
        width:scaleSize(625),
        height:scaleSize(85),
        padding:0,
        marginTop:scaleSize(20),
        backgroundColor:'white',
        flexDirection:'row',
        alignItems:'center',
        borderRadius:5,
    },
    searchIcon:{
        height:20,
        width:20,
        marginLeft:scaleSize(20),


    },
    textInput:{
        flex:1,
        backgroundColor:'transparent',
        fontSize:13,
        marginLeft:scaleSize(20),
        color:'#333333',
        opacity:0.4,
    },
    voiceIcon:{
        height:20,
        width:20,
        marginLeft:scaleSize(5),
        marginRight:scaleSize(20),

    },
    carousel:{

        marginTop:scaleSize(5),

    },
    sodoku:{
        marginTop:scaleSize(5),
        backgroundColor:'white',
        width:width,
        borderBottomWidth:1,
        borderBottomColor:'#dfdfdf',
        height:height-scaleSize(110)-scaleSize(399)-scaleSize(41)-scaleSize(246),
    },
    slider:{
        backgroundColor:'white',
    },
    splash:{
        height:height,
        width:width,
    },

    img:{
        width:scaleSize(750),
        height:scaleSize(246),
    }
});