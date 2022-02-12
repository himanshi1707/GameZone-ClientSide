import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core';
import { Button, Grid } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import {Select, IconButton} from '@material-ui/core';
import { getData, postData, postDataAndImage } from './FetchData';
import swalhtml from "@sweetalert/with-react";
import swal from "sweetalert";
import {isBlank} from "./Checks"
import renderHTML from 'react-render-html';
import {DropzoneArea} from 'material-ui-dropzone';

const useStyles = makeStyles((theme)=>({
    root: {
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    },
    subdiv: {
        padding: 20,
        width: 1000,
        borderRadius: 2,
        backgroundColor: '#fffff',
        marginTop: 0,
    },
    input: {
        display: 'none',
    },
}))
export default function ConsolePictures(props){
    const classes=useStyles();
    const [categoryID,setCategoryID] = useState("");
    const [subcategoryID, setSubcategoryID] = useState("");

    ///////////////////////////multiple-image-uploader///////////////////////////
    const [dataSources,setDataSources]=useState([]);
    const handleClickSave=async()=>{
        const formData=new FormData();
        formData.append('categoryid',categoryID);
        formData.append('subcategoryid',subcategoryID);
        dataSources.map((item,index)=>{
            formData.append('image'+index,item);
        });
        var config={headers:{"content-type":"multipart/form-data"}};
        var result = await postDataAndImage("subcategorypicture/insertconsolepicture",formData,config);
                if(result)
                {
                    swal({
                        title: "Console Picture Submitted Successfully",
                        icon: "success",
                        dangerMode: true,
                    })
                }

    }
    const handleSave = async(files) => {
        setDataSources(files)
        console.log("Select files", files);
    };

    /////////////////////////////////////////////////////////////////////////////
    const [image, setImage] = useState({bytes:"", file:"/noimage.jpg"});
    const [listCategory, setListCategory] = useState([]);
    const [listSubCategory, setListSubCategory] = useState([]);

    const handleChangeCategory=async(event)=>{
        setCategoryID(event.target.value);
        var body={'categoryid':event.target.value}
        var result = await postData("subcategory/displaysubcategorybycategoryid", body)
        setListSubCategory(result);
    }

    // const handleChangeSubCategory=async(event)=>{
    //     setSubcategoryID(event.target.value);
    //     var body={'subcategoryid':event.target.value}
    //     var result = await postData("addgame/displayallgamesbysubcategoryid", body);
    //     setListGames(result);
    // }    

    const fetchAllCategory=async()=>{
        var result = await getData("categories/displayall");
        setListCategory(result);
    }
     useEffect(function(){
         fetchAllCategory();
     },[])

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

    return (
    <div className={classes.root}>
        <div className={classes.subdiv}>
            <Grid container spacing={1}>
                <Grid item xs={12} style={{display:'flex',justifyContent:'center',alignItems:'center',margin:20}}>
                    <div style={{fontWeight:500,fontSize:26}}>
                        Console Pictures
                    </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel id="demo-simple-select-outlined-label">Category ID</InputLabel>
                        <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        // value={age}
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
                        // value={age}
                        onChange={(event)=>setSubcategoryID(event.target.value)}
                        label="SubCategory ID"
                        >
                            {fillSubCategory()}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <DropzoneArea
                        onChange={(files)=>handleSave(files)}
                        acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                        //showPreviews={true}
                        filesLimit={10}
                        maxFileSize={5000000}
                        //onClose={()=>handleClose()}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button variant="contained" onClick={()=>handleClickSave()} color="primary" fullWidth>Save</Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button variant="contained" color="primary" fullWidth>Reset</Button>
                </Grid>
            </Grid>
        </div>
    </div>
    )
}