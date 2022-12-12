import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import './Home.css'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from "react-router-dom";

const refresh = (setItems) => { };

export default function Home() {

  const fetchData = (setItems, items) => {
    axios
      .get(`https://randomuser.me/api/?results=5`)
      .then((res) => {
        setTimeout(() => {
          setItems([...items, ...res.data.results]);
        }, 2000)
      });
  };

  //states

  const [items, setItems] = React.useState([]);

  const navigate = useNavigate()

  const userName = JSON.parse(localStorage.getItem("user"))

  //funcitons

  const handleLogout = () => {
    localStorage.removeItem("loggedin")
    sessionStorage.removeItem("loggedinreload")
    navigate("/login")
  }

  React.useEffect(() => {
    fetchData(setItems, items)
  }, [])

  return (
    <div className="contact">
      <Navbar bg="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#" className="navItem">Contact List</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" className="navbox" />
          <Navbar.Collapse id="navbarScroll" >
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '80px' }}
              navbarScroll
            >
              <Dropdown>
                <Dropdown.Toggle variant="dark" className="dropdownn">
                  All
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Asec</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Desc</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="success" className="button" size="md">Search</Button>
              <Button className='btn btn-danger button' onClick={handleLogout}>Logout</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <InfiniteScroll
        dataLength={items.length} 
        next={() => {
          fetchData(setItems, items);
        }}
        hasMore={true}
        loader={<h3 className="load-feedback">Loading...</h3>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        refreshFunction={refresh}
        pullDownToRefresh
        pullDownToRefreshThreshold={50}
      >
        <div style={{ minHeight: "100vh" }}>
          {items.map((user, i) => (
            <div className="main" key={i}>
              <p className="main-para">{user.name.first}{" "}{user.name.last}</p>
              <img className="main-img" src={user.picture.medium} />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}