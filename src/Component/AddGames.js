import { TextField,Grid,Button } from '@material-ui/core';
import React,{useState,useEffect} from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { postDataAndImage,postData,getData } from './FetchData';
import MenuItem from '@material-ui/core/MenuItem';
import swalhtml from "@sweetalert/with-react";
import swal from "sweetalert";
import {isBlank} from "./Checks"
import renderHTML from 'react-render-html';

const useStyles = makeStyles((theme)=>({
    root: {
        height:800,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    },
    subdiv: {
        padding: 20,
        width: 700,
        borderRadius: 2,
        backgroundColor: '#fffff',
        marginTop: 0,
    },
    input: {
        display: 'none',
      },
    formControl: {
        marginTop: 10,
        minWidth: 700,
    },

}))

export default function AddGames(props){

const classes = useStyles();
const [categoryID, setCategoryID] = useState('');
const [subcategoryID, setSubCategoryID] = useState('');
const [gameName, setGameName] = useState('');
const [gameDescription, setGameDescription] = useState('');
const [gamePrice, setGamePrice] = useState('');
const [gameStock, setGameStock] = useState('');
const [gameRented, setGameRented] = useState('');
const [rentAmt, setRentAmt] = useState('');
const [gameOffer, setGameOffer] = useState('');
const [picture, setPicture] = useState({bytes:"",file:"/noimage.jpg"});
const [listCategory, setListCategory] = useState([]);
const [listSubCategory,setListSubCategory] = useState([]);

const handleGamesPicture=(event)=>{
    setPicture({bytes:event.target.files[0],
    file:URL.createObjectURL(event.target.files[0])})
}

const handleChangeCategory=async(event)=>{
    setCategoryID(event.target.value);
    var body={'categoryid':event.target.value};
    var result = await postData("subcategory/displaysubcategorybycategoryid",body)
    setListSubCategory(result);
}


const fetchAllGames=async()=>{
    var result=await getData("categories/displayall");
    setListCategory(result);
  }

  useEffect(function(){
      fetchAllGames();
  },[]);

  const fillCategory=()=>{
    return listCategory.map((item)=>{
        return(
            <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
        )
    })
}

const fillSubCategory=()=>{
    return listSubCategory.map((item)=>{
        return(
            <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
        )
    })
}

const handleSaveClick=async()=>{
    var error=false;
    var msg="<div>"
    if(isBlank(categoryID))
    {
        msg+="<font color='#e74c3c'><b>Category ID should not be blank..</b></font><br>"
        error=true
    }
    if(isBlank(subcategoryID))
    {
        msg+="<font color='#e74c3c'><b>Sub Category ID should not be blank..</b></font><br>"
        error=true
    }
    if(isBlank(gameName))
    {
        msg+="<font color='#e74c3c'><b>Game Name should not be blank..</b></font><br>"
        error=true
    }
    if(isBlank(gameDescription))
    {
        msg+="<font color='#e74c3c'><b>Description should not be blank..</b></font><br>"
        error=true
    }
    if(isBlank(gamePrice))
    {
        msg+="<font color='#e74c3c'><b>Price should not be blank..</b></font><br>"
        error=true
    }
    if(isBlank(gameStock))
    {
        msg+="<font color='#e74c3c'><b>Stock should not be blank..</b></font><br>"
        error=true
    }
    if(isBlank(gameRented))
    {
        msg+="<font color='#e74c3c'><b>Rented should not be blank..</b></font><br>"
        error=true
    }
    if(isBlank(rentAmt))
    {
        msg+="<font color='#e74c3c'><b>Rent Amount should not be blank..</b></font><br>"
        error=true
    }
    if(isBlank(gameOffer))
    {
        msg+="<font color='#e74c3c'><b>Offers should not be blank..</b></font><br>"
        error=true
    }
    if(isBlank(picture.bytes))
    {
        msg+="<font color='#e74c3c'><b>Picture should not be blank..</b></font><br>"
        error=true
    }
    msg+="</div>"
    if(error)
    {
        swalhtml(renderHTML(msg));
    }
    else
    {

        const formData = new FormData();
        formData.append("categoryid",categoryID);
        formData.append("subcategoryid",subcategoryID);
        formData.append("gamename",gameName);
        formData.append("description",gameDescription);
        formData.append("gameprice",gamePrice);
        formData.append("gamestock",gameStock);
        formData.append("rented",gameRented);
        formData.append("rentamount",rentAmt);
        formData.append("offers",gameOffer);
        formData.append("picture",picture.bytes);
        var config={headers:{"content-type":"multipart/form-data"}};
        var result=await postDataAndImage('addgame/insertgames', formData, config);
        if(result)
        {
            swal({
                title: "Games Successfully Submitted",
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
                        <div style={{fontWeight:700,fontSize:26}}>
                            Add Games Interface
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                    <FormControl variant="outlined" fullWidth>
                            <InputLabel id="demo-simple-select-outlined-category">Category ID</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-category"
                            id="demo-simple-select-outlined"
                            //value={age}
                            onChange={(event)=>handleChangeCategory(event)}
                            label="Category ID"
                        >
                            {fillCategory()}
                        </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                    <FormControl variant="outlined" fullWidth>
                            <InputLabel id="demo-simple-select-outlined-subcategory">Sub Category ID</InputLabel>
                        <Select labelId="demo-simple-select-outlined-subcategory"
                            id="demo-simple-select-outlined"
                            //value={age}
                            onChange={(event)=>setSubCategoryID(event.target.value)}
                            label="Sub Category ID"
                        >
                            {fillSubCategory()}
                        </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField variant="outlined" label="Game Name" onChange={(event)=>setGameName(event.target.value)} fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField variant="outlined" label="Game Description" onChange={(event)=>setGameDescription(event.target.value)} fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField variant="outlined" label="Price" onChange={(event)=>setGamePrice(event.target.value)} fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField variant="outlined" label="Stock" onChange={(event)=>setGameStock(event.target.value)} fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField variant="outlined" label="Rented" onChange={(event)=>setGameRented(event.target.value)} fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField variant="outlined" label="Rent Amount" onChange={(event)=>setRentAmt(event.target.value)} fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField variant="outlined" label="Offers" onChange={(event)=>setGameOffer(event.target.value)} fullWidth/>
                    </Grid>
                    <Grid item xs={6}>
                        <span style={{fontSize:16,fontWeight:100}}>Upload Picture</span>
                        <input  accept="image/*" className={classes.input} onChange={(event)=>handleGamesPicture(event)} id="picture-button-file" type="file" />
                        <label htmlFor="picture-button-file">
                            <IconButton color="primary" aria-label="upload picture" component="span">
                                <PhotoCamera />
                            </IconButton>
                        </label>
                    </Grid>
                    <Grid item xs={12} sm={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                            <Avatar variant="rounded" src={picture.file} style={{height:60,width:60}} />
                    </Grid>
                    <Grid item xs={12} sm={6} style={{marginTop:10}}>
                        <Button variant="contained" color="primary" onClick={()=>handleSaveClick()} fullWidth>Save</Button>
                    </Grid>
                    <Grid item xs={12} sm={6} style={{marginTop:10}}>
                        <Button variant="contained" color="primary" fullWidth>Reset</Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}