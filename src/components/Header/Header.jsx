import React from 'react';
import { Layout, Menu, Icon } from 'antd';
const {SubMenu} = Menu;

import Config from '../../config/index';

class Header extends React.Component{

    onMenuClick = ({key}) => {
        if(key == 'logout'){
            Config.logout();
        }
    }

    render(){
        return(
            <Layout.Header style={{background: '#fff', padding: 0 }}>
                <Menu mode="horizontal" style={{margin:15}} onClick={this.onMenuClick}>
                    <SubMenu title={<span><Icon type="user" />{ this.props.nick_name }</span>}>
                        <Menu.Item>个人中心</Menu.Item>
                        <Menu.Item>设置</Menu.Item>
                        <Menu.Divider />
                        <Menu.Item key="logout">退出</Menu.Item>
                    </SubMenu>
                </Menu>
            </Layout.Header>
        )
    }
}

module.exports = Header;