import axios from "axios";
import { useEffect,useState } from "react";
import Card from "./Card";
import Navbar from "./Navbar"
import { useSwipeable } from "react-swipeable";



const HomePage = ()=>{

    const [data,setData] = useState();
    const [currData,setCurrData] = useState(0);
    const [visitedData,setVisitedData] = useState(0);
    const [currVisitedData,setCurrVisitedData] = useState(0);
    const [dataType,setDataType] = useState('unread');

    useEffect(()=>{
        fetchData();
        markRead(0);
        
    },[])

    const fetchData = async ()=>{
        try {
            let result = await axios.get('https://newsapi.org/v2/top-headlines?country=in&apiKey=0cbd607ec15d45c9b155bf1e79843444');
            let sortedData = sortData(result.data.articles);
            setData(sortedData);
            fetchVisitedData(sortedData);
        } catch (error) {
            console.log(error)
        }
    }

    const fetchVisitedData = (data)=>{
        const visitedObject = JSON.parse(sessionStorage.getItem('visited'))
        if(data)
        {
             let visitedData = data.filter((news,index)=>visitedObject[index]);
             setVisitedData(visitedData);
        }
       
    }
    
    const sortData = (data)=>{
        return data.sort((news1,news2)=> new Date(news2.publishedAt) - new Date(news1.publishedAt))
    }

    const handlers = useSwipeable({
        onSwipedLeft:(eventData) => leftSwipeHandler(eventData),
        onSwipedRight:(eventData) => rightSwipeHandler(eventData)
    });

    const leftSwipeHandler = (eventData)=>{
        markRead(currData+1);
        setCurrData(currData+1);
        setCurrVisitedData(0);
        setDataType('unread');
    }

    const rightSwipeHandler = (eventData)=>{
        fetchVisitedData(data);
        setDataType('read');
        if(currVisitedData + 1 < visitedData.length)
        setCurrVisitedData(currVisitedData+1);
        
    }

    const markRead = (id)=>{
        let visitedObj = sessionStorage.getItem('visited')
        if(visitedObj){
            let newObj = JSON.parse(visitedObj);
            newObj[id]=true
            sessionStorage.setItem('visited',JSON.stringify(newObj));
        }
        else{
            sessionStorage.setItem('visited',JSON.stringify({[id]:true}))
        }

    }

    return(
        <>
        <Navbar/>
        <div className="container">
            <div {...handlers} className="d-flex justify-content-center align-items-center">
                <i className="bi bi-caret-left-fill" style={{fontSize:'30px',cursor:'pointer'}} onClick={rightSwipeHandler}></i>
                { data && <Card cardDetails={dataType==='unread' ? data[currData] : visitedData[currVisitedData]} />}
                <i className="bi bi-caret-right-fill" style={{fontSize:'30px',cursor:'pointer'}} onClick={leftSwipeHandler}></i>
            </div>
        </div>
        </>
    )
}

export default HomePage;