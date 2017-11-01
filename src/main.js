import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';

import { Layout, Menu, Icon } from 'antd';
const { Content, Footer, Sider } = Layout;

import LeftMenu from './components/leftMenu/leftMenu'
import Header from './components/header/header'
import Login from  './components/login/login'

import './assets/css/main.css'

class Main extends React.Component {
    
    render() {
        return (
            <Layout>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
                >

                    <LeftMenu />
                </Sider>
                <Layout>
                    <Header />
                    <Content style={{ margin: '0 16' }}>
                        <div style={{ padding: 15, background: '#fff', minHeight: 360 }}>
                            content
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Hello World ©2016 Created by Youz
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
        <Route path="/login" component={Login} />
    </Router>
), document.getElementById('main'))
