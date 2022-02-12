import React, { useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Header from './Header';
import { getData, ServerURL,postData } from '../FetchData';
import Paper from "@material-ui/core/Paper";
import Footer from './Footer';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import QtySpinner from './QtySpinner';
import {useDispatch} from 'react-redux';
import { getByDisplayValue } from '@testing-library/react';

const useStyles = makeStyles((theme)=>({
    root:{
        // padding:10,
        width:'auto',
        height:'auto',
        // display:'flex',
        // flexDirection:'row',
        //overflow:'hidden'
    },
    paperstyle:{
        borderRadius:10,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column',
        width:'17vw',
        height:'47vh',
        padding:'1ch',
        margin:15,
    },
    imageView:{
        padding:10,
        cursor:'pointer',
        '&:hover':{
            transform:'scale(1.3)',
            transition:'all 0.3s ease 0.2s'
        }
    }
}))

export default function SubcategoryData(props){

    const classes = useStyles();
    const [listConsole,setListConsole] = useState([]);
    const [pageRender,setPageRender] = useState(false);
    //console.log(props.history.location.state.categoryid);

    var categoryid = props.history.location.state.categoryid;
    var dispatch=useDispatch();

    const fetchAllSubCategories=async()=>{
        var body={'categoryid':categoryid}
        var list=await postData('subcategory/displayallsubcategorybycategoryid',body);
        setListConsole(list);
    }

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

    
    const showConsole=()=>{
        return(
            listConsole.map((item)=>{
                return(
                    <div style={{
                        display:'flex',
                        justifyContent:'center',
                        alignItems:'center',
                        //flexDirection:'row',
                        float:'left',
                        marginRight:'0px',
                        width:'auto',
                        height:'auto',
                        padding:'1ch',
                        margin:5,
                    }}>  
                    <Paper className={classes.paperstyle} elevation={3}>
                        <div onClick={()=>props.history.push({'pathname':'/productview'},{'product':item})} className={classes.imageView}>
                            <img src={`${ServerURL}/images/${item.icon}`} width="140px" />
                        </div>
                        <div 
                        style={{
                            fontWeight:'bold',
                            fontSize:13,
                            padding:13,
                            letterSpacing:1
                            }}>
                                {item.subcategoryname.toUpperCase().length<=16 ? item.subcategoryname.toUpperCase(): item.subcategoryname.toUpperCase().substring(0,15)+"..."}
                        </div>
                        <div style={{fontSize:13,padding:5}}>
                            Day Price:<s>&#8377; {item.rentamount}</s>{" "} 
                            <span><b> &#8377; {item.offers}</b></span>
                        </div>
                        <div style={{fontSize:13,padding:5}}>
                            <span style={{color:'green'}}><b>You Save</b></span><b> &#8377; {item.rentamount-item.offers}</b>
                        </div>  
                        <div 
                        style={{
                            display:'flex',
                            justifyContent:'center',
                            alignItems:'center',
                            padding:10
                        }}>     
                            <QtySpinner value={0} onChange={(value)=>handleQtyChange(value,item)} />
                        </div>
                    </Paper>
                    </div>
               )
            }))
        
    }   

    useEffect(function(){
        fetchAllSubCategories();
    },[]);

    return(
    <div>
        <Header history={props.history} />
        <div style={{width:'auto',display:'flex'}}>
            {showConsole()}                       
        </div>
        <Footer history={props.history} />
    </div>
    )
}