import React from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from "reactstrap";
import classnames from 'classnames';
import BlogList from "../blog/blogsList/BlogList";

export default class UserTabs extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1',
            blogs: null
        };
        this.getUserBlogs();
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            if (tab === "1") {
                this.getUserBlogs();
            }
            this.setState({
                activeTab: tab
            });
        }
    }
    
    getUserBlogs = () => {
        fetch("blog/getUserBlogs/?userName=" + this.props.userName)
            .then(res => res.json())
            .then(blogs => {
                this.setState({
                    blogs: blogs
                })
            })
    }

    render() {
        var blogsStyles = {
            marginTop: "30px"
        };
        var i = 1;
        return (
            <div>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '1' })}
                            onClick={() => { this.toggle('1'); }}
                        >
                            Blogi
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '2' })}
                            onClick={() => { this.toggle('2'); }}
                        >
                            Moar Tabs
            </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <div style={blogsStyles}>
                            <BlogList
                               blogs={this.state.blogs}
                            />
                        </div>
                    </TabPane>
                    <TabPane tabId="2">
                        <Row>
                            <Col sm="6">
                                <Card body>
                                    <CardTitle>Special Title Treatment</CardTitle>
                                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                    <Button>Go somewhere</Button>
                                </Card>
                            </Col>
                            <Col sm="6">
                                <Card body>
                                    <CardTitle>Special Title Treatment</CardTitle>
                                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                    <Button>Go somewhere</Button>
                                </Card>
                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>
            </div>
            )
    }
}