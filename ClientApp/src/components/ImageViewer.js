import * as React from 'react';

import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import SwipeableViews from 'react-swipeable-views';

import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';

export default class ImageViewer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ActiveStep: 0,
            MaxSteps: this.props.images.length
        };
    }

    handleNext = () => {
        this.setState(prevstate => ({ ActiveStep: prevstate.ActiveStep + 1 }))
    };

    handleBack = () => {
        this.setState(prevstate => ({ ActiveStep: prevstate.ActiveStep - 1 }))

    };

    handleStepChange = (step) => {
        this.setState({
            ActiveState: step
        })
    };

    render() {
        const handleDelete = (id) => () => {
            this.props.onDelete(id);
        };

        return (
            <Box>
                <SwipeableViews
                    index={this.state.ActiveStep}
                    onChangeIndex={this.handleStepChange.bind(this)}
                >
                    {this.props.images.map((image, index) => (
                        <div key={image.imageName}>

                            {Math.abs(this.state.ActiveStep - index) <= 2 ? (
                                <div className='img-container'>
                                    <IconButton onClick={handleDelete(image.id)} component="span" className='delete-image-btn'>
                                        <DeleteIcon />
                                    </IconButton>
                                    <Box
                                        component="img"
                                        sx={{
                                            height: 345,
                                            display: 'block',
                                            overflow: 'hidden',
                                            width: '100%',
                                        }}
                                        src={image.imageBinary}
                                        alt={image.imageName}
                                    />
                                </div>
                            ) : null}
                        </div>
                    ))}
                </SwipeableViews>
                <MobileStepper
                    steps={this.state.MaxSteps}
                    position="static"
                    activeStep={this.state.ActiveStep}
                    nextButton={
                        <Button
                            size="small"
                            onClick={this.handleNext.bind(this)}
                            disabled={this.state.ActiveStep === this.state.MaxSteps - 1}
                        >
                            Next
                        </Button>
                    }
                    backButton={
                        <Button size="small"
                            onClick={this.handleBack.bind(this)}
                            disabled={this.state.ActiveStep === 0}
                        >
                            Back
                        </Button>
                    }
                />
            </Box>
        );
    }
}