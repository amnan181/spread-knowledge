import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

const styles = {
    card: {
        minWidth: 275,
      },
      bullet: {
        display: 'inline',
        margin: '0 2px',
        transform: 'scale(0.8)',
      },
      title: {
        fontSize: 14,
      },
      pos: {
        marginBottom: 12,
      },
}

export default class Proposal extends Component {
    
    render() {
        let { proposal, tutors, tuitions } = this.props;
        console.log("TUTOR====>", tutors);
        tutors = tutors.filter(tutor => proposal.tutorID === tutor._id)

        return (
          <Card style={{ width: '85%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 8 }}>

            <CardContent>
              <h3 style={{textAlign: 'center', marginBottom: 20}}>Id: &nbsp;&nbsp;&nbsp;{proposal._id}</h3>

              <div style={{ margin: 'auto' }}>
                <div className="card-body" style={{ marginTop: -80 }}>
                  <div style={{ width: '100%', maxWidth: 860, margin: 'auto' }}>
                    <Table>
                      <TableBody>
                        <TableRow key={0}>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                        <TableRow key={1}>
                          <TableCell align="left">
                            <b>Tutor</b>
                          </TableCell>
                          <TableCell align="left">{tutors[0].tName}</TableCell>
                        </TableRow>
                        <TableRow key={3}>
                          <TableCell align="left">
                            <b>Tutor Qualificaton</b>
                          </TableCell>
                          <TableCell align="left">{tutors[0].tDegreeL + " of " + tutors[0].tDegreeT}</TableCell>
                        </TableRow>
                        <TableRow key={2}>
                          <TableCell align="left">
                            <b>Tuition ID</b>
                          </TableCell>
                          <TableCell align="left">{proposal.tuitionID}</TableCell>
                        </TableRow>
                        <TableRow key={4}>
                          <TableCell>
                            <b>Fee</b>
                          </TableCell>
                          <TableCell align="left">{proposal.fee}</TableCell>
                        </TableRow>
                        <TableRow key={5}>
                          <TableCell>
                            <b>Description</b>
                          </TableCell>
                          <TableCell align="left">{proposal.description}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )
    }
}
