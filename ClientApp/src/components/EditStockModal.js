import * as React from 'react';
import action from '../actions/StockActions';
import store from '../stores/StockStore';

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    FormControl,
    Grid,
    Popover,
    TextField
} from '@mui/material';

import ImageViewer from './ImageViewer';
import Accessories from './Accessories';

export default class EditStockModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            ShowModal: false,
            IsSaveSuccessful: false,

            Id: '',
            Make: '',
            Model: '',
            ModelYear: 0,
            CurrentKilometerReading: 0,
            Colour: '',
            Vin: '',
            RetailPrice: 0,
            CostPrice: 0,

            Images: [],
            Accessories: [],

            AccAncor: null,
            AccName: '',
            AccDescription: ''
        };

        this.updateStockRef = React.createRef();
        this._onLoad = this._onLoad.bind(this);
    }

    render() {
        const open = Boolean(this.state.AccAncor);
        const images = this.state.Images.length !== 0 ? this.renderImages() : this.renderNoImages();

        const retailPrice = this.state.RetailPrice ? this.state.RetailPrice.toString().replace(".", ",") : 0;
        const costPrice = this.state.CostPrice ? this.state.CostPrice.toString().replace(".", ",") : 0;

        return (

            <Dialog className='add-modal' open={this.state.ShowModal} onClose={this.closeModal.bind(this)}>
                <div className='edit-img-header'>
                    {images}
                </div>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <FormControl>
                                <TextField label="Make"
                                    name='Make'
                                    defaultValue={this.state.Make}
                                    onBlur={this.handleTextChange.bind(this)}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl>
                                <TextField label="Model"
                                    name='Model'
                                    defaultValue={this.state.Model}
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
                                    type='number'
                                    defaultValue={this.state.ModelYear}
                                    onBlur={this.handleTextChange.bind(this)}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl>
                                <TextField label="Current Kilometer Reading"
                                    name='CurrentKilometerReading'
                                    type='number'
                                    defaultValue={this.state.CurrentKilometerReading}
                                    onBlur={this.handleTextChange.bind(this)}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl>
                                <TextField label="Colour"
                                    name='Colour'
                                    defaultValue={this.state.Colour}
                                    onBlur={this.handleTextChange.bind(this)}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <FormControl>
                                <TextField label="VIN"
                                    name='Vin'
                                    defaultValue={this.state.Vin}
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
                    <div className='acc-divider'></div>
                    <div className='accessories-list'>
                        <Button variant='outlined' onClick={this.onAccessoryCreate.bind(this)}>Add Accessory</Button>
                        <Popover
                            onClose={this.onAccessoryClose.bind(this)}
                            open={open}
                            anchorEl={this.state.AccAncor}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                        >
                            <div className='acc-popover'>
                                <FormControl>
                                    <TextField label="Name"
                                        name='AccName'
                                        onBlur={this.handleTextChange.bind(this)} />
                                </FormControl>
                                <FormControl>
                                    <TextField label="Description"
                                        name='AccDescription'
                                        onBlur={this.handleTextChange.bind(this)} />
                                </FormControl>
                                <Button size='small' variant='contained' onClick={this.createAccessory.bind(this)}>Save</Button>
                            </div>
                        </Popover>
                        <Accessories accessories={this.state.Accessories} onDelete={this.onAccessoryDelete.bind(this)} />
                    </div>
                </DialogContent>
                <DialogActions className='dialog-actions'>
                    <Button variant='contained' onClick={this.closeModal.bind(this)}>Cancel</Button>
                    <Button variant='contained' onClick={this.update.bind(this)}>Update</Button>
                </DialogActions>
            </Dialog>
        );
    }

    onAccessoryCreate = (e) => {
        this.setState({
            AccAncor: e.currentTarget
        })
    }

    onAccessoryClose = () => {
        store.removeEventListener("viewStock", this._onLoad);

        this.setState({
            AccAncor: null,
            AccName: '',
            AccDescription: ''
        })

        store.addEventListener("viewStock", this._onLoad);

        action.viewStock(this.state.Id);
    }

    createAccessory = () => {
        store.addEventListener("createAccessory", this.onAccessoryClose.bind(this));

        const accessory = {
            ["StockAccessory.StockItemId"]: this.state.Id,
            ["StockAccessory.AccessoryName"]: this.state.AccName,
            ["StockAccessory.AccessoryDescription"]: this.state.AccDescription
        }

        action.createAccessory(accessory);
    }

    onAccessoryDelete = (id) => {
        store.addEventListener("deleteAccessory", this.showModal);

        action.deleteAccessory(id);
    }

    renderImages = () => {
        return (
            <ImageViewer onDelete={this.onImageDelete.bind(this)} images={this.state.Images} />
        )
    }
    renderNoImages = () => {
        return (
            <div className='no-images'>No Images have been added to this stock item</div>
        )
    }

    onImageDelete = (id) => {
        store.addEventListener("deleteImage", this.showModal);

        action.deleteImage(id);
    }

    showModal = () => {
        store.addEventListener("viewStock", this._onLoad);

        action.viewStock(this.state.Id);
    }

    closeModal = () => {
        store.removeEventListener("viewStock", this._onLoad);

        this.setState({
            ShowModal: false
        })
    }

    update = () => {
        store.addEventListener("updateStock", this.updatedStock.bind(this));

        const record = {
            ["StockItem.Id"]: this.state.Id,
            ["StockItem.Make"]: this.state.Make,
            ["StockItem.Model"]: this.state.Model,
            ["StockItem.ModelYear"]: this.state.ModelYear,
            ["StockItem.CurrentKilometerReading"]: this.state.CurrentKilometerReading,
            ["StockItem.Colour"]: this.state.Colour,
            ["StockItem.Vin"]: this.state.Vin,
            ["StockItem.RetailPrice"]: this.state.RetailPrice,
            ["StockItem.CostPrice"]: this.state.CostPrice,
        }
        action.updateStock(record);
    }

    updatedStock = () => {
        this.setState({
            IsSaveSuccessful: store.isSaveSuccessful(),
            ShowModal: false
        });

        this.props.onSave();
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

    _onLoad = () => {
        store.removeEventListener("deleteAccessory", this._onLoad);

        const record = store.getRecord();

        const retailPrice = record.retailPrice ? record.retailPrice.toString().replace(".", ",") : 0;
        const costPrice = record.costPrice ? record.costPrice.toString().replace(".", ",") : 0;

        this.setState({
            Make: record.make,
            Model: record.model,
            ModelYear: record.modelYear,
            CurrentKilometerReading: record.currentKilometerReading,
            Colour: record.colour,
            Vin: record.vin,
            RetailPrice: retailPrice,
            CostPrice: costPrice,

            Images: record.stockImages,
            Accessories: record.stockAccessories,

            ShowModal: true
        });

    };
}
