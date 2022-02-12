import { Grid,Button,Divider,TextField } from '@material-ui/core';
import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Header';
import Footer from './Footer';
import { postData, ServerURL } from '../FetchData';
import {Drawer} from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    list: {
        width: 430,
      },
      fullList: {
        width: 'auto',
      },
}))

export default function ProductPaymentPage(props){

    const classes = useStyles();

    const [refresh,setRefresh]=useState(false)

    var cart=useSelector(state=>state.cart)
    var user=useSelector((state)=>state.user);
    var keys=Object.keys(cart)
    var values=Object.values(cart)
    // var userKey=Object.keys(user)
    var userValues=Object.values(user)[0];
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

    const [addressOne,setAddressOne]=useState("")
    const [addressTwo,setAddressTwo]=useState("")
    const [userstates,setUserStates]=useState("")
    const [userCity,setUserCity]=useState("")
    const [zipCode,setZipcode]=useState("")

    const handleAddData=async()=>{
        var body={
            addressone:addressOne,
            addresstwo:addressTwo,
            state:userstates,
            city:userCity,
            zipcode:zipCode,
            mobileno:userValues.mobileno
        }
        var result=await postData("userlogin/updateuserdata",body)
        if(result.result)
        {
            var body={mobileno:userValues.mobileno}
            var res=await postData("userlogin/chkuserlogin",body)
            if(res.result)
            {
                dispatch({
                    type:"ADD_USER",
                    payload:[res.data.mobileno,res.data],
                });
                setRefresh(!refresh)
            }
        }
        else
        {
            alert("Fail to Save Address...")
        }
    }

    const showOrderSummary=()=>{
        return values.map((item)=>{
            return(
                <div>
                    <div style={{display:'flex',flexDirection:'row'}}>
                        <div style={{padding:5}}>
                            <img src={`${ServerURL}/images/${item.icon}`} width="70" height="70"/>
                        </div>
                        <div style={{display:'flex',flexDirection:'column',width:700}}>
                            <div style={{fontSize:12,fontWeight:'bold',letterSpacing:1}}>
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
                            </span>
                        </div>  
                        <div 
                        style={{
                            display:'flex',
                            justifyContent:'center',
                            alignItems:'center',
                            padding:2
                        }}>     
                        </div>
                    </div>
                    <div style={{fontSize:'16px',fontWeight:'bold',padding:3,width:200,display:'flex',justifyContent:'flex-end',alignItems:'center'}}>
                        {item.offers>0?
                        (<div><span>&#8377;</span> {item.offers*item.qtydemand*item.duration}</div>):(<div><span>&#8377;</span> {item.rate*item.qtydemand*item.duration}</div>)}
                    </div>
                </div>
                <Divider />
            </div>
            )
        })
    }

    const showBilldetails=()=>{
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
              </div>
              )
    }

    
    //////////////////////////////////Drawer//////////////////////////////////
    const [getState, setStates] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
      });
    
      const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setStates({ ...getState, [anchor]: open });
      };

      
      const list = (anchor) => (
        <div
          className={clsx(classes.list, {
            [classes.fullList]: anchor === 'top' || anchor === 'bottom',
          })}
          role="presentation"
        //   onClick={toggleDrawer(anchor, false)}
        //   onKeyDown={toggleDrawer(anchor, false)}
        >
        <Grid container spacing={1} style={{padding:20}}>
          <Grid item xs={12} >
            <h4 style={{display:'flex',flexDirection:'row'}}>Hi {userValues.firstname}</h4>
            <h5>
                Add your address...
            </h5>
          </Grid>
          <Grid item xs={12}>
                <TextField variant="outlined" onChange={(event)=>setAddressOne(event.target.value)} label="Address Line One" fullWidth />
          </Grid>
          <Grid item xs={12}>
                <TextField variant="outlined" onChange={(event)=>setAddressTwo(event.target.value)} label="Address Line Two" fullWidth />
          </Grid>
          <Grid item xs={12}>
                <TextField variant="outlined" onChange={(event)=>setUserStates(event.target.value)} label="State" fullWidth />
          </Grid>
          <Grid item xs={12}>
                <TextField variant="outlined" onChange={(event)=>setUserCity(event.target.value)} label="City" fullWidth />
          </Grid>
          <Grid item xs={12}>
                <TextField variant="outlined" onChange={(event)=>setZipcode(event.target.value)} label="Zipcode" fullWidth />
          </Grid>
          <Grid item xs={12} >
                <Button 
                    variant="contained" 
                    color="primary" 
                    style={{backgroundColor:'#1e6b7b'}}
                    onClick={()=>handleAddData()} 
                    fullWidth>
                        Save Address
                </Button>
          </Grid>
        </Grid>
        {/* <div style={{padding:10}}>
          <div style={{display:'flex',flexDirection:'column',width:430}}>
            <div style={{padding:15,display:'flex',flexDirection:'row',alignItems:'center',fontSize:16,fontWeight:'bold'}}>
                Hi {showName()}
            </div>
            <div style={{fontSize:14,fontWeight:'bold',padding:15}}>
                Add your address...
            </div>
          </div>
          <div>
            {addAddress()}
          </div>
          </div> */}
        </div>
      );
  
      /////////////////////////////////////////////////////////////////////////

    return(
        <div style={{backgroundColor:'#dfe6e9',width:''}}>
            <Header history={props.history} />
            <div style={{display:'flex',flexDirection:'column'}}>
                <div style={{display:'flex',justifyContent:'center',padding:20}}>
                    <span style={{fontSize:24,fontWeight:'bold'}}>Order Summary ({`${keys.length}`})</span>
                </div>
            <div style={{padding:30}}>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                    <div style={{display:'flex',backgroundColor:'#ffff',flexDirection:'row',justifyContent:'center',padding:10}}>
                        <div style={{width:700}}>
                            <span style={{fontSize:20,fontWeight:'bold'}}>({`${keys.length}`}) Items</span>
                        </div>
                        <div style={{display:'flex',justifyContent:'flex-end'}}>
                            <span 
                            style={{
                                fontSize:20,
                                fontWeight:'bold'
                                }}>&#8377;{totalamt}</span>
                        </div>
                    </div>
                    <div style={{backgroundColor:'#ffff',padding:10}}>
                        {showOrderSummary()}
                    </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                <div style={{backgroundColor:'#fff',padding:10}}>
                    <div style={{fontWeight:'bold',fontSize:24,padding:10}}>
                        Delivery Address
                    </div>
                    <span style={{fontWeight:'bold',fontSize:16,padding:10}}>
                        {userValues.firstname} {userValues.lastname}
                    </span>
                    <div style={{padding:10}}>
                        {!userValues.addressstatus ? (
                            <Button variant="contained" onClick={toggleDrawer('right', true)} color="primary" style={{backgroundColor:'#1e6b7b'}}>
                                ADD ADDRESS
                            </Button>):(
                            <div>
                                {userValues.addressone}, {userValues.addresstwo}
                            <div>
                                {userValues.city}, {userValues.state}, {userValues.zipcode}   
                            </div>     
                            </div>)}
                    </div>
                </div>
                <div style={{marginTop:20}}>
                    <Grid container spacing={1} style={{display:'flex',flexDirection:'column',justifyContent:'flex-end'}}>
                        <Grid item xs={12} sm={12}>
                            <div style={{backgroundColor:'#ffff',padding:10}}>
                                {showBilldetails()}            
                            </div>          
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <div>
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    fullWidth
                                    style={{backgroundColor:'#1e6b7b'}}>
                                    Make Payment
                                </Button>
                            </div>           
                        </Grid>
                    </Grid>
                </div>
                </Grid>
            </Grid>
            <div>
                <React.Fragment key={'right'}>
                    <Drawer anchor={'right'} open={getState['right']} onClose={toggleDrawer('right', false)}>
                        {list('right')}
                    </Drawer>
                </React.Fragment>
            </div>
            </div>
        </div>
        <Footer history={props.history} style={{width:'1000px',padding:0}}/>
        </div>        
    )
}