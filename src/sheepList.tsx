import * as React from 'react';
import Sheep from './sheep';
import {SheepProfile} from './interface';

const SheepList = (props: SheepProfile) => (
    <div className="sheep-list flex-wrap d-flex justify-content-center col-12 col-md-6 col-lg-9">
        {props.profiles && props.profiles.map(sheepDetail => {
            return <Sheep {...sheepDetail} key={sheepDetail.name}/>
        })}
    </div>
)

export default SheepList;