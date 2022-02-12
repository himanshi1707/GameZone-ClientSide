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
    flex: 1},
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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function DisplayAllSubCategories(props)
{
  const [list, setList]=useState();
//////////////////////////////////////////////Edit Form Details/////////////////////////////////////////////
    const [subcategoryID, setSubCategoryID]=useState('');
    const [categoryId, setCategoryId] = useState('');
    const [subcategoryName, setSubCategoryName] = useState('');
    const [subcategoryDescription, setSubCategoryDescription] = useState('');
    const [icon, setIcon] = useState({bytes:'',file:'/noimage.jpg'});
    const [ad, setAd] = useState({bytes:'',file:'/noimage.jpg'});
    const [adStatus, setAdStatus] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [rented, setRented] = useState('');
    const [rentAmt, setRentAmt] = useState('');
    const [iconSaveCancel, setIconSaveCancel] = useState(false);
    const [adSaveCancel, setAdSaveCancel] = useState(false);    
    const [getRowData, setRowData] = useState([]);
    const [offers,setOffers] = useState('');

    const [listSubCategory,setListSubCategory] = useState([]);

    const fetchAllSubCategory=async()=>{
        var result=await getData("categories/displayall");
        setListSubCategory(result);
      }
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
        setAdSaveCancel(true)
    }

    const handleSubCategoryIcon=(event)=>{
        setIcon({bytes:event.target.files[0],
        file:URL.createObjectURL(event.target.files[0])});
        setIconSaveCancel(true)
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
            msg+="<font color='#e74c3c'><b>Offers should not be blank..</b></font><br>"
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
          var body={
            categoryid: categoryId,
            subcategoryid: subcategoryID,
            subcategoryname: subcategoryName,
            description: subcategoryDescription,
            price:price,
            stock:stock,
            rented:rented,
            rentamount:rentAmt,
            offers:offers,
            adstatus: adStatus,
            }
        var result=await postData(
          "subcategory/updatesubcategorydata",body);
        if(result)
        {
            swal({
                title: "SubCategory Updated Successfully",
                icon: "success",
                dangerMode: true,
              })
        }
    }
}

const handleClickdelete=async()=>{
  var body={
    subcategoryid: subcategoryID,}
var result=await postData(
  "subcategory/deletedata",body);
if(result)
{
    swal({
        title: "Subcategory Deleted Successfully",
        icon: "success",
        dangerMode: true,
      })
}
else 
{
    swal({
        title: "Unable to delete Subcategory",
        icon: "success",
        dangerMode: true,
      })
}
}

const handleCancelIcon=()=>{
  setIconSaveCancel(false)
  setIcon({bytes:"",file:`${ServerURL}/images/${getRowData.icon}`})
}

const handleCancelAd=()=>{
  setAdSaveCancel(false)
  setAd({bytes:"",file:`${ServerURL}/images/${getRowData.ad}`})
}

const handleClickSaveIcon=async()=>{
        var formData = new FormData();
        formData.append("subcategoryid", subcategoryID);
        formData.append("icon", icon.bytes);
        var config={headers:{"content-type":"multipart/form-data"}}
        var result=await postDataAndImage('subcategory/updateicon', formData, config);
        if(result)
        {
            swal({
                title: "Icon updated Successfully",
                icon: "success",
                dangerMode: true,
              });
              setIconSaveCancel(false);
        }
}

const handleClickSaveAd=async()=>{
  var formData = new FormData();
  formData.append("subcategoryid", subcategoryID);
  formData.append("ad", ad.bytes);
  var config={headers:{"content-type":"multipart/form-data"}}
  var result=await postDataAndImage('subcategory/updatead', formData, config);
  if(result)
  {
      swal({
          title: "Ad updated Successfully",
          icon: "success",
          dangerMode: true,
        });
        setAdSaveCancel(false);
        
  }
}


const editFormView=()=>{

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
                            value={categoryId}
                            onChange={(event) => setCategoryId(event.target.value)}
                            label="Category ID"
                        >
                        {ShowCategory()}
                        </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField value={subcategoryName} variant="outlined" onChange={(event)=>setSubCategoryName(event.target.value)} label="SubCategory Name" fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField value={subcategoryDescription} variant="outlined" onChange={(event)=>setSubCategoryDescription(event.target.value)} label="Description" fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField variant="outlined" value={price} onChange={(event)=>setPrice(event.target.value)} label="Price" fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField variant="outlined" value={stock} onChange={(event)=>setStock(event.target.value)} label="Stock" fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField variant="outlined" value={rented} onChange={(event)=>setRented(event.target.value)} label="Rented" fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField variant="outlined" value={rentAmt} onChange={(event)=>setRentAmt(event.target.value)} label="Rent Amount" fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField variant="outlined" value={offers} onChange={(event)=>setOffers(event.target.value)} label="Offers" fullWidth/>
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
                    <Grid item xs={12} sm={6} style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                            <Avatar variant="rounded" src={icon.file} style={{height:60,width:60}} />
                            {iconSaveCancel ? <span><Button color="secondary" onClick={()=>handleClickSaveIcon()}>Save</Button><Button color="secondary" onClick={()=>handleCancelIcon()}>Cancel</Button></span>:<></>}
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
                    <Grid item xs={12} sm={6} style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                            <Avatar variant="rounded" src={ad.file} style={{height:60,width:60}} />
                            {adSaveCancel ? <span><Button color="secondary" onClick={()=>handleClickSaveAd()}>Save</Button><Button color="secondary" onClick={()=>handleCancelAd()}>Cancel</Button></span>:<></>}
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl variant="outlined" fullWidth className={classes.formControl}>
                            <InputLabel id="demo-simple-select-outlined-subcategory">Ad Status</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-subcategory"
                            id="demo-simple-select-outlined"
                            value={adStatus}
                            onChange={(event) => setAdStatus(event.target.value)}
                            label="Ad Status"
                        >
                            <MenuItem value={'Activate'}>Activate</MenuItem>
                            <MenuItem value={'Deactivate'}>Deactivate</MenuItem>
                        </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////Edit form Dialog//////////////////////////////////////////////

const classes = useStyles();
const [open, setOpen]=React.useState(false);

const handleClickOpen=(rowData)=>{
  setOpen(true);
  setRowData(rowData);
  setCategoryId(rowData.categoryid);
  setSubCategoryID(rowData.subcategoryid);
  setSubCategoryName(rowData.subcategoryname);
  setSubCategoryDescription(rowData.description);
  setPrice(rowData.price);
  setStock(rowData.stock);
  setRented(rowData.rented);
  setRentAmt(rowData.rentamount);
  setOffers(rowData.offers);
  setIcon({bytes:"",file:`${ServerURL}/images/${rowData.icon}`});
  setAd({bytes:"",file:`${ServerURL}/images/${rowData.ad}`});
  setAdStatus(rowData.adstatus);
};

const handleClose=()=>{
  setOpen(false);
  fetchAllCategory();
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
            Edit/Delete Game Subcategories
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const fetchAllCategory=async()=>{
    var result=await getData("subcategory/displayall");
    setList(result);
  }
  
  useEffect(function(){
    fetchAllCategory();
    fetchAllSubCategory();
  },[])

function displayAll() {
    return (
      <div>
      <MaterialTable
        title="Games SubCategory Data"
        columns={[
          { title: 'Category ID', field: 'categoryid' },
          {title: 'SubCategory ID', field: 'subcategoryid'},
          { title: 'SubCategory Name', field: 'subcategoryname' },
          { title: 'Description', field: 'description' },
          { title: 'Price', field: 'price' },
          { title: 'Stock', field: 'stock' },
          { title: 'Rented', field: 'rented' },
          { title: 'Rent Amount', field: 'rentamount' },
          { title: 'Offers', field: 'offers' },
          { title: 'Icon', field: 'icon', 
          render: rowData=>(<div><img src={`${ServerURL}/images/${rowData.icon}`} height="50" width="50" /></div>)},
          { title: 'Ad', field: 'ad',
          render: rowData=>(<div><img src={`${ServerURL}/images/${rowData.ad}`} height="50" width="50" /></div>) },
          { title: 'Ad Status', field: 'adstatus' },
        ]}
        data={list}        
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit SubCategories',
            onClick: (event, rowData) =>handleClickOpen(rowData)
          }
        ]}
      />
      {showEditDialog()}
      </div>
    )
  }

return(
    <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
      <div style={{width:960,marginTop:10,padding:3}}>
        {displayAll()}
      </div>
    </div>
)

}

