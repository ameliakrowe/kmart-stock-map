import React from 'react';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import Input from '@mui/material/Input';

type SearchRadiusProps = {
    onChange: (newValue: number) => void
    value: number
}

export const SearchRadius = (props: SearchRadiusProps) => {
    const { onChange, value } = props;

    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        onChange(newValue as number);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value === '' ? 0 : Number(event.target.value));
      };

    return (
        <div className="search-radius">
            <Typography id="input-slider" sx={{paddingTop: 1}}>
                Search radius (km):
            </Typography>
            <Slider
                value={value}
                onChange={handleSliderChange}
                min={5}
                max={1000}
                sx={{width: 300, paddingTop: 2.75}}
            />
            <Input
                value={value}
                size="small"
                onChange={handleInputChange}
                inputProps={{
                    step: 10,
                    min: 5,
                    max: 1000,
                    type: 'number'
                }}
            />
        </div>
    )
};