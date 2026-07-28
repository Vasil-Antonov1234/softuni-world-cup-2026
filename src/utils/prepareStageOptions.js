export function prepareStageOptions(matchData) {    
    const options = ["Group Stage", "Round of 16", "Quarter-final", "Semi-final", "Final"];

    const selectedOption = options.map((x) => ({
        title: x,
        selected: matchData ? matchData.stage === x ? "selected" : "" : ""
    }));

    return selectedOption;
};