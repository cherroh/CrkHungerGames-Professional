// bloodbath.tsx contains the logic and events for the simulation

import React, { useState } from 'react';
import './App.css';
import { TributeType } from './tributes';

interface ReapingProps {
    tributes: TributeType[]; // Define the type for the tributes array
}

function Bloodbath({ tributes }: ReapingProps): React.ReactElement {
    const [tributeArray, setTributeArray] = useState(tributes); // Initialize state for tribute array
    const [simulationReady, setSimulationReady] = useState(true); // Initialize state for simulation readiness
    const [output, setOutput] = useState<{ Tribute1: string; Tribute2: string; result: React.ReactNode; }[]>([]); // Initialize state for simulation output

    function beginSimulation() {
        setSimulationReady(false); // Set simulation readiness state to false
        let actions = 0;
        let daysCounter = 1; // Initialize the days counter outside the loop
        let time = "Day";

        // This is the main game loop, continue game until only one tribute is the winner
        while (tributeArray.length > 2) { // Loop until only one tribute remains in the array
            if (actions % 120 === 0 && tributeArray.length > 4) { // Check if it's the 7th day
                feast(actions); // Call feast function on every 7th day
            }
            if (actions % 20 === 0 && tributeArray.length > 2) { // Check if it's the 7th day
                if (actions > 0) {
                    if (time === "Night") { // Check if it's night to increment days
                        daysCounter++;
                    }
                    if (time === "Day") {
                        time = "Night";
                    } else {
                        time = "Day";
                    }
                }
                displayDay(daysCounter, time);
            }
            if (tributeArray.length > 1 && tributeArray.length > 2) {
                selectEvent(time); // Perform a simulation step
                actions++; // Increment the days counter
            }
        }

        // Manage the final duel
        time = "Finale";
        displayDay(daysCounter, time);
        while (tributeArray.length > 1) {
            selectEvent(time);
        }

    }

    // displayDay prints the day and time during the simulation
    function displayDay(daysCounter: number, time: string) {
        // Define the output state and setter function using useState hook

        let result: React.ReactNode;
        if (time === "Day" || time === "Night") {
            result = (
                <div className="feastlabel">
                    {time} {daysCounter}
                </div>
            );
        } else if (time === "Finale") {
            result = (
                <div className="feastlabel">
                    The Final Showdown Begins!
                </div>
            );
        } else {
            alert("the website broke");
            window.location.reload();
        }

        // Update the output state with the new result
        setOutput(prevResults => [
            ...prevResults,
            {
                Tribute1: "empty",
                Tribute2: "empty",
                result: result
            }
        ]);
    }

    // Determine which event is used based on a variety of factors
    function selectEvent(time: string) {
        const randomProbability = Math.random(); // Generate a random number between 0 and 1
        if (time === "Day") {
            if (randomProbability < 0.3) {
                duel(); // 30% chance
            } else if (randomProbability < 0.4) {
                grabWeapon(); // 10% chance
            } else if (randomProbability < 0.5) {
                grabSupplies(); // 10% chance
            } else if (randomProbability < 0.6) {
                taunt(); // 10% chance
            } else if (randomProbability < 0.8) {
                selfEliminate(); // 20% chance
            } else if (randomProbability < 0.9) {
                steal(); // 10% chance
            } else if (randomProbability < 1) {
                goofOff(); // 10% chance
            } else {
                alert("the website broke");
                window.location.reload();
            }
        }
        if (time === "Night") {
            if (randomProbability < 0.25) {
                duel(); // 25% chance
            } else if (randomProbability < 0.3) {
                grabWeapon(); // 5% chance
            } else if (randomProbability < 0.35) {
                grabSupplies(); // 5% chance
            } else if (randomProbability < 0.45) {
                taunt(); // 10% chance
            } else if (randomProbability < 0.6) {
                selfEliminate(); // 15% chance
            } else if (randomProbability < 0.8) {
                steal(); // 20% chance
            } else if (randomProbability < 1) {
                sleep(); // 10% chance
            } else {
                alert("the website broke");
                window.location.reload();
            }
        }
        if (time === "Finale") {
            if (randomProbability < 0.70) {
                duelShowdown(); // 70% chance
            } else if (randomProbability < 0.85) {
                grabWeapon(); // 15% chance
            } else if (randomProbability < 1) {
                taunt(); // 15% chance
            } else {
                alert("the website broke");
                window.location.reload();
            }
        }

    }

    function sleep() {
        // Array of possible sleep events
        const events = [
            "has a nightmare",
            "sleeps well",
            "dreams about their family",
            "is fast asleep"
        ];

        const randomEventIndex = Math.floor(Math.random() * events.length); // Randomly select an event index
        const randomEvent = events[randomEventIndex]; // Get the selected event

        const randomIndexTribute1 = Math.floor(Math.random() * tributeArray.length); // Get a random index for the tribute to goof off
        const randomTribute1 = tributeArray[randomIndexTribute1]; // Get the goofing off tribute

        let result: React.ReactNode = (
            <>
                <strong>{randomTribute1.name}</strong> {randomEvent}
            </>
        );

        setOutput(prevResults => [ // Update simulation output with the event result
            ...prevResults,
            {
                Tribute1: randomTribute1.picture,
                Tribute2: "empty",
                result: result
            }
        ]);

        setTributeArray([...tributeArray]); // Update the state with the modified array to trigger a re-render
    }

    // Every attribute a tribute should have
    type TributeType = {
        name: string;
        health: number;
        damage: number;
        weapon: string;
        isAlive: boolean;
        picture: string;
    };

    // Feast event code
    function feast(actions: number) {
        // Types of weapons
        const weapons = [
            { weaponName: "stick", weaponDamage: 10 },
            { weaponName: "shovel", weaponDamage: 20 },
            { weaponName: "axe", weaponDamage: 30 },
            { weaponName: "knife", weaponDamage: 20 },
            { weaponName: "sword", weaponDamage: 30 },
            { weaponName: "spear", weaponDamage: 30 },
            { weaponName: "bow", weaponDamage: 30 },
            { weaponName: "gun", weaponDamage: 50 },
            { weaponName: "landmines", weaponDamage: 50 },
            { weaponName: "bombs", weaponDamage: 50 },
        ];

        // Possible event outcomes outputted as text
        const weaponMessages: { [key: string]: string } = {
            "stick": "finds a stick on the ground, then decides to use it as a weapon",
            "shovel": "finds a shovel, then decides to use it as a weapon",
            "axe": "finds an axe, then decides to use it as a weapon",
            "knife": "finds knives laying around and takes them",
            "sword": "finds a sword",
            "spear": "creates a spear",
            "bow": "finds a bow and some arrows",
            "gun": "finds a gun",
            "landmines": "finds some unused landmines",
            "bombs": "finds some bombs"
        };

        const noWeaponEvents = [
            "attacks {target}",
            "ambushes {target}",
            "challenges {target} to a duel and wins",
            "sneaks up on {target} and attacks"
        ];

        const meleeEvents = [
            "hits {target} with a {weapon}"
        ];

        const rangedEvents = [
            "aims a {weapon} at {target} and fires"
        ];

        const explosiveEvents = [
            "detonates {weapon} near {target}",
            "throws {weapon} at {target} and it explodes"
        ];

        const weaponClasses = {
            "melee": ["stick", "shovel", "axe", "knife", "sword", "spear"],
            "ranged": ["bow", "gun"],
            "explosives": ["landmines", "bombs"]
        };

        // Initialize the feast
        if (actions > 0) {
            let result: React.ReactNode = (
                <div className="feastlabel">
                    A Feast Begins at the Center of the Map
                </div>
            );

            setOutput(prevResults => [
                ...prevResults,
                {
                    Tribute1: "empty",
                    Tribute2: "empty",
                    result: result
                }
            ]);
        }

        // Choose which tributes attend the feast
        const feastTributes = tributeArray.filter(_ => Math.random() < 0.5);

        // Feast safety checks and edge cases
        if (actions > 0) {
            if (feastTributes.length < 2) {
                let result2: React.ReactNode = (
                    <div className="feastlabel">
                        The Feast Ends (No Tributes Attended the Feast)
                    </div>
                );

                setOutput(prevResults => [
                    ...prevResults,
                    {
                        Tribute1: "empty",
                        Tribute2: "empty",
                        result: result2
                    }
                ]);
                return;
            }
        } else {
            if (feastTributes.length < 2) {
                let result2: React.ReactNode = (
                    <div className="feastlabel">
                        The Bloodbath Ends (All Tributes Left the Area Immediately)
                    </div>
                );

                setOutput(prevResults => [
                    ...prevResults,
                    {
                        Tribute1: "empty",
                        Tribute2: "empty",
                        result: result2
                    }
                ]);
                return;
            }
        }

        // Manage tributes who did not attend the feast
        const leftFeastTributes = tributeArray.filter(tribute => !feastTributes.includes(tribute));

        leftFeastTributes.forEach(currentTribute => {
            let result2: React.ReactNode = (
                <>
                    <strong>{currentTribute.name}</strong> runs away and leaves the cornucopia
                </>
            );

            if (actions > 0) {
                result2 = (
                    <>
                        <strong>{currentTribute.name}</strong> doesn't attend the feast
                    </>
                );
            }

            setOutput(prevResults => [
                ...prevResults,
                {
                    Tribute1: currentTribute.picture,
                    Tribute2: "empty",
                    result: result2
                }
            ]);
        });

        // Manage event outcomes
        feastTributes.forEach(currentTribute => {
            if (currentTribute.isAlive) {
                const outcome = Math.random();
                if (outcome < 0.33) { // 33% a tribute grabs supplies
                    currentTribute.health += 50;
                    setOutput(prevResults => [
                        ...prevResults,
                        {
                            Tribute1: currentTribute.picture,
                            Tribute2: "empty",
                            result: <><strong>{currentTribute.name}</strong> grabs some supplies</>
                        }
                    ]);
                }
                else if (outcome < 0.67) { // 33% chance a tribute grabs a weapon
                    const randomWeaponIndex = Math.floor(Math.random() * weapons.length);
                    const randomWeapon = weapons[randomWeaponIndex];

                    currentTribute.damage += randomWeapon.weaponDamage;
                    currentTribute.weapon = randomWeapon.weaponName;

                    const weaponMessage = weaponMessages[randomWeapon.weaponName];
                    let result: React.ReactNode = (
                        <>
                            <strong>{currentTribute.name}</strong> {weaponMessage}
                        </>
                    );

                    setOutput(prevResults => [
                        ...prevResults,
                        {
                            Tribute1: currentTribute.picture,
                            Tribute2: "empty",
                            result: result
                        }
                    ]);
                } else { // 33% chance a tribute gets hurt
                    let damagedTribute: TributeType | undefined;
                    do {
                        damagedTribute = feastTributes.filter(tribute => tribute !== currentTribute)[Math.floor(Math.random() * (feastTributes.length - 1))];
                    } while (damagedTribute && !damagedTribute.isAlive);

                    if (!damagedTribute) {
                        alert("the website broke");
                        window.location.reload();
                    }

                    damagedTribute.health -= currentTribute.damage;

                    let eventMessage = "";
                    if (!currentTribute.weapon || currentTribute.weapon === "none") {
                        const randomEventIndex = Math.floor(Math.random() * noWeaponEvents.length);
                        eventMessage = noWeaponEvents[randomEventIndex].replace("{target}", damagedTribute.name);
                    } else {
                        let weaponClass: keyof typeof weaponClasses = "melee";
                        for (let key in weaponClasses) {
                            if (weaponClasses[key as keyof typeof weaponClasses].includes(currentTribute.weapon)) {
                                weaponClass = key as keyof typeof weaponClasses;
                                break;
                            }
                        }

                        let eventArray: string[] = [];
                        if (weaponClass === "melee") {
                            eventArray = meleeEvents;
                        } else if (weaponClass === "ranged") {
                            eventArray = rangedEvents;
                        } else if (weaponClass === "explosives") {
                            eventArray = explosiveEvents;
                        }

                        const randomEventIndex = Math.floor(Math.random() * eventArray.length);
                        eventMessage = eventArray[randomEventIndex]
                            .replace("{target}", damagedTribute.name)
                            .replace("{weapon}", currentTribute.weapon);
                    }

                    let result = (
                        <>
                            <strong>{currentTribute.name}</strong> {eventMessage}
                            {damagedTribute.health <= 0 ? (
                                <>
                                    {', '}
                                    <strong>{damagedTribute.name}</strong>
                                    {' is eliminated'}
                                </>
                            ) : (
                                <>
                                    {', '}
                                    <strong>{damagedTribute.name}</strong>
                                    {' survives'}
                                </>
                            )}
                        </>
                    );

                    // If tribute is eliminated during feast, remove them
                    if (damagedTribute.health <= 0) {
                        damagedTribute.isAlive = false;
                        const index = tributeArray.findIndex(tribute => tribute.name === damagedTribute.name);
                        if (index !== -1) {
                            tributeArray.splice(index, 1);
                        }
                    }

                    setOutput(prevResults => [
                        ...prevResults,
                        {
                            Tribute1: currentTribute.picture,
                            Tribute2: damagedTribute.picture,
                            result: result
                        }
                    ]);

                    setTributeArray([...feastTributes]);
                }
            }
            setTributeArray([...feastTributes]);
        });

        // End the feast
        if (actions > 0) {
            let result2: React.ReactNode = (
                <div className="feastlabel">
                    The Feast Ends
                </div>
            );

            setOutput(prevResults => [
                ...prevResults,
                {
                    Tribute1: "empty",
                    Tribute2: "empty",
                    result: result2
                }
            ]);
        } else {
            let result2: React.ReactNode = (
                <div className="bloodbathlabel">
                    The Bloodbath Ends
                </div>
            );

            setOutput(prevResults => [
                ...prevResults,
                {
                    Tribute1: "empty",
                    Tribute2: "empty",
                    result: result2
                }
            ]);
        }
    }

    // This function simulates a duel event
    function duel() { 

        // Possible text outputs for duels
        const noWeaponEvents = [
            "attacks {target}",
            "ambushes {target}",
            "sneaks up on {target} and attacks"
        ];

        const meleeEvents = [
            "hits {target} with a {weapon}"
        ];

        const rangedEvents = [
            "aims a {weapon} at {target} and fires"
        ];

        const explosiveEvents = [
            "detonates {weapon} near {target}",
            "throws {weapon} at {target} and it explodes"
        ];

        const weaponClasses = {
            "melee": ["stick", "shovel", "axe", "knife", "sword", "spear"],
            "ranged": ["bow", "gun"],
            "explosives": ["landmines", "bombs"]
        };

        let randomIndexTribute2 = Math.floor(Math.random() * tributeArray.length); // Get a random index for the tribute to be attacked
        let randomTribute2 = tributeArray[randomIndexTribute2]; // Get the attacked tribute

        let randomIndexTribute1; // Initialize variable for attacker index
        let randomTribute1; // Initialize variable for attacker tribute

        do { // Loop until a different tribute is selected as the attacker
            randomIndexTribute1 = Math.floor(Math.random() * tributeArray.length); // Get a random index for the attacker tribute
            randomTribute1 = tributeArray[randomIndexTribute1]; // Get the attacker tribute
        } while (randomTribute2 === randomTribute1); // Repeat loop if same tribute is selected as both attacked and attacker

        randomTribute2.health -= randomTribute1.damage; // Reduce health of the attacked tribute by attacker's damage

        // Manage weapons
        let eventMessage = "";
        if (!randomTribute1.weapon || randomTribute1.weapon === "none") {
            const randomEventIndex = Math.floor(Math.random() * noWeaponEvents.length);
            eventMessage = noWeaponEvents[randomEventIndex].replace("{target}", randomTribute2.name);
        } else {
            let weaponClass: keyof typeof weaponClasses = "melee";
            for (let key in weaponClasses) {
                if (weaponClasses[key as keyof typeof weaponClasses].includes(randomTribute1.weapon)) {
                    weaponClass = key as keyof typeof weaponClasses;
                    break;
                }
            }

            let eventArray: string[] = [];
            if (weaponClass === "melee") {
                eventArray = meleeEvents;
            } else if (weaponClass === "ranged") {
                eventArray = rangedEvents;
            } else if (weaponClass === "explosives") {
                eventArray = explosiveEvents;
            }

            const randomEventIndex = Math.floor(Math.random() * eventArray.length);
            eventMessage = eventArray[randomEventIndex]
                .replace("{target}", randomTribute2.name)
                .replace("{weapon}", randomTribute1.weapon);
        }

        // Output wether attacked tribute survives or is eliminated
        let result = (
            <>
                <strong>{randomTribute1.name}</strong> {eventMessage}
                {randomTribute2.health <= 0 ? (
                    <>
                        {', '}
                        <strong>{randomTribute2.name}</strong>
                        {' is eliminated'}
                    </>
                ) : (
                    <>
                        {', '}
                        <strong>{randomTribute2.name}</strong>
                        {' survives'}
                    </>
                )}
            </>
        );

        if (randomTribute2.health <= 0) { // Check if the attacked tribute is eliminated
            randomTribute2.isAlive = false; // Mark attacked tribute as not alive
            tributeArray.splice(randomIndexTribute2, 1); // Remove the attacked tribute from the array
        }

        setOutput(prevResults => [ // Update simulation output with duel result
            ...prevResults,
            {
                Tribute1: randomTribute1.picture,
                Tribute2: randomTribute2.picture,
                result: result
            }
        ]);

        setTributeArray([...tributeArray]); // Update the state with the modified array to trigger a re-render
    }

    function grabWeapon() {
        // Array of possible weapons with names and damage
        const weapons = [
            { weaponName: "stick", weaponDamage: 10 },
            { weaponName: "shovel", weaponDamage: 20 },
            { weaponName: "axe", weaponDamage: 30 },
            { weaponName: "knife", weaponDamage: 20 },
            { weaponName: "sword", weaponDamage: 30 },
            { weaponName: "spear", weaponDamage: 30 },
            { weaponName: "bow", weaponDamage: 30 },
            { weaponName: "gun", weaponDamage: 50 },
            { weaponName: "landmines", weaponDamage: 50 },
            { weaponName: "bombs", weaponDamage: 50 },
        ];

        // Possible text outputs when a tribute gets a weapon
        const weaponMessages: { [key: string]: string } = {
            "stick": "finds a stick on the ground, then decides to use it as a weapon",
            "shovel": "finds a shovel, then decides to use it as a weapon",
            "axe": "finds an axe, then decides to use it as a weapon",
            "knife": "finds knives laying around and takes them",
            "sword": "finds a sword",
            "spear": "creates a spear",
            "bow": "finds a bow and some arrows",
            "gun": "finds a gun",
            "landmines": "finds some unused landmines",
            "bombs": "finds some bombs"
        };

        const randomWeaponIndex = Math.floor(Math.random() * weapons.length); // Randomly select a weapon index
        const randomWeapon = weapons[randomWeaponIndex]; // Get the selected weapon

        const randomIndex = Math.floor(Math.random() * tributeArray.length); // Get a random index for selecting a tribute
        const randomTribute = tributeArray[randomIndex]; // Get the selected tribute

        randomTribute.damage += randomWeapon.weaponDamage; // Increase damage of the selected tribute by the weapon's damage
        randomTribute.weapon = randomWeapon.weaponName; // Set the tribute's weapon to the selected weapon's name

        setTributeArray(prevTributes => { // Update the state with the modified tribute array
            const updatedTributes = [...prevTributes];
            updatedTributes[randomIndex] = { ...randomTribute }; // Ensure immutability
            return updatedTributes;
        });

        const weaponMessage = weaponMessages[randomWeapon.weaponName];
        let result: React.ReactNode = (
            <>
                <strong>{randomTribute.name}</strong> {weaponMessage}
            </>
        ); // Generate grab weapon result message with chosen weapon

        setOutput(prevResults => [ // Update simulation output with grab weapon result
            ...prevResults,
            {
                Tribute1: randomTribute.picture,
                Tribute2: "empty",
                result: result
            }
        ]);
    }

    function grabSupplies() {
        // Array of possible supplies with their health benefits
        const supplies = [
            { supplyName: "unknown sponsor", healthBenefit: 50 },
            { supplyName: "medical supplies", healthBenefit: 50 }
        ];

        const supplyMessages: { [key: string]: string } = {
            "unknown sponsor": "receives supplies from an unknown sponsor",
            "medical supplies": "receives medical supplies from a sponsor"
        };

        const randomSupplyIndex = Math.floor(Math.random() * supplies.length); // Randomly select a supply index
        const randomSupply = supplies[randomSupplyIndex]; // Get the selected supply

        const randomIndex = Math.floor(Math.random() * tributeArray.length); // Get a random index for selecting a tribute
        const randomTribute = tributeArray[randomIndex]; // Get the selected tribute

        randomTribute.health += randomSupply.healthBenefit; // Increase health of the selected tribute by the supply's health benefit

        setTributeArray(prevTributes => { // Update the state with the modified tribute array
            const updatedTributes = [...prevTributes];
            updatedTributes[randomIndex] = { ...randomTribute }; // Ensure immutability
            return updatedTributes;
        });

        const supplyMessage = supplyMessages[randomSupply.supplyName];
        let result: React.ReactNode = (
            <>
                <strong>{randomTribute.name}</strong> {supplyMessage}
            </>
        ); // Generate grab supplies result message with chosen supply

        setOutput(prevResults => [ // Update simulation output with grab supplies result
            ...prevResults,
            {
                Tribute1: randomTribute.picture,
                Tribute2: "empty",
                result: result
            }
        ]);
    }

    function taunt() {
        // Array of possible taunt events
        const events = [
            "makes fun of {target}",
            "trips {target} and laughs",
            "taunts {target}",
            "provokes {target}",
            "insults {target}"
        ];

        const randomEventIndex = Math.floor(Math.random() * events.length); // Randomly select an event index
        const randomEvent = events[randomEventIndex]; // Get the selected event

        let randomIndexTribute2 = Math.floor(Math.random() * tributeArray.length); // Get a random index for the tribute to be taunted
        let randomTribute2 = tributeArray[randomIndexTribute2]; // Get the taunted tribute

        let randomIndexTribute1; // Initialize variable for the taunter's index
        let randomTribute1; // Initialize variable for the taunter tribute

        do { // Loop until a different tribute is selected as the taunter
            randomIndexTribute1 = Math.floor(Math.random() * tributeArray.length); // Get a random index for the taunter tribute
            randomTribute1 = tributeArray[randomIndexTribute1]; // Get the taunter tribute
        } while (randomTribute2 === randomTribute1); // Repeat loop if the same tribute is selected as both taunter and taunted

        // Split the event message into three parts: before, target, and after
        const beforeTargetIndex = randomEvent.indexOf("{target}"); // Find the index of {target}
        const beforeTarget = randomEvent.substring(0, beforeTargetIndex); // Extract before {target}
        const afterTarget = randomEvent.substring(beforeTargetIndex + "{target}".length); // Extract after {target}

        // Combine the parts with the target wrapped in <strong> tags
        const eventMessage = (
            <>
                {beforeTarget}
                <strong>{randomTribute2.name}</strong>
                {afterTarget}
            </>
        );

        let result: React.ReactNode = (
            <>
                <strong>{randomTribute1.name}</strong> {eventMessage}
            </>
        );

        setOutput(prevResults => [ // Update simulation output with taunt result
            ...prevResults,
            {
                Tribute1: randomTribute1.picture,
                Tribute2: randomTribute2.picture,
                result: result
            }
        ]);

        setTributeArray([...tributeArray]); // Update the state with the modified array to trigger a re-render
    }

    function selfEliminate() {
        // Possible accidental events with different amounts of damage
        const events = [
            { eventName: "landmine", damage: 70 },
            { eventName: "pit", damage: 20 },
            { eventName: "trips", damage: 10 },
            { eventName: "frozen lake", damage: 40 },
            { eventName: "spoiled food", damage: 20 },
            { eventName: "poisoned food", damage: 30 },
            { eventName: "infection", damage: 20 },
            { eventName: "tree fall", damage: 20 }
        ];

        // Possible text output for accidental events
        const eventMessages: { [key: string]: string } = {
            "landmine": "accidentally steps on a landmine",
            "pit": "falls into a pit",
            "trips": "trips",
            "frozen lake": "falls into a frozen lake",
            "spoiled food": "found spoiled food and ate it",
            "poisoned food": "sneaks into someone’s food stash, but the food was poisoned",
            "infection": "suffers from an infection",
            "tree fall": "climbs a tree but falls"
        };

        const randomEventIndex = Math.floor(Math.random() * events.length); // Randomly select an event index
        const randomEvent = events[randomEventIndex]; // Get the selected event

        const randomIndexTribute1 = Math.floor(Math.random() * tributeArray.length); // Get a random index for the tribute to be hurt
        const randomTribute1 = tributeArray[randomIndexTribute1]; // Get the hurt tribute

        randomTribute1.health -= randomEvent.damage; // Reduce health of the hurt tribute by the event's damage

        let result: React.ReactNode = (
            <>
                <strong>{randomTribute1.name}</strong> {eventMessages[randomEvent.eventName]}
                {randomTribute1.health <= 0 ? (
                    <>
                        {', '}
                        <strong>{randomTribute1.name}</strong>
                        {' is eliminated'}
                    </>
                ) : (
                    <>
                        {', '}
                        <strong>{randomTribute1.name}</strong>
                        {' survives'}
                    </>
                )}
            </>
        );

        if (randomTribute1.health <= 0) { // Check if the hurt tribute is eliminated
            randomTribute1.isAlive = false; // Mark hurt tribute as not alive
            tributeArray.splice(randomIndexTribute1, 1); // Remove the hurt tribute from the array
        }

        setOutput(prevResults => [ // Update simulation output with the event result
            ...prevResults,
            {
                Tribute1: randomTribute1.picture,
                Tribute2: "empty",
                result: result
            }
        ]);

        setTributeArray([...tributeArray]); // Update the state with the modified array to trigger a re-render
    }

    function steal() {
        // Array of possible steal events
        const events = [
            "steals from {target}'s supplies",
            "destroys {target}'s supplies"
        ];

        let randomIndexTribute2 = Math.floor(Math.random() * tributeArray.length); // Get a random index for the tribute to be stolen from
        let randomTribute2 = tributeArray[randomIndexTribute2]; // Get the tribute to be stolen from

        let randomIndexTribute1; // Initialize variable for thief index
        let randomTribute1; // Initialize variable for thief tribute

        do { // Loop until a different tribute is selected as the thief
            randomIndexTribute1 = Math.floor(Math.random() * tributeArray.length); // Get a random index for the thief tribute
            randomTribute1 = tributeArray[randomIndexTribute1]; // Get the thief tribute
        } while (randomTribute2 === randomTribute1); // Repeat loop if the same tribute is selected as both thief and victim

        const randomEventIndex = Math.floor(Math.random() * events.length); // Randomly select an event index
        const randomEvent = events[randomEventIndex]; // Get the selected event

        // General damage for stealing supplies or destroying supplies
        randomTribute2.damage -= 50;
        if (randomTribute2.damage < 0) {
            randomTribute2.damage = 0;
        }

        // Split the event message into three parts: before, target, and after
        const beforeTargetIndex = randomEvent.indexOf("{target}"); // Find the index of {target}
        const beforeTarget = randomEvent.substring(0, beforeTargetIndex); // Extract before {target}
        const afterTarget = randomEvent.substring(beforeTargetIndex + "{target}".length); // Extract after {target}

        // Combine the parts with the target wrapped in <strong> tags
        const eventMessage = (
            <>
                {beforeTarget}
                <strong>{randomTribute2.name}</strong>
                {afterTarget}
            </>
        );

        let result: React.ReactNode = (
            <>
                <strong>{randomTribute1.name}</strong> {eventMessage}
            </>
        );

        setOutput(prevResults => [ // Update simulation output with steal result
            ...prevResults,
            {
                Tribute1: randomTribute1.picture,
                Tribute2: randomTribute2.picture,
                result: result
            }
        ]);

        setTributeArray([...tributeArray]); // Update the state with the modified array to trigger a re-render
    }

    function goofOff() {
        // Array of possible events for when a tribute fools around
        const events = [
            "camouflages themself in the bushes",
            "constructs a hut made out of grass",
            "creates a stick made out of sticks, it's useless though",
            "creates a shield made out of grass, it's useless",
            "does absolutely nothing for 10 minutes",
            "looks a bit green, due to an infection",
            "fools around"
        ];

        const randomEventIndex = Math.floor(Math.random() * events.length); // Randomly select an event index
        const randomEvent = events[randomEventIndex]; // Get the selected event

        const randomIndexTribute1 = Math.floor(Math.random() * tributeArray.length); // Get a random index for the tribute to fool around
        const randomTribute1 = tributeArray[randomIndexTribute1]; // Get the fooling around tribute

        let result: React.ReactNode = (
            <>
                <strong>{randomTribute1.name}</strong> {randomEvent}
            </>
        );

        setOutput(prevResults => [ // Update simulation output with the event result
            ...prevResults,
            {
                Tribute1: randomTribute1.picture,
                Tribute2: "empty",
                result: result
            }
        ]);

        setTributeArray([...tributeArray]); // Update the state with the modified array to trigger a re-render
    }

    // Function to simulate a duel
    function duelShowdown() {

        // Possible text outputs for duels
        const noWeaponEvents = [
            "attacks {target}",
            "ambushes {target}",
            "sneaks up on {target} and attacks"
        ];

        const meleeEvents = [
            "hits {target} with a {weapon}"
        ];

        const rangedEvents = [
            "aims a {weapon} at {target} and fires"
        ];

        const explosiveEvents = [
            "detonates {weapon} near {target}",
            "throws {weapon} at {target} and it explodes"
        ];

        const weaponClasses = {
            "melee": ["stick", "shovel", "axe", "knife", "sword", "spear"],
            "ranged": ["bow", "gun"],
            "explosives": ["landmines", "bombs"]
        };

        let randomIndexTribute2 = Math.floor(Math.random() * tributeArray.length); // Get a random index for the tribute to be attacked
        let randomTribute2 = tributeArray[randomIndexTribute2]; // Get the attacked tribute

        let randomIndexTribute1; // Initialize variable for attacker index
        let randomTribute1; // Initialize variable for attacker tribute

        do { // Loop until a different tribute is selected as the attacker
            randomIndexTribute1 = Math.floor(Math.random() * tributeArray.length); // Get a random index for the attacker tribute
            randomTribute1 = tributeArray[randomIndexTribute1]; // Get the attacker tribute
        } while (randomTribute2 === randomTribute1); // Repeat loop if same tribute is selected as both attacked and attacker

        let calculatedDamage: number = randomTribute1.damage / 2;
        randomTribute2.health -= calculatedDamage; // Reduce health of the attacked tribute by attacker's damage

        let eventMessage = "";
        if (!randomTribute1.weapon || randomTribute1.weapon === "none") {
            const randomEventIndex = Math.floor(Math.random() * noWeaponEvents.length);
            eventMessage = noWeaponEvents[randomEventIndex].replace("{target}", randomTribute2.name);
        } else {
            let weaponClass: keyof typeof weaponClasses = "melee";
            for (let key in weaponClasses) {
                if (weaponClasses[key as keyof typeof weaponClasses].includes(randomTribute1.weapon)) { // Type assertion
                    weaponClass = key as keyof typeof weaponClasses;
                    break;
                }
            }

            // Choose event based on weapon type
            let eventArray: string[] = [];
            if (weaponClass === "melee") {
                eventArray = meleeEvents;
            } else if (weaponClass === "ranged") {
                eventArray = rangedEvents;
            } else if (weaponClass === "explosives") {
                eventArray = explosiveEvents;
            }

            const randomEventIndex = Math.floor(Math.random() * eventArray.length);
            eventMessage = eventArray[randomEventIndex]
                .replace("{target}", randomTribute2.name)
                .replace("{weapon}", randomTribute1.weapon);
        }

        let result = (
            <>
                <strong>{randomTribute1.name}</strong> {eventMessage}
                {randomTribute2.health <= 0 ? (
                    <>
                        {', '}
                        <strong>{randomTribute2.name}</strong>
                        {' is eliminated'}
                    </>
                ) : (
                    <>
                        {', '}
                        <strong>{randomTribute2.name}</strong>
                        {' survives'}
                    </>
                )}
            </>
        );

        if (randomTribute2.health <= 0) { // Check if the attacked tribute is eliminated
            randomTribute2.isAlive = false; // Mark attacked tribute as not alive
            tributeArray.splice(randomIndexTribute2, 1); // Remove the attacked tribute from the array
        }

        setOutput(prevResults => [ // Update simulation output with duel result
            ...prevResults,
            {
                Tribute1: randomTribute1.picture,
                Tribute2: randomTribute2.picture,
                result: result
            }
        ]);

        setTributeArray([...tributeArray]); // Update the state with the modified array to trigger a re-render
    }

    return (
        <div className="bloodbath">
            {!simulationReady && (
                <div className="bloodbathlabelmain">
                    <p>The Bloodbath Begins</p>
                </div>
            )}
            {simulationReady && <button onClick={beginSimulation} className="begin-button">Begin Simulation</button>}
            {output.map((result, index) => (
                <div key={index}>
                    {result.Tribute1 !== "empty" && <img src={result.Tribute1} alt="Tribute1" className="tribute-image" />}
                    {result.Tribute2 !== "empty" && <img src={result.Tribute2} alt="Tribute2" className="tribute-image" />}
                    <p>{result.result}</p>
                    {tributeArray.length === 1 && index === output.length - 1 && (
                        <div>
                            <img src={tributeArray[0].picture} alt="winner" className="tribute-image" />
                            <p>The last one standing is <strong>{tributeArray[0].name}</strong>! <strong>{tributeArray[0].name}</strong> is the Winner!</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default Bloodbath; // Export Bloodbath component
