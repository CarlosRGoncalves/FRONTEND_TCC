import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import MailIcon from '@material-ui/icons/Mail';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import BuildIcon from '@material-ui/icons/Build';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
function listI(text) {
  if(text == 'Página Inicial'){
    window.location.replace("http://localhost:3000/pagina_inicial");
  }else if(text == 'Sair'){
    window.location.replace("http://localhost:3000/logout");
  }
  else if(text == 'Gerenciar'){
    window.location.replace("http://localhost:3000/menu_inicial");
  }
  
}
export default function ListItems (){
  
  return(
          <>
            <List>
                  {['Página Inicial', 'Gerenciar', 'Relátorios', 'Sair'].map((text, index) => (
                      <ListItem button key={text} onClick = {() => listI(text)}>
                        <ListItemIcon>{(index === 0 ? <KeyboardArrowRightIcon /> : (index === 1?<BuildIcon />:(index === 2?<AssignmentIcon/>:<PowerSettingsNewIcon/>)))}</ListItemIcon>
                        <ListItemText ext primary={text}>{/*text === 'Gerenciar' ? console.log("Texte"):console.log("Texte2") */}</ListItemText>
                      </ListItem>
                    ))}
            </List>
          </>
  )
}