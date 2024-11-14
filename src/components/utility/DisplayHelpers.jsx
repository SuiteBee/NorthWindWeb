export const moneyString = (value) => {
    return value?.toLocaleString('en-US', {minimumFractionDigits: 2});
}

export const percString = (value) => {
    return (value * 100).toFixed(2) + "%";
}