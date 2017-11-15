import React, { Component } from 'react';
import moment from 'moment';
import { Form, Card, Select, List, Tag, Icon, Avatar, Row, Col, Button, Input } from 'antd';

import './newsList.less'

class NewsList extends React.Component {

    render() {

        const loading = true;

        const titles = [
            'Alipay',
            'Angular',
            'Ant Design',
            'Ant Design Pro',
            'Bootstrap',
            'React',
            'Vue',
            'Webpack',
          ];
          const avatars = [
            'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png', // Alipay
            'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png', // Angular
            'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png', // Ant Design
            'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png', // Ant Design Pro
            'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png', // Bootstrap
            'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png', // React
            'https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png', // Vue
            'https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png', // Webpack
          ];
          const covers = [
            'https://gw.alipayobjects.com/zos/rmsportal/HrxcVbrKnCJOZvtzSqjN.png',
            'https://gw.alipayobjects.com/zos/rmsportal/alaPpKWajEbIYEUvvVNf.png',
            'https://gw.alipayobjects.com/zos/rmsportal/RLwlKSYGSXGHuWSojyvp.png',
            'https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png',
          ];
          const desc = [
            '那是一种内在的东西， 他们到达不了，也无法触及的',
            '希望是一个好东西，也许是最好的，好东西是不会消亡的',
            '生命就像一盒巧克力，结果往往出人意料',
            '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
            '那时候我只会想自己想要什么，从不想自己拥有什么',
          ];
          
          const user = [
            '付小小',
            '曲丽丽',
            '林东东',
            '周星星',
            '吴加好',
            '朱偏右',
            '鱼酱',
            '乐哥',
            '谭小仪',
            '仲尼',
          ];

        const list = [];
        for (let i = 0; i < 20; i += 1) {
          list.push({
            id: `fake-list-${i}`,
            owner: user[i % 10],
            title: titles[i % 8],
            avatar: avatars[i % 8],
            cover: parseInt(i / 4, 10) % 2 === 0 ? covers[i % 4] : covers[3 - (i % 4)],
            status: ['active', 'exception', 'normal'][i % 3],
            percent: Math.ceil(Math.random() * 50) + 50,
            logo: avatars[i % 8],
            href: 'https://ant.design',
            updatedAt: new Date(new Date().getTime() - (1000 * 60 * 60 * 2 * i)),
            createdAt: new Date(new Date().getTime() - (1000 * 60 * 60 * 2 * i)),
            subDescription: desc[i % 5],
            description: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。',
            activeUser: Math.ceil(Math.random() * 100000) + 100000,
            newUser: Math.ceil(Math.random() * 1000) + 1000,
            star: Math.ceil(Math.random() * 100) + 100,
            like: Math.ceil(Math.random() * 100) + 100,
            message: Math.ceil(Math.random() * 10) + 10,
            content: '段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。',
            members: [
              {
                avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png',
                name: '曲丽丽',
              },
              {
                avatar: 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png',
                name: '王昭君',
              },
              {
                avatar: 'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png',
                name: '董娜娜',
              },
            ],
          });
        }

        const ListContent = ({ data: { content, updatedAt, avatar, owner, href } }) => (
            <div className="listContent">
              <p className="description">{content}</p>
              <div className="extra">
                <Avatar src={avatar} size="small" /><a href={href}>{owner}</a> 发布在 <a href={href}>{href}</a>
                <em>{moment(updatedAt).format('YYYY-MM-DD hh:mm')}</em>
              </div>
            </div>
        );

        const loadMore = list.length > 0 ? (
            <div style={{ textAlign: 'center', marginTop: 16 }}>
              <Button onClick={this.fetchMore} style={{ paddingLeft: 48, paddingRight: 48 }}>
                {loading ? <span><Icon type="loading" /> 加载中...</span> : '加载更多'}
              </Button>
            </div>
        ) : null;

        const IconText = ({ type, text }) => (
            <span>
              <Icon type={type} style={{ marginRight: 8 }} />
              {text}
            </span>
        );


        return (
                <div>
                    <Card
                        style={{ marginTop: 24 }}
                        bordered={false}
                        bodyStyle={{ padding: '8px 32px 32px 32px' }}
                    >
                        <Input
                            style={{ width:500, marginRight: 8}}
                        />
                        <Button type="primary" icon="search">搜索</Button>
                        <List
                            size="large"
                            loading={list.length === 0 ? loading : false}
                            rowKey="id"
                            itemLayout="vertical"
                            loadMore={loadMore}
                            dataSource={list}
                            renderItem={item => (
                                <List.Item
                                    key={item.id}
                                    actions={[
                                        <IconText type="star-o" text={item.star} />,
                                        <IconText type="like-o" text={item.like} />,
                                        <IconText type="message" text={item.message} />,
                                    ]}
                                    extra={<div className="listItemExtra" />}
                                >
                                    <List.Item.Meta
                                        title={(
                                            <a className="listItemMetaTitle" href={item.href}>{item.title}</a>
                                        )}
                                        description={
                                            <span>
                                                <Tag>Ant Design</Tag>
                                                <Tag>设计语言</Tag>
                                                <Tag>蚂蚁金服</Tag>
                                            </span>
                                        }
                                    />
                                    <ListContent data={item} />
                                </List.Item>
                            )}
                        />
                    </Card>
                </div>
        )
    }
}

module.exports = NewsList;