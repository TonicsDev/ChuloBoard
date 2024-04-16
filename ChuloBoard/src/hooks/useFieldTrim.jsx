function useFieldTrim({ type, key }, setNewValue, value) {

    function onChange(e) {
        setNewValue({
            ...value,
            [key]: e.target.value.trim()
        });
    }

    return {
        type,
        onChange
    }
}

export default useFieldTrim;