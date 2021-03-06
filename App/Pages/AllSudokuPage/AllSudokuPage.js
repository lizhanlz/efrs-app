// 全部九宫格页面


import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    Button,
    ScrollView,

} from 'react-native';
import CommonSudoku from '../../Common/CommonSudoku';

import { RiskSudokuData } from "../../Res/Data/RiskSudoku";
import { InformationSudokuData } from "../../Res/Data/InformationSudoku";


export default class AllSudokuPage extends Component {
    constructor(props){
        super(props);
        thiz=this;
        this.state = {
            RiskData:[],//存储列表数据
            RiskType:[], //存储九宫格跳转类型
            InformationData:[],//存储列表数据
            InformationType:[], //存储九宫格跳转类型
        };
    }
    static navigationOptions = ({ navigation }) => {
        const { state: {params}} = navigation
        return {
            title: '全部功能'
        }
    }

    componentWillMount() {
        //获取data数据
        this.setState({
            RiskData:RiskSudokuData[0],
            RiskType:RiskSudokuData[1],
            InformationData:InformationSudokuData[0],
            InformationType:InformationSudokuData[1],
        })
    }

    render() {
        const { state: {params}} = this.props.navigation
        return (
            <ScrollView style={styles.container}>
                <View style={styles.sudoku}>
                    <CommonSudoku
                        ref={'RiskSudoku'}
                        data={this.state.RiskData}
                        onPressFn={this._onPressFn.bind(this)}
                        headerName={'风险信息'}
                    />
                </View>
                <View style={styles.sudoku}>
                    <CommonSudoku
                        ref={'InformationSudoku'}
                        data={this.state.InformationData}
                        onPressFn={this._onPressFn.bind(this)}
                        headerName={'情报信息'}

                    />
                </View>

            </ScrollView>
        )
    }
    //跳转到搜索页
    _onPressFn () {
        this.props.navigation.navigate('Search')
        // console.log(this.refs.Sudoku.state.name)
    };

}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF',
    },
    sudoku:{
        marginTop:10,
        marginBottom:1,
        backgroundColor:'white',
    },

});