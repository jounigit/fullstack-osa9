import React from 'react';
import { Courses } from '../types';

export const Total: React.FC<Courses> = ( props: Courses ) => {
    const total = props.courses.reduce((carry, part) => carry + part.exerciseCount, 0);
    return <p> Number of exercises { total } </p>
};
