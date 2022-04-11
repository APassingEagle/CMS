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
import EditStockModal from './EditStockModal';

export default class ManageStock extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            NewStock: false,

            CurrentPage: 0,
            PageCount: 1,
            SearchText: "",
            Records: []
        }

        this.addNewStockRef = React.createRef();
        this.editStockRef = React.createRef();

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
        store.removeEventListener("fetchStock", this._onLoad);
    }

    render() {
        const content = this.state.Records.length > 0 ? this.renderRecords() : this.renderLoading();

        const onSearchEnter = (e) => {
            if (e.key === 'Enter') {
                store.addEventListener("fetchStock", this._onLoad);
                action.fetchStock({
                    currentPage: this.state.CurrentPage,
                    searchText: this.state.SearchText
                });
            }
        }

        return (
            <>
                <EditStockModal ref={this.editStockRef} onSave={this.onStockSaved.bind(this)} />

                <div className='search-bar'>
                    <FormControl>
                        <TextField label="Search" helperText="'ENTER' to search on Make & Model" className='search-txt' variant="outlined" id='searchInput' onKeyDown={onSearchEnter} onChange={this.onSearchChange.bind(this)} />
                    </FormControl>
                </div>
                <div className='main-stock-container'>
                    <div className='add-stock'>
                        <Button onClick={this.addNewStock.bind(this)} variant="contained" endIcon={<AddIcon />}>
                            Add
                        </Button>
                        <CreateStockModal ref={this.addNewStockRef} onSave={this.onStockSaved.bind(this)} />
                    </div>
                    {content}
                </div>
            </>
        )
    }

    onPageChange = (event, newPage) => {
        store.addEventListener("fetchStock", this._onLoad);

        this.setState({
            CurrentPage: newPage - 1
        })

        if (newPage > (this.state.CurrentPage + 1) || (newPage < this.state.CurrentPage + 1)) {
            action.fetchStock({
                currentPage: newPage - 1,
                searchText: this.state.SearchText,
            });
        }
    }

    renderRecords = () => {
        const stocks = this.state.Records.map((item, index) => {
            return (
                <StockCard record={item} onDelete={this.onStockSaved.bind(this)} onSave={this.onImageSaved.bind(this)} onEditStock={this.editStock.bind(this)} />
            );
        });

        const page = this.state.CurrentPage == 0 ? 1 : this.state.CurrentPage + 1

        return (
            <>
                <div className='stock-list'>
                    {stocks}
                </div>
                <Pagination className='pager' page={page} onChange={this.onPageChange.bind(this)} count={this.state.PageCount} variant="outlined" color="primary" size='large' />
            </>
        )
    }
    renderLoading = () => {
        return (
            <div>Loading...</div>
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

    editStock = (id) => {
        this.editStockRef.current.state.Id = id;
        this.editStockRef.current.showModal();
    }

    onStockSaved = () => {
        store.addEventListener("fetchStock", this._onLoad);

        action.fetchStock({
            currentPage: this.state.CurrentPage,
            searchText: this.state.SearchText,
        });
    };

    onImageSaved = () => {
        store.addEventListener("fetchStock", this._onLoad);
        action.fetchStock({
            currentPage: this.state.CurrentPage,
            searchText: this.state.SearchText,
        });
    }

    _onLoad = () => {
        store.removeEventListener("fetchStock", this._onLoad);

        this.setState({
            Records: store.getRecords(),
            CurrentPage: store.getCurrentPage(),
            SearchText: store.getSearchText(),
            PageCount: store.getPageCount(),
        });

    };
}