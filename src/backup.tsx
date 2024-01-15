{/* <DragDropContext onDragEnd={handleOnDragEnd}>
    <Droppable droppableId="characters">
        {(provided) => (
            <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                {header.map((headerColumn, index) => {
                    return (
                        <Draggable key={headerColumn} draggableId={headerColumn} index={index}>
                            {(provided) => (
                                <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                    <p>
                                        {headerColumn}
                                    </p>
                                </li>
                            )}
                        </Draggable>
                    );
                })}
                {provided.placeholder}
            </ul>
        )}
    </Droppable>
                {data.length && header.length ? <div className="divider">
                <div className="divider-line"></div>
                <div className="divider-label">
                    Edit order column table
                </div>
            </div> : null}
            {data.length && header.length ? <div className="col-header">
                Column header
            </div> : null}
</DragDropContext> */}