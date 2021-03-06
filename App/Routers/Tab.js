// 导航栏路由入口

import React from 'react';
import { TabNavigator } from 'react-navigation';
import NavigationService from '../Utils/NavigationService';
import {
    StyleSheet,
    Image, AsyncStorage,
} from 'react-native';
import Icon from '../Common/IconFont/IconFont';

import HomePage from '../Pages/TabPages/HomePage/HomePage';
import RiskPage from '../Pages/TabPages/RiskPage/RiskPage';
import InformationPage from '../Pages/TabPages/InformationPage/InformationPage';
import AttentionPage from '../Pages/TabPages/AttentionPage/AttentionPage';
import MinePage from '../Pages/TabPages/MinePage/MinePage';
//获取本地存储中的token
// let token;
var Dimensions = require('Dimensions');
var {width,height} = Dimensions.get('window');
import {setSpText,scaleSize} from '../Utils/Resolution';
// let getToken = () =>{
//     AsyncStorage.getItem('token').then((value)=>{
//         token = value;
//         console.log(value)
//     });
// }
const Tab = TabNavigator({
    // 首页
    Home: {
        screen: HomePage,
        navigationOptions: {
            title: '首页',
            tabBarLabel: '首页',
            tabBarIcon: ({focused}) => (
                <Icon
                    name = {focused ? 'ronganexindianjitai' : 'ronganexin'}
                    size = {28}
                    color = { focused ? '#e63c27' : '#646464' }/>
            ),
            headerTitleStyle: {
                alignSelf: 'center'
            },
        }
    },
    // 风险提示页
    Risk: {
        screen: RiskPage,
        navigationOptions: {
            title: '风险提示',
            tabBarLabel: '风险提示',
            tabBarIcon: ({focused}) => (
                <Icon
                    name = {focused ? 'fengxianditudianjitai' : 'fengxianditu'}
                    size = {28}
                    color = { focused ? '#e63c27' : '#646464' }/>
            ),
            headerTitleStyle: {
                alignSelf: 'center'
            },
        }
    },
   /* // 风险页
    Risk: {
        screen: RiskPage,
        navigationOptions: {
            title: '风险',
            tabBarLabel: '风险',
            tabBarIcon: ({ tintColor }) => (
                <Image
                    source = {
                        require('../Res/Images/风险.png')
                    }
                    style={[ styles.icon, { tintColor: tintColor }]} // { tintColor: tintColor } 选中的图片和文字颜色
                />
            ),
            headerTitleStyle: {
                alignSelf: 'center'
            },
        }
    },
    // 情报页
    Information: {
        screen: InformationPage,
        navigationOptions: {
            title: '情报',
            tabBarLabel: '情报',
            tabBarIcon: ({ tintColor }) => (
                <Image
                    source = {
                        require('../Res/Images/情报.png')
                    }
                    style={[ styles.icon, { tintColor: tintColor }]} // { tintColor: tintColor } 选中的图片和文字颜色
                />
            ),
            headerTitleStyle: {
                alignSelf: 'center'
            },
        }
    },*/
    // 关注页
    Attention: {
        screen: AttentionPage,
        navigationOptions: {
            title: '关注',
            tabBarLabel: '关注',
            tabBarIcon: ({focused}) => (
                <Icon
                    name = {focused ? 'guanzhudianjitai' : 'guanzhu'}
                    size = {28}
                    color = { focused ? '#e63c27' : '#646464' }/>
            ),
            headerTitleStyle: {
                alignSelf: 'center'
            },
        }
    },
    // 我的页
    Mine: {
        screen: MinePage,
        navigationOptions: {
            title: '我的',
            tabBarLabel: '我的',
            tabBarIcon: ({focused}) => (
                <Icon
                    name = {focused ? 'wodedianjitai' : 'wode'}
                    size = {28}
                    color = { focused ? '#e63c27' : '#646464' }/>
            ),
            headerTitleStyle: {
                alignSelf: 'center'
            },
            // tabBarOnPress:(obj) => {
            //     AsyncStorage.getItem('token').then((value)=>{
            //         if (value){
            //             obj.jumpToIndex(obj.scene.index);
            //         }else{
            //             NavigationService.navigator("Login");
            //         }
            //     });
            // }
        }
    },

}, {
    animationEnabled: true, // 切换页面时不显示动画
    tabBarPosition: 'bottom', // 导航栏显示在底端，android 默认显示在页面顶端
    swipeEnable: false, // 禁止左右滑动
    backBehavior: 'none', // 按 back 键是否跳转到第一个 Tab，none 为不跳转
    tabBarOptions: {
        activeTintColor: '#e63c27', // 文字和图片选中颜色
        inactiveTintColor: '#646464', // 文字和图片默认颜色
        showIcon: true, // android 默认不显示 icon，需要设置为 true 才显示
        indicatorStyle: {height: 0}, // android 中 TabBar 下面会显示一条线，高度设为 0 后就不显示线了，不知道还有没有其他隐藏方法
        style: {
            backgroundColor: 'white', // TabBar 背景色
            height:scaleSize(110),


        },
        iconStyle:{
            top:scaleSize(0),
            width:scaleSize(60),
            height:scaleSize(65),
            marginTop:scaleSize(-5),

        },
        labelStyle: {
            fontSize: 12, // 文字大小
            marginTop:scaleSize(-5),

        },
    },
});


const styles = StyleSheet.create({

    icon: {

        width:scaleSize(40),
        height:scaleSize(40),

    },

});


export default Tab