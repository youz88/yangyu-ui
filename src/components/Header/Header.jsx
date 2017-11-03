import React from 'react';
import { Layout, Menu, Icon } from 'antd';
const {SubMenu} = Menu;

class Header extends React.Component{
    
    render(){
        return(
            <Layout.Header style={{background: '#fff', padding: 0 }}>
                <Menu mode="horizontal" style={{margin:15}}>
                    <SubMenu title={<span><Icon type="user" />{ this.props.nick_name }</span>}>
                        <Menu.Item key="setting:1">退出</Menu.Item>
                    </SubMenu>
                </Menu>
            </Layout.Header>
        )
    }
}

module.exports = Header;