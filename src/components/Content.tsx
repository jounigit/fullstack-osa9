import React from 'react';
import { Courses } from '../types';

export const Content: React.FC<Courses> = ( props: Courses ) => {
    return (
       <React.Fragment>
           {
               props.courses.map(( course, index ) => {
               return (<p key={index}>{course.name} {course.exerciseCount}</p>);
               })
           }
       </React.Fragment>
    )
}

// props.courses.map((course: Course, index: number) => (
//     <p key={index}>{ course.name }</p>
//     ))