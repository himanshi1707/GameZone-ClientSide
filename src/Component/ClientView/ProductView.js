import React, { useEffect, useState, createRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { getData, ServerURL,postData } from '../FetchData';
import {Grid, TextField} from '@material-ui/core';
import TodayIcon from '@material-ui/icons/Today';
import Header from './Header';
import Footer from './Footer';
import QtySpinner from './QtySpinner';
//import {useDispatch} from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import renderHTML from 'react-render-html';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import {useDispatch, useSelector} from 'react-redux';

const useStyles = makeStyles((theme)=>({
    root: {
        overflow:'hidden',
        margin:10,
        padding:10      
      },
      textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
      },
        
    
}))

export default function ProductView(props){

    const classes = useStyles();
    var dispatch=useDispatch();
    var cart=useSelector(state=>state.cart)
    const [startDate,setStartDate] = useState(getCurrentDate());
    const [endDate,setEndDate] = useState(addDays(1,getCurrentDate()));
    const [totalAmt,setTotalAmt] = useState("");
    const [days,setDays] = useState("");
    const [msg,setMsg] = useState("");
    const [documents,setDocuments] = useState("");
    const [tc,setTc] = useState("");
    const [consolePicture,setConsolePicture]=useState([]);
    const [pageRender,setPageRender] = useState(false);

    const consoleSlider= createRef();
    function getCurrentDate(){
        var d=new Date();
        var dd=d.getDate();
        if(dd<=9)
        {
            dd="0"+dd;
        }
        var mm=d.getMonth()+1;
        if(mm<=9)
        {
            mm="0"+mm
        }
        var cd=d.getFullYear()+"-"+mm+"-"+dd;
        return cd;
    }

    function addDays(days,dt){
        var d=new Date(dt)
        d.setDate(d.getDate()+days)
        var dd=d.getDate();
        if(dd<=9)
        {
            dd="0"+dd;
        }
        var mm=d.getMonth()+1;
        if(mm<=9)
        {
            mm="0"+mm
        }
        var cd=d.getFullYear()+"-"+mm+"-"+dd;
        return cd;
    }


    const handleDataDifference=(event,rentamount)=>{
        setEndDate(event.target.value);
        // alert("start Date"+startDate);
        // alert("end Date"+endDate);

        var sd = new Date(startDate);
        var ed = new Date(event.target.value);
        const diffTime = Math.abs(ed-sd);
        const diffDays = Math.ceil(diffTime/(1000*60*60*24));
        //alert(diffDays);
        var totalamt = rentamount*diffDays;
        setTotalAmt(totalamt);
        setDays(diffDays);
        item['duration']=diffDays
        item['time']='Days'
        dispatch({type:'ADD_CART',payload:[item.subcategoryid,item]})
        setPageRender(!pageRender)
        setMsg(`Rent for ${diffDays} days is ₹ ${totalamt}`)
    }

    const getPrice=(state,price)=>{
        var days=0
        var ed=endDate
        var cd=startDate
        if(state=='Days')
        { 
            days = 1
            ed=addDays(days,cd)
        }
        else if(state=='Week')
        {
            days=7
            ed=addDays(days,cd)
        }
        else if(state=='Month')
        {
            days=30
            ed=addDays(days,cd)
        }
        setEndDate(ed)
        item['duration']=days
        item['time']='Days'
        item['startdate']=cd
        item['enddate']=ed
        dispatch({type:'ADD_CART',payload:[item.subcategoryid,item]})
        setPageRender(!pageRender)
        setMsg(`Rent for ${state} days is ₹ ${price}`)

    }

    const fetchDocuments = async()=>{
        var result = await getData("documentation/displayall");
        setDocuments(result[0].document);
    }

    const fetchTC = async()=>{
        var result = await getData("termsandconditions/displayall");
        setTc(result[0].conditioned);
    }
    const fetchConsolePictures = async()=>{
        var body={subcategoryid:item.subcategoryid}
        var result = await postData("subcategorypicture/displayallproductpictures",body);
        setConsolePicture(result);
    }

    const handleNext=()=>{
        consoleSlider.current.slickNext();
    }

    const handlePrev=()=>{
        consoleSlider.current.slickPrev();
    }

    var settings1 = {
        dots: false,
        infinite: true,
        speed: 1000,          
        slidesToShow: 4,
        slidesToScroll: 1,
        centerMode:true,
        centerSlidePercentage: 50,
        // autoplay: true,
        // autoplayspeed:2000,
      };

    useEffect(function(){
        fetchDocuments();
        fetchTC();
        fetchConsolePictures();
    },[])
///////////////////////////////tabs///////////////////////////////
    const showTabs=(Description) => (
        <Tabs style={{padding:20}}>
          <TabList>
            <Tab style={{fontWeight:'bold',fontSize:20,letterSpacing:1}}>Description</Tab>
            <Tab style={{fontWeight:'bold',fontSize:20,letterSpacing:1}}>Terms & Conditions</Tab>
            <Tab style={{fontWeight:'bold',fontSize:20,letterSpacing:1}}>Documents</Tab>
          </TabList>
          <TabPanel>
            <h2>{Description}</h2>
          </TabPanel>
          <TabPanel>
              <div>
                {renderHTML(tc)};                   
            </div>
          </TabPanel>
          <TabPanel>
              <div>
                {renderHTML(documents)}
              </div>
          </TabPanel>
        </Tabs>
      );
      
///////////////////////////////////////////////////////////////////

const handleQtyChange=(value,item)=>{
    if(value==0)
    {
        dispatch({type:'REMOVE_CART',payload:[item.subcategoryid,item]})    
    }
    else
    {
        item['qtydemand']=value
        item['duration']=1
        item['time']='Day'
        var cd=getCurrentDate()
        item['startdate']=cd
        var ed=addDays(1,cd)
        item['enddate']=ed
        dispatch({type:'ADD_CART',payload:[item.subcategoryid,item]})
    //alert(JSON.stringify(item))
    
    }
    setPageRender(!pageRender)
}

    var item = props.history.location.state.product;
    const [getImage,setImage]=useState(item.icon);
    

    const subcategoryData=()=>{
        var rentamount = item.offers>0?item.offers:item.rentamount;
        var v=cart[item.subcategoryid]||0;
        var qty = 0;
        if(v!=0)
        {
            qty=cart[item.subcategoryid].qtydemand;
        }
        
        return(
            <div>
            <div style={{padding:10,fontSize:18,fontWeight:'bold',letterSpacing:2}}>
                {item.subcategoryname}
            </div>
            <div style={{fontSize:16,padding:10}}>
                Day Price:<s>&#8377; {item.rentamount}</s>{" "} 
                <span style={{color:'green'}}><b> &#8377; {item.offers}</b></span>
            </div>
            <div style={{padding:10}}>
                {(item.stock-item.rented)>0?<div>Availability:{(item.stock-item.rented)} in Stock</div>:<div>Not Available this time</div>}
            </div>
            <div style={{display:'flex',flexDirection:'row'}}>
                <div onClick={()=>getPrice("Day",rentamount)} style={{cursor:'pointer',display:'flex',flexDirection:'column',justifyContent:'center',width:120,padding:10,margin:10,backgroundColor:'#1289A7',color:'#ffff'}}>
                    <div>Day Price:</div>
                    <div>&#8377;{rentamount}</div>
                </div>
                <div onClick={()=>getPrice("Week",rentamount*7)} style={{cursor:'pointer',display:'flex',flexDirection:'column',justifyContent:'center',width:120,margin:10,padding:10,backgroundColor:'#12CBC4',color:'#ffff'}}>
                    <div>Week Price:</div>
                    <div>&#8377;{rentamount*7}</div>
                </div>
                <div onClick={()=>getPrice("Month",rentamount*30)} style={{cursor:'pointer',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',width:120,margin:10,padding:10,backgroundColor:'#60a3bc',color:'#ffff'}}>
                    <div>Month Price:</div>
                    <div>&#8377;{rentamount*30}</div>
                </div>
            </div>
            <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:400,padding:10}}>
                    <span><TodayIcon />{" "}</span>
                    <span>Select Rent Duration</span>
                </div>
                <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:400,padding:10}}>
                    <span>      
                        <TextField
                            id="date"
                            label="Start Date"
                            variant="outlined"
                            type="date"
                            onChange={(event)=>setStartDate(event.target.value)}
                            value={startDate}
                            //defaultValue="2017-05-24"
                            className={classes.textField}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                    </span>
                    <span>      
                        <TextField
                            id="date"
                            label="End Date"
                            variant="outlined"
                            type="date"
                            onChange={(event)=>handleDataDifference(event,rentamount)}
                            value={endDate}
                            //defaultValue="2017-05-24"
                            className={classes.textField}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                    </span>
                </div>
                <div style={{padding:10}}>
                    {msg}
                </div>
                <div style={{padding:10,display:'flex',justifyContent:'center',alignItems:'center',width:400}}>
                    <QtySpinner value={qty} onChange={(value)=>handleQtyChange(value,item)} />
                </div>
        </div>
        )
    }

    const showConsolePictures=()=>{
        return consolePicture.map(function(citem,index){
            return(
                <div 
                style={{
                    display:'flex',
                    justifyContent:'center',
                    alignItems:'center',
                    outline:'none'
                }}>
                    <div 
                    style={{
                        display:'flex',
                        justifyContent:'center',
                        alignItems:'center',
                        outline:'none',
                        border:'2px solid #95a5a6',
                        borderRadius:4,
                        margin:10,
                        padding:13,
                        cursor:'pointer'}} onMouseEnter={()=>setImage(citem.image)}>
                        <img src={`${ServerURL}/images/${citem.image}`} width="50px" height="50px" />
                    </div>
                </div>
            )
        }
        )
    }

    return(
    <div>
        <Header history={props.history} />
        <div style={{padding:20}}>
        <Grid container xs={12}>
            <Grid item xs={6}>
                <div style={{padding:30}}>
                    <img src={`${ServerURL}/images/${getImage}`} width="400px" height="400" />
                </div>
                {consolePicture.length>=1 && consolePicture.length<=4?(
                <div style={{padding:"30px 10px",display:'flex',justifyContent:'center',alignItems:'center',margin:30}}>
                    <div style={{width:500}}>
                        <Slider {...settings1} ref={consoleSlider}>
                            {showConsolePictures()}
                        </Slider>
                    </div>
                </div>):(
                
                <div style={{padding:"30px 10px",display:'flex',justifyContent:'center',alignItems:'center',margin:30}}>
                <div style={{fontSize:"small",marginLeft:20,zIndex:1,cursor:'pointer'}}>
                    <ArrowBackIosIcon onClick={()=>handlePrev()}/>
                </div>
                    <div style={{width:500}}>
                        <Slider {...settings1} ref={consoleSlider}>
                            {showConsolePictures()}
                        </Slider>
                    </div>
                    <div style={{fontSize:"small",marginRight:20,zIndex:1,cursor:'pointer'}}>
                    <ArrowForwardIosIcon onClick={()=>handleNext()}/>
                </div>
                </div>) 
                }
            </Grid>
            <Grid item xs={6}>
                {subcategoryData()}
            </Grid>
        </Grid>
        <div>
            {showTabs(item.description)}
        </div>
        </div>
        <Footer history={props.history} />
    </div>
    )
}








    //var dispatch=useDispatch();
//     const fetchAllSubCategories=async()=>{
//         var body={'subcategoryid':subcategoryid}
//         var list=await postData('subcategory/displaysubcategorydatabyid',body);
//         setSubcategoryInfo(list);
//     }


//     const handleQtyChange=(value,item)=>{
//         if(value==0)
//         {
//             dispatch({type:'REMOVE_CART',payload:[item.subcategoryid,item]})    
//         }
//         else
//         {
//             item['qtydemand']=value
//             dispatch({type:'ADD_CART',payload:[item.subcategoryid,item]})
//         }
//         setPageRender(!pageRender)
//     }
    
//     const showData=()=>{
//         return(
//             subcategoryInfo.map((item)=>{
//                 return(
//                     <div style={{display:'flex',flexDirection:'row',justifyContent:'center',margin:40}}>  
//                         <img src={`${ServerURL}/images/${item.icon}`} width="360px" style={{margin:10}}/>
//                         <div style={{
//                             display:'flex',
//                             flexDirection:'column',
//                             justifyContent:'flex-end',
//                             alignSelf:'center',
//                             fontSize:'18px',
//                             width:'50vw',
//                             border:'1px solid #bdc3c7',
//                             padding:20}}>
//                         <div style={{margin:20,letterSpacing:1}}>
//                                 <b>{item.subcategoryname.toUpperCase()}</b>
//                         </div>
//                         <div style={{margin:20}}>
//                             {item.description}
//                         </div>
//                         <div style={{margin:20}}>
//                             <b>Stock</b>: {item.stock} <span style={{margin:30}}><b>Rented</b>: {item.rented}</span>
//                         </div>
//                         <div style={{margin:20}}>
//                             <b>Day Price</b>: Price<s>&#8377; {item.rentamount}</s>  <span> &#8377; {item.offers}</span>
//                         </div>
//                         <div style={{margin:20}}>
//                             <span style={{color:'green'}}><b>You Save</b></span><b> &#8377; {item.rentamount-item.offers}</b>
//                         </div>  
//                         <div style={{display:'flex',justifyContent:'center'}}>     
//                             <QtySpinner value={0} onChange={(value)=>handleQtyChange(value,item)}/>
//                         </div>
//                         </div>
//                     </div>
//                )
//             }))
        
//     }  

//     useEffect(function(){
//         fetchAllSubCategories();
//     },[])

//     return(
//     <div>
//         <Header />
//             <div >
//                {showData()} 
//             </div>
//         <Footer />    
//     </div>
//     )
// }   