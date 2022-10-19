import logo from './logo.svg';
import './App.css';
import * as XLSX from 'xlsx'

function App() {

  const readExcel = async(file) => {
    try {
      const promise = await new Promise((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.readAsArrayBuffer(file)
        fileReader.onload = (e) => {
          const bufferReader = e.target.result

          const wb = XLSX.read(bufferReader, { type: 'buffer' });
          const wbSheetName = wb.SheetNames[0]
          const ws = wb.Sheets[wbSheetName];
          const data = XLSX.utils.sheet_to_json(ws)
          resolve(data)

        };
        FileReader.onError = (error) => {
          reject(error)
        }
      })



      console.log("promise is here ",promise)


    } catch (error) {
      console.log(error)
    }

  }
  return (
    <div className="App">
      <input type='file' onChange={(e) => {
        const file = e.target.files[0];

        readExcel(file)
      }} />
    </div>
  );
}

export default App;
