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
import List from '@material-ui/core/List';
function listI(text) {
  if(text == 'Página Inicial'){
    //window.location.replace("http://localhost:3000/teste");

  }else if(text == 'Sair'){
    window.location.replace("http://localhost:3000/logout");
  }
}
export default function ListItems (){
  
  return(
          <>
            <List>
                  {['Página Inicial', 'Gerenciar', 'Relátorios', 'Sair'].map((text, index) => (
                      <ListItem button key={text} onClick = {() => listI(text)}>
                        <ListItemIcon>{}</ListItemIcon>
                        <ListItemText ext primary={text}>{/*text === 'Gerenciar' ? console.log("Texte"):console.log("Texte2") */}</ListItemText>
                      </ListItem>
                    ))}
            </List>
        )
          </>
  )
}