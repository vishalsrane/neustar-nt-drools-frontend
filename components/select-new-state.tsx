import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { performAction } from '../api/directory-number';

export default function SelectNewState(props) {
  const [age, setAge] = React.useState('');
  const actionNumberToValue = {
    [10]: 'CANCEL-RESERVE',
    [20]: 'ADD-DN-TO-INVENTERY'
  }

  const handleChange = async (event: SelectChangeEvent) => {
      const actionNum : number = Number(event.target.value)
      const actionName = actionNumberToValue[actionNum]
      console.log(actionName)
      await performAction(props.id, actionName)
      console.log(event.target.value)
      props.fetchDirNums()
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small">Action</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={age}
        label="Action"
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>CANCEL-RESERVE</MenuItem>
        <MenuItem value={20}>ADD-DN-TO-INVENTERY</MenuItem>
      </Select>
    </FormControl>
  );
}
