import MaterialTable from 'material-table';
import React,{useEffect, useState} from 'react';
import { postDataAndImage, getData,ServerURL,postData } from './FetchData';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Grid, TextField, Button } from '@material-ui/core';
import swalhtml from "@sweetalert/with-react";
import swal from "sweetalert";
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Avatar from '@material-ui/core/Avatar';
import {isBlank} from "./Checks"
import renderHTML from 'react-render-html';

const useStyles = makeStyles((theme) => ({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
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
  
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function DisplayAllAccessories()
{
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
  const [picturesavecancel, setPictureSaveCancel]=useState(false);
  const [getRowData, setRowData] = useState([]);
  const [accessoryID, setAccessoryID] = useState('');
  const [offers,setOffers] = useState('');
////////////////////////////////Edit form////////////////////////////////

  const [listCategory,setListCategory] = useState([]);
  const [listSubCategory,setListSubCategory] = useState([]);

    
    const handleChangeCategory=async(event)=>{
        setCategoryID(event.target.value);
        fillSubCategorybycategoryid(event.target.value);
    }
    const fillSubCategorybycategoryid=async(cid)=>{
        var body={categoryid:cid};
        var result = await postData("subcategory/displaysubcategorybycategoryid",body);
        setListSubCategory(result);
    }

    const fetchAllCategory=async()=>{
        var result=await getData("categories/displayall");
        setListCategory(result);
      }

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
  setPictureSaveCancel(true);
}

const handlecancel=()=>{
  setPictureSaveCancel(false);
  setPicture({bytes:"",file:`${ServerURL}/images/${getRowData.picture}`});
}

const handlesave=async()=>{
  const formData = new FormData();
  formData.append('accessoryid', accessoryID);
  formData.append('picture', picture.bytes);
  var config={headers:{"content-type":"multipart/form-data"}};
      var result=await postDataAndImage('accessories/updatepicture', formData, config);
      if(result)
      {
          swal({
              title: "Picture Updated Successfully",
              icon: "success",
              dangerMode: true,
            })
            setPictureSaveCancel(false);
      }
}

const handleUpdateAccessory=async()=>{
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

      var body={"accessoryid":accessoryID,
      "categoryid":categoryID,
      "subcategoryid":subcategoryID,
      "accessoryname":accessoryName,
      "description":description,
      "price":accessoryPrice,
      "stock":accessoryStock,
      "rented":accessoryRented,
      "rentamount":rentAmount,
      "offers":offers}
      var result=await postData('accessories/updateaccessory', body);
      if(result)
      {
          swal({
              title: "Accessory Updated Successfully",
              icon: "success",
              dangerMode: true,
            })
      }
  }
}

const handleClickdelete=async()=>{
  var body= {'accessoryid':accessoryID};
  var result=await postData('accessories/deleteaccessories', body);
      if(result)
      {
          swal({
              title: "Accessory Deleted Successfully",
              icon: "success",
              dangerMode: true,
            })
      }
}


const editFormView=()=>{
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
                            value={categoryID}
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
                            value={subcategoryID}
                            onChange={(event) => setSubcategoryID(event.target.value)}
                            label="Sub Category ID"
                        >
                       {fillSubCategory()}
                        </Select>
                        </FormControl>
                    </Grid>
                <Grid item xs={12}>
                    <TextField value={accessoryName} variant="outlined" onChange={(event)=>setAccessoryName(event.target.value)} label="Accessory Name" fullWidth/>
                </Grid>
                <Grid item xs={12}>
                    <TextField value={description} variant="outlined" onChange={(event)=>setDescription(event.target.value)} label="Description" fullWidth/>
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
                <Grid item xs={12} sm={6} style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                        <Avatar variant="rounded" src={picture.file} style={{height:60,width:60}} />
                          {picturesavecancel ? <span><Button color="secondary" onClick={()=>handlesave()}>Save</Button><Button color="secondary" onClick={()=>handlecancel()}>Cancel</Button></span>:<></>}
                </Grid>
                <Grid item xs={12}>
                    <TextField value={accessoryPrice} variant="outlined" onChange={(event)=>setAccessoryPrice(event.target.value)} label="Price" fullWidth/>
                </Grid>
                <Grid item xs={12}>
                    <TextField value={accessoryStock} variant="outlined" onChange={(event)=>setAccessoryStock(event.target.value)} label="Stock" fullWidth/>
                </Grid>
                <Grid item xs={12}>
                    <TextField value={accessoryRented} variant="outlined" onChange={(event)=>setAccessoryRented(event.target.value)} label="Rented" fullWidth/>
                </Grid>
                <Grid item xs={12}>
                    <TextField value={rentAmount} variant="outlined" onChange={(event)=>setRentAmount(event.target.value)} label="Rent Amount" fullWidth/>
                </Grid>
                <Grid item xs={12}>
                    <TextField value={offers} variant="outlined" onChange={(event)=>setOffers(event.target.value)} label="Offers" fullWidth/>
                </Grid>
            </Grid>
        </div>
    </div>
  )
}
/////////////////////////////////////////////////////////////////////////

///////////////////////////////EditDialog////////////////////////////////    
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = (rowData) => {
        setOpen(true);
        setRowData(rowData);
        setAccessoryID(rowData.accessoryid);
        setCategoryID(rowData.categoryid);
        fillSubCategorybycategoryid(rowData.categoryid);
        setSubcategoryID(rowData.subcategoryid);
        setAccessoryName(rowData.accessoryname);
        setDescription(rowData.description);
        setPicture({bytes:'',file:`${ServerURL}/images/${rowData.picture}`});
        setAccessoryPrice(rowData.price);
        setAccessoryStock(rowData.stock);
        setAccessoryRented(rowData.rented);
        setRentAmount(rowData.rentamount);
        setOffers(rowData.offers);
      };
    
      const handleClose = () => {
        setOpen(false);
        fetchAllAccessory();
      };

  const showEditDialog=()=>{  
      return (
        <div>
          <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
              <Toolbar>
                <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                  <CloseIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                  Edit/Delete Accessories
                </Typography>
                <Button autoFocus color="inherit" onClick={()=>handleUpdateAccessory()}>
                  Update
                </Button>
                <Button autoFocus color="inherit" onClick={()=>handleClickdelete()}>
                  Delete
                </Button>
              </Toolbar>
            </AppBar>
            {editFormView()}
          </Dialog>
        </div>
      );
  }  
    
/////////////////////////////////////////////////////////////////////////    
    
    
    const [list, setList] = useState();

    const fetchAllAccessory=async()=>{
        var result=await getData("accessories/displayaccessories");
        setList(result);
    }

    useEffect(function(){
        fetchAllAccessory();
        fetchAllCategory();
    },[])

    function DisplayAll() {
        return (
        <div>
        <MaterialTable
            title="Accessories"
            columns={[
                { title: 'Category ID', field: 'categoryid' },
                { title: 'Sub Category ID', field: 'subcategoryid' },
                { title: 'Accessory ID', field: 'accessoryid' },
                { title: 'Accessory Name', field: 'accessoryname' },
                { title: 'Description', field: 'description' },
                { title: 'Picture', field: 'picture',
                render:rowData =>(<div><img src={`${ServerURL}/images/${rowData.picture}`} style={{borderRadius:5}} width='40' height='40' /></div>) },
                { title: 'Price', field: 'price' },
                { title: 'Stock', field: 'stock' },
                { title: 'Rented', field: 'rented' },
                { title: 'Rent Amount', field: 'rentamount' },
                { title: 'Offers', field: 'offers' },
            ]}
            data={list}        
            actions={[
            {
                icon: 'edit',
                tooltip: 'Edit/Delete Accessory',
                onClick: (event, rowData) => handleClickOpen(rowData)
            }
            ]}
        />
         {showEditDialog()}
        </div>
        )
    }
    return (
        <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
            <div style={{padding:10, width:960}}>
                {DisplayAll()}
            </div>
        </div>
    )
}

