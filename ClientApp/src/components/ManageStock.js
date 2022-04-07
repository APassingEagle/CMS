import * as React from 'react';
import action from '../actions/StockActions';
import store from '../stores/StockStore';
import StockCard from './StockCard';

import {
    Backdrop,
    Button,
    Fade,
    FormControl,
    Modal,
    Pagination,
    TextField
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import CreateStockModal from './CreateStockModal';

export default class ManageStock extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            CurrentPage: 0,
            PageCount: 1,
            SearchText: "",
            Records: []
        }

        this.addNewStockRef = React.createRef();

        this._onLoad = this._onLoad.bind(this);
    }

    componentDidMount() {
        store.addEventListener("fetchStock", this._onLoad);

        action.fetchStock({
            currentPage: this.state.CurrentPage,
            searchText: this.state.SearchText,
        });
    }

    componentWillUnmount() {
        store.removeChangeListener(this._onLoad);
    }

    render() {
        const stocks = this.state.Records.map((item, index) => {
            return (
                <StockCard record={item} />
            );
        });

        return (
            <>
                <div className='search-bar'>
                    <FormControl>
                        <TextField label="Search" variant="outlined" id='searchInput' onChange={this.onSearchChange.bind(this)} />
                    </FormControl>
                </div>
                <div className='main-stock-container'>
                    <div className='add-stock'>
                        <Button onClick={this.addNewStock.bind(this)} variant="contained" endIcon={<AddIcon />}>
                            Add
                        </Button>
                        <CreateStockModal ref={this.addNewStockRef} />
                    </div>
                    <div className='stock-list'>
                        {stocks}
                    </div>

                    <Pagination className='pager' count={5} variant="outlined" color="primary" size='large' />
                </div>
            </>
        )
    }

    onSearchChange = (e) => {
        this.setState({
            SearchText: e.target.value
        });
    };

    addNewStock = () => {
        this.addNewStockRef.current.showModal();
    }

    _onLoad = () => {
        this.setState({
            Records: store.getRecords(),
            CurrentPage: store.getCurrentPage(),
            SearchText: store.getSearchText(),
            PageCount: store.getPageCount(),
        });

    };
}