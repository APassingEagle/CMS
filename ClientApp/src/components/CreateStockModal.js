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
                                <TextField label="Make"
                                    name='Make'
                                    onBlur={this.handleTextChange.bind(this)}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl>
                                <TextField label="Model"
                                    name='Model'
                                    onBlur={this.handleTextChange.bind(this)}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={3}>
                            <FormControl>
                                <TextField label="Model Year"
                                    name='ModelYear'
                                    onBlur={this.handleTextChange.bind(this)}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl>
                                <TextField label="Current Kilometer Reading"
                                    name='CurrentKilometerReading'
                                    onBlur={this.handleTextChange.bind(this)}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl>
                                <TextField label="Colour"
                                    name='Colour'
                                    onBlur={this.handleTextChange.bind(this)}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <FormControl>
                                <TextField label="VIN"
                                    name='VIN'
                                    onBlur={this.handleTextChange.bind(this)}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <FormControl>
                                <TextField label="Retail Price"
                                    type='number'
                                    name='RetailPrice'
                                    onBlur={this.handleTextChange.bind(this)}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl>
                                <TextField label="Cost Price"
                                    type='number'
                                    name='CostPrice'
                                    onBlur={this.handleTextChange.bind(this)} />
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

        const stockItem = {
            ["StockItem.Make"]: this.state.Make,
            ["StockItem.Model"]: this.state.Model,
            ["StockItem.ModelYear"]: this.state.ModelYear,
            ["StockItem.CurrentKilometerReading"]: this.state.CurrentKilometerReading,
            ["StockItem.Colour"]: this.state.Colour,
            ["StockItem.VIN"]: this.state.VIN,
            ["StockItem.RetailPrice"]: this.state.RetailPrice,
            ["StockItem.CostPrice"]: this.state.CostPrice
        };

        action.createStock(stockItem);

        // this.closeModal();
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

    handleTextChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    _onRecordSave = () => {

    }

    _onLoad = () => {

    };
}
