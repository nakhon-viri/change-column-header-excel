import { useState } from "react";
import * as XLSX from "xlsx";
import './App.css';
import moment from "moment";
import { categories } from './categories'
import UploadPng from "./assets/upload.jpg";

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
            console.log('parsedData', parsedData)
            const dataValue: any[] = []
            parsedData.forEach(dataArr => {
                if (dataArr['สถานะการสั่งซื้อ'] === "ยกเลิกแล้ว") return
                dataValue.push({
                    'หมายเลขคำสั่งซื้อ': dataArr['หมายเลขคำสั่งซื้อ'],
                    'สถานะ': dataArr['สถานะการสั่งซื้อ'],
                    "พนง.": '',
                    "ใบแจ้งหนี้": '',
                    "การชำระเงิน": '',
                    "ส่วนลด": '',
                    "ยอดขาย": '',
                    "ผู้ให้บริการ": '',
                    "จำนวน": '',
                    "ค่าจัดส่ง": '',
                    "ค่า COD": '',
                    "หมายเลขพัสดุ": '',
                    "ประเภท": 'Shopee',
                    "ชื่อช่องทาง": '',
                    "วันที่แพค": '',
                    'วันที่สร้าง': moment(dataArr['วันที่ทำการสั่งซื้อ']).format('DD/MM/yyyy'),
                    "ส่วนลดร้านค้า": '',
                    "ส่วนลดแพลตฟอร์ม": '',
                    "เหรียญ": '',
                    "รหัส SKU": '',
                    "ชื่อสินค้า": dataArr['ชื่อสินค้า'],
                    "ตัวเลือกสินค้า (ถ้ามี)": '',
                    "ราคาต่อชิ้น": '',
                    "ส่วนลดต่อชิ้น": '',
                    "จำนวนสินค้าตามรายการ": '',
                    "หมายเหตุ": '',
                    "ส่วนลดรายสินค้า": +dataArr['โค้ดส่วนลดชำระโดยผู้ขาย'] + +dataArr['โค้ด Coins Cashback'] + +dataArr['โค้ดส่วนลดชำระโดย Shopee'],
                    "ค่าจัดส่ง(พี)": '',
                    'ค่า COD(พี)': '',
                    'ยอดขายรายสินค้า(พี)': dataArr['ราคาขายสุทธิ'],
                    'รายชื่อสินค้า(พี)': categories[dataArr['ชื่อสินค้า']] || '',
                    'ช่องทางการขาย (พี)': 'Shopee',
                })
            })
            console.log('dataValue', dataValue)
            setData(dataValue)
            setHeader(Object.keys(parsedData[0]))
        };
    }

    const exprotExcel = () => {
        // const headerDisplay = [[
        //     'หมายเลขคำสั่งซื้อ',
        //     'สถานะการสั่งซื้อ',
        //     "พนง.",
        //     'วันที่ทำการสั่งซื้อ'
        // ]]
        // const headerOrderShoppee = [
        //     'หมายเลขคำสั่งซื้อ',
        //     'สถานะการสั่งซื้อ',
        //     'วันที่ทำการสั่งซื้อ'
        // ]

        const a = [
            'หมายเลขคำสั่งซื้อ',
            'สถานะ',
            "พนง.",
            "ใบแจ้งหนี้",
            "การชำระเงิน",
            "ส่วนลด",
            "ยอดขาย",
            "ผู้ให้บริการ",
            "จำนวน",
            "ค่าจัดส่ง",
            "ค่า COD",
            "หมายเลขพัสดุ",
            "ประเภท",
            "ชื่อช่องทาง",
            "วันที่แพค",
            'วันที่สร้าง',
            "ส่วนลดร้านค้า",
            "ส่วนลดแพลตฟอร์ม",
            "เหรียญ",
            "รหัส SKU",
            "ชื่อสินค้า",
            "ตัวเลือกสินค้า (ถ้ามี)",
            "ราคาต่อชิ้น",
            "ส่วนลดต่อชิ้น",
            "จำนวนสินค้าตามรายการ",
            "หมายเหตุ",
            "ส่วนลดรายสินค้า",
            "ค่าจัดส่ง(พี)",
            'ค่า COD(พี)',
            'ยอดขายรายสินค้า(พี)',
            'รายชื่อสินค้า(พี)',
            'ช่องทางการขาย (พี)',
        ]

        const worksheet = XLSX.utils.json_to_sheet(data, { header: a });
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "filename.xlsx");
        // const wb = XLSX.utils.book_new();
        // const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet([]);
        // console.log('ws', ws)
        // XLSX.utils.sheet_add_aoa(ws, headerDisplay);

        // //Starting in the second row to avoid overriding and skipping headers
        // XLSX.utils.sheet_add_json(ws, data, { origin: 'A2', skipHeader: true, header: headerOrderShoppee });

        // XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        // XLSX.writeFile(wb, 'filename.xlsx');
    }

    return (
        <div className="App">
            {/* <div className="btn-container">
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
            </div> */}
            <div className="upload-container">
                <input
                    className="input-import"
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={handleFileUpload}
                />
                <img src={UploadPng} style={{ height: 500, width: 'auto' }} alt="" />
                <div className="label-upload">Upload your excel (.xlsx).</div>
            </div>
            {data.length && header.length ?
                <div className="export-container">
                    <button className="export-btn" onClick={exprotExcel}>export</button>
                    <div>
                        {fileName}
                    </div>
                </div> : null
            }
        </div >
    );
}

export default App;

