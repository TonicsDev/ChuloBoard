
export function useGetActive(input, cursorPosition) {
    if(cursorPosition == undefined) return undefined;

    var words = [];

    input.split(/[\s\n]/g).forEach((word, index) => {
        const previous = words[index -1];

        const start = index === 0 ? index : previous.range[1] + 1;

        const end = start + word.length;
        
        words.push({word, range: [start, end]})
    });


    return words.find(
        ({range}) => range[0] <= cursorPosition && range[1] >= cursorPosition
    );
}