import React, { useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import MoreIcon from '@material-ui/icons/MoreVert';
import { Button } from '@material-ui/core';
import { getData, postData,ServerURL } from '../FetchData';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import EditLocationSharpIcon from '@material-ui/icons/EditLocationSharp';
import {useSelector,useDispatch} from 'react-redux';
/////Drawer
import {Drawer, Divider} from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import clsx from 'clsx';
import Delete from '@material-ui/icons/Delete';




const useStyles = makeStyles((theme) => ({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
      marginRight:60
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      // backgroundColor: fade(theme.palette.common.white, 0.15),
      // '&:hover': {
      //   backgroundColor: fade(theme.palette.common.white, 0.25),
      // },
      color:'black',
      backgroundColor:'#f1f2f6',
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 1),
      backgroundColor:'#dcdde1',
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius:theme.shape.borderRadius,
    },
    locationIcon: {
      padding: theme.spacing(0, 1),
      backgroundColor:'#dcdde1',
      height: '100%',
      width:'5.6ch',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      marginTop:'-35px',
      marginLeft:'28.5ch',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius:theme.shape.borderRadius,
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '26ch',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    list: {
      width: 430,
    },
    fullList: {
      width: 'auto',
    },
}));

export default function Header(props)
{
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  
    var cart=useSelector(state=>state.cart)
    var keys=Object.keys(cart)
    var values=Object.values(cart)
    var totalamt=values.reduce(calculation,0)
    var totalsaving=values.reduce(calculationsaving,0)
    var actualamt = values.reduce(actualcalculation,0)
    var dispatch=useDispatch();

    function actualcalculation(a,b){
      var price=b.rentamount*b.qtydemand*b.duration;
      return a+price;
    }
    function calculation(a,b){
      var price=b.offers>0?b.offers*b.qtydemand*b.duration:b.rentamount*b.qtydemand*b.duration;
      return a+price;
    }

    function calculationsaving(a,b){
      var price=(b.rentamount-b.offers)*b.qtydemand*b.duration;
      return a+price;
    }

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const [listCategory, setListCategory] = useState([]);
    const [listSubCategory,setListSubCategory] = useState([]);

    //////////////////////////////////Drawer//////////////////////////////////
    const [state, setState] = React.useState({
      top: false,
      left: false,
      bottom: false,
      right: false,
    });
  
    const toggleDrawer = (anchor, open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
  
      setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
      <div
        className={clsx(classes.list, {
          [classes.fullList]: anchor === 'top' || anchor === 'bottom',
        })}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <div style={{display:'flex',flexDirection:'row',width:430,backgroundColor:'whitesmoke'}}>
          <div style={{padding:5,display:'flex',flexDirection:'row',alignItems:'center'}}>
            <ShoppingCart />
            <div style={{fontSize:'16px',fontWeight:'bold',padding:3,letterSpacing:1}}>{keys.length} items</div>
          </div>
          <div style={{
            fontSize:'16px',
            fontWeight:'bold',
            padding:5,
            letterSpacing:1,
            width:315,
            display:'flex',
            justifyContent:'flex-end',
            alignItems:'center'}}>
            Total Amount: <span>&#8377;</span> {totalamt}
          </div>
        </div>
        <Divider />
        {showCart()}
        <Divider />
        {paymentDetails()}
      </div>
    );

    const handleDelete=(item)=>{
      dispatch({type:'REMOVE_CART',payload:[item.subcategoryid]})
    }

    const showCart = ()=>{
      return(
        values.map((item)=>{
          return(
          <div>
          <div style={{display:'flex',flexDirection:'row',width:430}}>
          <div style={{padding:3,display:'flex',flexDirection:'row',alignItems:'center'}}>
            <img src={`${ServerURL}/images/${item.icon}`} width="120px" />
          </div>
          <div style={{display:'flex',flexDirection:'column',justifyContent:'left',alignSelf:'center'}}>
          <div 
            style={{
              fontWeight:'bolder',
              fontSize:11,
              padding:2,
              letterSpacing:1,
              width:135
          }}>
              {item.subcategoryname.toUpperCase().length<=20 ? item.subcategoryname.toUpperCase(): item.subcategoryname.toUpperCase().substring(0,18)+".."}
          </div>
          <div style={{fontSize:11,padding:2}}>
              Day Price:Price<s>&#8377; {item.rentamount}</s> <span><b> &#8377; {item.offers}</b></span>
          </div>
          <div style={{fontSize:11,padding:2}}>
              <span style={{color:'green'}}><b>You Save</b></span><b> &#8377; {item.rentamount-item.offers}</b>
          </div>
           <div style={{fontSize:11,padding:2}}>
              <span style={{color:'green'}}><b>Qty:</b></span><b> 
                {item.qtydemand} x {item.offers>0?
            (<><span>&#8377; {item.offers}</span> x <span> {item.duration} Day(s)</span></>):
            (<span>&#8377; {item.rate}</span>)}</b>
            <span>
              <Delete style={{marginLeft:15,fontSize:18,color:'red',cursor:'pointer'}} onClick={()=>handleDelete(item)}/>
            </span>
          </div>  
          <div 
            style={{
              display:'flex',
              justifyContent:'center',
              alignItems:'center',
              padding:2
          }}>     
              {/* <QtySpinner value={0} onChange={(value)=>handleQtyChange(value,item)} /> */}
          </div>
          </div>
          <div style={{fontSize:'16px',fontWeight:'bold',padding:3,width:125,display:'flex',justifyContent:'flex-end',alignItems:'center'}}>
            {item.offers>0?
            (<div><span>&#8377;</span> {item.offers*item.qtydemand*item.duration}</div>):(<div><span>&#8377;</span> {item.rate*item.qtydemand*item.duration}</div>)}
          </div>
          </div>
        </div>
          )
        })
      )
      
    }

    const paymentDetails=()=>{
      return(
        <div style={{display:'flex',flexDirection:'column'}}>
          <div style={{fontSize:18,fontWeight:'bold',letterSpacing:2,display:'flex',justifyContent:'center',alignItems:'center'}}>
            Payment Details
          </div>
          <Divider />
          <div style={{display:'flex',flexDirection:'row'}}>
            <div style={{fontSize:14,fontWeight:'400px',padding:5}}>
              Total Amount:
            </div>
            <div style={{fontSize:14,fontWeight:'bold',padding:5,marginLeft:'auto'}}>
            &#8377;{actualamt}
            </div>
          </div>
          <div style={{display:'flex',flexDirection:'row'}}>
            <div style={{fontSize:14,fontWeight:'400px',padding:5}}>
              Total Savings:
            </div>
            <div style={{fontSize:14,fontWeight:'bold',padding:5,marginLeft:'auto'}}>
            &#8377;{totalsaving}
            </div>
          </div>
          <div style={{display:'flex',flexDirection:'row'}}>
            <div style={{fontSize:14,fontWeight:'400px',padding:5}}>
              Delivery Charges:
            </div>
            <div style={{fontSize:14,fontWeight:'bold',padding:5,marginLeft:'auto'}}>
            &#8377;{0}
            </div>
          </div>
          <Divider />
          <div style={{display:'flex',flexDirection:'row'}}>
            <div style={{fontSize:14,fontWeight:'400px',padding:5}}>
              Amount Pay:
            </div>
            <div style={{fontSize:14,fontWeight:'bold',padding:5,marginLeft:'auto'}}>
            &#8377;{totalamt}
            </div>
          </div>
          <Divider />
          <div style={{padding:20}}>
          <Button 
          variant="contained"
          onClick={()=>props.history.push({'pathname':'/signin'})} 
          style={{
            backgroundColor:'#1e6b7b',
            color:'#fff',
            width:370,
            margin:30,
            // display:'flex',
            // justifyContent:'center'
            }}
          >
            Proceed
          </Button></div>
        </div>
      )
    }
  
    ///////////////////////////////////////////////////////////////////////////
    
    //////////////////////////////////Menu Design//////////////////////////////
    const [anchorMEl, setAnchorMEl] = React.useState(null);


    const fetchAllCategory=async()=>{
        var result=await getData("categories/displayall");
        setListCategory(result);
      }
      useEffect(function(){
          fetchAllCategory();
      },[])
    
    const fetchSubCategory=async(cid)=>{
        var body={categoryid:cid}
        var result = await postData("subcategory/displaysubcategorybycategoryid",body)
        setListSubCategory(result);
    }

    const handleMenuClick=async(event)=>{
        fetchSubCategory(event.currentTarget.value);
        setAnchorMEl(event.currentTarget);
    }

      const handleClose = () => {
        setAnchorMEl(null);
      };
    
      const menuSubCategoryitems=()=>{
          return listSubCategory.map((item)=>{
              return(
                <MenuItem onClick={handleClose} >{item.subcategoryname}</MenuItem>
              ) 
                
          })
      }

      const menuCategory=()=>{
        return listCategory.map((item)=>{
            return(
                <Button 
                style={{
                  color:'#000',
                  fontWeight:'bold',
                  marginRight:15
                }} 
                  value={item.categoryid} 
                  onClick={(event)=>handleMenuClick(event)
                  }>
                    {item.categoryname}
                  </Button>
            )
        })
    }

    ///////////////////////////////////////////////////////////////////////////

    const handleProfileMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleMobileMenuClose = () => {
      setMobileMoreAnchorEl(null);
    };
  
    const handleMenuClose = () => {
      setAnchorEl(null);
      handleMobileMenuClose();
    };
  
    const handleMobileMenuOpen = (event) => {
      setMobileMoreAnchorEl(event.currentTarget);
    };
  
    const menuId = 'primary-search-account-menu';
    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      </Menu>
    );
  
    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem>
          <IconButton aria-label="show 4 new mails" color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem>
          <IconButton onClick={toggleDrawer('right', true)} aria-label="show 11 new notifications" color="inherit">
            <Badge badgeContent={keys.length} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );
  
return(
<div>
<div className={classes.grow}>
      <AppBar style={{backgroundColor:'#1e6b7b'}}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            GameZone
          </Typography>
          
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
            <div className={classes.locationIcon}>
              <LocationOnOutlinedIcon style={{padding:'5px'}} />
              <EditLocationSharpIcon style={{fontSize:'16px'}} />
            </div>
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton onClick={toggleDrawer('right', true)} aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={keys.length} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <AppBar position="static" style={{backgroundColor:'#f5f6fa',marginTop:65}}>
        <Toolbar variant="dense">
          <div style={{display:'flex',flexDirection:'row',marginLeft:125}}>
              {menuCategory}
              <Menu
                    id="simple-menu"
                    anchorEl={anchorMEl}
                    keepMounted
                    open={Boolean(anchorMEl)}
                    onClose={handleClose}
                    getContentAnchorEl={null}
                    anchorOrigin={{vertical:"bottom",horizontal:"center"}}
                    transformOrigin={{vertical:"top",horizontal:"center"}}
                >
                    {menuSubCategoryitems()}
                </Menu>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <div>
        <React.Fragment key={'right'}>
          <Drawer anchor={'right'} open={state['right']} onClose={toggleDrawer('right', false)}>
            {list('right')}
          </Drawer>
        </React.Fragment>
    </div>
    </div>
  </div>  
  );
}

  
