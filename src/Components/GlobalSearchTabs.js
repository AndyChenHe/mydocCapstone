import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import { useState, useEffect } from 'react';

import Hidden from "@material-ui/core/Hidden";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import GlobalLocation from "./GlobalLocation";

//filter specialty
const filterSpecialtyOptions = createFilterOptions({
  matchFrom: "start",
  stringify: (option) => option.specialty,
});

//filter doctor
const filterDocOptions = createFilterOptions({
  matchFrom: "start",
  stringify: (option) => option.name,
});

//filter hospital
const filterHospOptions = createFilterOptions({
  matchFrom: "start",
  stringify: (option) => option.hospName,
});

//filter condition
const filterConditionOptions = createFilterOptions({
  matchFrom: "start",
  stringify: (option) => option.condition,
});

// specialties options
const specialties = [
  { specialty: "Allergy and Immunology" },
  { specialty: "Anesthesiology" },
  { specialty: "Gastroenterology" },
];
// doctor name options
const docNames = [
  { name: "Alex Leow" },
  { name: "Alex Tan" },
  { name: "Bryan Lee" },
];
// hospital options
const hospNames = [
  { hospName: "Pantai Hospital Kuala Lumpur" },
  { hospName: "Sunway Medical" },
];
// Conditions options
const conditions = [{ condition: "A" }, { condition: "B" }];

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
  //vertical tabs
  verticalTabContainer: {
    [theme.breakpoints.up("md")]: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      display: "flex",
    },
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    color: "#003367",
  },

  search: {
    textTransform: "none",
  },

  // horizontal tabs
  horizontalTabContainer: {
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  },
}));

// for horizontal tabs - screen size < ipad
const StyledTabs = withStyles({
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    "& > div": {
      width: "100%",
      backgroundColor: "#FF8686",
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <div /> }} />);

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    color: "#003367",
    fontSize: "1em",
    "&:focus": {
      opacity: 1,
    },
  },
}))((props) => <Tab disableRipple {...props} />);

// Global search tabs + search by specialty/doc/hosp/condition
// Used in GlobalSearch.js inside the dialog
export default function GlobalSearchTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);



  const handleSearchMethodChange = (event, newValue) => {
    let method = '';
    if(newValue == 0){
      method = 'Specialty';
    } else if (newValue == 1){
      method = 'Doctor';
    } else if (newValue == 2){
      method = 'Hospital';
    } else {
      method = 'Condition';
    }
    setValue(newValue);
    props.getSearchMethod(method);
  };

  const handleSpecialtySearchKeyChange = (event, newValue) => {
    
    if(newValue){
      props.getKeyWords(newValue.specialty);
    }
    
  };

  const handleDoctorSearchKeyChange = (event, newValue) => {
    
    if(newValue){
      console.log(newValue);
      props.getKeyWords(newValue.name);
    }
    
  };

  const handleHospitalSearchKeyChange = (event, newValue) => {
    
    if(newValue){
      console.log(newValue);
      props.getKeyWords(newValue.hospName);
    }
    
  };

  const handleConditionSearchKeyChange = (event, newValue) => {
    
    if(newValue){
      console.log(newValue);
      props.getKeyWords(newValue.condition);
    }
    
  };

  const hadleSearch = ()=>{
    props.handleClose();
    props.startSearch();
  }

  useEffect(() => {
    console.log(props.searchBegin)
    if(props.searchBegin){return props.doMainSearch(props);}
    
  });

  return (
    <div className={classes.verticalTabContainer}>
      {/* vertical search tabs for screen > ipad size */}
      <Hidden smDown>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleSearchMethodChange}
          aria-label="global search tabs"
          className={classes.tabs}
        >
          <Tab style={{ textTransform: "none" }} label="Specialty" />
          <Tab style={{ textTransform: "none" }} label="Doctor" />
          <Tab style={{ textTransform: "none" }} label="Hospital" />
          <Tab style={{ textTransform: "none" }} label="Condition" />
        </Tabs>
      </Hidden>

      {/* horizontal search tabs for screens < ipad size */}
      <Hidden mdUp>
        <div className={classes.HorizontalTabContainer}>
          <StyledTabs
            value={value}
            onChange={handleSearchMethodChange}
            aria-label="search tabs"
            centered
          >
            <StyledTab label="Specialty" style={{ minWidth: 10 }} />
            <StyledTab label="Doctor" style={{ minWidth: 10 }} />
            <StyledTab label="Hospital" style={{ minWidth: 10 }} />
            <StyledTab label="Condition" style={{ minWidth: 10 }} />
          </StyledTabs>
        </div>
      </Hidden>

      {/* autocomplete: search by specialty */}
      <TabPanel value={value} index={0} style={{ width: "100%" }}>
        <Autocomplete
          options={specialties}
          onChange = {handleSpecialtySearchKeyChange}
          getOptionLabel={(option) => option.specialty}
          filterOptions={filterSpecialtyOptions}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search by specialty"
              variant="outlined"
            />
          )}
        />
        <br></br>
        <GlobalLocation />
        <br></br>
        <Button
          onClick = {hadleSearch}
          variant="contained"
          color="secondary"
          size="md"
          className={classes.search}
          startIcon={<SearchIcon />}
          fullWidth
        >
          Search
        </Button>
      </TabPanel>

      {/* autocomplete: search by doctor's name */}
      <TabPanel value={value} index={1} style={{ width: "100%" }}>
        <Autocomplete
          onChange = {handleDoctorSearchKeyChange}
          options={docNames}
          getOptionLabel={(option) => option.name}
          filterOptions={filterDocOptions}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search by doctor's name"
              variant="outlined"
            />
          )}
        />
        <br></br>
        <GlobalLocation />
        <br></br>
        <Button
          onClick = {hadleSearch}
          variant="contained"
          color="secondary"
          size="md"
          className={classes.search}
          startIcon={<SearchIcon />}
          fullWidth
        >
          Search
        </Button>
      </TabPanel>

      {/* autocomplete: search by hospital's name */}
      <TabPanel value={value} index={2} style={{ width: "100%" }}>
        <Autocomplete
          onChange = {handleHospitalSearchKeyChange}
          options={hospNames}
          getOptionLabel={(option) => option.hospName}
          filterOptions={filterHospOptions}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search by hospital's name"
              variant="outlined"
            />
          )}
        />
        <br></br>
        <GlobalLocation />
        <br></br>
        <Button
          onClick = {hadleSearch}
          variant="contained"
          color="secondary"
          size="md"
          className={classes.search}
          startIcon={<SearchIcon />}
          fullWidth
        >
          Search
        </Button>
      </TabPanel>

      {/* autocomplete: search by condition */}
      <TabPanel value={value} index={3} style={{ width: "100%" }}>
        <Autocomplete
          onChange = {handleConditionSearchKeyChange}
          options={conditions}
          getOptionLabel={(option) => option.condition}
          filterOptions={filterConditionOptions}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search by medical condition"
              variant="outlined"
            />
          )}
        />
        <br></br>
        <GlobalLocation />
        <br></br>
        <Button
        onClick = {hadleSearch}
          variant="contained"
          color="secondary"
          size="md"
          className={classes.search}
          startIcon={<SearchIcon />}
          fullWidth
        >
          Search
        </Button>
      </TabPanel>
    </div>
  );
}
