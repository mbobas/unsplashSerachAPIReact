import { render } from '@testing-library/react';
import React from 'react';

interface AutocompleteFieldProps {
    result: any,
}

const AutocompleteField = (result: any) => {
    return (
        <div>
            {result.map((item: any) => (
                <div>
                <h1>{item.title}</h1>    
                </div>
            ))}
        </div>
    );
}

export default AutocompleteField;