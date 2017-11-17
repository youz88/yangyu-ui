import React, { Component } from 'react';
import moment from 'moment';
import { Card, List, Tag, Icon, Avatar, Row, Col, Button, Input } from 'antd';

import './newsList.less'

class NewsList extends React.Component {

    state = {
        list: [],
        searchText: '',
    }

    componentDidMount(){
        let _this = this;
        $.ajax({
            url: '/news/list?limit=10',
            type: 'GET',
            success: function(data){
                _this.setState({
                    list: data.data.list.map((news,i) => {
                      return {
                        id: `fake-list-${i}`,
                        author: news.author,
                        title: news.title,
                        content: news.content_part,
                        avatar: news.avatar,
                        publishDate: news.publish_date,
                        href: news.href,
                        star: Math.ceil(Math.random() * 100) + 100,
                        like: Math.ceil(Math.random() * 100) + 100,
                        message: Math.ceil(Math.random() * 10) + 10
                      };
                    })
                })
            }
        })
    }

    handleChange = (e) => {
        this.setState({searchText: e.target.value});
    }

    search = (e) => {
        let _this = this;
        $.ajax({
            url: '/news/list?limit=10&search='+_this.state.searchText,
            type: 'GET',
            success: function(data){
                _this.setState({
                    list: data.data.list.map((news,i) => {
                      return {
                        id: `fake-list-${i}`,
                        author: news.author,
                        title: news.title,
                        content: news.content_part,
                        avatar: news.avatar,
                        publishDate: news.publish_date,
                        href: news.href,
                        star: Math.ceil(Math.random() * 100) + 100,
                        like: Math.ceil(Math.random() * 100) + 100,
                        message: Math.ceil(Math.random() * 10) + 10
                      };
                    })
                })
            }
        })
    }

    render() {

        const loading = false;

        const ListContent = ({ data: { content, publishDate, avatar, author, href } }) => (
            <div className="listContent">
              <p className="description">{content}</p>
              <div className="extra">
                <Avatar src={avatar} size="small" /><a href={href}>{author}</a> 发布在 <a href={href}>{href}</a>
                <em>{moment(publishDate).format('YYYY-MM-DD')}</em>
              </div>
            </div>
        );

        const loadMore = this.state.list.length > 0 ? (
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
                        <Row>
                            <Col span={8}>
                                <Input defaultValue={this.state.searchText} onChange={this.handleChange}/>
                            </Col>
                            <Col span={2} style={{marginLeft: 8}}>
                                <Button type="primary" icon="search" onClick={this.search}>搜索</Button>
                            </Col>
                        </Row>
                        <List
                            size="large"
                            loading={this.state.list.length === 0 ? loading : false}
                            rowKey="id"
                            itemLayout="vertical"
                            loadMore={loadMore}
                            dataSource={this.state.list}
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
                                                <Tag>oschina</Tag>
                                                <Tag>资讯</Tag>
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