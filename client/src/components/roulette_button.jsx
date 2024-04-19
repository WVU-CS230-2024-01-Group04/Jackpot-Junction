import React, { useState, useEffect, useRef } from 'react'
import '../components/roulette.css'

const RouletteButton = ({disabled, betAmount, toDisplay, buttonType, betArray, setBetArray, index}) =>
{
    const [chipStatus, setChipStatus] = useState(false);
    const prevBetArrayIndex = useRef(betArray[index]);

    const handleClick = () => 
    {
        var increaseBet = betArray[index] + betAmount;
        const updatedBetArray = [...betArray];
        updatedBetArray[index] = increaseBet;
        setBetArray(updatedBetArray);

        setChipStatus(true);
    }
    
    const handleRightClick = (e) => 
    {
        e.preventDefault();

        var decreaseBet = betArray[index] - betAmount;
        const updatedBetArray = [...betArray];
        updatedBetArray[index] = decreaseBet;
        setBetArray(updatedBetArray);
    }

    useEffect(() => 
    {
        if (betArray[index] <= 0 && prevBetArrayIndex.current > 0)
        {
            setBetArray(prevBetArray => {
                const updatedBetArray = [...prevBetArray];
                updatedBetArray[index] = 0;
                return updatedBetArray;
            });

            setChipStatus(false);
        }

        prevBetArrayIndex.current = betArray[index];
    }, [betArray, index, setBetArray, chipStatus]);

    // getting what type of button it is by the toDisplay and buttonType so the color circle is correct
    let circleColor;
    if (buttonType === 'number') 
    {
        if (toDisplay === 0) 
        {
            circleColor = 'green';
        } 
        else if (toDisplay % 2 === 0) 
        {
            circleColor = 'red';
        } 
        else 
        {
            circleColor = 'black';
        }
    } 
    else 
    {
        circleColor = '';
    }

    return(
        <div className="roulette_button" onClick={handleClick} onContextMenu={handleRightClick}>
            <button className='number_button' disabled={disabled}>
                <span className="button_circle" style={{ backgroundColor: circleColor }}></span>
                {toDisplay}
            </button>
            {chipStatus && <span className='roulette_button_chip'>{betArray[index]}</span>}
        </div>
    )
}

export default RouletteButton;