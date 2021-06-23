import * as React from 'react';
import {SheepInterface} from './interface';

class Sheep extends React.Component<SheepInterface> {
     
    render() {
        const sheepDetail: SheepInterface = this.props;
        
        function getSheepColor(sheepDetail: SheepInterface) {
            return (sheepDetail.branded) ? '#316b3c' : (sheepDetail.gender == 'male' ? '#d1edf2' : '#fadadd');
        }

        function getSheepTextColor(sheepDetail: SheepInterface) {
            return (sheepDetail.branded) ? '#fff' : '#212529';
        }
        
        return (
            <div className="sheepWrapper d-flex flex-column justify-content-center col-12 col-sm-6 col-lg-3 my-3">
                <div className="sheep-text" style={{background: getSheepColor(sheepDetail), color: getSheepTextColor(sheepDetail)}}>
                    <p>{sheepDetail.name}</p>      
                </div>

                <div className="sheep">
                    <div className="leg left"></div>
                    <div className="leg right"></div>
                    <div className="fluff topleft" style={{background: getSheepColor(sheepDetail)}}></div>
                    <div className="fluff topright" style={{background: getSheepColor(sheepDetail)}}></div>
                    <div className="fluff left" style={{background: getSheepColor(sheepDetail)}}></div>
                    <div className="fluff right" style={{background: getSheepColor(sheepDetail)}}></div>
                    <div className="head">
                        <div className="eye left"></div>
                        <div className="eye right"></div>
                    </div>
                </div>
            </div>       
        );
    }   
}

export default Sheep;


