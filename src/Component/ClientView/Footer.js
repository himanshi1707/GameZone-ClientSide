import { Divider } from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { getData } from '../FetchData';
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';

export const Box = styled.div`
  display:flex;
  justify-content:left;
  padding: 40px 60px;
  background: #1e6b7b;
  position: relative;
  bottom: 0;
  width: auto;
  
   
`;

export const Container = styled.div`
    display:flex;
    flex-direction:column;
    width: 80vw;
    justify-content:center;
    margin-right:40px;
`;

export const Row = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, 
                        minmax(200px, 1fr));
    grid-gap: 5px;

`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: left;
    margin-left: 10px;
    margin-bottom:20px;
    width: 29vw;
`;

export const Heading = styled.div`
    color:#fff;
    font-weight:bold;
    font-size:14px;
    padding:10px;

`;

export const FooterLink = styled.div`
    color: #fff;
    padding: 8px;
    margin-right:20px;
    font-size:14px;
`;

export default function Footer(props){

    const [listCategory,setListCategory] = useState([]);

    const fetchAllCategory=async()=>{
        var list = await getData('categories/displayall')
        setListCategory(list)
    }

    const showCategory=()=>{
        return(
            listCategory.map((item)=>{
                return(
                    <FooterLink>
                        <div  style={{textAlign:'left'}} value={item.categoryid}>{item.categoryname}</div>
                    </FooterLink>
                )
            })
        )
    }

    useEffect(function(){
        fetchAllCategory();
    },[])

    return(
        <div>
            <Box>
                <Container>
                    <Row >
                        <Column style={{marginBottom:'19.5ch'}}>
                            <Heading>
                                MOST POPULAR CATEGORIES
                            </Heading>
                            <FooterLink>{showCategory()}</FooterLink>
                        </Column>
                        <Column  style={{marginBottom:'17ch',marginLeft:'90px',alignSelf:'center'}}>
                            <Heading>
                                CUSTOMER SERVICES
                            </Heading>
                            <FooterLink>Terms & Conditions</FooterLink>
                            <FooterLink>FAQ</FooterLink>
                            <FooterLink>Contact Us</FooterLink>
                        </Column>
                        <Column  style={{marginBottom:'17ch',marginLeft:'150px'}}>
                            <Heading>
                                VISIT
                            </Heading>
                            <FooterLink>Home</FooterLink>
                            <FooterLink>Blog</FooterLink>
                            <FooterLink>Offers</FooterLink>
                        </Column>
                        <Divider orientation="vertical" style={{backgroundColor:'#fff',marginLeft:'200px'}} />
                        <Column style={{marginRight:40}}>
                            <Heading >
                                CONTACT US
                            </Heading>
                            <FooterLink>Call Us: xxxxxxxxx</FooterLink>
                            <FooterLink>Email: xxxx@gmail.com</FooterLink>
                            <FooterLink style={{display:'inline-block',textAlign:'left'}}>
                                GameZone is your destination new and used 
                                video games.Rent video games online for your favorite
                                systems including PS4, Xbox One,PS3,Xbox 360,Wii U, 
                                3DS and more.
                            </FooterLink>
                            <FooterLink style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:10,flexDirection:'column'}}>
                              <b>Dowload App</b>
                                <img src="../googlendapple.png" width="250px" height="40px" style={{marginTop:10}} />
                            </FooterLink>
                        </Column>
                    </Row>
                    <Row>
                        <Column>
                            <FooterLink>
                            <VideogameAssetIcon style={{marginBottom:-14,padding:5,fontSize:'30px'}}/>2500+ GAMES
                            </FooterLink>
                        </Column>
                        <Column>
                            <FooterLink style={{marginLeft:'9ch'}}>
                                <LocalShippingIcon style={{marginBottom:-14,padding:5,fontSize:'30px'}} />FREE SHIPPING
                            </FooterLink>
                        </Column>
                        <Column>
                            <FooterLink style={{marginLeft:'17ch'}}>
                               <SportsEsportsIcon style={{marginBottom:-14,padding:5,fontSize:'30px'}} /> GENUINE PRODUCTS
                            </FooterLink>
                        </Column>
                        <Column>
                        </Column>
                    </Row>
                    <Divider style={{
                        backgroundColor:'#fff',
                        marginTop:'20px',
                        width:'91vw'
                        }}/>
                    <div style={{
                        color:'#fff',
                        display:'flex',
                        justifyContent:'center',
                        fontSize:'13px',
                        marginLeft:'20ch',
                        marginTop:'15px'
                        }}>
                        &copy;2021 NUMERIC INFOSYSTEM Pvt. Ltd.All Rights Reserved.
                    </div>
                </Container>
            </Box>
        </div>
    )
}


























// import { AppBar, makeStyles } from '@material-ui/core';
// import React, { useState,useEffect } from 'react';
// import {Grid} from '@material-ui/core';
// import {getData} from '../FetchData';
// import Divider from '@material-ui/core/Divider';
// import { IoMdCall } from "react-icons/io";
// import { FaAddressBook } from "react-icons/fa";
// import { HiMailOpen } from "react-icons/hi";
// import {IconButton} from "@material-ui/core"
// import FacebookIcon from '@material-ui/icons/Facebook';
// import InstagramIcon from '@material-ui/icons/Instagram';
// import TwitterIcon from '@material-ui/icons/Twitter';
// import PinterestIcon from '@material-ui/icons/Pinterest';

// const useStyles = makeStyles((theme)=>({
//      appBar: {
//         top: 'auto',
//         backgroundColor:'#006266',       
//         overflow:'hidden',
//         justifyContent:'center',
//         alignItems:'center',
//         alignSelf:'center',
//         display:'flex',
//         flexWrap:'wrap',
//         height:'auto'
//       },
//       p: {
//         fontSize:'12px',
//         marginLeft:10
//       }
    
// }));

// export default function Footer(props){

//     const [listCategory,setListCategory] = useState([]);
    
//     const fetchAllCategory=async()=>{
//         var list=await getData("categories/displayall")
//         setListCategory(list);
//     }

//     const showCategory=()=>{
//         return(
//             listCategory.map((item)=>{
//                 return(
//                     <div>
//                         <p>{item.categoryname}</p>
//                     </div>
//                 )
//             })
//         )
//     }
    

//     useEffect(function(){
//         fetchAllCategory();
//     },[])


//     const classes = useStyles();
//     return(
//         <div>
//         <AppBar className={classes.appBar} position="static">
//             <Grid container spacing={5} 
//             style={{
//                 display:'flex',
//                 flexDirection:'row',
//                 flexWrap:'wrap',
//                 alignSelf:'center',
//                 margin:'auto'}}>
//                  <Grid item xs={6} sm={2} 
//                  style={{
//                      color:'#fff',
//                      letterSpacing:1
//                     }}>
//                      <b><h4>Top Categories</h4></b>
//                      <p 
//                      style=
//                      {{
//                         fontSize:'14px',
//                         marginLeft:0,
//                     }} > 
//                         {showCategory()} 
//                     </p>
//                  </Grid>
//                  <Grid item xs={6} sm={2} 
//                  style={{
//                      color:'#fff',
//                      letterSpacing:1
//                     }}>
//                      <b><h4>Top Offers On</h4></b>
//                      <p 
//                      style=
//                      {{
//                         fontSize:'14px',
//                         marginLeft:0,
//                     }} > 
//                         SubCategory 
//                     </p>
//                     <p 
//                      style=
//                      {{
//                         fontSize:'14px',
//                         marginLeft:0,
//                     }} > 
//                         Games 
//                     </p>
//                     <p 
//                      style=
//                      {{
//                         fontSize:'14px',
//                         marginLeft:0,
//                     }} > 
//                         Accessories 
//                     </p>
//                  </Grid>
//                  <Grid item xs={6} sm={4} 
//                  style={{
//                      color:'#fff',
                   
//                      letterSpacing:1
//                      }}>
//                      <b><h4>Customer Services</h4></b>
//                         <p 
//                         style=
//                         {{
//                             fontSize:'14px',
//                         }}>
//                             Terms & Conditions
//                         </p>
//                         <p style=
//                         {{
//                             fontSize:'14px',
//                         }}>
//                             FAQ
//                         </p>
//                         <p style=
//                         {{
//                             fontSize:'14px',
//                         }}>
//                             Contact Us
//                         </p>
//                  </Grid>
                 
//                  <Divider orientation="vertical" 
//                  style={{
//                      backgroundColor:'#fff',
//                      height:'auto',
//                      marginTop:40
//                      }} />
//                      <Grid item xs={3} style={{
//                      color:'#fff',
//                      letterSpacing:1,
//                      }}>
//                         <h4>Follow Us:</h4>
//                             <IconButton style={{color:'#fff'}} >
//                                 <FacebookIcon style={{fontSize:'30px'}} />
//                             </IconButton>
//                             <IconButton style={{color:'#fff'}} >
//                                 <InstagramIcon style={{fontSize:'30px'}} />
//                             </IconButton>
//                             <IconButton style={{color:'#fff'}} >
//                                 <TwitterIcon style={{fontSize:'30px'}} />
//                             </IconButton>
//                             <IconButton style={{color:'#fff'}} >
//                                 <PinterestIcon style={{fontSize:'30px'}} />
//                             </IconButton>
                            
//                      </Grid>
//                  <Grid item xs={6} sm={6} 
//                  style={{
//                      color:'#fff',
//                      letterSpacing:1,
//                      }}>
//                      <b><h4>Contact Us</h4></b>
//                        <p style=
//                         {{
//                             fontSize:'14px',
//                         }}>
//                         <IoMdCall 
//                         style={{
//                             marginRight:18,
//                             marginBottom:-5,
//                             fontSize:20
//                             }}/> 
//                             Call Us: xxxxxxxxxx
//                         </p>
//                         <p style=
//                         {{
//                             fontSize:'14px',
//                             marginLeft:0
//                         }}>
//                             <FaAddressBook 
//                             style={{
//                                 marginRight:18,
//                                 marginBottom:-5,
//                                 fontSize:20
//                                 }}/>
//                             Address: -------------
//                         </p>
                        
//                         <p style=
//                         {{
//                             fontSize:'14px',
//                             marginLeft:0
//                         }}>
//                             <HiMailOpen 
//                             style={{
//                                 marginRight:18,
//                                 marginBottom:-5,
//                                 fontSize:20
//                                 }}/>
//                             Mail Us: xxxxxxxxxx
//                         </p>
//                         <p style=
//                         {{
//                             fontSize:'14px',
//                             textAlign:'left',
//                             display:'inline-block',
//                             wordSpacing:2
//                         }}>
//                             We are providing 100% genuine products.Top variety of Games are available like 
//                             PlayStation3, PlayStation4, Xbox, etc. with their accessories.
//                         </p> 
//                         <p style=
//                         {{
//                             fontSize:'14px',
//                         }}>
//                                 <b><h4>Download App</h4></b>
//                                 <img src="../googlendapple.png" width="250px" height="40px" />
//                                 {/* <img src="../applestore.png" width="140px" height="110px" style={{margin:'10px'}}/> */}
//                         </p>         
//                  </Grid>
//              </Grid>
//              <Divider  orientation="horizontal"
//                  style={{
//                      backgroundColor:'#fff',
//                      width:'500px',
//                      marginRight:20
//                      }} />
//              <div 
//              style={{
//                  display:'flex',
//                  alignSelf:'center',
//                  fontSize:13
//                  }}>
                     
//                 <p>&copy;2021 All Rights Reserved to Numeric Infosystem</p>
//             </div>
//         </AppBar> 
//         </div>
//     )
// }






    