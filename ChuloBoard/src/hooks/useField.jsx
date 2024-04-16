function useField({ type, key }, setNewValue, value) {

    function onChange(e) {
        setNewValue({
            ...value,
            [key]: e.target.value
        });
    }

    return {
        type,
        onChange
    }
}

export default useField;