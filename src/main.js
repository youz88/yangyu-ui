import React from 'react';
import ReactDOM from 'react-dom';
import {IndexRoute, Router, Route, Link, browserHistory} from 'react-router';

import { Layout, Menu, Icon } from 'antd';
const { Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

import MainContent from './components/content/MainContent'
import LeftMenu from './components/leftMenu/leftMenu'
import MenuManageIndex from './components/leftMenu/MenuManageIndex'
import Header from './components/header/header'
import Login from  './components/login/login'
import Register from  './components/register/register'
import NewsInformationIndex from './components/news/NewsInformationIndex'
import NewsManageIndex from './components/news/NewsManageIndex'
import BlogSelfIndex from './components/blog/BlogSelfIndex'
import BlogRecommendIndex from './components/blog/BlogRecommendIndex'
import TechnicalShareIndex from './components/technical/TechnicalShareIndex'
import TechnicalQuestionIndex from './components/technical/TechnicalQuestionIndex'
import UserManageIndex from './components/user/UserManageIndex'

import Config from './config/index';

import './assets/css/main.css'

const subMenu = [];

const leftRouter = () => {
    let _this = this;
    let _token = localStorage.getItem(Config.userToken);
    let routs = [];
    $.ajax({
        url: '/permission/authority',
        type: 'POST',
        async: false,
        headers: {
            Authorization: _token
        },
        success: function(data){
            data.data.map( (permission,index)=>{
                subMenu.push(<SubMenu key={"sub"+index} title={<span><Icon type={permission.icon} /><span>{permission.permissionName}</span></span>}>
                    {
                        permission.child.map((child)=>{
                            return <Menu.Item key={child.component}><Link to={child.url}>{child.permissionName}</Link></Menu.Item>
                        })
                    }
                </SubMenu>);
                permission.child.map((child,key)=>{
                    let component;
                    switch(child.component){
                        case 'NewsInformationIndex': component = NewsInformationIndex;break;
                        case 'BlogSelfIndex': component = BlogSelfIndex;break;
                        case 'BlogRecommendIndex': component = BlogRecommendIndex;break;
                        case 'TechnicalShareIndex': component = TechnicalShareIndex;break;
                        case 'TechnicalQuestionIndex': component = TechnicalQuestionIndex;break;
                        case 'NewsManageIndex': component = NewsManageIndex;break;
                        case 'UserManageIndex': component = UserManageIndex;break;
                        case 'MenuManageIndex': component = MenuManageIndex;break;
                    }
                    routs.push(<Route key={key} path={child.url} component={component} />)
                })
            })
        },
        error(request, status, e){
            localStorage.removeItem(Config.userToken)
        }
    })
    return routs;
}

class Main extends React.Component {

    state = {
        bgStyle: 'lightColor', //默认背景颜色
        leftMenu: [],
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
                    <LeftMenu changeSiderColor={this.changeSiderColor.bind(this)} subMenu={subMenu}/>
                </Sider>
                <Layout style={{marginLeft: 1}}>
                    <Header bgStyle={this.state.bgStyle}/>
                    <Content style={{ margin: '0 16' }}>
                        <div 
                            className={this.state.bgStyle} 
                            style={{ padding: 15, minHeight: 360 }}>
                            { this.props.children }
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center',padding: 10 }}>
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
            <IndexRoute component={MainContent} />
            {leftRouter()}
        </Route>
        <Route path="/sign_up" component={Register} />
        <Route path="/sign_in" component={Login} />
    </Router>
), document.getElementById('main'))
