import React from "react";
import { Chip, ListItem, Paper, Tooltip } from "@mui/material";

export default class Accessories extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const handleDelete = (id) => () => {
            this.props.onDelete(id);
        };

        return (
            <ul>
                {this.props.accessories.map((accessory) => {
                    return (
                        <Tooltip placement="top" title={accessory.accessoryDescription}>
                            <Chip
                                key={accessory.id}
                                label={accessory.accessoryName}
                                onDelete={handleDelete(accessory.id)}
                                variant='outlined'
                                className="acc-chips"
                            />
                        </Tooltip>
                    );
                })}
            </ul>
        );
    }
}