import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { Button,Grid } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import {Select, IconButton} from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Avatar from '@material-ui/core/Avatar';
import { getData, postData, postDataAndImage,  ServerURL } from './FetchData';
import swalhtml from "@sweetalert/with-react";
import swal from "sweetalert";
import {isBlank} from "./Checks"
import renderHTML from 'react-render-html';



const useStyles = makeStyles((theme)=>({
    appBar: {
        position: 'relative',
      },
      title: {
        marginLeft: theme.spacing(2),
        flex: 1,
      },
      root: {
        height:500,
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
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  

export default function DisplayGamesPicture(props){

    const classes = useStyles();

////////////////////////////Edit/Delete Form View/////////////////////////////////
    const [imageID,setImageID] = useState("");
    const [categoryID,setCategoryID] = useState("");
    const [subcategoryID, setSubcategoryID] = useState("");
    const [gameID, setGameID] = useState("");
    const [images, setImages] = useState({bytes:"", file:"/noimage.jpg"});
    const [listCategory, setListCategory] = useState([]);
    const [listSubCategory, setListSubCategory] = useState([]);
    const [listGames, setListGames] = useState([]);
    const [getRowData,setRowData] = useState([]);
    const [pictureSaveCancel,setPictureSaveCancel] = useState(false);

    const handleChangeCategory=async(event)=>{
        setCategoryID(event.target.value);
        fillSubCategorybycategoryid(event.target.value);
    }

    const fillSubCategorybycategoryid=async(cid)=>{
        var body={categoryid:cid}
        var result = await postData("subcategory/displaysubcategorybycategoryid", body);
        setListSubCategory(result);
    } 

    const fillGamesbysubcategoryid=async(sid)=>{
        var body={subcategoryid:sid}
        var result = await postData("addgame/displayallgamesbysubcategoryid", body);
        setListGames(result);
    } 

    const handleChangeSubCategory=async(event)=>{
        setSubcategoryID(event.target.value);
        fillGamesbysubcategoryid(event.target.value);
    }

    const fetchAllCategory=async()=>{
        var result = await getData("categories/displayall");
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
             return (
                 <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
             )
         })
     }

     const fillGames=()=>{
         return listGames.map((item)=>{
             return(
                 <MenuItem value={item.gameid}>{item.gamename}</MenuItem>
             )
         })
     }

     const handleSavePicture=async()=>{
        const formData=new FormData();
        formData.append('imageid',imageID);
        formData.append('images',images.bytes);
        var config={headers:{"content-type":"multipart/formdata"}};
        var result=await postDataAndImage("multiplegamespic/updateimage",formData,config)
        if(result)
        {
            swal({
                title: "Image Updated Successfully",
                icon: "success",
                dangerMode: true,
              })
              setPictureSaveCancel(false);
        }
     }

    const handlegamesimages=(event)=>{
        setImages({bytes:event.target.files[0],
            file:URL.createObjectURL(event.target.files[0])})
            setPictureSaveCancel(true);
    } 

    const handleCancelImage=()=>{
        setPictureSaveCancel(false);
        setImages({bytes:"",file:`${ServerURL}/images/${getRowData.images}`})
    }

    const handleDeleteData=async()=>{
        var body={"imageid":imageID}
        var result=postData("multiplegamespic/deletedata",body)
        if(result)
        {
            swal({
                title: "Data Deleted Successfully",
                icon: "success",
                dangerMode: true,
              })
        }
    }

    const handleClickSave=async()=>{
        var error=false;
        var msg="<div>"
        if(isBlank(categoryID))
        {
            msg+="<font color='#e74c3c'><b>Category ID should not be blank..</b></font><br>"
            error=true
        }
        if(isBlank(subcategoryID))
        {
            msg+="<font color='#e74c3c'><b>SubCategory ID should not be blank..</b></font><br>"
            error=true
        }
        if(isBlank(gameID))
        {
            msg+="<font color='#e74c3c'><b>Game ID should not be blank..</b></font><br>"
            error=true
        }
        msg+="</div>"
        if(error)
        {
            swalhtml(renderHTML(msg))
        }
        else{
            var body={
                "imageid":imageID,
                "categoryid":categoryID,
                "subcategoryid":subcategoryID,
                "gameid":gameID,
            }
            var result = await postData("multiplegamespic/updatedata",body)
            if(result)
            {
                swal({
                    title: "Games Data Updated Successfully",
                    icon: "success",
                    dangerMode: true,
                })
            }
        }
    }

    const editFormView=()=>{
    return (
        <div className={classes.root}>
            <div className={classes.subdiv}>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={6}>
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel id="demo-simple-select-outlined-label">Category ID</InputLabel>
                            <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={categoryID}
                            onChange={(event)=>handleChangeCategory(event)}
                            label="Category ID"
                            >
                                {fillCategory()}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel id="demo-simple-select-outlined-label">SubCategory ID</InputLabel>
                            <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={subcategoryID}
                            onChange={(event)=>handleChangeSubCategory(event)}
                            label="SubCategory ID"
                            >
                                {fillSubCategory()}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel id="demo-simple-select-outlined-label">Games ID</InputLabel>
                            <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={gameID}
                            onChange={(event)=>setGameID(event.target.value)}
                            label="Games ID"
                            >
                                {fillGames()}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <span style={{fontSize:16,fontWeight:100}}>Upload Image</span>
                        <input accept="image/*" onChange={(event)=>handlegamesimages(event)} className={classes.input} id="icon-button-file" type="file" />
                        <label htmlFor="icon-button-file">
                            <IconButton color="primary" aria-label="upload picture" component="span">
                                <PhotoCamera />
                            </IconButton>
                        </label>
                    </Grid>
                    <Grid item xs={12} sm={6} style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                        <Avatar variant="rounded" alt="" src={images.file} style={{height:60,width:60,display:'flex',float:'right'}} />
                        {pictureSaveCancel ? <span><Button onClick={()=>handleSavePicture()} color="secondary">Save</Button><Button onClick={()=>handleCancelImage()} color="secondary">Cancel</Button></span>:<></>}
                    </Grid>
                </Grid>
            </div>
        </div>
        )
    }

//////////////////////////////////////////////////////////////////////////////////

//////////////////////////////Edit/Delete Dialog Box//////////////////////////////

const [open, setOpen] = React.useState(false);

const handleClickOpen = (rowData) => {
  setOpen(true);
  setRowData(rowData);
  setImageID(rowData.imageid);
  fillSubCategorybycategoryid(rowData.categoryid);
  fillGamesbysubcategoryid(rowData.subcategoryid);
  setCategoryID(rowData.categoryid);
  setSubcategoryID(rowData.subcategoryid);
  setGameID(rowData.gameid);
  setImages({bytes:"",file:`${ServerURL}/images/${rowData.images}`});
};

const handleClose = () => {
  setOpen(false);
  fetchAllData();
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
                  Sound
                </Typography>
                <Button autoFocus color="inherit" onClick={()=>handleClickSave()}>
                  Update
                </Button>
                <Button autoFocus color="inherit" onClick={()=>handleDeleteData()}>
                  Delete
                </Button>
              </Toolbar>
            </AppBar>
            {editFormView()}
          </Dialog>
        </div>
      );    
}

//////////////////////////////////////////////////////////////////////////////////


    const [list, setList] = useState([]);

    const fetchAllData=async()=>{
        var result= await getData("multiplegamespic/displayall");
        setList(result);
    }

    useEffect(function(){
        fetchAllData();
        fetchAllCategory();
    },[])

    function displayAllPictures() {
        return (
        <div>
        <MaterialTable
            title="Simple Action Preview"
            columns={[
            { title: 'Image ID', field: 'imageid' },
            { title: 'Category ID', field: 'categoryid' },
            { title: 'SubCategory ID', field: 'subcategoryid' },
            { title: 'Games ID', field: 'gameid' },
            { title: 'Images', field: 'images',
            render:rowData=>(<div><img src={`${ServerURL}/images/${rowData.images}`} style={{borderRadius:5,width:40,height:40}}/></div>) },
            ]}
            data={list} 
            actions={[
            {
                icon: 'edit',
                tooltip: 'Edit/Delete Data',
                onClick: (event, rowData) => handleClickOpen(rowData)
            }
            ]}
        />
         {showEditDialog()}
        </div>
        )
    }
    return(
        <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
            <div style={{padding:10,width:960}}>
                {displayAllPictures()}
            </div>
        </div>
    )
  }