import * as React from 'react';
import {PastureProps} from './interface';

class SheepControl extends React.Component<PastureProps> {
    state = {
        sheepNameInput: '',
        sheepGender: 'female',
        male: '',
        female: '',
        brandee: '',
        breedingResultMessage: '',
        breedingResultError: '',
        creationResultError: '',
        breedingSuccess: false,
        offspringName: '',
        offspringGender: ''
    };

    private genders: string[] = ['female', 'male'];
    private newSheep: Object = {};

    coinToss = () => (Math.random()<.5);

    chosenNameExists = (chosenName: string) => {
        return this.props.profiles.some(sheep => (sheep.name == chosenName));
    }

    handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        this.newSheep = {
            name: this.state.sheepNameInput,
            gender: this.state.sheepGender,
        }

        if (this.chosenNameExists(this.state.sheepNameInput)) {
            this.setState(() => ({sheepNameInput: ''}));
            this.setState(() => ({creationResultError: `I'm sorry, that name is taken - how are we going to tell them apart...?`}));
            
        } else {
            this.props.onSubmitFunction(this.newSheep); 
            this.setState(() => ({sheepNameInput: ''}));
            this.setState(() => ({creationResultError: ''}));  
        }
    };

    handleBreeding = (e: React.FormEvent) => {
        e.preventDefault();  
        const success = this.coinToss();  
        const isMale = this.coinToss();
        this.setState(() => ({offspringGender:  (isMale) ? 'male' : 'female'}));
        const boyGirl = (isMale) ? 'boy' : 'girl';
        
        const breedingMessage = (success) ? `Yay, it's a ${boyGirl}!` : 'So sorry, no patter of tiny hooves this time...';
        this.setState(() => ({breedingResultMessage: breedingMessage}));
        this.setState(() => ({breedingSuccess: success}));
        this.setState(() => ({male: ''}));
        this.setState(() => ({female: ''}));
    }

    handleBreedingSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (this.state.breedingSuccess) {
            this.newSheep = {
                name: this.state.offspringName,
                gender: this.state.offspringGender
            }
           
            if (this.chosenNameExists(this.state.offspringName)) {
                this.setState(() => ({offspringName: ''}));
                this.setState(() => ({breedingResultError: `I'm sorry, that name is taken - how are we going to tell them apart...?`}));
            } else {
                this.props.onSubmitFunction(this.newSheep);
                this.setState(() => ({breedingResultMessage: ''}));
                this.setState(() => ({breedingResultError: ''}));
                this.setState(() => ({breedingSuccess: false}));
                this.setState(() => ({offspringName: ''}));
            }     
        }
    }

    handleBranding = (e: React.FormEvent) => {
        e.preventDefault();
        this.props.onBrandFunction(this.state.brandee);
        this.setState(() => ({brandee: ''}));        
    }

    render() {
        return (
            <div className="sheep-control-forms">
                <form className="sheep-form create-sheep" onSubmit={this.handleSubmit} >
                    <h4>Create a sheep</h4>
                    <h4 className="creation-error" style={{color: 'red', fontSize: '1rem'}}>{this.state.creationResultError}</h4>                
                        <input 
                            type="text" 
                            value={this.state.sheepNameInput} 
                            onChange={e => this.setState({sheepNameInput: e.target.value}) }
                            placeholder="Sheep Name" 
                            id="sheep_name" 
                            required
                        />                
                    <label htmlFor="sheep_gender" className="d-flex flex-column">
                        Select Gender:
                        <div className="select-wrapper">
                            <div className="dd-arrow"></div>
                            <select 
                                id="sheep_gender" 
                                value={this.state.sheepGender}
                                onChange={e => this.setState({sheepGender: e.target.value})}
                                required
                            >
                            {
                                this.genders.map(gender => (
                                    <option value={gender} key={gender}>{gender}</option>
                                )) 
                            }
                            </select>
                        </div>
                    </label> 
                    <button>Submit</button>
                </form>

                <form className="sheep-form brand-sheep" onSubmit={this.handleBranding}>
                    <h4>Brand a sheep</h4>
                    <div className="select-wrapper">
                        <div className="dd-arrow"></div>
                        <select
                            id="allSheep"
                            value={this.state.brandee}
                            onChange={e => this.setState({brandee: e.target.value})}
                            required
                        >
                            <option value="" disabled>Select a sheep</option>
                            {
                                this.props.profiles
                                .filter(sheep => (!sheep.branded))
                                .map(sheep => (
                                    <option value={sheep.name} key={sheep.name}>{sheep.name}</option>
                                ))
                            }
                        </select>  
                    </div>                
                    <button>Brand</button>
                </form>

                <form className="sheep-form breed-sheep" onSubmit={this.handleBreeding}>
                    <h4>Choose a breeding pair</h4>
                    <div className="select-wrapper">
                        <div className="dd-arrow"></div>
                        <select 
                            id="ewes" 
                            value={this.state.female}
                            onChange={e => this.setState({female: e.target.value})}
                            required
                        >
                            <option value="" disabled>Select Ewe</option>
                            {
                                this.props.profiles
                                .filter(sheep => (sheep.gender === 'female'))
                                .filter(sheep => (!sheep.branded))
                                .map(sheep => (
                                    <option value={sheep.name} key={sheep.name}>{sheep.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="select-wrapper">
                        <div className="dd-arrow"></div>
                        <select 
                            id="rams" 
                            value={this.state.male}
                            onChange={e => this.setState({male: e.target.value})}
                            required
                        >
                            <option value="" disabled>Select Ram</option>
                            {
                                this.props.profiles
                                .filter(sheep => (sheep.gender === 'male'))
                                .filter(sheep => (!sheep.branded))
                                .map(sheep => (
                                    <option value={sheep.name} key={sheep.name}>{sheep.name}</option>
                                )) 
                            }
                        </select>
                    </div>
                    <button>Breed</button>
                </form>

                <form className="offspring-name d-flex flex-column" onSubmit={this.handleBreedingSubmit}>
                    <h4 className="breeding-message" style={{fontSize: '1rem'}}>{this.state.breedingResultMessage}</h4>
                    <h4 className="breeding-error" style={{color: 'red', fontSize: '1rem'}}>{this.state.breedingResultError}</h4>
                    <div style={{display: (this.state.breedingSuccess) ? 'flex' : 'none'}} className="flex-column">
                        <label htmlFor="offspring_name" className="d-flex flex-column">
                            <input 
                                type="text" 
                                value={this.state.offspringName} 
                                onChange={e => this.setState({offspringName: e.target.value}) }
                                placeholder="Offspring name" 
                                id="offspring_name" 
                                required
                            />
                        </label>   
                        <button>Submit</button> 
                    </div>    
                </form>
            </div>
        );
    }
}

export default SheepControl;