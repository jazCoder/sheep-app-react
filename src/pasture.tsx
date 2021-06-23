import * as React from 'react';
import SheepList from './sheepList';
import Sidebar from './sidebar';
import sheepData from './sheepData';
import {SheepInterface} from './interface';

class Pasture extends React.Component<{}, any> {
    state = {
        sheepProfiles: sheepData
    }

    addNewSheep = (newSheep: SheepInterface) => {
        this.setState((prevState: {sheepProfiles: SheepInterface[];}) => ({
            sheepProfiles: [...prevState.sheepProfiles, newSheep],
        }));
    };

    brandSheep = (sheepName: string) => {
        const brandee = this.state.sheepProfiles.findIndex(sheep => sheep.name === sheepName);
        this.setState((prevState: {sheepProfiles: SheepInterface[];}) => ({
            sheepProfiles: [
                ...prevState.sheepProfiles.slice(0,brandee),
                {
                    ...prevState.sheepProfiles[brandee],
                    branded: true,
                },
                ...prevState.sheepProfiles.slice(brandee+1)
            ]
        }));
    }

    render() {
        return (
            <div id="pasture" className="d-flex flex-column-reverse flex-md-row">
                <SheepList profiles={this.state.sheepProfiles}/>
                <Sidebar onSubmitFunction={this.addNewSheep} onBrandFunction={this.brandSheep} profiles={this.state.sheepProfiles} />
            </div>
        )
    }
}

export default Pasture;