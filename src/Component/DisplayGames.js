import React,{useEffect, useState} from 'react';
import { postDataAndImage,postData,getData,ServerURL } from './FetchData';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { TextField,Grid,Button } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import swalhtml from "@sweetalert/with-react";
import swal from "sweetalert";
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
    height:1100,
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


export default function DisplayGames(props)
{
  const classes = useStyles();
////////////////////////////////////EditDelete Form View///////////////////////////////


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
const [picturesavecancel,setPictureSaveCancel] = useState(false);
const [getRowData,setRowData]=useState([]);
const [gameID,setGameID]=useState('');
const [listCategory, setListCategory] = useState([]);
const [listSubCategory,setListSubCategory] = useState([]);



const handleGamesPicture=(event)=>{
  setPicture({bytes:event.target.files[0],
  file:URL.createObjectURL(event.target.files[0])})
  setPictureSaveCancel(true);
}

const handleChangeCategory=async(event)=>{
  setCategoryID(event.target.value);
  fillSubCategorybycategoryid(event.target.value);
}

const fillSubCategorybycategoryid=async(cid)=>{
  var body={categoryid:cid};
  var result = await postData("subcategory/displaysubcategorybycategoryid",body)
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

const handleClickCancelPicture=async()=>{
  setPictureSaveCancel(false);
  setPicture({bytes:"",file:`${ServerURL}/images/${getRowData.picture}`})
}

const handleSavePicture=async()=>{
  const formData=new FormData();
  formData.append('picture', picture.bytes)
  formData.append('gameid', gameID)
  var config={headers:{"content-type":"multipart/form-Data"}}
  var result=await postDataAndImage('addgame/updatepicture',formData,config);
  if(result)
  {
    swal({
      title: "Picture Updated Successfully",
      icon: "success",
      dangerMode: true,
    })
  }
  setPictureSaveCancel(false);
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
  msg+="</div>"
  if(error)
  {
      swalhtml(renderHTML(msg));
  }
  else
  {

      var body={
      "gameid":gameID,  
      "categoryid":categoryID,
      "subcategoryid":subcategoryID,
      "gamename":gameName,
      "description":gameDescription,
      "gameprice":gamePrice,
      "gamestock":gameStock,
      "rented":gameRented,
      "rentamount":rentAmt,
      "offers":gameOffer}
      var result=await postData('addgame/updatedata', body);
      if(result)
      {
          swal({
              title: "Gamesdata Updated Successfully",
              icon: "success",
              dangerMode: true,
          })
      }
  }
}

const handleClickDelete=async()=>{
    var body={gameid:gameID}
    var result=postData("addgame/deletedata",body)
    if(result)
      {
          swal({
              title: "Gamesdata Deleted Successfully",
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
                          Add Games Interface
                      </div>
                  </Grid>
                  <Grid item xs={12}>
                  <FormControl variant="outlined" fullWidth>
                          <InputLabel id="demo-simple-select-outlined-category">Category ID</InputLabel>
                      <Select
                          labelId="demo-simple-select-outlined-category"
                          id="demo-simple-select-outlined"
                          value={categoryID}
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
                          value={subcategoryID}
                          onChange={(event)=>setSubCategoryID(event.target.value)}
                          label="Sub Category ID"
                      >
                          {fillSubCategory()}
                      </Select>
                      </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                      <TextField variant="outlined" value={gameName} label="Game Name" onChange={(event)=>setGameName(event.target.value)} fullWidth/>
                  </Grid>
                  <Grid item xs={12}>
                      <TextField variant="outlined" value={gameDescription} label="Game Description" onChange={(event)=>setGameDescription(event.target.value)} fullWidth/>
                  </Grid>
                  <Grid item xs={12}>
                      <TextField variant="outlined" value={gamePrice} label="Price" onChange={(event)=>setGamePrice(event.target.value)} fullWidth/>
                  </Grid>
                  <Grid item xs={12}>
                      <TextField variant="outlined" value={gameStock} label="Stock" onChange={(event)=>setGameStock(event.target.value)} fullWidth/>
                  </Grid>
                  <Grid item xs={12}>
                      <TextField variant="outlined" value={gameRented} label="Rented" onChange={(event)=>setGameRented(event.target.value)} fullWidth/>
                  </Grid>
                  <Grid item xs={12}>
                      <TextField variant="outlined" value={rentAmt} label="Rent Amount" onChange={(event)=>setRentAmt(event.target.value)} fullWidth/>
                  </Grid>
                  <Grid item xs={12}>
                      <TextField variant="outlined" value={gameOffer} label="Offers" onChange={(event)=>setGameOffer(event.target.value)} fullWidth/>
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
                  <Grid item xs={12} sm={6} style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                          <Avatar variant="rounded" src={picture.file} style={{height:60,width:60}} />
                          {picturesavecancel ? <span><Button color="secondary" onClick={()=>handleSavePicture()}>Save</Button><Button color="secondary" onClick={()=>handleClickCancelPicture()}>Cancel</Button></span>:<></>}
                  </Grid>
              </Grid>
          </div>
      </div>
  )
}

///////////////////////////////////////////////////////////////////////////////////////




////////////////////////////////////Dialog Box/////////////////////////////////////////

const [open, setOpen] = React.useState(false);

const handleClickOpen = (rowData) => {
  setOpen(true);
  setRowData(rowData);
  setGameID(rowData.gameid);
  setCategoryID(rowData.categoryid);
  fillSubCategorybycategoryid(rowData.categoryid);
  setSubCategoryID(rowData.subcategoryid);
  setGameName(rowData.gamename);
  setGamePrice(rowData.gameprice);
  setGameStock(rowData.gamestock);
  setGameRented(rowData.rented);
  setRentAmt(rowData.rentamount);
  setGameOffer(rowData.offers);
  setGameDescription(rowData.description);
  setPicture({bytes:"",file:`${ServerURL}/images/${rowData.picture}`});
};

const handleClose = () => {
  setOpen(false);
  fetchAllGames();
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
            Update/Delete Games
          </Typography>
          <Button autoFocus color="inherit" onClick={()=>handleSaveClick()}>
            Update
          </Button>
          <Button autoFocus color="inherit" onClick={()=>handleClickDelete()}>
            Delete
          </Button>
        </Toolbar>
      </AppBar>
      {editFormView()}
    </Dialog>
  </div>
);
}


//////////////////////////////////////////////////////////////////////////////////////

    const [list,setList] = useState();

    const fetchAllGames=async()=>{
        var result=await getData("addgame/displaygames");
        setList(result);
    }

    useEffect(function(){
        fetchAllGames();
        fetchAllCategory();
    },[])

function displayAll() {
    return (
        <div>
      <MaterialTable
        title="Game List"
        columns={[
          { title: 'Category ID', field: 'categoryid' },
          { title: 'Sub Category ID', field: 'subcategoryid' },
          { title: 'Game ID', field: 'gameid'},
          { title: 'Game Name', field: 'gamename' },
          { title: 'Description', field: 'description' },
          { title: 'Price', field: 'gameprice' },
          { title: 'Stock', field: 'gamestock' },
          { title: 'Rented', field: 'rented' },
          { title: 'Rent Amount', field: 'rentamount' },
          { title: 'Offers', field: 'offers' },
          { title: 'Picture', field: 'picture',
          render: rowData=>(<div><img src={`${ServerURL}/images/${rowData.picture}`} style={{borderRadius:5}} width="40" height="40" /></div>) },
        ]}
        data={list}        
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit/Delete Games',
            onClick: (event, rowData) => handleClickOpen(rowData)
          }
        ]}
      />
      {showEditDialog()}
      </div>
    )
  }
  return(
      <div  style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
          <div style={{padding:10,width:960}}>
              {displayAll()}
          </div>
      </div>

  )
}