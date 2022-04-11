import * as React from 'react';
import store from '../stores/StockStore';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';

import {
    Button,
    Card, CardActionArea, IconButton
} from '@mui/material'

import '../styles/stock.scss'
import actions from '../actions/StockActions';
import EditStockModal from './EditStockModal';

export default class StockCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = ({
            ImageName: "",
            ImageBinary: "",

            StockId: this.props.record.id,

            SaveMessage: "",
            IsSaveSuccessful: false,
            MustDisplayNotification: false
        })

        this.updateItemRef = React.createRef();

    }

    render() {
        const image = this.renderImage();

        return (
            <>
                <EditStockModal ref={this.updateItemRef} id={this.props.record.id} />

                <Card className='stock-item'>
                    <div className='card-image'>
                        <div className='add-image-bg'>
                            <AddCircleIcon />
                            <input type='file' accept='.jpg .png .jpeg' onChange={this.handleAddImage.bind(this)} />
                        </div>
                        {image}
                    </div>
                    <CardActionArea onClick={this.editStock.bind(this)}>
                        <div className='card-body'>
                            <div className='card-details'>
                                <ul className='details-list'>
                                    <li><span className='car-price'>R{this.props.record.costPrice}</span></li>
                                    <li><span className='car-make'>{this.props.record.make}</span></li>
                                    <li><span className='car-makemodel'>{this.props.record.model}</span></li>
                                    <ul>
                                        <li><span className='car-model-year'>{this.props.record.modelYear}</span></li>
                                        <div className='ul-separator'></div>
                                        <li><span className='car-currentk'>{this.props.record.currentKilometerReading} km</span></li>
                                    </ul>
                                </ul>
                            </div>
                        </div>
                    </CardActionArea>
                    <IconButton onClick={this.deleteStock.bind(this)} component="span" className='delete-stock-btn'>
                        <DeleteIcon />
                    </IconButton>
                </Card>
            </>
        )
    }

    renderImage = () => {
        if (this.props.record.stockImages[0] != null) {
            return (
                <img src={this.props.record.stockImages[0].imageBinary} />
            )
        }
        else {
            return (
                <div className='blank-img'><DoNotDisturbIcon /></div>
            )
        }
    }

    deleteStock = () => {
        store.addEventListener("deleteStock", this.onDeleteStock.bind(this))
        actions.deleteStock(this.props.record.id)
    }
    onDeleteStock = () => {
        store.removeEventListener("deleteStock", this.onDeleteStock.bind(this))
        this.props.onDelete();
    }

    editStock = () => {
        this.props.onEditStock(this.props.record.id);
    }

    convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    handleAddImage = async (e) => {
        store.addEventListener("createImage", this.onImageSave.bind(this));

        const file = e.target.files[0];
        const base64 = await this.convertToBase64(file);

        this.setState({
            ImageName: file.name.split(".")[0],
            ImageBinary: base64
        })

        const image = {
            ["Image.StockItemId"]: this.props.record.id,
            ["Image.ImageName"]: this.state.ImageName,
            ["Image.ImageBinary"]: this.state.ImageBinary
        }

        actions.createImage(image);
    };

    onImageSave = () => {
        store.removeEventListener("createImage", this.onImageSave.bind(this));

        this.setState({
            IsSaveSuccessful: store.isSaveSuccessful(),
            MustDisplayNotification: true
        });

        this.props.onSave();
    }
}