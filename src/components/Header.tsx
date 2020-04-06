import React from 'react'

// interface HeaderProps {
//     name: string;
// }

// const Header: React.FC<HeaderProps> = (props) => {
//     return <h1>{props.name}</h1>
// };

export const Header: React.FC<{ name: string }> = ({ name }) => (
    <h1>Hello, {name}</h1>
);