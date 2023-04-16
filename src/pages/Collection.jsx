import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useParams } from "react-router-dom";

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

const DocsList = styled.ul`
  background-color: #95EDB2;
  flex-grow: 1;
  border-radius: 15px;
  padding: 30px 15px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`

const Docs = styled.li`
  color: #7F7BED;
  font-weight: bold;
  border-radius: 12px;
  padding: 20px;
  background-color: #EFE9E7;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: 0 0 8px 4px rgba(0,0,0,.1);
`

const DocsTime = styled.div`
  font-size: 40px;
  
`

const Tr = styled.tr`
  font-size: 30px;
`
const Th = styled.th`
  font-size: 35px;
  font-weight: bolder;
`

const Home = () => {
  const { collectionName } = useParams();
  const [time, setTime] = useState("");
  const [docs, setDocs] = useState();


  const getDocs = async () => {
    const res = await axios.get("http://localhost:8000/collection/" + collectionName);
    console.log(res)
    setTime(res.data.time);
    setDocs(res.data.data);
  }


  useEffect(() => {
    getDocs();
  }, [])

  return (
    <Container>
      <Title>{`Collection "${collectionName}"의 Docs`}</Title>
      <Time>{time ? "마지막 조회 시간: " + time : "loading..."}</Time>
      <DocsList>
        {docs ? (
          docs.map((item) => (
            <Docs key={item._id}>
              <DocsTime>{`Save Time: ${item.time}`}</DocsTime>
              <table>
                <Tr>
                  {Object.keys(item.data[0]).map((r) => (
                    <Th>{r}</Th>
                  ))}
                </Tr>
                {item.data.map((data) => (
                <Tr>
                  {Object.values(data).map((r) => (
                    <td>{r}</td>
                  ))}
                </Tr>
              ))}
              </table>
            </Docs>
          ))) : (
          "loading..."
        )}
      </DocsList>
    </Container>
  );
};

export default Home;