import { useAnimation, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useHits } from "react-instantsearch-core";


function AutoComplete({handleSelection, autocomplete}) {
    const {hits} = useHits();

    const control = useAnimation();

    const variants = {
        openAnim: {
            height: [0, 300],
            transition: {duration: 0.5}
        },
        closeAnim: {
            height: 0,
            transition: {duration: 0.5}
        }
    }

    useEffect(() => {
        if(autocomplete) {
            control.start("openAnim");
        } else {
            control.start("closeAnim");
        }
        return () => control.stop();
    }, [autocomplete]);

    return(
        <motion.div className="autocomplete-container" animate={control} variants={variants}>
            {autocomplete && 
                hits.length > 0 && (
                    <ul className="suggest-list">
                        {hits.map((hit) => (
                            <button key={hit.variable} className="suggest" onClick={() => handleSelection(hit.variable)}>
                                <Item hit={hit}/>
                            </button>
                        ))}
                    </ul>
                )
            }
        </motion.div>
    )
}

function Item({hit}) {
    return(
        <div className="variable-body">
            <div className="variable-title">
                <h3 className="variable">
                    {hit.variable}
                </h3>
            </div>
            <div className="variable-description">
                <span className="description">
                    {hit.description}
                </span>
            </div>
        </div>
    )
}
export {AutoComplete}