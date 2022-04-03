import * as React from 'react';
import store from '../stores/StockStore';
import img from '../images/default-car.jpg'

import {
    Card, CardActionArea, CardMedia
} from '@mui/material'

import '../styles/stock.scss'

export default class StockCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <Card className='stock-item'>
                    <CardActionArea>
                        <div className='card-body'>
                            <div className='card-image'>
                                <img src={img} />
                            </div>

                            <div className='card-details'>
                                <ul>
                                    <li><span className='car-price'>R509 900</span></li>
                                    <li><span className='car-makemodel'>Audi H-1 2.5CRDi Elite</span></li>
                                    <li><span className='car-model-year'>2019</span></li>
                                </ul>
                            </div>
                        </div>
                    </CardActionArea>
                </Card>
            </>
        )
    }
}