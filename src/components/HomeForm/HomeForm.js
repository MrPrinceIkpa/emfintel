"use client"

import styles from './HomeForm.module.css';
import Button from '../Button/Button';
import { handleEmail, isEmpty } from '../../../utils/form';
import { toast } from 'react-hot-toast'
import { useRef, useState, useEffect } from 'react';
import { useInputFocus } from '@/customHooks/hooks';

export default function HomeForm () {
    var homeForm = useRef();
    var addressBar = useRef();
    var suggestCon = useRef();
    var [suggestionDisplay, setSuggestionDisplay] = useState(false)
    var isFocused = useInputFocus(addressBar)
    var [loading, setLoading] = useState(false);
    var [addressList, setAddressList] = useState([]);
    var formData = {};
    var prevLen = useRef(0); 
    var tomtomKey = useRef();
    var tempAddressList = [];
    useEffect(function () {
        getTomtomKey();
        document.addEventListener('click', function (e) {
            if(!suggestCon.current.contains(e.target)) {
                setSuggestionDisplay(false);
            }
        })
    }, [])

    const clearForm = function () {
        homeForm.current.address.value = "";
        homeForm.current.email.value = "";
        homeForm.current.dwellingType.value = "";
        homeForm.current.mainGoal.value = ""
    }

    const getTomtomKey = async function () {
        try {
            const res = await fetch("/api/tomtomRequest", {method:"GET"});
            if (!res.ok) {
                throw new Error("something went wrong with location finder");
            }
            var data = await res.json();
            tomtomKey.current = data.tomtomKey;
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleHomeForm = async function (e) {
        e.preventDefault();
        var errorValue = false;
        
        //handle address
        if (isEmpty(homeForm.current.address.value.trim())) {
            toast.error(`Error: Address field is Empty`);
            errorValue = true
        }
        else {
            //check if address is valid with google
            formData.address = homeForm.current.address.value.trim();
        }
        //handle email
        handleEmail(
            e, 
            homeForm.current.email.value.trim(), 
            ()=> formData.email = homeForm.current.email.value,
            ()=> errorValue = true
        )
        //handle dwelling type
        if(isEmpty(homeForm.current.dwellingType.value.trim())) {
            toast.error(`Error: Choose a dwelling type!`)
            errorValue = true;
        }
        else {
            formData.dwellingType = homeForm.current.dwellingType.value.trim();
        }
        //handle goal
        if(isEmpty(homeForm.current.mainGoal.value.trim())) {
            toast.error(`Error: Choose a goal!`)
            errorValue = true
        }
        else {
            formData.mainGoal = homeForm.current.mainGoal.value.trim();
        }

        //if data is complete give score
        if (errorValue) {
            formData = {}
        }
        else {
            var  dummyScore = Math.floor(Math.random() * (40 - 0 + 1)) + 0;
            toast.success(`Your Score is ${dummyScore}`);
            //loading state
            setLoading(true)
            
            //send data
            try {
                const res = await fetch("/api/handleHomeForm", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
                });

                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.error || "Something went wrong");
                }

                const data = await res.json();
                toast.success("We've Sent you an email!");
                setLoading(false);
                clearForm();


            } catch (err) {
                toast.error("Error: " + err.message);
            }
        }
    }

    const suggestAdd = async function () {
        var lenChange, query;
        var newLen = homeForm.current.address.value.trim().length

        if (homeForm.current.address.value.trim().length < 4) {
            return
        }

        lenChange = newLen - prevLen;

        if (lenChange < 4) {
            return
        }

        prevLen.current = newLen;
        query = homeForm.current.address.value.trim();
        try {
            const res = await fetch(
                            `https://api.tomtom.com/search/2/search/${query}.json?key=${tomtomKey.current}&typeahead=true&limit=5`,
                            {
                                method: "GET",
                            }
                        )
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.errorText || "Something went wrong");
            }
            const suggestionList = await res.json();
            var { results } = suggestionList;

            for (var i=0; i < results.length; i++) {
                var {streetNumber, streetName, neighbourhood, municipality, countrySubdivision, postalCode, country} = results[i].address;
                var tempObj = {streetNumber, streetName, neighbourhood, municipality, countrySubdivision, postalCode, country}
                tempAddressList.push(Object.values(tempObj).join(' '));
            }

            setAddressList(tempAddressList);
            


        } catch (error) {
            console.log(error)
        }
        
        if(addressList && isFocused) {
            setSuggestionDisplay(true)
        }
    }
    
    const pickAdd = function (e) {
        console.log("yes");
        homeForm.current.address.value = e.target.textContent;
        addressBar.current.blur()
        setAddressList([]);
        setSuggestionDisplay(false);
    }

    var suggestionUI = addressList.map(
        (item, index) => <li onClick={pickAdd} key={index+item}>{item}</li>
    )

    return (
        <div className={styles.con}>
            <h3>Check it Out</h3>
            <form disabled="disabled" ref={homeForm} className={styles.form}>
                <fieldset className={styles.fieldset} disabled={loading?true:false}>
                    <div className={styles.address}>
                        <input autoComplete={"off"} ref={addressBar} onChange={suggestAdd} name="address" type="text" placeholder='address' />
                        <ul ref={suggestCon} style={{display:(suggestionDisplay?'grid':'none')}} className={styles.add_suggestion_bar}>
                            { suggestionUI }
                        </ul>
                    </div>
                    <div className={styles.email}>
                        <input name='email' placeholder="email" className={styles.email_in} type='email' />
                    </div>
                    <div className={styles.goal}>
                        <select name='mainGoal'>
                            <option value="">Main Goal</option>
                            <option value="Reduce hotspots">Reduce hotspots</option>
                            <option value="Better sleep">Better sleep</option>
                            <option value="Baby room">baby room</option>
                            <option value="Office optimisation">Office optimisation</option>
                        </select>
                    </div>
                    <div className={styles.type}>
                        <select name='dwellingType'>
                            <option value=''>Dwelling type</option>
                            <option value='House'>House</option>
                            <option value='Apartment'>Apartment</option>
                            <option value='Townhouse'>Townhouse</option>
                        </select>
                    </div>
                    <div className={styles.btn}>
                        <Button 
                            custom_style={loading?{
                                backgroundColor:"#ff450042", 
                                color:"grey", 
                                cursor:"not-allowed"}:{}} 
                            on_click={handleHomeForm} 
                            value='submit'/>
                    </div>
                </fieldset>
            </form>
        </div>
    )
}