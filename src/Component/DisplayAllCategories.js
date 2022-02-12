import MaterialTable from 'material-table';
import React,{useState,useEffect} from "react";
import {getData, ServerURL} from "./FetchData";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { Grid, TextField} from "@material-ui/core"
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Avatar from '@material-ui/core/Avatar';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import swalhtml from "@sweetalert/with-react";
import swal from "sweetalert";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { postDataAndImage, postData } from "./FetchData";
import {isBlank} from "./Checks"
import renderHTML from "react-render-html"



const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  root: {
    height:657,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    //background:'#192a56',
},
subdiv: {
    padding: 20,
    width: 700,
    borderRadius: 2,
    backgroundColor: '#ffff',
    marginTop: 0,
    //boxShadow: '8px 5px 8px 5px black',
},
input: {
    display: 'none',
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DisplayAllCategories(props)
{
  const [list,setList]=useState()
//////////////////////////Edit Form/////////////////////////
    const [categoryID, setCategoryID] = useState("");
    const [categoryName, setCategoryName]=useState('')
    const [categoryDescription, setCategoryDescription]=useState('')
    const [icon, setIcon]=useState({bytes:'', file:'/noimage.jpg'})
    const [ad, setAd]=useState({bytes:'', file:'/noimage.jpg'})
    const [adStatus, setAdStatus]=useState('')
    const [iconSaveCancel, setIconSaveCancel]=useState(false);
    const [adSaveCancel, setAdSaveCancel]=useState(false);
    const [getRowData, setRowData]=useState([])

    const handleAd=(event)=>{
      setAd({bytes:event.target.files[0],
      file:URL.createObjectURL(event.target.files[0])
    });
    setAdSaveCancel(true);
  }

  const handleIcon=(event)=>{
      setIcon({bytes:event.target.files[0],
      file:URL.createObjectURL(event.target.files[0])
    });
    setIconSaveCancel(true);
  }

  const handleClick=async()=>{
      var error=false
      var msg="<div>"
      if(isBlank(categoryName))
      {
          msg+="<font color='#e74c3c'><b>Category Should not be blank..</b></font><br>"
          error=true
      }
      if(isBlank(categoryDescription))
      {
          msg+="<font color='#e74c3c'><b>Description Should not be blank..</b></font><br>"
          error=true
      }
      if(isBlank(adStatus))
      {
          msg+="<font color='#e74c3c'><b>Pls choose ad status..</b></font><br>"
          error=true
      }
      msg+="</div>"
  if(error)
  {
      swalhtml(renderHTML(msg))
  }
  else{
      var body={
        categoryid: categoryID,
      categoryname:categoryName,
      description:categoryDescription,
      adstatus:adStatus};
      var result=await postData(
      "categories/updatecategorydata", 
      body);
      if(result)
      {
          swal({
              title: "Category Updated Successfully",
              icon: "success",
              dangerMode: true,
            })
            
      }
  }
}

const handleClickdelete=async()=>{
  var body={
    categoryid: categoryID};
  var result=await postData(
  "categories/deletedata", 
  body);
  if(result)
  {
      swal({
          title: "Category deleted Successfully",
          icon: "success",
          dangerMode: true,
        })        
  }
  else
  {
      swal({
          title: "Unable to delete Category",
          icon: "success",
          dangerMode: true,
        })
        
  
  }


}

const handleCancelAd=()=>{
  setAdSaveCancel(false)
  setAd({bytes:"",file:`${ServerURL}/images/${getRowData.ad}`})
}

const handleCancelIcon=()=>{
  setIconSaveCancel(false)
  setIcon({bytes:"",file:`${ServerURL}/images/${getRowData.icon}`})
}

const handleClickSaveIcon=async()=>{
  var formData=new FormData();
      formData.append("categoryid", categoryID)
      formData.append("icon", icon.bytes)
      var config={headers:{"content-type":"multipart/form-data"}}
      var result=await postDataAndImage('categories/updateicon', formData, config);
      if(result)
      {
          swal({
              title: "Icon Updated Successfully",
              icon: "success",
              dangerMode: true,
            });
            setIconSaveCancel(false)
      }
}

const handleClickSaveAd=async()=>{
  var formData=new FormData();
      formData.append("categoryid", categoryID)
      formData.append("ad", ad.bytes)
      var config={headers:{"content-type":"multipart/form-data"}}
      var result=await postDataAndImage('categories/updatead', formData, config);
      if(result)
      {
          swal({
              title: "Ad Updated Successfully",
              icon: "success",
              dangerMode: true,
            });
            setAdSaveCancel(false)
      }
}


const editFormView=()=>{

  return(
      <div className = {classes.root}>
          <div className = {classes.subdiv}>
          <Grid container spacing={1}>
              <Grid item xs={12} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                  <div style={{fontSize:26,fontWeight:700,marginBottom:10,letterSpacing:2}}>
                      Category Interface
                  </div>
              </Grid>
              <Grid item xs={12}>
                  <TextField value={categoryName} onChange={(event)=>setCategoryName(event.target.value)} label="Category Name" variant="outlined" fullWidth/>
              </Grid>
              <Grid item xs={12}>
                  <TextField value={categoryDescription} onChange={(event)=>setCategoryDescription(event.target.value)} label="Description" variant="outlined" fullWidth/>
              </Grid>
              <Grid item xs={12} sm={6}>
                  <span 
                  style={{
                    fontSize: 16,fontWeight: 300}}>
                    Edit Category Icon
                    </span>
                  <input onChange={(event)=>handleIcon(event)} accept="image/*" className={classes.input} id="icon-button-file" type="file" />
                  <label htmlFor="icon-button-file">
                      <IconButton color="primary" aria-label="upload picture" component="span">
                          <PhotoCamera />
                      </IconButton>
                  </label>
              </Grid>
              <Grid item xs={12} sm={6} style={{display: 'flex',
              justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                  <Avatar variant="rounded" src={icon.file} 
                  style={{width: 60,height: 60}} />
              {iconSaveCancel?<span><Button color="secondary" onClick={()=>handleClickSaveIcon()}>Save</Button><Button color="secondary" onClick={()=>handleCancelIcon()}>Cancel</Button></span>:<></>}
              </Grid>
              <Grid item xs={12} sm={6}>
                  <span 
                  style={{
                  fontSize:16,fontWeight:300}}>
                    Edit Category Ad
                  </span>
                  <input onChange={(event)=>handleAd(event)} accept="image/*" className={classes.input} id="ad-button-file" type="file" />
                  <label htmlFor="ad-button-file">
                      <IconButton color="primary" aria-label="upload picture" component="span">
                          <PhotoCamera />
                      </IconButton>
                  </label>
              </Grid>
              <Grid item xs={12} sm={6} 
              style={{display: 'flex',
              justifyContent:'center',
              alignItems:'center', marginTop:15,flexDirection:'column'}}>
                  <Avatar 
                  variant="rounded" src={ad.file} 
                  style={{width: 60,height: 60}} />
                  {adSaveCancel?<span><Button color="secondary" onClick={()=>handleClickSaveAd()}>Save</Button><Button color="secondary" onClick={()=>handleCancelAd()}>Cancel</Button></span>:<></>}
              </Grid>
              <Grid item xs={12}>
                  <FormControl variant="outlined" fullWidth className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-category">Ad Status</InputLabel>
                  <Select
                      labelId="demo-simple-select-outlined-category"
                      id="demo-simple-select-outlined"
                      value={adStatus}
                      onChange={(event)=>setAdStatus(event.target.value)}
                      label="Ad Status"
                  >
                      <MenuItem value={'Activate'}>Activate</MenuItem>
                      <MenuItem value={'Deactivate'}>Deactivate</MenuItem>
                  </Select>
                  </FormControl>
              </Grid>
          </Grid>
          </div>
      </div>)}

//////////////////////////////////////////////////////////////////

///////////////////////////////Edit Dialog/////////////////////////////////////////
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (rowData) => {
    setRowData(rowData);
    setOpen(true);
    setCategoryID(rowData.categoryid);
    setCategoryName(rowData.categoryname);
    setCategoryDescription(rowData.description);
    setIcon({bytes: "",file:`${ServerURL}/images/${rowData.icon}`});
    setAd({bytes: "",file:`${ServerURL}/images/${rowData.ad}`});
    setAdStatus(rowData.adstatus);
  };

  const handleClose = () => {
    setOpen(false);
    fetchAllCategory();
  };

  const showEditDialog=()=>{
    return (
      <div>
        {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Open full-screen dialog
        </Button> */}
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Edit/Delete Game Categories
              </Typography>
              <Button autoFocus color="inherit" onClick={()=>handleClick()}>
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

///////////////////////////////////////////////////////////////////////////////////////////
  const fetchAllCategory=async()=>{
    var result=await getData("categories/displayall")
    setList(result)
  }

  useEffect(function(){
    fetchAllCategory()
  },[])
function displayAll() {
    return (
      <div>
      <MaterialTable
        title="Games Category Data"
        columns={[
          { title: 'Id', field: 'categoryid' },
          { title: 'Name', field: 'categoryname' },
          { title: 'Description', field: 'description' },
          { title: 'Icon', field: 'icon',
          render: rowData =>(<div><img src={`${ServerURL}/images/${rowData.icon}`} height='50' width='50' /></div>)
        },
          { title: 'Ad', field: 'ad',
          render: rowData =>(<div><img src={`${ServerURL}/images/${rowData.ad}`} height='50' width='50' /></div>)
        },
          { title: 'Status', field: 'adstatus'},
        ]}
        data={list}        
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit Categories',
            onClick: (event, rowData) =>handleClickOpen(rowData)
          }
        ]}
      />
      {showEditDialog()}
      </div>
    )
  }


return(
    <div style={{display:'flex', justifyContent:'center',alignItems:'center'}}>
        <div style={{width:800,marginTop:10,padding:3}}>
          {displayAll()}
        </div>
    </div>
)
}