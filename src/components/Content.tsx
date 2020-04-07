import React from 'react';
import { CoursePart } from '../index';

export const Part = ( {part}: {part: CoursePart} ) => {
    switch (part.name) {
            case "Fundamentals":
                return (
                    <>
                    <p><b>{part.name}</b> {part.exerciseCount}</p>
                    <p>{ part.description }</p>
                    </>
                );
            case "Using props to pass data":
                return (
                    <>
                    <p><b>{part.name}</b> {part.exerciseCount}</p>
                    <p>GroupProjectCount { part.groupProjectCount }</p>
                    </>
                );
            case "Deeper type usage":
                return (
                    <>
                    <p><b>{part.name}</b> {part.exerciseCount}</p>
                    <p>{ part.description }</p>
                    <p>SubmissionLink: { part.exerciseSubmissionLink }</p>
                    </>
                );
            case "Something special":
                return (
                    <>
                    <p><b>{part.name}</b> {part.exerciseCount}</p>
                    <p>{ part.description }</p>
                    </>
                );
        }
  }

export const Content = ({ parts }: { parts: CoursePart[] }) => {
    console.log('= CONTENT =', parts)
    return (
       <>
            {
                parts.map(( part, index ) => {
                    return (
                        <div key={index}>
                            <Part part={ part } />
                        </div>
                    )
                })
            }
       </>
    );
};

// const Part = ( {part}: {part: CoursePart} ) => {
//     const showPart = (part: CoursePart) => {
//         switch (part.name) {
//             case "Fundamentals":
//                 return (
//                     <>
//                     <p><b>{part.name}</b> {part.exerciseCount}</p>
//                     <p>{ part.description }</p>
//                     </>
//                 );
//             case "Using props to pass data":
//                 return (
//                     <>
//                     <p><b>{part.name}</b> {part.exerciseCount}</p>
//                     <p>GroupProjectCount { part.groupProjectCount }</p>
//                     </>
//                 );
//             case "Deeper type usage":
//                 return (
//                     <>
//                     <p><b>{part.name}</b> {part.exerciseCount}</p>
//                     <p>{ part.description }</p>
//                     <p>SubmissionLink: { part.exerciseSubmissionLink }</p>
//                     </>
//                 );
//             case "Something special":
//                 return (
//                     <>
//                     <p><b>{part.name}</b> {part.exerciseCount}</p>
//                     <p>{ part.description }</p>
//                     </>
//                 );
//         }
//     }       
//     return (
//         <> { showPart(part) } </>
//     )
// }