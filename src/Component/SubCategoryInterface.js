import React,{useState, useEffect} from 'react';
import {TextField, Button, Grid} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import swalhtml from "@sweetalert/with-react";
import swal from "sweetalert";
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Avatar from '@material-ui/core/Avatar';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { postDataAndImage,getData } from './FetchData';
import {isBlank} from "./Checks"
import renderHTML from 'react-render-html';

const useStyles = makeStyles((theme) => ({

    root: {
        height:1000,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        //background:'#192a56',
    },
    subdiv: {
        padding: 20,
        width: 700,
        borderRadius: 2,
        backgroundColor: '#fffff',
        marginTop: 0,
        //boxShadow: '8px 5px 8px 5px black',
    },
    input: {
        display: 'none',
      },
    
}));

export default function SubCategoryInterface(props){
    const classes = useStyles();
    const [categoryId, setCategoryId] = useState('');
    const [subcategoryName, setSubCategoryName] = useState('');
    const [subcategoryDescription, setSubCategoryDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [rented, setRented] = useState('');
    const [rentAmt, setRentAmt] = useState('');
    const [offers, setOffers] = useState('');
    const [icon, setIcon] = useState({bytes:'',file:'/noimage.jpg'});
    const [ad, setAd] = useState({bytes:'',file:'/noimage.jpg'});
    const [adStatus, setAdStatus] = useState('');
    const [listSubCategory,setListSubCategory] = useState([]);

    const fetchAllCategory=async()=>{
        var result=await getData("categories/displayall");
        setListSubCategory(result);
      }
      useEffect(function(){
          fetchAllCategory();
      },[])
    const ShowCategory=()=>{
        return listSubCategory.map((item)=>{
            return(
                <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
            )
        })
    }

    const handleSubCategoryAd=(event)=>{
        setAd({bytes:event.target.files[0],
        file:URL.createObjectURL(event.target.files[0])});
    }

    const handleSubCategoryIcon=(event)=>{
        setIcon({bytes:event.target.files[0],
        file:URL.createObjectURL(event.target.files[0])});
    }

    const handleClick=async()=>{
        var error=false;
        var msg="<div>"
        if(isBlank(categoryId))
        {
            msg+="<font color='#e74c3c'><b>Category Id Should not be blank..</b></font><br>"
            error=true
        }
        if(isBlank(subcategoryName))
        {
            msg+="<font color='#e74c3c'><b>SubCategory Should not be blank..</b></font><br>"
            error=true
        }
        if(isBlank(subcategoryDescription))
        {
            msg+="<font color='#e74c3c'><b>Description Should not be blank..</b></font><br>"
            error=true
        }
        if(isBlank(price))
        {
            msg+="<font color='#e74c3c'><b>Price should not be blank..</b></font><br>"
            error=true
        }
        if(isBlank(stock))
        {
            msg+="<font color='#e74c3c'><b>Stock should not be blank..</b></font><br>"
            error=true
        }
        if(isBlank(rented))
        {
            msg+="<font color='#e74c3c'><b>Rented should not be blank..</b></font><br>"
            error=true
        }
        if(isBlank(rentAmt))
        {
            msg+="<font color='#e74c3c'><b>Rent Amount should not be blank..</b></font><br>"
            error=true
        }
        if(isBlank(offers))
        {
            msg+="<font color='#e74c3c'><b>Game Offers should not be blank..</b></font><br>"
            error=true
        }
        if(isBlank(icon.bytes))
        {
            msg+="<font color='#e74c3c'><b>Pls Select category icon..</b></font><br>"
            error=true
        }
        if(isBlank(ad.bytes))
        {
            msg+="<font color='#e74c3c'><b>Pls Select category ad..</b></font><br>"
            error=true
        }
        if(isBlank(adStatus))
        {
            msg+="<font color='#e74c3c'><b>Pls choose ad status..</b></font><br>"
            error=true
        }
        
        msg+="</div>"
        if(error){
            swalhtml(renderHTML(msg));
        }
        else{

            const formData = new FormData();
            formData.append("categoryid", categoryId);
            formData.append("subcategoryname", subcategoryName);
            formData.append("description", subcategoryDescription);
            formData.append("price", price);
            formData.append("stock", stock);
            formData.append("rented", rented);
            formData.append("rentamount", rentAmt);
            formData.append("offers", offers);
            formData.append("icon", icon.bytes);
            formData.append("ad", ad.bytes);
            formData.append("adstatus", adStatus);
            var config={headers:{"content-type":"multipart/form-data"}}
            var result=await postDataAndImage('subcategory/insertsubcategory', formData, config);
            if(result)
            {
                swal({
                    title: "SubCategory Submitted Successfully",
                    icon: "success",
                    dangerMode: true,
                })
                
            }
        }
}

    return(
        <div className={classes.root}>
            <div className={classes.subdiv}>
                <Grid container spacing={1}>
                    <Grid item xs={12} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <div style={{fontSize:26,fontWeight:700,marginBottom:10,letterSpacing:2}}>
                            SubCategory Interface
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                    <FormControl variant="outlined" fullWidth className={classes.formControl}>
                            <InputLabel id="demo-simple-select-outlined-subcategory">Category ID</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-subcategory"
                            id="demo-simple-select-outlined"
                            //value={age}
                            onChange={(event) => setCategoryId(event.target.value)}
                            label="Category ID"
                        >
                        {ShowCategory()}
                        </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField variant="outlined" onChange={(event)=>setSubCategoryName(event.target.value)} label="SubCategory Name" fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField variant="outlined" onChange={(event)=>setSubCategoryDescription(event.target.value)} label="Description" fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField variant="outlined" onChange={(event)=>setPrice(event.target.value)} label="Price" fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField variant="outlined" onChange={(event)=>setStock(event.target.value)} label="Stock" fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField variant="outlined" onChange={(event)=>setRented(event.target.value)} label="Rented" fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField variant="outlined" onChange={(event)=>setRentAmt(event.target.value)} label="Rent Amount" fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField variant="outlined" onChange={(event)=>setOffers(event.target.value)} label="Offers" fullWidth/>
                    </Grid>
                    <Grid item xs={6}>
                        <span style={{fontSize:16,fontWeight:100}}>Upload SubCategory Icon</span>
                        <input onChange={(event)=>handleSubCategoryIcon(event)} accept="image/*" className={classes.input} id="icon-button-file" type="file" />
                        <label htmlFor="icon-button-file">
                            <IconButton color="primary" aria-label="upload picture" component="span">
                                <PhotoCamera />
                            </IconButton>
                        </label>
                    </Grid>
                    <Grid item xs={12} sm={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                            <Avatar variant="rounded" src={icon.file} style={{height:60,width:60}} />
                    </Grid>
                    <Grid item xs={6}>
                        <span style={{fontSize:16,fontWeight:100}}>Upload SubCategory Ad</span>
                        <input onChange={(event)=>handleSubCategoryAd(event)} accept="image/*" className={classes.input} id="ad-button-file" type="file" />
                        <label htmlFor="ad-button-file">
                            <IconButton color="primary" aria-label="upload picture" component="span">
                                <PhotoCamera />
                            </IconButton>
                        </label>
                    </Grid>
                    <Grid item xs={12} sm={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                            <Avatar variant="rounded" src={ad.file} style={{height:60,width:60}} />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl variant="outlined" fullWidth className={classes.formControl}>
                            <InputLabel id="demo-simple-select-outlined-subcategory">Ad Status</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-subcategory"
                            id="demo-simple-select-outlined"
                            //value={age}
                            onChange={(event) => setAdStatus(event.target.value)}
                            label="Ad Status"
                        >
                            <MenuItem value={'Activate'}>Activate</MenuItem>
                            <MenuItem value={'Deactivate'}>Deactivate</MenuItem>
                        </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button onClick={()=>handleClick()} variant="contained" color="primary" fullWidth>Save</Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button variant="contained" color="primary" fullWidth>Reset</Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}
