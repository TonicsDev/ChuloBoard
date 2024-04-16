function useFieldNumber({ type, key, min, max}, setNewValue, value) {

    function onChange(e) {
        const valueInt = Number.parseInt(e.target.value);
        if(e.target.value.trim() == "" || Number.isNaN(valueInt)) return;
        if(valueInt < min || valueInt > max) return;
        setNewValue({
            ...value,
            [key]: valueInt
        });
    }

    return {
        type,
        onChange
    }
}

export default useFieldNumber;