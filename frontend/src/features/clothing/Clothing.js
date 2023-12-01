import { React, useEffect, useState } from 'react'

const Clothing = (props) => {
    const {tops, male, female} = props
    

    return (
        <div>
            {tops.length > 0 ? tops.map(item=>{

                return (
                    <li key={item.id}>
                        {item.title}

                    </li>
                )
            }): console.log()}
            
            {male.length > 0 ? male.map(item=>{

                return (
                    <li key={item.id}>
                        {item.title}

                    </li>
                )
            }): console.log()}

            {female.length > 0 ? female.map(item=>{

            return (
                <li key={item.id}>
                    {item.title}

                </li>
            )
            }): console.log()}

            
        </div>
    );

}

export default Clothing;