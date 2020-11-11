import { useContext, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Tabs, Tab, Paper } from '@material-ui/core';
import { FaceSharp } from '@material-ui/icons';
import { DataContext } from "../../store/DataProvider";
import { NavLink } from "react-router-dom";


//Esta barra de navegación fue un Copy-Paste de la documentación de Material-UI, no es necesario entenderla.
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },
}));

export default function Navbar() {
  const { data } = useContext(DataContext)
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <Paper square className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        indicatorColor="secondary"
        textColor="secondary"
        allowScrollButtonsMobile
        aria-label="scrollable force tabs icon"
      >
        <Tab
          label="Alumnos"
          icon={<FaceSharp style={{ fontSize: '2rem', lineHeight: '1.5rem' }} />}
          component={NavLink}
          to="/"
        />

        {
          data.map((e, index) =>
            <Tab
              key={index}
              label={e.topic}
              icon={<span style={{ fontSize: '2rem', fontWeight: 'bold', lineHeight: '1.5rem' }}>{index + 1}</span>}
              component={NavLink}
              to={`/${index}`}
            />
          )
        }

      </Tabs>
    </Paper>
  );
}