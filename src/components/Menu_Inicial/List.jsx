import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';

function listI(text) {
  if(text == 'Página Inicial'){
    //window.location.replace("http://localhost:3000/teste");

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
                        <ListItemIcon>{}</ListItemIcon>
                        <ListItemText ext primary={text}>{/*text === 'Gerenciar' ? console.log("Texte"):console.log("Texte2") */}</ListItemText>
                      </ListItem>
                    ))}
            </List>
          </>
  )
}