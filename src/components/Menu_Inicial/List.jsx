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
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import { makeStyles } from '@material-ui/core/styles';
import BlurOnOutlinedIcon from '@material-ui/icons/BlurOnOutlined';
import DraftsIcon from '@material-ui/icons/Drafts';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function ListItems (){
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  function listI(text) {
    if(text == 'Página Inicial'){
      window.location.replace("http://localhost:3000/pagina_inicial");
    }else if(text == 'Sair'){
      window.location.replace("http://localhost:3000/logout");
    }
    else if(text == 'Gerenciar'){
      window.location.replace("http://localhost:3000/menu_inicial");
    }
    else if(text == 'Relátorios'){
      handleClick();
     // window.location.replace("http://localhost:3000/menu_inicial");
    }
    
  }
  function RelPedidos() {
    
      window.location.replace("http://localhost:3000/pedido/relatorio");
  
    
  }
  return(
          <>
            <List>
                  {['Sair', 'Página Inicial', 'Gerenciar', 'Relátorios'].map((text, index) => (
                      <ListItem button key={text} onClick = {() => listI(text)}>
                        <ListItemIcon>{(index === 0 ? <PowerSettingsNewIcon /> : (index === 1?<KeyboardArrowRightIcon />:(index === 2?<BuildIcon/>:< AssignmentIcon/>)))}</ListItemIcon>
                        <ListItemText ext primary={text}/>
                        {open ? <ExpandMore /> : <ExpandLess/>}
                      </ListItem>
                      
                    ))}
                    <Collapse in={!open} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        <ListItem button className={classes.nested}>
                          <ListItemIcon>
                            <BlurOnOutlinedIcon />
                          </ListItemIcon>
                          <ListItemText primary="Pedidos" onClick = {() => RelPedidos()} />
                          
                        </ListItem>
                      </List>
                    </Collapse>
            </List>
          </>
  )
}