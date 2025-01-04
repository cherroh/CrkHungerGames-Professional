// ChangeCast.tsx generates the forms the user uses to change the default tribute array

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { TributeType } from './tributes';

function ChangeCast({ tributes, setTributes }: { readonly tributes: TributeType[], readonly setTributes: React.Dispatch<React.SetStateAction<TributeType[]>> }) {
    // State that manages the forms
    // It works because the user can only update 1 tribute at a time
    const [tributeForms, setTributeForms] = useState(
        tributes.map((tribute) => ({
            newName: tribute.name,
            newHealth: tribute.health,
            newDamage: tribute.damage,
            newPicture: tribute.picture
        }))
    );

    // Function that handles the change in a tribute's property
    const handleUpdateTribute = (index: number) => {
        return () => {
            const updatedTributes = [...tributes];
            const newHealth = tributeForms[index].newHealth;
            const newDamage = tributeForms[index].newDamage;

            // Check if the new health and damage are not negative or zero
            if (newHealth > 0 && newDamage > 0) {
                updatedTributes[index] = {
                    ...updatedTributes[index],
                    name: tributeForms[index].newName,
                    health: newHealth,
                    damage: newDamage,
                    picture: tributeForms[index].newPicture
                };
                setTributes(updatedTributes);
            } else {
                // If health or damage is negative or zero, do not update the corresponding property
                // Call out the user for doing this
                alert("New Values Rejected - Don't Try To Break The Game, Blud");
            }
        };
    };

    // Function that handles the user's request to change a tribute's property
    const handleInputChange = (index: number, field: string) => {
        return (e: ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            setTributeForms((prevTributeForms) => {
                const newTributeForms = [...prevTributeForms];
                newTributeForms[index] = {
                    ...newTributeForms[index],
                    [field]: value
                };
                return newTributeForms;
            });
        };
    };

    return (
        <div className="theform">
            {/*this mapping generates all 24 forms*/}
            {tributes.map((_tribute, index) => (
                <div key={index} className="form-container">
                    <h1>Tribute #{index + 1}</h1>
                    <form onSubmit={(e: FormEvent<HTMLFormElement>) => {
                        e.preventDefault();
                        handleUpdateTribute(index)();
                    }}>
                        <table className="form-table">
                            <thead>
                                <tr>
                                    <th>Stat</th>
                                    <th>New Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Name:</td>
                                    <td>
                                        <input
                                            type="text"
                                            value={tributeForms[index].newName}
                                            onChange={handleInputChange(index, 'newName')}
                                            placeholder={!tributeForms[index].newName ? 'New Name' : ''}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Health:</td>
                                    <td>
                                        <input
                                            type="number"
                                            value={tributeForms[index].newHealth}
                                            onChange={handleInputChange(index, 'newHealth')}
                                            placeholder={!tributeForms[index].newHealth ? 'New Health' : ''}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Damage:</td>
                                    <td>
                                        <input
                                            type="number"
                                            value={tributeForms[index].newDamage}
                                            onChange={handleInputChange(index, 'newDamage')}
                                            placeholder={!tributeForms[index].newDamage ? 'New Damage' : ''}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Picture URL:</td>
                                    <td>
                                        <input
                                            type="text"
                                            value={tributeForms[index].newPicture}
                                            onChange={handleInputChange(index, 'newPicture')}
                                            placeholder={!tributeForms[index].newPicture ? 'New Picture URL' : ''}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <button type="submit" className="formbutton">Update</button>
                    </form>
                </div>
            ))}
        </div>
    );
}

export default ChangeCast;
