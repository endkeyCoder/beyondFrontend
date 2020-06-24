import React from 'react';

function ImpExp() {
    async function handleFile(input) {
        const myFile = input.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            console.log('print de file provavelmente => ', e.target.result)
        }
        reader.readAsDataURL(myFile)
    }
    return (
        <div>
            print de excel no console
            <input type="file" onChange={e => handleFile(e.target)} accept=".xls, .xlsx" />
        </div>
    );
}

export default ImpExp;