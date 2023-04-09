import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";

const Container = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
`
const Nav = styled.aside`
  min-width: 200px;
  background-color: #354052;
  border-right: 1px solid black;
`
const Main = styled.main`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`
const Header = styled.header`
  background-color: white;
  min-height: 100px;
  border-bottom: 1px solid black;
  display: flex;
`
const Section = styled.section`
  background-color: #EBF1F5;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`
const Hamberger = styled.div`
  border-right: 1px solid black;
  width: 100px;
`
const SearchBox = styled.div`
  border-right: 1px solid black;
  min-width: 200px;
  flex-grow: 1;
  display: flex;
  align-items: center;
  padding-left: 20px;
  gap: 20px;
`
const Search = styled.input`
  height: 40px;
  font-size: 18px;
  border: none;
  &:focus {
    outline: none;
  }
`
const Calendar = styled.div`
  border-right: 1px solid black;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`
const People = styled.div`
  background-color: #15A3F9;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Graph = styled.div`
  height: 200px;
  border-bottom: 1px solid gray;
`
const Collections = styled.div`
  flex-grow: 1;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 30px;
`
const Collection = styled(Link)`
  background-color: white;
  height: 120px;
  border-radius: 30px;
  box-shadow: 0 0 8px 4px rgba(0,0,0,.12);
  padding: 15px;
  display: flex;
`
const ColLeft = styled.div`
  flex-grow: 1;
  display: flex;
  gap: 10px;
  flex-direction: column;  
`
const ColRight = styled.div`
  color: #586678;
  width: 120px;
  span {
    color: #5A8E66;
  }
`
const ColName = styled.div`
  font-weight: bold;
  font-size: 23px;
  span {
    color: #BD4527;
  }
`
const ColData = styled.div`
  font-size: 18px;
  span {
    color: #5A8E66;
  }
`
const Logo = styled.div`
  height: 200px;
  border-bottom: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Lab = styled.img`
  width: 140px;
  border-radius: 20%;
`
const NavList = styled.div`
  height: 300px;
  border-bottom: 1px solid black;
  padding: 20px;
`
const NavName = styled.div`
  color: #9EA9BD;
  display: flex;
  margin-bottom: 10px;
  span {
    margin-top: 10px;
  }
`
const NavImg = styled.img`
  height: 35px;
`

const Home = () => {
  const [time, setTime] = useState("");
  const [collections, setCollections] = useState();

  const getCollections = async () => {
    const res = await axios.get("http://localhost:8000/collections");
    setTime(res.data.time);
    setCollections(res.data.collections);
  }

  useEffect(() => {
    getCollections();
  }, [])

  return (
    <Container>
      <Nav>
        <Logo>
          <Lab src="/assets/SVIL.jpg" />
        </Logo>
        <NavList>
          <NavName>
            <NavImg src="/assets/home.png" />
            <span>Main Page</span>
          </NavName>
          <NavName>
            <NavImg src="/assets/database.png" style={{ "height": "27px", "marginLeft": "5px" }} />
            <span style={{ "marginTop": "7px", "marginLeft": "5px" }}>DB Collection</span>
          </NavName>
          <NavName>
            <NavImg src="/assets/healthcheck.png" />
            <span>Health Check</span>
          </NavName>
          <NavName>
            <NavImg src="/assets/task.png" />
            <span>Task</span>
          </NavName>
        </NavList>
      </Nav>
      <Main>
        <Header>
          <Hamberger>
            햄버거
          </Hamberger>
          <SearchBox>
            <img style={{ "width": "40px" }} src="/assets/search.png" />
            <Search type="input" placeholder="검색어를 입력해 주세요" />
          </SearchBox>
          <Calendar>
            <img style={{ "width": "40px" }} src="/assets/calendar.png" />
          </Calendar>
          <People>
            <img style={{ "width": "80px" }} src="/assets/people.png" />
          </People>
        </Header>
        <Section>
          <Graph>&nbsp;</Graph>
          <Collections>
            {collections ? (
              collections.map((item) => (
                <Collection to={"collection/" + item} key={item}>
                  <ColLeft>
                    <ColName>Collection name: <span>{item}</span></ColName>
                    <ColData>First Collection Data : <span>무언가</span></ColData>
                    <ColData>Last Collection Data : <span>무언가</span></ColData>
                  </ColLeft>
                  <ColRight>
                    총 Docs 개수: <span>32</span>
                  </ColRight>
                </Collection>
              ))) : (
              "loading..."
            )}
          </Collections>
        </Section>
      </Main>
    </Container>
  );
};

export default Home;