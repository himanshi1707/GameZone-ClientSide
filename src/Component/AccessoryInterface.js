import { Grid, TextField, Button } from '@material-ui/core';
import React,{useState,useEffect} from 'react';
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
import { getData, postDataAndImage,postData } from './FetchData';
import {isBlank} from "./Checks"
import renderHTML from 'react-render-html';

const useStyles = makeStyles((theme) => ({

    root: {
        height:700,
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


}));

export default function AccessoryInterface(props){

    const classes = useStyles();
    const [categoryID,setCategoryID] = useState('');
    const [subcategoryID, setSubcategoryID] = useState('');
    const [accessoryName, setAccessoryName] = useState('');
    const [description, setDescription] = useState('');
    const [picture, setPicture] = useState({bytes:"",file:"/noimage.jpg"});
    const [accessoryPrice, setAccessoryPrice] = useState('');
    const [accessoryStock,setAccessoryStock] = useState('');
    const [accessoryRented, setAccessoryRented] = useState('');
    const [rentAmount, setRentAmount] = useState('');
    const [offers,setOffers] = useState('');
    const [listCategory,setListCategory] = useState([]);
    const [listSubCategory,setListSubCategory] = useState([]);

    
    const handleChangeCategory=async(event)=>{
        setCategoryID(event.target.value);
        var body={'categoryid':event.target.value};
        var result = await postData("subcategory/displaysubcategorybycategoryid",body)
        setListSubCategory(result);
    }


    const fetchAllAccessory=async()=>{
        var result=await getData("categories/displayall");
        setListCategory(result);
      }

      useEffect(function(){
          fetchAllAccessory();
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

    const handleAccessoryPicture=(event)=>{
        setPicture({bytes:event.target.files[0],
        file:URL.createObjectURL(event.target.files[0])})
    }


    const handleClick=async()=>{
        var error=false;
        var msg="<div>"
        if(isBlank(categoryID))
        {
            msg+="<font color='#e74c3c'><b>Category Id should not be blank..</b></font><br>"
            error=true
        }
        if(isBlank(subcategoryID))
        {
            msg+="<font color='#e74c3c'><b>Sub Category Id should not be blank..</b></font><br>"
            error=true
        }        
        if(isBlank(accessoryName))
        {
            msg+="<font color='#e74c3c'><b>Accessory Name should not be blank..</b></font><br>"
            error=true
        }
        if(isBlank(description))
        {
            msg+="<font color='#e74c3c'><b>Description should not be blank..</b></font><br>"
            error=true
        }
        if(isBlank(picture.bytes))
        {
            msg+="<font color='#e74c3c'><b>Pls select accessory picture..</b></font><br>"
            error=true
        }
        if(isBlank(accessoryPrice))
        {
            msg+="<font color='#e74c3c'><b>Accessory Price should not be blank..</b></font><br>"
            error=true
        }
        if(isBlank(accessoryStock))
        {
            msg+="<font color='#e74c3c'><b>Accessory Stock should not be blank..</b></font><br>"
            error=true
        }
        if(isBlank(accessoryRented))
        {
            msg+="<font color='#e74c3c'><b>Accessory Rented should not be blank..</b></font><br>"
            error=true
        }
        if(isBlank(rentAmount))
        {
            msg+="<font color='#e74c3c'><b>Rent Amount should not be blank..</b></font><br>"
            error=true
        }
        if(isBlank(offers))
        {
            msg+="<font color='#e74c3c'><b>Offers should not be blank..</b></font><br>"
            error=true
        }
        msg+="</div>"
        if(error)
        {
            swalhtml(renderHTML(msg));
        }
        else{

            const formData = new FormData();
            formData.append("categoryid",categoryID);
            formData.append("subcategoryid",subcategoryID);
            formData.append("accessoryname",accessoryName);
            formData.append("description",description);
            formData.append("picture",picture.bytes);
            formData.append("price",accessoryPrice);
            formData.append("stock",accessoryStock);
            formData.append("rented",accessoryRented);
            formData.append("rentamount",rentAmount);
            formData.append("offers",offers);
            var config={headers:{"content-type":"multipart/form-data"}};
            var result=await postDataAndImage('accessories/addnewaccessory', formData, config);
            if(result)
            {
                swal({
                    title: "Accessory Submitted Successfully",
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
                            Accessory Interface
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                    <FormControl variant="outlined" fullWidth>
                            <InputLabel id="demo-simple-select-outlined-category">Category ID</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-category"
                            id="demo-simple-select-outlined"
                            //value={age}
                            onChange={(event) => handleChangeCategory(event)}
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
                            onChange={(event) => setSubcategoryID(event.target.value)}
                            label="Sub Category ID"
                        >
                       {fillSubCategory()}
                        </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField variant="outlined" onChange={(event)=>setAccessoryName(event.target.value)} label="Accessory Name" fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField variant="outlined" onChange={(event)=>setDescription(event.target.value)} label="Description" fullWidth/>
                    </Grid>
                    <Grid item xs={6}>
                        <span style={{fontSize:16,fontWeight:100}}>Upload Picture</span>
                        <input  accept="image/*" className={classes.input} onChange={(event)=>handleAccessoryPicture(event)} id="picture-button-file" type="file" />
                        <label htmlFor="picture-button-file">
                            <IconButton color="primary" aria-label="upload picture" component="span">
                                <PhotoCamera />
                            </IconButton>
                        </label>
                    </Grid>
                    <Grid item xs={12} sm={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                            <Avatar variant="rounded" src={picture.file} style={{height:60,width:60}} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField variant="outlined" onChange={(event)=>setAccessoryPrice(event.target.value)} label="Price" fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField variant="outlined" onChange={(event)=>setAccessoryStock(event.target.value)} label="Stock" fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField variant="outlined" onChange={(event)=>setAccessoryRented(event.target.value)} label="Rented" fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField variant="outlined" onChange={(event)=>setRentAmount(event.target.value)} label="Rent Amount" fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField variant="outlined" onChange={(event)=>setOffers(event.target.value)} label="Offers" fullWidth/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button variant="contained" color="primary" fullWidth onClick={()=>handleClick()}>Save</Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button variant="contained" color="primary" fullWidth>Reset</Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}
