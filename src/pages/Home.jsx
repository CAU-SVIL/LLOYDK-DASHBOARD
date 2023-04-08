import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";

const Container = styled.main`
  background-color: #80CDE0;
  width: 100vw;
  height: 100vh;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`

const Title = styled.h1`
  color: #EFE9E7;
  font-size: 60px;
  font-weight: bold;
`

const Time = styled.div`
  color: #EFE9E7;
  font-size: 30px;
  font-weight: bold;
`

const CollectionList = styled.ul`
  background-color: #95EDB2;
  flex-grow: 1;
  border-radius: 15px;
  padding: 30px 15px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`

const Collection = styled.li`
  color: #7F7BED;
  font-size: 50px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 12px;
  padding: 20px;
  background-color: #EFE9E7;
  box-shadow: 0 0 8px 4px rgba(0,0,0,.1);
`

const Home = () => {
  const [time, setTime] = useState("");
  const [collections, setCollections] = useState();

  const getCollections = async () => {
    const res = await axios.get("http://172.19.0.2:80/collections");
    // const res = await axios.get("http://localhost:80");
    setTime(res.data.time);
    setCollections(res.data.collections);
  }



  useEffect(() => {
    getCollections();
  }, [])

  return (
    <Container>
      <Title>DB 목록</Title>
      <Time>{time ? "마지막 조회 시간: " + time : "loading..."}</Time>
      <CollectionList>
        {collections ? (
          collections.map((item) => (
            <Link to={"collection/" + item} key={item}>
              <Collection>{item}</Collection>
            </Link>
          ))) : (
          "loading..."
        )}
      </CollectionList>
    </Container>
  );
};

export default Home;