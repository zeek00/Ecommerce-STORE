import { React, useEffect, useState } from 'react'


const Electronics = (props) => {
    const {laptops, smartphones} = props
    return (
        <div>
            
            {laptops.length > 0 ? laptops.map(item=>{
                return (
                    <li key={item.id}>
                        {item.category}

                    </li>
                )
            }): console.log()}
            {smartphones.length > 0 ? smartphones.map(item=>{
                return (
                    <li key={item.id}>
                        {item.category}

                    </li>
                )
            }): console.log()}
        </div>
    );

}

export default Electronics;