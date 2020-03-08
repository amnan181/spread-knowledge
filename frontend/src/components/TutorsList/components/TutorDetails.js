import React from "react";
import { makeStyles } from "@material-ui/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

const useStyles = makeStyles(theme => ({
  typright: {
    marginTop: 50
  },
  root: {
    width: "100%",
    overflowX: "auto"
  },
  table: {
    width: "100%"
  }
}));


export default function SimpleTable(props) {
  const classes = useStyles();
  const tutor = props.tutor;
  return (
    <div className={classes.root}>
      <Table className={classes.table}>
        <TableBody>
          <TableRow key={1}>
            <TableCell align="left">
              <b>Subjects</b>
            </TableCell>
            <TableCell align="left">{tutor.subject1+ ", " + tutor.subject2 + ", " + tutor.subject3}</TableCell>
          </TableRow>
          <TableRow key={2}>
            <TableCell>
              <b>Degree to Taught</b>
            </TableCell>
            <TableCell align="left">{tutor.wttDegreeL + " of " + tutor.wttDegreeT}</TableCell>
          </TableRow>
          <TableRow key={3}>
            <TableCell>
              <b>Experience</b>
            </TableCell>
            <TableCell align="left">{tutor.eDegreeL + " of " + tutor.eDegreeT}</TableCell>
          </TableRow>
          <TableRow key={4}>
            <TableCell>
              <b>Contact</b>
            </TableCell>
            <TableCell align="left">{ tutor.tPhone+", " + tutor.tEmail }</TableCell>
          </TableRow>
          <TableRow key={5}>
            <TableCell>
              <b>Fee Range</b>
            </TableCell>
            <TableCell align="left">Rs. { tutor.fFrom +" - " + tutor.fTo}</TableCell>
          </TableRow>
          <TableRow key={6}>
          <TableCell>
              <b>Gender</b>
            </TableCell>
            <TableCell align="left">{ tutor.tGender == "male" ? "Male" : "Female" }</TableCell>
          </TableRow>
          <TableRow key={7}>
          <TableCell>
              <b>Address</b>
            </TableCell>
            <TableCell align="left">{tutor.tAddress}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}