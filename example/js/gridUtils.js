
loadBoxDimensions = ({ t_width, t_height, cols, rows }) => {
    if (t_width % cols || t_height % (rows))
        throw new Error(
            `Error creating game grid: 
        Please ensure that the desired column and row counts divide evenly into the total width and height of the level!
        ${t_width} / ${cols} = ${t_width / cols}.
        ${t_width} % ${cols} = ${t_width % cols}.
        ${t_height} / ${rows} = ${t_height / rows}.
        ${t_height} % ${rows} = ${t_height % rows}.
        `
        );

    let width = t_width / cols;
    let height = t_height / (rows);

    return { width, height }
}


generateBox = ({ cell_width, cell_height, element }) => {
    let newDiv = document.createElement("div");
    newDiv.setAttribute("style",
        `width: ${cell_height}px;
        height: ${cell_width}px;
        box-sizing: border-box;`
    );
    newDiv.classList.add("cell");
    
    element.appendChild(newDiv);

    return newDiv;

}