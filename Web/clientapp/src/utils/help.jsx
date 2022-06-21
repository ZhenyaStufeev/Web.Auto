const { useRef, useEffect } = require("react");

const breakUpPrice = (value) => {
    if (!isNaN(value)) {
        let str_val = value.toString().split('').reverse().join('');
        let res_val = [];

        for (let i = 0; i < str_val.length; ++i) {
            res_val.push(str_val[i]);
            if ((i + 1) % 3 === 0 && i + 1 !== str_val.length) {
                res_val.push(' ');
            }
        }
        return res_val.reverse().join('');
    }
    return "";
}

const useFocus = () => {
    const htmlElRef = useRef(null);
    const setFocus = () => { htmlElRef.current && htmlElRef.current.focus() }

    return [htmlElRef, setFocus]
}

const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
        ref.current = value; //assign the value of ref to the argument
    }, [value]); //this code will run when the value of 'value' changes
    return ref.current; //in the end, return the current ref value.
}

module.exports = {
    breakUpPrice,
    useFocus,
    usePrevious
};