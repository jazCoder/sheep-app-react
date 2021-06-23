import * as React from 'react';
import SheepControl from './sheepControl';
import {PastureProps} from './interface';

const Sidebar = (props: PastureProps) => {
    return (
        <div id="sidebar_form" className="col-12 col-md-6 col-lg-3">
            <h1 className="text-center mt-3 mb-4">Shepherd tools</h1>
            <SheepControl onSubmitFunction={props.onSubmitFunction} onBrandFunction={props.onBrandFunction} profiles={props.profiles} />
        </div>
    )
}

export default Sidebar;