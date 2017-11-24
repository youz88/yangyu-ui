import React, { Component } from 'react';
import moment from 'moment';
import { Card, List, Tag, Icon, Avatar, Row, Col, Button, Input } from 'antd';

class NewsInformationIndex extends React.Component {

    state = {
        list: [],
        searchText: '',
        page: 1
    }

    componentDidMount() {
        this.search();
    }

    search = (e) => {
        let _this = this;
        let btnId = e ? e.target.id : '';
        let page = btnId === 'fetchMoreBtn' ? this.state.page + 1 : 1;
        $.ajax({
            url: '/news/list?page=' + page + '&search=' + _this.state.searchText,
            type: 'GET',
            success: function (data) {
                let list = data.data.list.map((news, i) => {
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
                });
                _this.setState({
                    list: btnId === 'fetchMoreBtn' ? _this.state.list.concat(list) : list,
                    page: btnId === 'fetchMoreBtn' ? data.data.list.length > 0 ? page : _this.state.page : page
                })
            }
        })
    }

    handlerChange = (event) => {
        this.setState({
            searchText: event.target.value
        })
    }

    render() {

        const loading = false;

        const ListContent = ({ data: { content, publishDate, avatar, author, href } }) => (
            <div className="listContent">
                <p className="description" dangerouslySetInnerHTML={{ __html: content }} />
                <div className="extra">
                    <Avatar src={avatar} size="small" /><a href={href}>{author}</a> 发布在 <a href={href}>{href}</a>
                    <em>{moment(publishDate).format('YYYY-MM-DD')}</em>
                </div>
            </div>
        );

        const loadMore = this.state.list.length > 0 ? (
            <div style={{ textAlign: 'center', marginTop: 16 }}>
                <Button id='fetchMoreBtn' onClick={this.search} style={{ paddingLeft: 48, paddingRight: 48 }}>
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
                            <Input defaultValue={this.state.searchText} onChange={this.handlerChange} />
                        </Col>
                        <Col span={2} style={{ marginLeft: 8 }}>
                            <Button id='searchBtn' type="primary" icon="search" onClick={this.search}>搜索</Button>
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
                                        <a className="listItemMetaTitle" href={item.href} dangerouslySetInnerHTML={{ __html: item.title }} />
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

module.exports = NewsInformationIndex;