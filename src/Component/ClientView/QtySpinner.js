import React,{useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { deepOrange } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({

  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: '#1e6b7b',
    width: theme.spacing(3),
    height: theme.spacing(3),
  },

}));

export default function QtySpinner(props) {
  const classes = useStyles();
  const [value,setValue] = useState(props.value);
  const handleIncrement=()=>{
      var c=value+1
      setValue(c)
      props.onChange(c)
  }

  const handleDecrement=()=>{
      var c=value-1;
      if(c>=0)
      {
        setValue(c);
        props.onChange(c)
      }  
  }

  return (
    <div >
      {value==0?
        (<div 
          style={{
            alignItems:'center',
            display:'flex',
            flexDirection:'row'}}>
              <Button variant="contained" color="primary" style={{backgroundColor:'#1e6b7b',height:'4vh',width:'13vw',fontSize:'12px'}} onClick={()=>handleIncrement()}>
                ADD To CART
              </Button>
          </div>)
          :(<div 
          style={{
            alignItems:'center',
            display:'flex',
            flexDirection:'row'}}>
              <Avatar 
              onClick={()=>handleDecrement()} 
              style={{marginRight:12}} 
              className={classes.orange}>-</Avatar>
      <div style={{display:'flex',justifyContent: 'center',fontSize:14,fontWeight:'bold',width:15}}>{value}</div>
      <Avatar onClick={()=>handleIncrement()} style={{marginLeft:12}} className={classes.orange}>+</Avatar></div>)}
      </div>
  );
}
