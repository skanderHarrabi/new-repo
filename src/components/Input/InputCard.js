import React, { useState, useContext } from 'react';
import { Paper, InputBase, Button, IconButton, TextField } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { makeStyles, fade } from '@material-ui/core/styles';
import storeApi from '../../utils/storeApi';
import { DatePicker } from 'antd';
import firebase from '../../utils/firebase';


const useStyle = makeStyles((theme) => ({
  card: {
    width: '280px',
    margin: theme.spacing(0, 1, 1, 1),
    paddingBottom: theme.spacing(4),
  },
  input: {
    margin: theme.spacing(1),
  },
  btnConfirm: {
    background: '#5AAC44',
    color: '#fff',
    '&:hover': {
      background: fade('#5AAC44', 0.75),
    },
  },
  confirm: {
    margin: theme.spacing(0, 1, 1, 1),
  },
}));
export default function InputCard({ setOpen, listId, idBase, type }) {
  const classes = useStyle();
  const { addMoreCard, addMoreList } = useContext(storeApi);
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleOnChange = (e) => {
    setTitle(e.target.value);
  };
  const onChangeDate = (e) => {
    setDueDate(e.target.value);
  }
  const handleBtnConfirm = () => {
    if (type === 'card') {
      addMoreCard(title, dueDate, listId);
      setTitle('');
      setDueDate('');
      setOpen(false);
    } else {
      addMoreList(title);
      setTitle('');
      setOpen(false);
    }
  };

  return (
    <div>
      <div>
        <Paper className={classes.card}>
          <InputBase
            onChange={handleOnChange}
            multiline
            onBlur={() => setOpen(false)}
            fullWidth
            inputProps={{
              className: classes.input,
            }}
            value={title}
            placeholder={
              type === 'card'
                ? 'Enter a title of this card..'
                : 'Enter list title...'
            }
          />
        </Paper>
        {type === 'card' && <TextField
          id="date"
          label="Due Date"
          type="date"
          defaultValue="2017-05-24"
          onChange={onChangeDate}
          inputProps={{
            className: classes.input,
          }}
        />}
      </div>
      <div className={classes.confirm}>
        <Button className={classes.btnConfirm} onClick={handleBtnConfirm}>
          {type === 'card' ? 'Add Card' : 'Add List'}
        </Button>
        <IconButton onClick={() => setOpen(false)}>
          <ClearIcon />
        </IconButton>
      </div>
    </div>
  );
}
