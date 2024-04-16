import { useState, useEffect, useRef, useCallback} from "react";
import { useGetActive } from "./useGetActive";
import { useSearchBox } from "react-instantsearch-core";
function useAutoComplete(callback) {
    const inputRef = useRef(null);
    const {refine} = useSearchBox();
    const [openAutoComplete, setOpenAutoComplete] = useState(false);
    function handleInput() {
        const {value, selectionEnd} = inputRef.current;
        const {word} = useGetActive(value, selectionEnd);
        const activeAutocomplete = /^{\w{0,15}}$/g.test(word);
        const activeAutocomplete2 = /^{\w{0,15}$/g.test(word);
        if(activeAutocomplete) {
            setOpenAutoComplete(activeAutocomplete);
            const slicedWord = word.slice(1, word.length - 1);
            activeAutocomplete && refine(slicedWord);
        } else if(activeAutocomplete2) {
            setOpenAutoComplete(activeAutocomplete2);
            activeAutocomplete2 && refine(word.slice(1));
        } else {
            setOpenAutoComplete(false);
        }
    }
    function handleSelection(variableHandle) {
        const {value, selectionEnd} = inputRef.current;
        const {word, range} = useGetActive(value, selectionEnd);

        const [index] = range;
        
        const prefix = value.substring(0, index);
        const sufix = value.substring(index + word.length);
        const newText = prefix + `{${variableHandle}}` + sufix;

        const text = JSON.stringify(newText);
        callback(JSON.parse(text));
        inputRef.current.focus();
        setOpenAutoComplete(false);
    }

    return [inputRef, openAutoComplete, handleInput, handleSelection];
}

export default useAutoComplete;