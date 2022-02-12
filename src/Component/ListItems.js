import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import CategoryInterface from './CategoryInterface';
import SubCategoryInterface from "./SubCategoryInterface";
import DisplayAllCategories from "./DisplayAllCategories";
import DisplayAllSubCategories from "./DisplayAllSubCategories";
import AccessoryInterface from './AccessoryInterface';
import DisplayAllAccessories from './DisplayAllAccessories';
import AddGames from './AddGames';
import DisplayGames from './DisplayGames';
import GamesPicture from './GamesPicture';
import DisplayGamesPicture from './DisplayGamesPicture';
import TermsConditions from './TermsConditions';
import Documents from './Documents';
import ConsolePictures from './ConsolePictures';

export default function ListItems(props) {

const handleClick=(v)=>{
  props.setComponent(v);
}

return(
  <div>
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Categories" onClick={()=>handleClick(<CategoryInterface />)} />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="List Categories" onClick={()=>handleClick(<DisplayAllCategories />)} />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Subcategories" onClick={()=>handleClick(<SubCategoryInterface />)}/>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="List Subcategories" onClick={()=>handleClick(<DisplayAllSubCategories />)}/>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Accessories" onClick={()=>handleClick(<AccessoryInterface />)} />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="List Accessories" onClick={()=>handleClick(<DisplayAllAccessories />)} />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Add Games" onClick={()=>handleClick(<AddGames />)} />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="List Games" onClick={()=>handleClick(<DisplayGames />)} />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Games Picture" onClick={()=>handleClick(<GamesPicture />)} />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Display Games Picture" onClick={()=>handleClick(<DisplayGamesPicture />)} />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Console Pictures" onClick={()=>handleClick(<ConsolePictures />)} />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Terms and Conditions" onClick={()=>handleClick(<TermsConditions />)} />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Document" onClick={()=>handleClick(<Documents />)} />
    </ListItem>
  </div>
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
  </div>
);
}