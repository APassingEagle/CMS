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
            IsSaveSuccessful: false,

            Make: "",
            Model: "",
            ModelYear: 0,
            CurrentKilometerReading: 0,
            Colour: "",
            VIN: "",
            RetailPrice: 0,
            CostPrice: 0
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
                                    name='RetailPrice'
                                    value={this.state.RetailPrice}
                                    onChange={this.onNumberChange.bind(this)}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl>
                                <TextField label="Cost Price"
                                    name='CostPrice'
                                    value={this.state.CostPrice}
                                    onChange={this.onNumberChange.bind(this)} />
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
    };

    showModal = () => {
        store.addEventListener("createStock", this._onRecordSave.bind(this));

        this.setState({
            ShowModal: true
        })
    }

    closeModal = () => {
        store.removeEventListener("createStock", this._onRecordSave.bind(this));

		this.props.onSave(this.state.IsSaveSuccessful);

        this.setState({
            ShowModal: false
        })
    }

    onNumberChange = (e) => {
		const reg = /^[0-9,]{1,100}$/

		if (e.target.value === '' || reg.test(e.target.value)) {
			this.setState({
				[e.target.name]: e.target.value,
			});
		}
		else {
			e.preventDefault();
		}
		
	}

    handleTextChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    _onRecordSave = () => {
		this.setState({
			IsSaveSuccessful: store.isSaveSuccessful(),

            Make: "",
            Model: "",
            ModelYear: 0,
            CurrentKilometerReading: 0,
            Colour: "",
            VIN: "",
            RetailPrice: 0,
            CostPrice: 0
		});

        this.closeModal();
	}
}
