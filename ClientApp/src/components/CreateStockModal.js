import * as React from 'react';
import action from '../actions/StockActions';
import store from '../stores/StockStore';

import {
    Backdrop,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Fade,
    FormControl,
    Grid,
    Modal,
    TextField
} from '@mui/material';

export default class CreateStockModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            ShowModal: false,

            Make: "",
            Model: "",
            ModelYear: "",
            CurrentKilometerReading: "",
            Colour: "",
            VIN: "",
            RetailPrice: "",
            CostPrice: ""
        };

        this.addNewStockRef = React.createRef();
    }

    render() {
        return (
            <Dialog className='add-modal' open={this.state.ShowModal} onClose={this.closeModal.bind(this)}>
                <DialogTitle>
                    Create New Stock Item
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <FormControl>
                                <TextField label="Make" />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl>
                                <TextField label="Model" />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={3}>
                            <FormControl>
                                <TextField label="Model Year" />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl>
                                <TextField label="Current Kilometer Reading" />
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl>
                                <TextField label="Colour" />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <FormControl>
                                <TextField label="VIN" />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <FormControl>
                                <TextField label="Retail Price" />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl>
                                <TextField label="Cost Price" />
                            </FormControl>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions className='dialog-actions'>
                    <Button variant='contained' onClick={this.closeModal.bind(this)}>Cancel</Button>
                    <Button variant='contained' onClick={this.createStock.bind(this)}>Create</Button>
                </DialogActions>
            </Dialog>
        );
    }

    createStock = () => {

        const record = {
            ["Record.Make"]: this.state.Make,
            ["Record.Model"]: this.state.Model,
            ["Record.ModelYear"]: this.state.ModelYear,
            ["Record.CurrentKilometerReading"]: this.state.CurrentKilometerReading,
            ["Record.Colour"]: this.state.Colour,
            ["Record.VIN"]: this.state.VIN,
            ["Record.RetailPrice"]: this.state.RetailPrice,
            ["Record.CostPrice"]: this.state.CostPrice
        };

        action.createStock(record);

        this.closeModal();
    };

    showModal = () => {
        store.addEventListener("createStock", this._onLoad.bind(this));

        this.setState({
            ShowModal: true
        })
    }

    closeModal = () => {
        store.removeEventListener("createStock", this._onRecordSave.bind(this));

        this.setState({
            ShowModal: false
        })
    }

    _onRecordSave = () => {

    }

    _onLoad = () => {

    };
}
