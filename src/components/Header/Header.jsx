import React from 'react';
import { Layout, Menu, Icon } from 'antd';
const {SubMenu} = Menu;

import Config from '../../config/index';

class Header extends React.Component{

    state = {
        nickName: '',
    }

    componentDidMount(){
        let _this = this;
        let _token = localStorage.getItem(Config.userToken);
        $.ajax({
            url: '/user/info',
            type: 'POST',
            headers: {
                Authorization: _token
            },
            success: function(data){
                _this.setState({
                    nickName: data.data.nickName
                })
            }
        })
    }

    render(){
        let title = () => {
            if(this.state.nickName){
                return <SubMenu title={<span><Icon type="user" />{ this.props.nickName }</span>}>
                            <Menu.Item>个人中心</Menu.Item>
                            <Menu.Item>设置</Menu.Item>
                            <Menu.Divider />
                            <Menu.Item key="logout">退出</Menu.Item>
                        </SubMenu>
            }else{
                return <SubMenu title={<a href="/sign_in">登录</a>} />
            }
        }

        return(
            <Layout.Header className={this.props.bgStyle} style={{padding: 0}}>
                <Menu mode="horizontal" className={this.props.bgStyle} style={{margin:15}} onClick={this.onMenuClick}>
                    {title()}                    
                </Menu>
            </Layout.Header>
        )
    }

    onMenuClick = ({key}) => {
        if(key == 'logout'){
            Config.logout();
        }
    }
}

module.exports = Header;