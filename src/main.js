import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';

import { Layout, Menu, Icon } from 'antd';
const { Content, Footer, Sider } = Layout;

import LeftMenu from './components/leftMenu/leftMenu'
import Header from './components/header/header'
import Login from  './components/login/login'
import Register from  './components/register/register'
import NewsList from './components/newsList/newsList'

import Config from './config/index';

import './assets/css/main.css'

class Main extends React.Component {

    // componentDidMount(){
    //     let _this = this;
    //     let _token = localStorage.getItem(Config.userToken);
    //     if(_token){
    //         $.ajax({
    //             url: '/user/info',
    //             type: 'POST',
    //             headers: {
    //                 Authorization: _token
    //             },
    //             success: function(data){
    //                 _this.setState({
    //                     nick_name: data.data.nickName
    //                 })
    //             },
    //             error: function(request, status, e){
    //                 Config.logout();
    //             }
    //         })
    //     }else{
    //         location.href = '/sign_in';
    //     }
    // }

    state = {
        bgStyle: 'lightColor' //默认背景颜色
    }

    changeSiderColor(theme){
        this.setState({
            bgStyle: theme ? 'lightColor' : 'darkColor'
        })
    }

    render() {
        return (
            <Layout>
                <Sider
                    className={this.state.bgStyle}
                    /* style={{backgroundColor: this.state.bgColor}} */
                    breakpoint="lg"
                    collapsedWidth="0"
                    onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
                >
                    <LeftMenu changeSiderColor={this.changeSiderColor.bind(this)}/>
                </Sider>
                <Layout style={{marginLeft: 1}}>
                    <Header bgStyle={this.state.bgStyle}/>
                    <Content style={{ margin: '0 16' }}>
                        <div 
                            className={this.state.bgStyle} 
                            style={{ padding: 15, minHeight: 360 }}>
                            <NewsList />
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Hello World ©2017 Created by Youz
                    </Footer>
                </Layout>
            </Layout>
        )
    }
}

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={Main}>
            
        </Route>
        <Route path="/sign_up" component={Register} />
        <Route path="/sign_in" component={Login} />
    </Router>
), document.getElementById('main'))
