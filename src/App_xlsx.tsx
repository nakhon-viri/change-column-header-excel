import { useState } from "react";
import * as XLSX from "xlsx";
import './App.css';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


function App() {

    const [data, setData] = useState([]);
    const [header, setHeader] = useState<string[]>([])
    const [fileName, setFileName] = useState("")

    const handleFileUpload = (e) => {
        setData([]);
        setHeader([])
        setFileName(e.target.files[0].name)
        const reader = new FileReader();
        reader.readAsBinaryString(e.target.files[0]);
        reader.onload = (er) => {
            const data = er.target.result;
            const workbook = XLSX.read(data, { type: "binary" });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const parsedData = XLSX.utils.sheet_to_json(sheet);
            e.target.file = []
            setData(parsedData);
            setHeader(Object.keys(parsedData[0]))
        };
    }

    const exprotExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(data, { header });
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "MYSavedData.xlsx");
    }

    function handleOnDragEnd(result) {
        console.log('result', result)
        if (!result.destination) return;

        const items = Array.from(header);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        console.log('items', items)
        setHeader(items);
    }

    return (
        <div className="App">
            <div className="btn-container">
                {data.length && header.length ? <button className="export-btn" onClick={exprotExcel}>export</button> : null}
                <div className="import-btn">
                    <div>Import excel (.xlsx)</div>
                    <input
                        className="input-import"
                        type="file"
                        accept=".xlsx, .xls"
                        onChange={handleFileUpload}
                    />
                </div>
                <div>
                    {fileName}
                </div>
            </div>
            {data.length && header.length ? <div className="divider">
                <div className="divider-line"></div>
                <div className="divider-label">
                    Edit order column table
                </div>
            </div> : null}
            {data.length && header.length ? <div className="col-header">
                Column header
            </div> : null}
            <DragDropContext onDragEnd={handleOnDragEnd}>
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
            </DragDropContext>
        </div >
    );
}

export default App;

