import * as React from 'react';
import store from '../stores/ImageStore';
import img from '../images/default-car.jpg'

import AddCircleIcon from '@mui/icons-material/AddCircle';

import {
    Card, CardActionArea
} from '@mui/material'

import '../styles/stock.scss'
import actions from '../actions/ImageActions';

export default class StockCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = ({
            ImageName: "",
            ImageBinary: "",

            SaveMessage: "",
            IsSaveSuccessful: false,
            MustDisplayNotification: false
        })
    }

    render() {
        return (
            <>
                <Card className='stock-item'>
                    <div className='card-image'>
                        <div className='add-image-bg'>
                            <AddCircleIcon />
                            <input type='file' accept='.jpg .png .jpeg' onChange={this.handleAddImage.bind(this)} />
                        </div>
                        <img src={img} />
                    </div>
                    <CardActionArea>
                        <div className='card-body'>
                            <div className='card-details'>
                                <ul>
                                    <li><span className='car-price'>R{this.props.record.retailPrice}</span></li>
                                    <li><span className='car-makemodel'>{this.props.record.model}</span></li>
                                    <li><span className='car-model-year'>{this.props.record.modelYear}</span></li>
                                </ul>
                            </div>
                        </div>
                    </CardActionArea>
                </Card>
            </>
        )
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
        const file = e.target.files[0];
        const base64 = await this.convertToBase64(file);

        this.setState({
            ImageName: file.name.split(".")[0],
            ImageBinary: base64
        })
    };

    addImage = () => {
        store.addEventListener("createImage", this.onImageSave.bind(this));

        const image = {
            ["Image.StockItemId"]: this.props.id,
            ["Image.ImageName"]: this.state.ImageName,
			["Image.ImageBinary"]: this.state.ImageBinary
        }

        actions.createImage(image);
    }

    onImageSave = () => {
        store.removeEventListener("createImage");

		this.setState({

			IsSaveSuccessful: store.isSaveSuccessful(),
			SaveMessage: store.getSaveMessage(),
			MustDisplayNotification: true
		});
	}
}