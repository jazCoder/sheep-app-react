import * as React from 'react';
import Pasture from './pasture';
import './css/app.css';
import './css/sheep.css';


export class Root extends React.Component {
    render() {
        return (
            <div>
                <Pasture />
            </div>
        );
    }
}
