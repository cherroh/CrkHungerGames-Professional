// bloodbath.tsx contains the logic and events for the simulation

import React, { useState } from 'react';
import './App.css';
import { CookieType } from './tributes';

interface ReapingProps {
    cookies: CookieType[]; // Define the type for the cookies array
}

function Bloodbath({ cookies }: ReapingProps): React.ReactElement {
    const [cookieArray, setCookieArray] = useState(cookies); // Initialize state for cookie array
    const [simulationReady, setSimulationReady] = useState(true); // Initialize state for simulation readiness
    const [output, setOutput] = useState<{ Cookie1: string; Cookie2: string; result: React.ReactNode; }[]>([]); // Initialize state for simulation output

    function beginSimulation() {
        setSimulationReady(false); // Set simulation readiness state to false
        let actions = 0;
        let daysCounter = 1; // Initialize the days counter outside the loop
        let time = "Day";

        // This is the main game loop, continue game until only one cookie is the winner
        while (cookieArray.length > 2) { // Loop until only one cookie remains in the array
            if (actions % 120 === 0 && cookieArray.length > 4) { // Check if it's the 7th day
                feast(actions); // Call feast function on every 7th day
            }
            if (actions % 20 === 0 && cookieArray.length > 2) { // Check if it's the 7th day
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
            if (cookieArray.length > 1 && cookieArray.length > 2) {
                selectEvent(time); // Perform a simulation step
                actions++; // Increment the days counter
            }
        }

        // Manage the final duel
        time = "Finale";
        displayDay(daysCounter, time);
        while (cookieArray.length > 1) {
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
                Cookie1: "empty",
                Cookie2: "empty",
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

        const randomIndexCookie1 = Math.floor(Math.random() * cookieArray.length); // Get a random index for the cookie to goof off
        const randomCookie1 = cookieArray[randomIndexCookie1]; // Get the goofing off cookie

        let result: React.ReactNode = (
            <>
                <strong>{randomCookie1.name}</strong> {randomEvent}
            </>
        );

        setOutput(prevResults => [ // Update simulation output with the event result
            ...prevResults,
            {
                Cookie1: randomCookie1.picture,
                Cookie2: "empty",
                result: result
            }
        ]);

        setCookieArray([...cookieArray]); // Update the state with the modified array to trigger a re-render
    }

    // Every attribute a cookie should have
    type CookieType = {
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
                    Cookie1: "empty",
                    Cookie2: "empty",
                    result: result
                }
            ]);
        }

        // Choose which cookies attend the feast
        const feastCookies = cookieArray.filter(_ => Math.random() < 0.5);

        // Feast safety checks and edge cases
        if (actions > 0) {
            if (feastCookies.length < 2) {
                let result2: React.ReactNode = (
                    <div className="feastlabel">
                        The Feast Ends (No Cookies Attended the Feast)
                    </div>
                );

                setOutput(prevResults => [
                    ...prevResults,
                    {
                        Cookie1: "empty",
                        Cookie2: "empty",
                        result: result2
                    }
                ]);
                return;
            }
        } else {
            if (feastCookies.length < 2) {
                let result2: React.ReactNode = (
                    <div className="feastlabel">
                        The Bloodbath Ends (All Cookies Left the Area Immediately)
                    </div>
                );

                setOutput(prevResults => [
                    ...prevResults,
                    {
                        Cookie1: "empty",
                        Cookie2: "empty",
                        result: result2
                    }
                ]);
                return;
            }
        }

        // Manage cookies who did not attend the feast
        const leftFeastCookies = cookieArray.filter(cookie => !feastCookies.includes(cookie));

        leftFeastCookies.forEach(currentCookie => {
            let result2: React.ReactNode = (
                <>
                    <strong>{currentCookie.name}</strong> runs away and leaves the cornucopia
                </>
            );

            if (actions > 0) {
                result2 = (
                    <>
                        <strong>{currentCookie.name}</strong> doesn't attend the feast
                    </>
                );
            }

            setOutput(prevResults => [
                ...prevResults,
                {
                    Cookie1: currentCookie.picture,
                    Cookie2: "empty",
                    result: result2
                }
            ]);
        });

        // Manage event outcomes
        feastCookies.forEach(currentCookie => {
            if (currentCookie.isAlive) {
                const outcome = Math.random();
                if (outcome < 0.33) { // 33% a cookie grabs supplies
                    currentCookie.health += 50;
                    setOutput(prevResults => [
                        ...prevResults,
                        {
                            Cookie1: currentCookie.picture,
                            Cookie2: "empty",
                            result: <><strong>{currentCookie.name}</strong> grabs some supplies</>
                        }
                    ]);
                }
                else if (outcome < 0.67) { // 33% chance a cookie grabs a weapon
                    const randomWeaponIndex = Math.floor(Math.random() * weapons.length);
                    const randomWeapon = weapons[randomWeaponIndex];

                    currentCookie.damage += randomWeapon.weaponDamage;
                    currentCookie.weapon = randomWeapon.weaponName;

                    const weaponMessage = weaponMessages[randomWeapon.weaponName];
                    let result: React.ReactNode = (
                        <>
                            <strong>{currentCookie.name}</strong> {weaponMessage}
                        </>
                    );

                    setOutput(prevResults => [
                        ...prevResults,
                        {
                            Cookie1: currentCookie.picture,
                            Cookie2: "empty",
                            result: result
                        }
                    ]);
                } else { // 33% chance a cookie gets hurt
                    let damagedCookie: CookieType | undefined;
                    do {
                        damagedCookie = feastCookies.filter(cookie => cookie !== currentCookie)[Math.floor(Math.random() * (feastCookies.length - 1))];
                    } while (damagedCookie && !damagedCookie.isAlive);

                    if (!damagedCookie) {
                        alert("the website broke");
                        window.location.reload();
                    }

                    damagedCookie.health -= currentCookie.damage;

                    let eventMessage = "";
                    if (!currentCookie.weapon || currentCookie.weapon === "none") {
                        const randomEventIndex = Math.floor(Math.random() * noWeaponEvents.length);
                        eventMessage = noWeaponEvents[randomEventIndex].replace("{target}", damagedCookie.name);
                    } else {
                        let weaponClass: keyof typeof weaponClasses = "melee";
                        for (let key in weaponClasses) {
                            if (weaponClasses[key as keyof typeof weaponClasses].includes(currentCookie.weapon)) {
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
                            .replace("{target}", damagedCookie.name)
                            .replace("{weapon}", currentCookie.weapon);
                    }

                    let result = (
                        <>
                            <strong>{currentCookie.name}</strong> {eventMessage}
                            {damagedCookie.health <= 0 ? (
                                <>
                                    {', '}
                                    <strong>{damagedCookie.name}</strong>
                                    {' is eliminated'}
                                </>
                            ) : (
                                <>
                                    {', '}
                                    <strong>{damagedCookie.name}</strong>
                                    {' survives'}
                                </>
                            )}
                        </>
                    );

                    // If cookie is eliminated during feast, remove them
                    if (damagedCookie.health <= 0) {
                        damagedCookie.isAlive = false;
                        const index = cookieArray.findIndex(cookie => cookie.name === damagedCookie.name);
                        if (index !== -1) {
                            cookieArray.splice(index, 1);
                        }
                    }

                    setOutput(prevResults => [
                        ...prevResults,
                        {
                            Cookie1: currentCookie.picture,
                            Cookie2: damagedCookie.picture,
                            result: result
                        }
                    ]);

                    setCookieArray([...feastCookies]);
                }
            }
            setCookieArray([...feastCookies]);
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
                    Cookie1: "empty",
                    Cookie2: "empty",
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
                    Cookie1: "empty",
                    Cookie2: "empty",
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

        let randomIndexCookie2 = Math.floor(Math.random() * cookieArray.length); // Get a random index for the cookie to be attacked
        let randomCookie2 = cookieArray[randomIndexCookie2]; // Get the attacked cookie

        let randomIndexCookie1; // Initialize variable for attacker index
        let randomCookie1; // Initialize variable for attacker cookie

        do { // Loop until a different cookie is selected as the attacker
            randomIndexCookie1 = Math.floor(Math.random() * cookieArray.length); // Get a random index for the attacker cookie
            randomCookie1 = cookieArray[randomIndexCookie1]; // Get the attacker cookie
        } while (randomCookie2 === randomCookie1); // Repeat loop if same cookie is selected as both attacked and attacker

        randomCookie2.health -= randomCookie1.damage; // Reduce health of the attacked cookie by attacker's damage

        // Manage weapons
        let eventMessage = "";
        if (!randomCookie1.weapon || randomCookie1.weapon === "none") {
            const randomEventIndex = Math.floor(Math.random() * noWeaponEvents.length);
            eventMessage = noWeaponEvents[randomEventIndex].replace("{target}", randomCookie2.name);
        } else {
            let weaponClass: keyof typeof weaponClasses = "melee";
            for (let key in weaponClasses) {
                if (weaponClasses[key as keyof typeof weaponClasses].includes(randomCookie1.weapon)) {
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
                .replace("{target}", randomCookie2.name)
                .replace("{weapon}", randomCookie1.weapon);
        }

        // Output wether attacked cookie survives or is eliminated
        let result = (
            <>
                <strong>{randomCookie1.name}</strong> {eventMessage}
                {randomCookie2.health <= 0 ? (
                    <>
                        {', '}
                        <strong>{randomCookie2.name}</strong>
                        {' is eliminated'}
                    </>
                ) : (
                    <>
                        {', '}
                        <strong>{randomCookie2.name}</strong>
                        {' survives'}
                    </>
                )}
            </>
        );

        if (randomCookie2.health <= 0) { // Check if the attacked cookie is eliminated
            randomCookie2.isAlive = false; // Mark attacked cookie as not alive
            cookieArray.splice(randomIndexCookie2, 1); // Remove the attacked cookie from the array
        }

        setOutput(prevResults => [ // Update simulation output with duel result
            ...prevResults,
            {
                Cookie1: randomCookie1.picture,
                Cookie2: randomCookie2.picture,
                result: result
            }
        ]);

        setCookieArray([...cookieArray]); // Update the state with the modified array to trigger a re-render
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

        // Possible text outputs when a cookie gets a weapon
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

        const randomIndex = Math.floor(Math.random() * cookieArray.length); // Get a random index for selecting a cookie
        const randomCookie = cookieArray[randomIndex]; // Get the selected cookie

        randomCookie.damage += randomWeapon.weaponDamage; // Increase damage of the selected cookie by the weapon's damage
        randomCookie.weapon = randomWeapon.weaponName; // Set the cookie's weapon to the selected weapon's name

        setCookieArray(prevCookies => { // Update the state with the modified cookie array
            const updatedCookies = [...prevCookies];
            updatedCookies[randomIndex] = { ...randomCookie }; // Ensure immutability
            return updatedCookies;
        });

        const weaponMessage = weaponMessages[randomWeapon.weaponName];
        let result: React.ReactNode = (
            <>
                <strong>{randomCookie.name}</strong> {weaponMessage}
            </>
        ); // Generate grab weapon result message with chosen weapon

        setOutput(prevResults => [ // Update simulation output with grab weapon result
            ...prevResults,
            {
                Cookie1: randomCookie.picture,
                Cookie2: "empty",
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

        const randomIndex = Math.floor(Math.random() * cookieArray.length); // Get a random index for selecting a cookie
        const randomCookie = cookieArray[randomIndex]; // Get the selected cookie

        randomCookie.health += randomSupply.healthBenefit; // Increase health of the selected cookie by the supply's health benefit

        setCookieArray(prevCookies => { // Update the state with the modified cookie array
            const updatedCookies = [...prevCookies];
            updatedCookies[randomIndex] = { ...randomCookie }; // Ensure immutability
            return updatedCookies;
        });

        const supplyMessage = supplyMessages[randomSupply.supplyName];
        let result: React.ReactNode = (
            <>
                <strong>{randomCookie.name}</strong> {supplyMessage}
            </>
        ); // Generate grab supplies result message with chosen supply

        setOutput(prevResults => [ // Update simulation output with grab supplies result
            ...prevResults,
            {
                Cookie1: randomCookie.picture,
                Cookie2: "empty",
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

        let randomIndexCookie2 = Math.floor(Math.random() * cookieArray.length); // Get a random index for the cookie to be taunted
        let randomCookie2 = cookieArray[randomIndexCookie2]; // Get the taunted cookie

        let randomIndexCookie1; // Initialize variable for the taunter's index
        let randomCookie1; // Initialize variable for the taunter cookie

        do { // Loop until a different cookie is selected as the taunter
            randomIndexCookie1 = Math.floor(Math.random() * cookieArray.length); // Get a random index for the taunter cookie
            randomCookie1 = cookieArray[randomIndexCookie1]; // Get the taunter cookie
        } while (randomCookie2 === randomCookie1); // Repeat loop if the same cookie is selected as both taunter and taunted

        // Split the event message into three parts: before, target, and after
        const beforeTargetIndex = randomEvent.indexOf("{target}"); // Find the index of {target}
        const beforeTarget = randomEvent.substring(0, beforeTargetIndex); // Extract before {target}
        const afterTarget = randomEvent.substring(beforeTargetIndex + "{target}".length); // Extract after {target}

        // Combine the parts with the target wrapped in <strong> tags
        const eventMessage = (
            <>
                {beforeTarget}
                <strong>{randomCookie2.name}</strong>
                {afterTarget}
            </>
        );

        let result: React.ReactNode = (
            <>
                <strong>{randomCookie1.name}</strong> {eventMessage}
            </>
        );

        setOutput(prevResults => [ // Update simulation output with taunt result
            ...prevResults,
            {
                Cookie1: randomCookie1.picture,
                Cookie2: randomCookie2.picture,
                result: result
            }
        ]);

        setCookieArray([...cookieArray]); // Update the state with the modified array to trigger a re-render
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

        const randomIndexCookie1 = Math.floor(Math.random() * cookieArray.length); // Get a random index for the cookie to be hurt
        const randomCookie1 = cookieArray[randomIndexCookie1]; // Get the hurt cookie

        randomCookie1.health -= randomEvent.damage; // Reduce health of the hurt cookie by the event's damage

        let result: React.ReactNode = (
            <>
                <strong>{randomCookie1.name}</strong> {eventMessages[randomEvent.eventName]}
                {randomCookie1.health <= 0 ? (
                    <>
                        {', '}
                        <strong>{randomCookie1.name}</strong>
                        {' is eliminated'}
                    </>
                ) : (
                    <>
                        {', '}
                        <strong>{randomCookie1.name}</strong>
                        {' survives'}
                    </>
                )}
            </>
        );

        if (randomCookie1.health <= 0) { // Check if the hurt cookie is eliminated
            randomCookie1.isAlive = false; // Mark hurt cookie as not alive
            cookieArray.splice(randomIndexCookie1, 1); // Remove the hurt cookie from the array
        }

        setOutput(prevResults => [ // Update simulation output with the event result
            ...prevResults,
            {
                Cookie1: randomCookie1.picture,
                Cookie2: "empty",
                result: result
            }
        ]);

        setCookieArray([...cookieArray]); // Update the state with the modified array to trigger a re-render
    }

    function steal() {
        // Array of possible steal events
        const events = [
            "steals from {target}'s supplies",
            "destroys {target}'s supplies"
        ];

        let randomIndexCookie2 = Math.floor(Math.random() * cookieArray.length); // Get a random index for the cookie to be stolen from
        let randomCookie2 = cookieArray[randomIndexCookie2]; // Get the cookie to be stolen from

        let randomIndexCookie1; // Initialize variable for thief index
        let randomCookie1; // Initialize variable for thief cookie

        do { // Loop until a different cookie is selected as the thief
            randomIndexCookie1 = Math.floor(Math.random() * cookieArray.length); // Get a random index for the thief cookie
            randomCookie1 = cookieArray[randomIndexCookie1]; // Get the thief cookie
        } while (randomCookie2 === randomCookie1); // Repeat loop if the same cookie is selected as both thief and victim

        const randomEventIndex = Math.floor(Math.random() * events.length); // Randomly select an event index
        const randomEvent = events[randomEventIndex]; // Get the selected event

        // General damage for stealing supplies or destroying supplies
        randomCookie2.damage -= 50;
        if (randomCookie2.damage < 0) {
            randomCookie2.damage = 0;
        }

        // Split the event message into three parts: before, target, and after
        const beforeTargetIndex = randomEvent.indexOf("{target}"); // Find the index of {target}
        const beforeTarget = randomEvent.substring(0, beforeTargetIndex); // Extract before {target}
        const afterTarget = randomEvent.substring(beforeTargetIndex + "{target}".length); // Extract after {target}

        // Combine the parts with the target wrapped in <strong> tags
        const eventMessage = (
            <>
                {beforeTarget}
                <strong>{randomCookie2.name}</strong>
                {afterTarget}
            </>
        );

        let result: React.ReactNode = (
            <>
                <strong>{randomCookie1.name}</strong> {eventMessage}
            </>
        );

        setOutput(prevResults => [ // Update simulation output with steal result
            ...prevResults,
            {
                Cookie1: randomCookie1.picture,
                Cookie2: randomCookie2.picture,
                result: result
            }
        ]);

        setCookieArray([...cookieArray]); // Update the state with the modified array to trigger a re-render
    }

    function goofOff() {
        // Array of possible events for when a cookie fools around
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

        const randomIndexCookie1 = Math.floor(Math.random() * cookieArray.length); // Get a random index for the cookie to fool around
        const randomCookie1 = cookieArray[randomIndexCookie1]; // Get the fooling around cookie

        let result: React.ReactNode = (
            <>
                <strong>{randomCookie1.name}</strong> {randomEvent}
            </>
        );

        setOutput(prevResults => [ // Update simulation output with the event result
            ...prevResults,
            {
                Cookie1: randomCookie1.picture,
                Cookie2: "empty",
                result: result
            }
        ]);

        setCookieArray([...cookieArray]); // Update the state with the modified array to trigger a re-render
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

        let randomIndexCookie2 = Math.floor(Math.random() * cookieArray.length); // Get a random index for the cookie to be attacked
        let randomCookie2 = cookieArray[randomIndexCookie2]; // Get the attacked cookie

        let randomIndexCookie1; // Initialize variable for attacker index
        let randomCookie1; // Initialize variable for attacker cookie

        do { // Loop until a different cookie is selected as the attacker
            randomIndexCookie1 = Math.floor(Math.random() * cookieArray.length); // Get a random index for the attacker cookie
            randomCookie1 = cookieArray[randomIndexCookie1]; // Get the attacker cookie
        } while (randomCookie2 === randomCookie1); // Repeat loop if same cookie is selected as both attacked and attacker

        let calculatedDamage: number = randomCookie1.damage / 2;
        randomCookie2.health -= calculatedDamage; // Reduce health of the attacked cookie by attacker's damage

        let eventMessage = "";
        if (!randomCookie1.weapon || randomCookie1.weapon === "none") {
            const randomEventIndex = Math.floor(Math.random() * noWeaponEvents.length);
            eventMessage = noWeaponEvents[randomEventIndex].replace("{target}", randomCookie2.name);
        } else {
            let weaponClass: keyof typeof weaponClasses = "melee";
            for (let key in weaponClasses) {
                if (weaponClasses[key as keyof typeof weaponClasses].includes(randomCookie1.weapon)) { // Type assertion
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
                .replace("{target}", randomCookie2.name)
                .replace("{weapon}", randomCookie1.weapon);
        }

        let result = (
            <>
                <strong>{randomCookie1.name}</strong> {eventMessage}
                {randomCookie2.health <= 0 ? (
                    <>
                        {', '}
                        <strong>{randomCookie2.name}</strong>
                        {' is eliminated'}
                    </>
                ) : (
                    <>
                        {', '}
                        <strong>{randomCookie2.name}</strong>
                        {' survives'}
                    </>
                )}
            </>
        );

        if (randomCookie2.health <= 0) { // Check if the attacked cookie is eliminated
            randomCookie2.isAlive = false; // Mark attacked cookie as not alive
            cookieArray.splice(randomIndexCookie2, 1); // Remove the attacked cookie from the array
        }

        setOutput(prevResults => [ // Update simulation output with duel result
            ...prevResults,
            {
                Cookie1: randomCookie1.picture,
                Cookie2: randomCookie2.picture,
                result: result
            }
        ]);

        setCookieArray([...cookieArray]); // Update the state with the modified array to trigger a re-render
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
                    {result.Cookie1 !== "empty" && <img src={result.Cookie1} alt="Cookie1" className="tribute-image" />}
                    {result.Cookie2 !== "empty" && <img src={result.Cookie2} alt="Cookie2" className="tribute-image" />}
                    <p>{result.result}</p>
                    {cookieArray.length === 1 && index === output.length - 1 && (
                        <div>
                            <img src={cookieArray[0].picture} alt="winner" className="tribute-image" />
                            <p>The last one standing is <strong>{cookieArray[0].name}</strong>! <strong>{cookieArray[0].name}</strong> is the Winner!</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default Bloodbath; // Export Bloodbath component
