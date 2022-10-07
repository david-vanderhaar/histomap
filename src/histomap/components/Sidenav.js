import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import * as Styles from '../../styles';

const useStyles = makeStyles({
  list: {
    width: 500,
  },
  fullList: {
    width: 'auto',
  },
});

export default function TemporaryDrawer(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const ListItemLink = (props) => {
    return <ListItem button style={{ color: '#de6640'}} component="a" {...props} />;
  }

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        <ListItem>
          <h4>About</h4>
        </ListItem>
        <ListItem>
          <ListItemText>
            This is intended generate histomaps similar to John B. Sparks 1931 piece, titled “The Histomap: Four Thousand Years of World History.”
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>
            To simulate an early history I interpret Peter Turchin's model for Cycling in the Complexity of Early Societies.
          </ListItemText>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItemLink href="https://www.worldhistorycharts.com/the-histomap-by-john-sparks/">
          <ListItemText primary="The Histomap by John B. Sparks" />
        </ListItemLink>
        <ListItemLink href="https://escholarship.org/uc/item/5536t55r#page-1">
          <ListItemText primary="Cycling in the Complexity of Early Societies by Peter Turchin" />
        </ListItemLink>
      </List>
      <Divider />
    </div>
  );

  return (
    <div>
      <Button
        disableFocusRipple={true}
        className="btn" 
        style={{
          position: 'absolute',
          borderRadius: 2,
          left: 10,
          top: 10,
          backgroundColor: Styles.themes[props.theme].element_body,
          color: Styles.themes[props.theme].element_text
        }}
        onClick={toggleDrawer('left', true)}
      >
        <MenuIcon />
      </Button>
      <Drawer
        PaperProps={{
          style: {
            backgroundColor: Styles.themes[props.theme].element_body,
            color: Styles.themes[props.theme].element_text
          }
        }}
        open={state.left} 
        onClose={toggleDrawer('left', false)}
      >
        {sideList('left')}
      </Drawer>
    </div>
  );
}