import React, { useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Header from './Header';
import { getData, ServerURL } from '../FetchData';
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import IconButton from '@material-ui/core/IconButton';
import Footer from './Footer';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



const useStyles = makeStyles((theme)=>({
    root:{
        padding:10,
        display:'flex',
        flexDirection:'column',
        overflow:'hidden'
    },
    categoryView:{
        display:'flex',
        justifyContent:'center',
        //flexWrap:'wrap',
        letterSpacing:2,
        alignItems:'center',
        height:'50vh',
        width:'auto',
        flexDirection:'column',
        padding:'10px',
        margin:10,
    },
    // game:{
    //     border:'1px solid #ecf0f1',
    //     borderRadius:10,
    //     display:'flex',
    //     alignItems:'center',
    //     justifyContent:'center',
    //     cursor:'pointer',
    //     flexDirection:'column',
    //     width:'18vw',
    //     height:'45vh',
    //     padding:'10px',
    //     boxShadow:'0 7px 8px #a4b0be',
    //     margin:'20px',
    //     '&:hover':{
    //         transition:'all 0.3s ease 0.2s',
    //         transform:'scale(1.1)',
    //         backgroundColor:'white'
    //     }
    // },
    paperstyle:{
        borderRadius:10,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column',
        width:'21vw',
        height:'40vh',
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
    },
    paperstyle1:{
        borderRadius:10,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column',
        width:'19vw',
        height:'40vh',
        padding:'1ch',
        margin:15,
    },
    imageView1:{
        padding:10,
        cursor:'pointer',
        '&:hover':{
            transform:'scale(1.3)',
            transition:'all 0.3s ease 0.2s'
        }
    }
}))

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", 
        backgroundColor: "#006266",
        padding:10,
        borderRadius:20,
        zIndex:1,opacity:0.7,marginRight:'24px' }}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block",
        backgroundColor: "#006266",
        padding:10,
        borderRadius:20,
        zIndex:1,opacity:0.7,marginLeft:'24px' }}
        onClick={onClick}
      />
    );
  }




export default function Home(props){

    const classes = useStyles();
    const [listCategory,setListCategory] = useState([]);
    const [listSubCategoryOffers, setListSubcategoryOffers] = useState([]);
    const [listGameOffers, setListGameOffers] = useState([]);
    const [listAccessoryOffer, setListAccessoryOffer] = useState([]);
    
    var settings = {
        dots: false,
        infinite: true,
        speed: 1000,          
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplayspeed:2000,
      };

      var settings1 = {
        dots: false,
        //infinite: true,
        speed: 1000,          
        slidesToShow: 4,
        slidesToScroll: 1,
        centerMode:true,
        centerSlidePercentage: 50,
        autoplay: true,
        nextArrow:<SampleNextArrow />,
        prevArrow:<SamplePrevArrow />,
        autoplayspeed:2000,
      };

      var settings2 = {
        dots: false,
        infinite: true,
        speed: 1000,          
        slidesToShow: 4,
        slidesToScroll: 1,
        // centerMode:true,
        // centerPadding:'50px',
        nextArrow:<SampleNextArrow />,
        prevArrow:<SamplePrevArrow />,
        autoplay: true,
        autoplayspeed:2000,
      };

    
    const fetchAllCategories=async()=>{
        var list=await getData('categories/displayall');
        setListCategory(list);
    }

    const fetchAllOffers=async()=>{
        var list=await getData('subcategory/displayoffers')
        setListSubcategoryOffers(list)
    }

    const fetchAllGameOffer=async()=>{
        var list=await getData('addgame/gameoffers')
        setListGameOffers(list)
    }

    const fetchAllAccessoryOffer=async()=>{
        var list=await getData('accessories/accessoryoffer')
        setListAccessoryOffer(list)
    }

    const handleConsoleList=(categoryid)=>{
        props.history.push({'pathname':'/subcategorydata'},{'categoryid': categoryid})
    }

    // const handleSubcategoryData=(subcategoryid)=>{
    //     props.history.push({'pathname':'/productview'},{'product':item})
    // }

    const showCategories=()=>{
        return(
             listCategory.map((item)=>{
                 return(
                     <div style={{display:'flex',flexWrap:'wrap'}}>
                     <div 
                     className={classes.categoryView} 
                     onClick={()=>handleConsoleList(item.categoryid)}>
                         <img src={`${ServerURL}/images/${item.icon}`}  width="370px" height="270px" style={{cursor:'pointer'}}/>
                         <div 
                         style={{
                             fontWeight:'bold',
                             fontSize:22,
                             padding:'5px'
                             }}>
                                 {item.categoryname.toUpperCase()}
                        </div>
                     </div>
                     </div>
                 )
             })
        )
    }

    const showOffers=()=>{
        return(
            listSubCategoryOffers.map((item)=>{
                return(
                    <div onClick={()=>props.history.push({'pathname':'/productview'},{'product':item})}>  
                    <Paper className={classes.paperstyle} elevation={3}>
                        <img src={`${ServerURL}/images/${item.icon}`} width="140px" className={classes.imageView} />
                        <div 
                        style={{
                            fontWeight:'bold',
                            fontSize:13,
                            padding:16,
                            letterSpacing:1
                            }}>
                                {item.subcategoryname.toUpperCase().length<=16 ? item.subcategoryname.toUpperCase(): item.subcategoryname.toUpperCase().substring(0,15)+"..."}
                        </div>
                        <div style={{fontSize:13,padding:5}}>
                            Day Price:Price<s>&#8377; {item.rentamount}</s> <span><b> &#8377; {item.offers}</b></span>
                        </div>
                        <div style={{fontSize:13,padding:5}}>
                            <span style={{color:'green'}}><b>You Save</b></span><b> &#8377; {item.rentamount-item.offers}</b>
                        </div>       
                    </Paper>
                    </div>
               )
            }))
        
    }

    const showAccessoryOffer=()=>{
        return(
            listAccessoryOffer.map((item)=>{
                return(
                    <div> 
                    <Paper className={classes.paperstyle} elevation={3}>
                    <img src={`${ServerURL}/images/${item.picture}`} width="110px" className={classes.imageView} />
                        <div 
                        style={{
                            fontWeight:'bold',
                            fontSize:13,
                            padding:20,
                            letterSpacing:1
                            }}>
                                {item.accessoryname.toUpperCase().length<=22 ? item.accessoryname.toUpperCase(): item.accessoryname.toUpperCase().substring(0,20)+"..."}
                        </div>
                        <div style={{fontSize:13,padding:5}}>
                            Day Price:Price<s>&#8377; {item.rentamount}</s> <span><b> &#8377; {item.offers}</b></span>
                        </div>
                        <div style={{fontSize:13,padding:5}}>
                            <span style={{color:'green'}}><b>You Save</b></span><b> &#8377; {item.rentamount-item.offers}</b>
                        </div>       
                    </Paper>
                    </div>
                )
            }))
        
    }

    const showGameOffers=()=>{
        return(
            listGameOffers.map((item)=>{
                return(   
                    <div>
                         <Paper  className={classes.paperstyle1} elevation={3} >
                            <img src={`${ServerURL}/images/${item.picture}`} width="150px" className={classes.imageView1} />
                            <div 
                            style={{
                                fontWeight:'bold',
                                fontSize:13,
                                //alignSelf:'center',
                                padding:17,
                                letterSpacing:1
                                }}>
                                    {item.gamename.length<=18 ? item.gamename.toUpperCase():item.gamename.toUpperCase().substring(0,16)+"..."}
                            </div>
                            <div style={{fontSize:13,padding:5}}>
                                Day Price:Price<s>&#8377; {item.rentamount}</s> <span><b> &#8377; {item.offers}</b></span>
                            </div>
                            <div style={{fontSize:13,padding:5}}>
                                <span style={{color:'green'}}><b>You Save</b></span><b> &#8377; {item.rentamount-item.offers}</b>
                            </div>
                        </Paper>
                    </div>            
                )
            })
        )
    }

    const showSlider=()=>{
        return(
            listCategory.map((item)=>{
                return(
                    <div>
                        <img src={`${ServerURL}/images/${item.ad}`} width="100%" height="30%" />
                    </div>
                )
            })
        )
    }
    

    useEffect(function(){
        fetchAllCategories();
        fetchAllOffers();
        fetchAllGameOffer();
        fetchAllAccessoryOffer();
    },[])

    return(<div>
        <Header  history={props.history} />
        <div className={classes.root}>
            <div style={{marginTop:'-9px'}}>
                <div>
                     <Slider {...settings}>
                        {showSlider()}    
                    </Slider>
                    
                </div>
            </div>
            <div style={{display:'flex',flexDirection:'column'}}>
                <div style={{
                    fontSize:30,
                    fontWeight:'normal',
                    color:'#636e72',
                    display:'flex',
                    justifyContent:'center',
                    padding:10,
                    letterSpacing:"3.9px",
                    fontFamily:'Georgia,Times,"Times New Roman",serif'
                }}>
                    TOP CATEGORIES
                </div>
            <Divider style={{marginTop:5,marginBottom:5}} />
            <div 
            style={{
                display:'flex',
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'center',
                marginTop:5,
                marginLeft:10,
                padding:10
            }}>
                
                {showCategories()}
            </div>
            </div>
        <div style={{display:'flex',flexDirection:'column'}}>
        <div style={{fontSize:30,
            fontWeight:'normal',
            color:'#636e72',
            display:'flex',
            justifyContent:'center',
            padding:10,
            letterSpacing:"3.9px",
            fontFamily:'Georgia,Times,"Times New Roman",serif'}}>
                TOP OFFERS
            </div>
            <Divider style={{marginTop:5,marginBottom:5}} />
        <div 
        style={{
            margin:'2ch'
        }}>
            
            <div>
                <Slider {...settings2}>
                    {showOffers()}    
                </Slider>
            </div>
            {/* {showOffers()} */}
        </div>
        </div>
        <div style={{display:'flex',flexDirection:'column'}}>
        <div style={{fontSize:30,
            fontWeight:'normal',
            color:'#636e72',
            display:'flex',
            justifyContent:'center',
            padding:10,
            letterSpacing:"3.9px",
            fontFamily:'Georgia,Times,"Times New Roman",serif'}}>
                TOP GAMEOFFERS
            </div>
            <Divider style={{marginTop:5,marginBottom:5}} />
            <div style={{
            margin:'2ch',
        }}>
            <div> 
                <Slider {...settings1}>
                  {showGameOffers()}
                </Slider>
            </div>
            </div>
        </div>
        <div style={{display:'flex',flexDirection:'column'}}>
        <div style={{fontSize:30,
            fontWeight:'normal',
            color:'#636e72',
            display:'flex',
            justifyContent:'center',
            padding:10,
            letterSpacing:"3.9px",
            fontFamily:'Georgia,Times,"Times New Roman",serif'}}>
                TOP ACCESSORY OFFERS
            </div>
            <Divider style={{marginTop:5,marginBottom:5}} />
        <div 
        style={{
            margin:'2ch',
        }}>
            <div>
                <Slider {...settings2}>
                    {showAccessoryOffer()}    
                </Slider>
            </div>
        </div>
        </div>
    </div>
        <Footer />
    </div>
    )
}