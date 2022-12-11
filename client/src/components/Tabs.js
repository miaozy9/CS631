import React, {  useContext }  from 'react';
import {Nav} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../Context/GlobalState';

const Tabs = () => {
    const navigate = useNavigate();
    let { userProfile } = useContext(GlobalContext);
    return (
        <Nav className="tabs" justify variant="pills" defaultActiveKey="link-0">
            <Nav.Item>
                <Nav.Link eventKey="link-0" onClick={() => navigate("/login")}>Reader Entrance</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-1" onClick={() => navigate("/Business")} >Administrator Entrance</Nav.Link>
            </Nav.Item>
      </Nav>
    )
}

export default Tabs;