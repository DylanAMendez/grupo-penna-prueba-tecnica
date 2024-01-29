import { useState } from 'react'

import './App.css'

function App()
{
  //* NEW USER
  const [users, setUsers] = useState([]);

  //? almacenar entrada enviada por el usuario y configurar como el atributo value del input
  const [newNombre, setNewNombre] = useState('');
  const [newApellido, setNewApellido] = useState('');
  const [newNumero, setNewNumero] = useState('');
  const [newFecha, setNewFecha] = useState('');


  //? función agregar nuevo usuario
  const addUser = (event) => 
  {
    event.preventDefault();

    const userObject = {
      nombre: newNombre,
      apellido: newApellido,
      numero: newNumero,
      fecha: newFecha,
    }

    setUsers([...users, userObject]);
  }

  const handleNombreChange = (event) => 
  {
    setNewNombre(event.target.value);
  }

  const handleApellidoChange = (event) => 
  {
    setNewApellido(event.target.value);
  }

  const handleNumeroChange = (event) => 
  {
    setNewNumero(event.target.value);
  }

  const handleFechaChange = (event) => 
  {
    setNewFecha(event.target.value);
  }


  //* NEW PDF
  const [newPdf, setNewPdf] = useState([]);

  const [pdfTitulo, setPdfTitulo] = useState('');
  const [pdfPath, setPdfPath] = useState(null);

  const addPdf = (event) => 
  {
    event.preventDefault();

    const pdfObject = {
      titulo: pdfTitulo,
      path: pdfPath,
    }

    setNewPdf([...newPdf, pdfObject]);

    setPdfTitulo('');
    setPdfPath(null);
  }

  const handlePdfTituloChange = (event) => 
  {
    const newTituloPdf = event.target.value;
    setPdfTitulo(newTituloPdf);
  }

  const handlePdfPathChange = (event) => 
  {
    const newPdfPath = event.target.files[0];
    setPdfPath(newPdfPath);
  }

  console.log(newPdf);
  console.log('PATH PDF: ', newPdf.map(p => p.path));


  return (
    <>
      <header>
        <form onSubmit={addUser}>

          <label>nombre:</label>
          <input type="text" name='nombre' value={newNombre} onChange={handleNombreChange} />

          <label>apellido:</label>
          <input type="text" name='apellido' value={newApellido} onChange={handleApellidoChange} />

          <label>numero:</label>
          <input type="tel" name='numero' value={newNumero} onChange={handleNumeroChange} />

          <label>fecha:</label>
          <input type="date" name='fecha' value={newFecha} onChange={handleFechaChange} />

          <button type='submit'>enviar</button>

        </form>
      </header>

      <header>
        <form onSubmit={addPdf}>

          <label>titulo pdf</label>
          <input type="text" value={pdfTitulo} name='titulo' onChange={handlePdfTituloChange} />

          <label>PDF</label>
          <input type="file" name='path' onChange={handlePdfPathChange} accept='.pdf' />

          <button type='submit'>enviar</button>

        </form>
      </header>

      {/* mostrar new user */}
      <main>

        <div>
          <ul>
            {users.map(user => (
              <li key={user.nombre}> {user.nombre} - {user.apellido} - {user.numero} - {user.fecha} </li>
            ))}
          </ul>
        </div>

        <div>
          <ul>
            {newPdf.map(pdf => (
              <li key={pdf.path}>

                {pdf.titulo}

                {pdf.path &&

                  <iframe
                    src={URL.createObjectURL(pdf.path)}
                    style={{ width: '300px', height: '300px' }}
                  />

                }

              </li>

            ))}
          </ul>
        </div>

      </main>
    </>
  )
}

export default App
