import React from "react";
import {
  Avatar,
  Button,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Input,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  withStyles
} from "@material-ui/core";
import { Item, Boon, Condition, Trait, Profession, CommonEffect } from "gw2-ui";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { changeGeneric, getGeneric } from "../state/gearOptimizerSlice";
import CheckboxComponent from "./baseComponents/CheckboxComponent";

const styles = (theme) => ({
  root: {
    marginBottom: theme.spacing.unit * 2
  },
  formControl: {
    width: 200,
    margin: theme.spacing.unit,
    marginRight: theme.spacing.unit * 3
  },
  formControl2: {
    width: 55,
    margin: theme.spacing.unit
  }
});

const INFUSIONS = [
  37131, // power
  37132, // precision
  37130, // condi
  86113, // expertise
  86180, // concentration
  37125, // healing power
  37135, // toughness
  37136 // vitality
];

const Infusions = ({ classes }) => {
  const dispatch = useDispatch();
  const primaryInfusion = useSelector(getGeneric("primaryInfusion"));
  const secondaryInfusion = useSelector(getGeneric("secondaryInfusion"));
  const primaryMaxInfusions = useSelector(getGeneric("primaryMaxInfusions"));
  const secondaryMaxInfusions = useSelector(getGeneric("secondaryMaxInfusions"));

  const dropdown = (name, varName, infusion) => {
    return (
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor={name}>{name}</InputLabel>
        <Select
          value={typeof infusion === "undefined" ? "" : infusion.toString()}
          input={<Input name={name} id={name} />}
          onChange={(e) =>
            dispatch(changeGeneric({ toChange: varName, value: Number(e.target.value) }))
          }
        >
          <MenuItem value="None">None </MenuItem>
          {INFUSIONS.map((i) => (
            <MenuItem value={i}>
              <Item id={i} disableLink />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };

  const input = (name, varName, maxInfusions) => {
    return (
      <FormControl className={classes.formControl2}>
        <InputLabel htmlFor="input-with-icon-adornment">{name}</InputLabel>
        <Input
          id="input-with-icon-adornment"
          value={maxInfusions}
          onChange={(e) =>
            dispatch(changeGeneric({ toChange: varName, value: Number(e.target.value) }))
          }
        />
      </FormControl>
    );
  };

  return (
    <div className={classes.root}>
      <Typography variant="h5">Stat Infusions</Typography>
      <Grid
        container
        className={classes.grid}
        direction="row"
        justify="flex-start"
        alignItems="center"
      >
        <Grid item xs={2} md={4}>
          <Typography>Primary Infusions</Typography>
        </Grid>
        <Grid item xs={10} md={8}>
          {dropdown("Primary Infusion", "primaryInfusion", primaryInfusion)}
          {input("Max #", "primaryMaxInfusions", primaryMaxInfusions)}
        </Grid>
        <Grid item xs={2} md={4}>
          <Typography>Secondary Infusions</Typography>
        </Grid>
        <Grid item xs={10} md={8}>
          {dropdown("Secondary Infusion", "secondaryInfusion", secondaryInfusion)}
          {input("Max #", "secondaryMaxInfusions", secondaryMaxInfusions)}
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(Infusions);
