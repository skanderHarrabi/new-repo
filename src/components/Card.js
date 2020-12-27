import React from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Draggable } from 'react-beautiful-dnd';
import moment from 'moment';
import classNames from 'classnames';
import './card.css';

const useStyle = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(1, 1, 1, 2),
    margin: theme.spacing(1),

  },
  red: {
    backgroundColor: 'red',
    color: 'white',

  },
  green: {
    backgroundColor: 'green',
    color: 'white',

  }
}));
export default function Card({ card, index, listTitle }) {

  // const style = () => {
  //   if (moment().isAfter(moment(card.dueDate).format()) && listTitle == 'Done') return classes.green;
  //   else if (moment().isAfter(moment(card.dueDate).format()) && listTitle != 'Done') classes.red;

  // };

  const classes = useStyle();
  console.log('dateeeee', moment().isAfter(moment(card.dueDate).format()), moment(card.dueDate).format(), listTitle)
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <Paper className={classes.card}>
            <div className={classNames((moment().isBefore(moment(card.dueDate).format()) && listTitle == 'Done') ? 'green' : null,
              (moment().isAfter(moment(card.dueDate).format()) && listTitle != 'Done') ? 'red' : null)}>{card.title}</div>
            <div> {moment(card.dueDate).format('MMMM Do YYYY')}</div>
          </Paper>
        </div>
      )
      }
    </Draggable>
  );
}
